import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  uploadFileToS3,
  isValidDocumentFile,
  getContentType,
  MAX_FILE_SIZE,
} from "@/lib/S3";

// ❌ REMOVE: export const config = { ... }

// POST /api/users/[id]/upload/documents - Uploader un document
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
    const isPaid = formData.get("isPaid") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!isValidDocumentFile(file.name)) {
      return NextResponse.json(
        {
          error:
            "Invalid document format. Allowed: pdf, doc, docx, xls, xlsx, ppt, pptx, txt, zip",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE.document) {
      return NextResponse.json(
        {
          error: `Document size exceeds ${
            MAX_FILE_SIZE.document / 1024 / 1024
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
      "documents"
    );

    const document = await prisma.document.create({
      data: {
        userId: id, // ✅ Use id
        name: file.name,
        size: file.size,
        type: contentType,
        url,
        key,
        isPaid,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

// GET /api/users/[id]/upload/documents - Récupérer les documents d'un utilisateur
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    // ✅ AWAIT params first

    const documents = await prisma.document.findMany({
      where: { userId: id }, // ✅ Use id
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]/upload/documents/[docId] - Supprimer un document
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string; docId: string }> } // ✅ params is a Promise
// ) {
//   try {
//     // ✅ AWAIT params first
//     const { id, docId } = await params;

//     const document = await prisma.document.findUnique({
//       where: { id: docId }, // ✅ Use docId
//     });

//     if (!document) {
//       return NextResponse.json(
//         { error: "Document not found" },
//         { status: 404 }
//       );
//     }

//     // Verify the document belongs to the user (optional but recommended)
//     if (document.userId !== id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     // Delete from database
//     await prisma.document.delete({
//       where: { id: docId }, // ✅ Use docId
//     });

//     return NextResponse.json(
//       { message: "Document deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting document:", error);
//     return NextResponse.json(
//       { error: "Failed to delete document" },
//       { status: 500 }
//     );
//   }
// }
