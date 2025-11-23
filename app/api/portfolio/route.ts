import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/portfolio - Créer un portfolio complet avec tous les champs de design
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      // Personal Info
      firstName,
      lastName,
      email,
      phone,
      location,
      profession,
      title,
      bio,
      skills = [],
      experience,
      // Social Links
      linkedin,
      twitter,
      github,
      website,
      instagram,
      // Motivations
      firstProject,
      motivation,
      achievement,
      inspiration,
      learningStyle,
      futureGoals,
      challenges,
      uniqueValue,
      // Design - Palette
      palette,
      paletteName,
      backgroundColor,
      textColor,
      // Design - Typography
      typography,
      typographyName,
      letterSpacing,
      lineHeight,
      customTypographyUrl,
      customTypographyName,
      // Professional Experiences
      professionalExperiences = [],
      // Projects
      projects = [],
    } = body;

    // Validation des champs obligatoires
    if (
      !firstName ||
      !lastName ||
      !email ||
      !profession ||
      !title ||
      !experience
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Créer l'utilisateur avec toutes les relations
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        location,
        profession,
        title,
        bio,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(",").map((s: string) => s.trim()),
        experience,
        status: "pending",

        // Créer les expériences professionnelles
        experiences: {
          create: professionalExperiences
            .filter((exp: any) => exp.company && exp.position)
            .map((exp: any) => ({
              company: exp.company,
              position: exp.position,
              duration: exp.duration || "",
              description: exp.description || "",
            })),
        },

        // Créer les projets
        projects: {
          create: projects
            .filter((proj: any) => proj.name && proj.description)
            .map((proj: any) => ({
              name: proj.name,
              description: proj.description,
              technologies: Array.isArray(proj.technologies)
                ? proj.technologies
                : proj.technologies
                ? proj.technologies.split(",").map((t: string) => t.trim())
                : [],
              link: proj.link || null,
            })),
        },

        // Créer les liens sociaux
        socialLinks: {
          create: {
            linkedin: linkedin || null,
            twitter: twitter || null,
            github: github || null,
            website: website || null,
            instagram: instagram || null,
          },
        },

        // Créer les motivations - AVEC TOUS LES 8 CHAMPS
        motivations: {
          create: {
            firstProject: firstProject || null,
            motivation: motivation || null,
            achievement: achievement || null,
            inspiration: inspiration || null,
            learningStyle: learningStyle || null,
            futureGoals: futureGoals || null,
            challenges: challenges || null,
            uniqueValue: uniqueValue || null,
          },
        },

        // Créer les préférences de design - AVEC TOUS LES CHAMPS
        designPreferences: {
          create: {
            // Palette
            paletteId:
              typeof palette === "string"
                ? palette
                : palette?.id || "blue-purple",
            paletteName:
              paletteName ||
              (typeof palette === "object" ? palette?.name : null),

            // Color Codes (Hex format)
            primaryColor:
              typeof palette === "object"
                ? palette.primary
                : palette === "custom"
                ? palette?.primary
                : undefined,
            secondaryColor:
              typeof palette === "object"
                ? palette.secondary
                : palette === "custom"
                ? palette?.secondary
                : undefined,
            accentColor:
              typeof palette === "object"
                ? palette.accent
                : palette === "custom"
                ? palette?.accent
                : undefined,
            backgroundColor: backgroundColor || null,
            textColor: textColor || null,

            // Typography
            typographyId:
              typeof typography === "string"
                ? typography
                : typography?.id || "modern",
            typographyName:
              typographyName ||
              (typeof typography === "object" ? typography?.name : null),

            // Typography Properties
            fontFamily:
              typeof typography === "object"
                ? typography.fontFamily
                : undefined,
            headingSize:
              typeof typography === "object"
                ? typography.headingSize
                : undefined,
            bodySize:
              typeof typography === "object" ? typography.bodySize : undefined,
            headingWeight:
              typeof typography === "object"
                ? typography.headingWeight
                : undefined,
            bodyWeight:
              typeof typography === "object"
                ? typography.bodyWeight
                : undefined,
            letterSpacing: letterSpacing || null,
            lineHeight: lineHeight || null,

            // Custom Typography
            customTypographyUrl: customTypographyUrl || null,
            customTypographyName: customTypographyName || null,
          },
        },
      },
      include: {
        experiences: true,
        projects: true,
        images: true,
        videos: true,
        documents: true,
        socialLinks: true,
        motivations: true,
        designPreferences: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}

// GET /api/portfolio - Récupérer tous les portfolios
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: {
        experiences: true,
        projects: true,
        images: true,
        videos: true,
        documents: true,
        socialLinks: true,
        motivations: true,
        designPreferences: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolios:", error);

    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}
