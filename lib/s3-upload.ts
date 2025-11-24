// lib/s3-upload.ts
import toast from "react-hot-toast";

interface FileToUpload {
  file: File;
  fileType: "image" | "video" | "document";
}

interface PresignedUrlResponse {
  presignedUrl: string;
  s3Url: string;
  key: string;
  fileName: string;
  fileType: "image" | "video" | "document";
}

interface SaveFilePayload {
  s3Url: string;
  key: string;
  fileName: string;
  fileSize: number;
  fileType: "image" | "video" | "document";
}

/**
 * Upload a single file to S3 using presigned URL
 * @param file - The file to upload
 * @param userId - The user ID
 * @param fileType - Type of file (image, video, document)
 * @returns The S3 URL and key on success
 */
export async function uploadFileToS3Direct(
  file: File,
  userId: string,
  fileType: "image" | "video" | "document"
): Promise<{ s3Url: string; key: string } | null> {
  try {
    // Step 1: Get presigned URL from your API
    const presignedResponse = await fetch(
      `/api/users/${userId}/upload-presigned`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          fileSize: file.size,
          fileType,
        }),
      }
    );

    if (!presignedResponse.ok) {
      const error = await presignedResponse.json();
      throw new Error(error.error || "Failed to get upload URL");
    }

    const { presignedUrl, s3Url, key }: PresignedUrlResponse =
      await presignedResponse.json();

    // Step 2: Upload directly to S3
    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file to S3");
    }

    return { s3Url, key };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Upload failed";
    console.error("S3 upload error:", errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Upload multiple files to S3 and save metadata to database
 * @param filesToUpload - Array of files to upload
 * @param userId - The user ID
 * @returns Number of successfully uploaded files
 */
export async function uploadFilesToS3AndDB(
  filesToUpload: FileToUpload[],
  userId: string
): Promise<number> {
  if (filesToUpload.length === 0) {
    return 0;
  }

  const uploadingToast = toast.loading(
    `📤 Uploading ${filesToUpload.length} file(s)...`
  );

  try {
    const uploadPromises = filesToUpload.map((fileItem) =>
      uploadFileToS3Direct(fileItem.file, userId, fileItem.fileType)
        .then((result) => ({
          success: true,
          data: {
            s3Url: result!.s3Url,
            key: result!.key,
            fileName: fileItem.file.name,
            fileSize: fileItem.file.size,
            fileType: fileItem.fileType,
          },
        }))
        .catch((error) => ({
          success: false,
          fileName: fileItem.file.name,
          error: error.message,
        }))
    );

    const uploadResults = await Promise.all(uploadPromises);

    const successfulFiles = uploadResults
      .filter((r) => r.success)
      .map((r) => (r as any).data);
    const failedCount = uploadResults.filter((r) => !r.success).length;

    // Step 3: Save metadata to database
    if (successfulFiles.length > 0) {
      const saveResponse = await fetch(`/api/users/${userId}/save-files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: successfulFiles,
        }),
      });

      if (!saveResponse.ok) {
        const error = await saveResponse.json();
        throw new Error(error.error || "Failed to save file metadata");
      }
    }

    toast.dismiss(uploadingToast);

    // Show results
    if (failedCount === 0) {
      toast.success(
        `✅ ${successfulFiles.length} file(s) uploaded successfully!`,
        {
          icon: "📤",
        }
      );
    } else {
      toast.success(
        `✅ ${successfulFiles.length}/${filesToUpload.length} file(s) uploaded`,
        {
          icon: "📤",
        }
      );
      if (failedCount > 0) {
        console.warn(`⚠️ ${failedCount} file(s) failed to upload`);
      }
    }

    return successfulFiles.length;
  } catch (error) {
    toast.dismiss(uploadingToast);
    const errorMessage =
      error instanceof Error ? error.message : "Upload failed";
    toast.error(`❌ ${errorMessage}`, { duration: 4000 });
    console.error("Error uploading files:", error);
    throw error;
  }
}
