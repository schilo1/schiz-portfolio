import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/[id]/social - Récupérer les liens sociaux
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    const socialLinks = await prisma.socialLinks.findUnique({
      where: { userId: id },
    });

    if (!socialLinks) {
      return NextResponse.json(
        { error: "Social links not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(socialLinks, { status: 200 });
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}

// POST /api/users/[id]/social - Créer ou mettre à jour les liens sociaux
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const id: any = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    const body = await request.json();

    const { linkedin, github, website, twitter, instagram } = body;

    // Vérifier si les liens sociaux existent déjà
    const existingLinks = await prisma.socialLinks.findUnique({
      where: { userId: id },
    });

    let socialLinks;

    if (existingLinks) {
      // Mettre à jour
      socialLinks = await prisma.socialLinks.update({
        where: { userId: id },
        data: {
          linkedin: linkedin || null,
          github: github || null,
          website: website || null,
          twitter: twitter || null,
        },
      });
    } else {
      // Créer
      socialLinks = await prisma.socialLinks.create({
        data: {
          userId: id,
          linkedin: linkedin || null,
          github: github || null,
          website: website || null,
          twitter: twitter || null,
        },
      });
    }

    return NextResponse.json(socialLinks, { status: 201 });
  } catch (error) {
    console.error("Error creating/updating social links:", error);
    return NextResponse.json(
      { error: "Failed to create/update social links" },
      { status: 500 }
    );
  }
}

// // PUT /api/users/[id]/social - Mettre à jour les liens sociaux
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();

//     const socialLinks = await prisma.socialLinks.update({
//       where: { userId: params.id },
//       data: body,
//     });

//     return NextResponse.json(socialLinks, { status: 200 });
//   } catch (error) {
//     console.error("Error updating social links:", error);
//     return NextResponse.json(
//       { error: "Failed to update social links" },
//       { status: 500 }
//     );
//   }
// }
