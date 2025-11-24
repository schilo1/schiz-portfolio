// // app/api/users/[id]/save-files/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // ✅ Adjust path to your prisma instance

// export async function POST(request: NextRequest) {
//   const url = new URL(request.url);
//   const match = url.pathname.match(/\/users\/([^\/]+)\/upload/);
//   const userId: any = match ? match[1] : null;

//   try {
//     // ✅ Verify user exists
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const body = await request.json();
//     const { files } = body; // files: Array of {s3Url, key, fileName, fileSize, fileType}

//     if (!files || !Array.isArray(files) || files.length === 0) {
//       return NextResponse.json({ error: "No files to save" }, { status: 400 });
//     }

//     const results = [];

//     // ✅ Save each file to the appropriate table
//     for (const file of files) {
//       const { s3Url, key, fileName, fileSize, fileType } = file;

//       try {
//         if (fileType === "image") {
//           const savedImage = await prisma.image.create({
//             data: {
//               userId,
//               name: fileName,
//               size: fileSize,
//               url: s3Url,
//               key,
//             },
//           });
//           results.push({
//             success: true,
//             fileType: "image",
//             fileName,
//             data: savedImage,
//           });
//         } else if (fileType === "video") {
//           const savedVideo = await prisma.video.create({
//             data: {
//               userId,
//               name: fileName,
//               size: fileSize,
//               url: s3Url,
//               key,
//             },
//           });
//           results.push({
//             success: true,
//             fileType: "video",
//             fileName,
//             data: savedVideo,
//           });
//         } else if (fileType === "document") {
//           const savedDoc = await prisma.document.create({
//             data: {
//               userId,
//               name: fileName,
//               size: fileSize,
//               url: s3Url,
//               key,
//             },
//           });
//           results.push({
//             success: true,
//             fileType: "document",
//             fileName,
//             data: savedDoc,
//           });
//         }
//       } catch (fileError) {
//         console.error(`Error saving ${fileType} ${fileName}:`, fileError);
//         results.push({
//           success: false,
//           fileType,
//           fileName,
//           error: "Failed to save to database",
//         });
//       }
//     }

//     // ✅ Check if all files were saved successfully
//     const failedCount = results.filter((r) => !r.success).length;

//     if (failedCount === results.length) {
//       return NextResponse.json(
//         {
//           error: "Failed to save all files",
//           results,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: `${results.length - failedCount}/${results.length} files saved`,
//       results,
//     });
//   } catch (error) {
//     console.error("Error saving files:", error);
//     return NextResponse.json(
//       { error: "Failed to save files" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  console.log("hello");
}
