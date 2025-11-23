import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/[id] - Récupérer un utilisateur spécifique
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extracts the ID from the path
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        experiences: true,
        projects: true,
        images: true,
        videos: true,
        documents: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// // PUT /api/users/[id] - Mettre à jour un utilisateur
// export async function PUT(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Vérifier que l'utilisateur existe
//     const existingUser = await prisma.user.findUnique({
//       where: { id: id },
//     });

//     if (!existingUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Mettre à jour l'utilisateur
//     const updatedUser = await prisma.user.update({
//       where: { id: id },
//       data: {
//         firstName: body.firstName || existingUser.firstName,
//         lastName: body.lastName || existingUser.lastName,
//         phone: body.phone || existingUser.phone,
//         location: body.location || existingUser.location,
//         profession: body.profession || existingUser.profession,
//         title: body.title || existingUser.title,
//         bio: body.bio || existingUser.bio,
//         skills: body.skills || existingUser.skills,
//         experience: body.experience || existingUser.experience,
//         status: body.status || existingUser.status,
//       },
//     });

//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json(
//       { error: "Failed to update user" },
//       { status: 500 }
//     );
//   }
// }

// DELETE /api/users/[id] - Supprimer un utilisateur
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Vérifier que l'utilisateur existe
//     const existingUser = await prisma.user.findUnique({
//       where: { id: params.id },
//     });

//     if (!existingUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Supprimer l'utilisateur (et ses relations en cascade)
//     await prisma.user.delete({
//       where: { id: params.id },
//     });

//     return NextResponse.json(
//       { message: "User deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return NextResponse.json(
//       { error: "Failed to delete user" },
//       { status: 500 }
//     );
//   }
// }
