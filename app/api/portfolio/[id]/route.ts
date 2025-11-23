import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/portfolio/[id] - Récupérer un portfolio spécifique avec TOUS les champs
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const portfolio = await prisma.user.findUnique({
      where: { id },
      include: {
        experiences: {
          orderBy: { createdAt: "desc" },
        },
        projects: {
          orderBy: { createdAt: "desc" },
        },
        images: {
          orderBy: { createdAt: "desc" },
        },
        videos: {
          orderBy: { createdAt: "desc" },
        },
        documents: {
          orderBy: { createdAt: "desc" },
        },
        socialLinks: true,
        motivations: true, // ✅ MOTIVATIONS - Tous les 8 champs
        designPreferences: true, // ✅ DESIGN PREFERENCES - Tous les champs
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio/[id] - Mettre à jour un portfolio
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    // Traiter les compétences si c'est une chaîne
    if (body.skills && typeof body.skills === "string") {
      body.skills = body.skills.split(",").map((s: string) => s.trim());
    }

    const portfolio = await prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        location: body.location,
        profession: body.profession,
        title: body.title,
        bio: body.bio,
        skills: body.skills,
        experience: body.experience,
        status: body.status,
      },
      include: {
        experiences: true,
        projects: true,
        images: true,
        videos: true,
        documents: true,
        socialLinks: true,
        motivations: true, // ✅ MOTIVATIONS
        designPreferences: true, // ✅ DESIGN PREFERENCES
      },
    });

    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolio/[id] - Supprimer un portfolio
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Supprimer l'utilisateur (et toutes ses relations en cascade)
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Portfolio deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
