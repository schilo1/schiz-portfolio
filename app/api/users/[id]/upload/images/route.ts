import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  uploadFileToS3,
  isValidImageFile,
  getContentType,
  MAX_FILE_SIZE,
} from "@/lib/S3";

// ❌ REMOVE: export const config = { ... }

// POST /api/users/[id]/upload/images - Uploader une image
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const match = url.pathname.match(/\/users\/([^\/]+)\/upload/);
  const id: any = match ? match[1] : null;
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

    if (!isValidImageFile(file.name)) {
      return NextResponse.json(
        { error: "Invalid image format. Allowed: jpg, jpeg, png, gif, webp" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE.image) {
      return NextResponse.json(
        {
          error: `Image size exceeds ${
            MAX_FILE_SIZE.image / 1024 / 1024
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
      "images"
    );

    const image = await prisma.image.create({
      data: {
        userId: id, // ✅ Use id
        name: file.name,
        size: file.size,
        url,
        key,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// GET /api/users/[id]/upload/images - Récupérer les images d'un utilisateur
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const match = url.pathname.match(/\/users\/([^\/]+)\/upload/);
  const id: any = match ? match[1] : null;
  try {
    // ✅ AWAIT params first

    const images = await prisma.image.findMany({
      where: { userId: id }, // ✅ Use id
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
