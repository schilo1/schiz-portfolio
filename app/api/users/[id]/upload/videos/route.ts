import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  uploadFileToS3,
  isValidVideoFile,
  getContentType,
  MAX_FILE_SIZE,
} from "@/lib/S3";

// ❌ REMOVE: export const config = { ... }

// POST /api/users/[id]/upload/videos - Uploader une vidéo
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const id: any = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    // ✅ AWAIT params first

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id }, // ✅ Use destructured id
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!isValidVideoFile(file.name)) {
      return NextResponse.json(
        { error: "Invalid video format. Allowed: mp4, avi, mov, mkv, webm" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE.video) {
      return NextResponse.json(
        {
          error: `Video size exceeds ${
            MAX_FILE_SIZE.video / 1024 / 1024
          }MB limit`,
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = getContentType(file.name);

    const { url, key } = await uploadFileToS3(
      buffer,
      file.name,
      contentType,
      "videos"
    );

    const video = await prisma.video.create({
      data: {
        userId: id, // ✅ Use id
        name: file.name,
        size: file.size,
        url,
        key,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    );
  }
}

// GET /api/users/[id]/upload/videos - Récupérer les vidéos d'un utilisateur
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    // ✅ AWAIT params first

    const videos = await prisma.video.findMany({
      where: { userId: id }, // ✅ Use id
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
