// app/api/users/[id]/upload-presigned/route.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ Adjust path to your prisma instance
import {
  isValidImageFile,
  isValidVideoFile,
  isValidDocumentFile,
  MAX_FILE_SIZE,
} from "@/lib/S3"; // ✅ Adjust path

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  try {
    // ✅ Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { fileName, contentType, fileSize, fileType } = body;
    // fileType: "image" | "video" | "document"

    // ✅ Validate file
    if (!fileName || !contentType || !fileSize || !fileType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let isValid = false;
    let folder = "";
    let maxSize = 0;

    if (fileType === "image") {
      isValid = isValidImageFile(fileName);
      folder = "images";
      maxSize = MAX_FILE_SIZE.image;
    } else if (fileType === "video") {
      isValid = isValidVideoFile(fileName);
      folder = "videos";
      maxSize = MAX_FILE_SIZE.video;
    } else if (fileType === "document") {
      isValid = isValidDocumentFile(fileName);
      folder = "documents";
      maxSize = MAX_FILE_SIZE.document;
    } else {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (!isValid) {
      return NextResponse.json(
        { error: `Invalid ${fileType} format` },
        { status: 400 }
      );
    }

    if (fileSize > maxSize) {
      return NextResponse.json(
        {
          error: `${fileType} size exceeds ${maxSize / 1024 / 1024}MB limit`,
        },
        { status: 400 }
      );
    }

    // ✅ Generate unique key
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const key = `${folder}/${timestamp}-${randomStr}-${fileName}`;

    // ✅ Create PutObject command
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: key,
      ContentType: contentType,
      Metadata: {
        "uploaded-by": userId,
        "upload-time": new Date().toISOString(),
      },
    });

    // ✅ Generate presigned URL valid for 15 minutes
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 900, // 15 minutes
    });

    // ✅ Generate S3 URL (where file will be after upload)
    const region = process.env.AWS_S3_REGION || "eu-north-1";
    const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;

    return NextResponse.json({
      presignedUrl,
      s3Url,
      key,
      fileName,
      fileType,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
