"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Code,
  Award,
  Briefcase,
  FileText,
  Image as ImageIcon,
  Video,
  Loader,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface Portfolio {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  title: string;
  bio: string;
  skills: string[];
  experience: string;
  status: string;
  experiences: {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link: string;
  }[];
  images: { id: string; name: string; url: string }[];
  videos: { id: string; name: string; url: string }[];
  documents: { id: string; name: string; url: string; type: string }[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
  };
  motivations?: {
    firstProject?: string;
    motivation?: string;
    achievement?: string;
    inspiration?: string;
    learningStyle?: string;
    futureGoals?: string;
    challenges?: string;
    uniqueValue?: string;
  };
  designPreferences?: {
    paletteId?: string;
    paletteName?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
    typographyId?: string;
    typographyName?: string;
    fontFamily?: string;
    headingSize?: string;
    bodySize?: string;
    headingWeight?: string;
    bodyWeight?: string;
    letterSpacing?: string;
    lineHeight?: string;
    customTypographyUrl?: string;
    customTypographyName?: string;
  };
  createdAt: string;
}

// Typographies Prédéfinies
const typographies = [
  {
    id: "modern",
    name: "Moderne",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    fontSizes: { heading: "32px", body: "16px" },
    fontWeights: { heading: 700, body: 400 },
  },
  {
    id: "elegant",
    name: "Élégant",
    fontFamily: "Georgia, serif",
    fontSizes: { heading: "36px", body: "18px" },
    fontWeights: { heading: 700, body: 400 },
  },
  {
    id: "tech",
    name: "Technologique",
    fontFamily: "Courier New, monospace",
    fontSizes: { heading: "28px", body: "14px" },
    fontWeights: { heading: 600, body: 400 },
  },
  {
    id: "playful",
    name: "Ludique",
    fontFamily: "Comic Sans MS, cursive",
    fontSizes: { heading: "34px", body: "16px" },
    fontWeights: { heading: 700, body: 400 },
  },
  {
    id: "custom",
    name: "Personnalisée",
    fontFamily: "sans-serif",
    fontSizes: { heading: "32px", body: "16px" },
    fontWeights: { heading: 700, body: 400 },
  },
];

// Palettes de Couleurs Prédéfinies
const colorPalettes = [
  {
    id: "blue-purple",
    name: "Bleu & Violet",
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    preview: ["#3B82F6", "#8B5CF6", "#06B6D4"],
  },
  {
    id: "ocean",
    name: "Océan",
    primary: "#0284C7",
    secondary: "#06B6D4",
    accent: "#0EA5E9",
    preview: ["#0284C7", "#06B6D4", "#0EA5E9"],
  },
  {
    id: "sunset",
    name: "Coucher de Soleil",
    primary: "#DC2626",
    secondary: "#F97316",
    accent: "#FBBF24",
    preview: ["#DC2626", "#F97316", "#FBBF24"],
  },
  {
    id: "forest",
    name: "Forêt",
    primary: "#059669",
    secondary: "#10B981",
    accent: "#34D399",
    preview: ["#059669", "#10B981", "#34D399"],
  },
  {
    id: "midnight",
    name: "Minuit",
    primary: "#1E293B",
    secondary: "#475569",
    accent: "#94A3B8",
    preview: ["#1E293B", "#475569", "#94A3B8"],
  },
  {
    id: "neon",
    name: "Néon",
    primary: "#EC4899",
    secondary: "#A855F7",
    accent: "#06B6D4",
    preview: ["#EC4899", "#A855F7", "#06B6D4"],
  },
  {
    id: "custom",
    name: "Personnalisée",
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    preview: [],
  },
];

