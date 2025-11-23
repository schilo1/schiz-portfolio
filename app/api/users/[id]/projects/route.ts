import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/[id]/projects - Récupérer les projets
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    const projects = await prisma.project.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/users/[id]/projects - Ajouter un projet
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const id: any = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    const body = await request.json();

    const { name, description, technologies, link } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        userId: id,
        name,
        description,
        technologies: Array.isArray(technologies)
          ? technologies
          : technologies
          ? technologies.split(",").map((t: string) => t.trim())
          : [],
        link: link || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// // PUT /api/users/[id]/projects/[projId] - Mettre à jour un projet
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string; projId: string } }
// ) {
//   try {
//     const body = await request.json();

//     // Traiter les technologies si c'est une chaîne
//     if (body.technologies && typeof body.technologies === "string") {
//       body.technologies = body.technologies
//         .split(",")
//         .map((t: string) => t.trim());
//     }

//     const project = await prisma.project.update({
//       where: { id: params.projId },
//       data: body,
//     });

//     return NextResponse.json(project, { status: 200 });
//   } catch (error) {
//     console.error("Error updating project:", error);
//     return NextResponse.json(
//       { error: "Failed to update project" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/users/[id]/projects/[projId] - Supprimer un projet
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string; projId: string } }
// ) {
//   try {
//     await prisma.project.delete({
//       where: { id: params.projId },
//     });

//     return NextResponse.json(
//       { message: "Project deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting project:", error);
//     return NextResponse.json(
//       { error: "Failed to delete project" },
//       { status: 500 }
//     );
//   }
// }
