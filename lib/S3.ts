import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// ✅ Use the correct region from your bucket location
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || "eu-north-1", // ✅ Changed from us-east-1
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  contentType: string,
  folder: string // "images", "videos", "documents"
): Promise<{ url: string; key: string }> {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(7);
  const key = `${folder}/${timestamp}-${randomStr}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME || "",
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: {
      "uploaded-by": "portfolio-app",
      "upload-time": new Date().toISOString(),
    },
  });

  try {
    await s3Client.send(command);

    // ✅ Make sure this matches your actual region
    const region = process.env.AWS_S3_REGION || "eu-north-1";
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;

    return { url, key };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

export async function deleteFileFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME || "",
    Key: key,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error("S3 Delete Error:", error);
    throw new Error("Failed to delete file from S3");
  }
}

export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

export function isValidImageFile(fileName: string): boolean {
  const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const ext = getFileExtension(fileName);
  return validExtensions.includes(ext);
}

export function isValidVideoFile(fileName: string): boolean {
  const validExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const ext = getFileExtension(fileName);
  return validExtensions.includes(ext);
}

export function isValidDocumentFile(fileName: string): boolean {
  const validExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "zip",
  ];
  const ext = getFileExtension(fileName);
  return validExtensions.includes(ext);
}

export function getContentType(fileName: string): string {
  const ext = getFileExtension(fileName);
  const contentTypes: Record<string, string> = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    mkv: "video/x-matroska",
    webm: "video/webm",
  };
  return contentTypes[ext] || "application/octet-stream";
}

export const MAX_FILE_SIZE = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  document: 50 * 1024 * 1024, // 50MB
};