// Composant pour copier le code couleur
function ColorCodeCopy({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 font-mono text-sm text-slate-200 hover:text-cyan-400 transition-colors"
    >
      {color}
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

// Composant pour afficher une couleur avec label
function ColorBox({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-12 h-12 rounded-lg border-2 border-slate-500 shadow-md"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs text-slate-400 font-semibold">{label}</p>
      <ColorCodeCopy color={color} />
    </div>
  );
}

// Fonction pour obtenir la typographie par ID
function getTypographyById(typographyId?: string) {
  if (!typographyId) return null;
  return typographies.find((t) => t.id === typographyId);
}

export default function ClientDetailPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [params.id]);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/portfolio/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Portfolio Data:", data);
        console.log(
          "Custom Typography Name:",
          data.designPreferences?.customTypographyName
        );
        console.log(
          "Custom Typography URL:",
          data.designPreferences?.customTypographyUrl
        );
        setPortfolio(data);
      } else {
        console.error("Portfolio not found");
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 text-center border border-slate-700">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Portfolio Non Trouvé
            </h2>
            <p className="text-slate-400">
              Le portfolio que vous recherchez n'existe pas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = {
    completed: {
      label: "Complété",
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      icon: "✓",
    },
    "in-progress": {
      label: "En Cours",
      bg: "bg-amber-500/20",
      text: "text-amber-400",
      icon: "◐",
    },
    pending: {
      label: "En Attente",
      bg: "bg-slate-500/20",
      text: "text-slate-400",
      icon: "○",
    },
  };

  const currentStatus =
    statusConfig[portfolio.status as keyof typeof statusConfig] ||
    statusConfig.pending;

  // Récupérer la typographie basée sur l'ID
  const selectedTypography = getTypographyById(
    portfolio.designPreferences?.typographyId
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-16 pb-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="relative max-w-6xl mx-auto px-4 md:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Retour au Dashboard
          </button>

          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white">
                  {portfolio.firstName[0]}
                  {portfolio.lastName[0]}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {portfolio.firstName} {portfolio.lastName}
                  </h1>
                  <p className="text-xl text-slate-300 font-semibold">
                    {portfolio.title}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {portfolio.profession}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div
                className={`px-6 py-3 rounded-full font-bold text-sm text-center backdrop-blur-sm border ${currentStatus.bg} ${currentStatus.text} border-slate-600`}
              >
                <span className="mr-2">{currentStatus.icon}</span>
                {currentStatus.label}
              </div>
              {portfolio.experience && (
                <div className="px-4 py-2 bg-slate-700/50 rounded-lg text-slate-300 text-xs font-semibold text-center border border-slate-600">
                  {portfolio.experience.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {portfolio.bio && (
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mt-6">
              {portfolio.bio}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Contact & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">📧 Contact</h2>
            <div className="space-y-3">
              <a
                href={`mailto:${portfolio.email}`}
                className="text-slate-300 hover:text-cyan-400 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                {portfolio.email}
              </a>
              {portfolio.phone && (
                <a
                  href={`tel:${portfolio.phone}`}
                  className="text-slate-300 hover:text-cyan-400 flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {portfolio.phone}
                </a>
              )}
              {portfolio.location && (
                <p className="text-slate-300 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {portfolio.location}
                </p>
              )}
            </div>
          </div>

          {portfolio.socialLinks &&
            Object.values(portfolio.socialLinks).some(Boolean) && (
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  🔗 Réseaux
                </h2>
                <div className="flex flex-wrap gap-3">
                  {portfolio.socialLinks.linkedin && (
                    <a
                      href={portfolio.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all text-blue-400"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {portfolio.socialLinks.github && (
                    <a
                      href={portfolio.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-600/30 hover:bg-slate-600/50 rounded-lg transition-all text-slate-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {portfolio.socialLinks.twitter && (
                    <a
                      href={portfolio.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg transition-all text-sky-400"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {portfolio.socialLinks.website && (
                    <a
                      href={portfolio.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all text-purple-400"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Skills */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              💻 Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Motivations */}
        {portfolio.motivations &&
          Object.values(portfolio.motivations).some(Boolean) && (
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                🎯 Motivations & Succès
              </h2>
              <div className="space-y-4">
                {portfolio.motivations.firstProject && (
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Premier Projet
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.firstProject}
                    </p>
                  </div>
                )}
                {portfolio.motivations.motivation && (
                  <div className="border-l-4 border-amber-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Motivations
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.motivation}
                    </p>
                  </div>
                )}
                {portfolio.motivations.achievement && (
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Plus Grand Succès
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.achievement}
                    </p>
                  </div>
                )}
                {portfolio.motivations.inspiration && (
                  <div className="border-l-4 border-rose-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Inspiration
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.inspiration}
                    </p>
                  </div>
                )}
                {portfolio.motivations.learningStyle && (
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Style d'Apprentissage
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.learningStyle}
                    </p>
                  </div>
                )}
                {portfolio.motivations.futureGoals && (
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Objectifs Futurs
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.futureGoals}
                    </p>
                  </div>
                )}
                {portfolio.motivations.challenges && (
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Défis Relevés
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.challenges}
                    </p>
                  </div>
                )}
                {portfolio.motivations.uniqueValue && (
                  <div className="border-l-4 border-teal-500 pl-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase">
                      Valeur Unique
                    </p>
                    <p className="text-slate-200 mt-1">
                      {portfolio.motivations.uniqueValue}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Design Preferences */}
        {portfolio.designPreferences &&
          Object.values(portfolio.designPreferences).some(Boolean) && (
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                🎨 Préférences de Design
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Palette de Couleurs */}
                {(portfolio.designPreferences.paletteName ||
                  portfolio.designPreferences.primaryColor ||
                  portfolio.designPreferences.secondaryColor ||
                  portfolio.designPreferences.accentColor ||
                  portfolio.designPreferences.backgroundColor ||
                  portfolio.designPreferences.textColor) && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-6">
                      🎨 Palette de Couleurs
                    </h3>
                    <div className="space-y-6">
                      {/* Thème & Aperçu */}
                      {portfolio.designPreferences.paletteName && (
                        <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                          <p className="text-xs text-slate-400 font-bold uppercase mb-4">
                            Thème Sélectionné
                          </p>
                          <p className="text-slate-200 text-2xl font-bold mb-4">
                            {portfolio.designPreferences.paletteName}
                          </p>

                          {/* Afficher les couleurs principales */}
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            {portfolio.designPreferences.primaryColor && (
                              <ColorBox
                                color={portfolio.designPreferences.primaryColor}
                                label="Primaire"
                              />
                            )}
                            {portfolio.designPreferences.secondaryColor && (
                              <ColorBox
                                color={
                                  portfolio.designPreferences.secondaryColor
                                }
                                label="Secondaire"
                              />
                            )}
                            {portfolio.designPreferences.accentColor && (
                              <ColorBox
                                color={portfolio.designPreferences.accentColor}
                                label="Accent"
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Couleurs Additionnelles */}
                      {(portfolio.designPreferences.backgroundColor ||
                        portfolio.designPreferences.textColor) && (
                        <div className="bg-slate-700/20 rounded-lg p-6 border border-slate-600">
                          <p className="text-xs text-slate-400 font-bold uppercase mb-4">
                            Couleurs Additionnelles
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {portfolio.designPreferences.backgroundColor && (
                              <ColorBox
                                color={
                                  portfolio.designPreferences.backgroundColor
                                }
                                label="Fond"
                              />
                            )}
                            {portfolio.designPreferences.textColor && (
                              <ColorBox
                                color={portfolio.designPreferences.textColor}
                                label="Texte"
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Palettes Disponibles */}
                      <div className="bg-slate-700/10 rounded-lg p-4 border border-slate-600">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-3">
                          📋 Palettes Disponibles
                        </p>
                        <div className="space-y-3">
                          {colorPalettes.map((palette) => (
                            <div
                              key={palette.id}
                              className="bg-slate-700/20 rounded-lg p-3 border border-slate-600/50 hover:border-slate-600 transition-all hover:shadow-md"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex gap-1.5">
                                  {palette.preview.map((color, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        navigator.clipboard.writeText(color);
                                      }}
                                      className="w-5 h-5 rounded-md cursor-pointer hover:scale-125 transition-transform hover:shadow-lg"
                                      style={{ backgroundColor: color }}
                                      title={`Clic pour copier ${color}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-slate-300 font-semibold text-sm">
                                  {palette.name}
                                </span>
                              </div>

                              <div className="flex flex-col gap-1.5 text-xs ml-0.5">
                                {palette.primary && (
                                  <ColorCodeCopy color={palette.primary} />
                                )}
                                {palette.secondary && (
                                  <ColorCodeCopy color={palette.secondary} />
                                )}
                                {palette.accent && (
                                  <ColorCodeCopy color={palette.accent} />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Typographie - AFFICHAGE BASÉ SUR L'ID OU PERSONNALISÉE */}
                {selectedTypography ||
                portfolio.designPreferences?.customTypographyName ||
                portfolio.designPreferences?.customTypographyUrl ? (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-6">
                      ✏️ Typographie
                    </h3>
                    <div className="space-y-4">
                      {/* Typographie Prédéfinie */}
                      {selectedTypography && (
                        <>
                          {/* Nom de la typographie */}
                          <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-2">
                              Style de Typographie Prédéfini
                            </p>
                            <p className="text-slate-200 text-2xl font-bold">
                              {selectedTypography.name}
                            </p>
                          </div>

                          {/* Police de Caractères */}
                          <div className="bg-slate-700/20 rounded-lg p-6 border border-slate-600">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-3">
                              Police de Caractères
                            </p>
                            <p
                              className="text-slate-200 text-base leading-relaxed"
                              style={{
                                fontFamily: selectedTypography.fontFamily,
                              }}
                            >
                              {selectedTypography.fontFamily}
                            </p>
                          </div>

                          {/* Aperçu Titres */}
                          <div className="bg-slate-700/20 rounded-lg p-6 border border-slate-600">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-3">
                              Aperçu des Titres
                            </p>
                            <h2
                              className="text-white font-bold mb-4"
                              style={{
                                fontFamily: selectedTypography.fontFamily,
                                fontSize: selectedTypography.fontSizes.heading,
                                fontWeight:
                                  selectedTypography.fontWeights.heading,
                              }}
                            >
                              Ceci est un titre
                            </h2>
                            <p className="text-xs text-slate-400 mt-2">
                              Taille: {selectedTypography.fontSizes.heading} |
                              Poids: {selectedTypography.fontWeights.heading}
                            </p>
                          </div>

                          {/* Aperçu Corps */}
                          <div className="bg-slate-700/20 rounded-lg p-6 border border-slate-600">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-3">
                              Aperçu du Corps de Texte
                            </p>
                            <p
                              className="text-slate-300 leading-relaxed"
                              style={{
                                fontFamily: selectedTypography.fontFamily,
                                fontSize: selectedTypography.fontSizes.body,
                                fontWeight: selectedTypography.fontWeights.body,
                              }}
                            >
                              Ceci est un exemple de texte du corps pour montrer
                              comment le contenu principal sera affiché avec
                              cette typographie.
                            </p>
                            <p className="text-xs text-slate-400 mt-2">
                              Taille: {selectedTypography.fontSizes.body} |
                              Poids: {selectedTypography.fontWeights.body}
                            </p>
                          </div>

                          {/* Tableau des Propriétés */}
                          <div className="bg-slate-700/10 rounded-lg p-4 border border-slate-600">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-4">
                              Propriétés Détaillées
                            </p>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-slate-600">
                                <span className="text-slate-400 text-sm">
                                  Police
                                </span>
                                <span className="text-slate-200 font-mono text-sm">
                                  {selectedTypography.fontFamily}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-slate-600">
                                <span className="text-slate-400 text-sm">
                                  Taille Titre
                                </span>
                                <span className="text-slate-200 font-mono text-sm">
                                  {selectedTypography.fontSizes.heading}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-slate-600">
                                <span className="text-slate-400 text-sm">
                                  Poids Titre
                                </span>
                                <span className="text-slate-200 font-mono text-sm">
                                  {selectedTypography.fontWeights.heading}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-slate-600">
                                <span className="text-slate-400 text-sm">
                                  Taille Corps
                                </span>
                                <span className="text-slate-200 font-mono text-sm">
                                  {selectedTypography.fontSizes.body}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-slate-400 text-sm">
                                  Poids Corps
                                </span>
                                <span className="text-slate-200 font-mono text-sm">
                                  {selectedTypography.fontWeights.body}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Typographie Personnalisée */}
                      {(portfolio.designPreferences?.customTypographyName ||
                        portfolio.designPreferences?.customTypographyUrl) && (
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 border-2 border-purple-500/50">
                          <p className="text-xs text-purple-300 font-bold uppercase mb-4">
                            ⭐ Typographie Personnalisée
                          </p>

                          {portfolio.designPreferences.customTypographyName && (
                            <div className="mb-4">
                              <p className="text-slate-400 text-xs uppercase font-semibold mb-1">
                                Nom de la Police
                              </p>
                              <p className="text-slate-100 text-lg font-bold">
                                {
                                  portfolio.designPreferences
                                    .customTypographyName
                                }
                              </p>
                            </div>
                          )}

                          {portfolio.designPreferences.customTypographyUrl && (
                            <div>
                              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">
                                Lien vers la Police
                              </p>
                              <a
                                href={
                                  portfolio.designPreferences
                                    .customTypographyUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-2 p-3 bg-slate-700/50 rounded transition-all hover:bg-slate-700 border border-cyan-500/30"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Voir la police personnalisée
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

        {/* Experiences */}
        {portfolio.experiences && portfolio.experiences.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              💼 Expériences
            </h2>
            <div className="space-y-6">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-bold text-white">
                    {exp.position}
                  </h3>
                  <p className="text-blue-400 font-semibold">{exp.company}</p>
                  {exp.duration && (
                    <p className="text-slate-400 text-sm mt-1">
                      {exp.duration}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-slate-300 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">🚀 Projets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white flex-1">
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-700 rounded transition-all"
                      >
                        <ExternalLink className="w-5 h-5 text-cyan-400" />
                      </a>
                    )}
                  </div>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media */}
        {(portfolio.images?.length > 0 ||
          portfolio.videos?.length > 0 ||
          portfolio.documents?.length > 0) && (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">📁 Galerie</h2>

            {portfolio.images && portfolio.images.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Images ({portfolio.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolio.images.map((img) => (
                    <a
                      key={img.id}
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square rounded-lg overflow-hidden border border-slate-600 hover:border-slate-500 transition-all hover:scale-105"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {portfolio.videos && portfolio.videos.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Vidéos ({portfolio.videos.length})
                </h3>
                <div className="space-y-2">
                  {portfolio.videos.map((video) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all text-slate-300 hover:text-white"
                    >
                      <Video className="w-5 h-5" />
                      {video.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {portfolio.documents && portfolio.documents.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Documents ({portfolio.documents.length})
                </h3>
                <div className="space-y-2">
                  {portfolio.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all text-slate-300 hover:text-white"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="flex-1">{doc.name}</span>
                      <span className="text-xs text-slate-500">{doc.type}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-16 py-8 text-center text-slate-400 text-sm">
        <p>
          Portfolio créé via{" "}
          <span className="font-semibold text-cyan-400">SCHIZ TECH</span>
        </p>
      </div>
    </div>
  );
}
