"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  User,
  Briefcase,
  Award,
  Lightbulb,
  Star,
  ArrowRight,
  ArrowLeft,
  Zap,
  Check,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Instagram,
  Code,
  Users,
  Target,
  Flame,
  Palette,
  Type,
  Plus,
  X,
  Info,
  AlertCircle,
  Image as ImageIcon,
  Video,
  FileText,
  Trash2,
  DollarSign,
  Loader,
} from "lucide-react";
import Image from "next/image";
import shiztech from "@/public/shiztech.png";

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
interface ImageFile {
  id: number;
  name: string;
  size: number;
  file: File;
}

interface VideoFile {
  id: number;
  name: string;
  size: number;
  file: File;
}

interface DocumentFile {
  id: number;
  name: string;
  size: number;
  type: string;
  file: File;
}

export default function PortfolioForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPalette, setSelectedPalette] = useState("blue-purple");
  const [selectedTypography, setSelectedTypography] = useState("modern");
  const [showModal, setShowModal] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [hasApproved, setHasApproved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [customPalette, setCustomPalette] = useState({
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  });

  const [customTypography, setCustomTypography] = useState({
    fontFamily: "sans-serif",
    headingSize: "32px",
    bodySize: "16px",
    headingWeight: "700",
    bodyWeight: "400",
    letterSpacing: "0.05em",
    lineHeight: "1.6",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
    customProfession: "",
    title: "",
    bio: "",
    skills: "",
    experience: "",
    linkedin: "",
    twitter: "",
    github: "",
    website: "",
    instagram: "",
    firstProject: "",
    motivation: "",
    achievement: "",
    professionalExperiences: [
      { id: 1, company: "", position: "", duration: "", description: "" },
      { id: 2, company: "", position: "", duration: "", description: "" },
    ],
    projects: [
      { id: 1, name: "", description: "", technologies: "", link: "" },
      { id: 2, name: "", description: "", technologies: "", link: "" },
    ],
    images: [],
    videos: [],
    documents: [],
    paletteName: "",
    typographyName: "",
    customTypographyUrl: "",
    customTypographyName: "",
  });

  const totalSteps = 10;

  const steps = [
    { id: 1, title: "Design", icon: Palette },
    { id: 2, title: "Personnel", icon: User },
    { id: 3, title: "Professionnel", icon: Briefcase },
    { id: 4, title: "Expériences", icon: Award },
    { id: 5, title: "Projets", icon: Code },
    { id: 6, title: "Réseaux", icon: Globe },
    { id: 7, title: "Motivations", icon: Lightbulb },
    { id: 8, title: "Succès", icon: Star },
    { id: 9, title: "Médias", icon: ImageIcon },
    { id: 10, title: "Documents", icon: FileText },
  ];

  const professions = [
    "Développeur Web",
    "Designer UX/UI",
    "Data Scientist",
    "Marketing Digital",
    "Gestionnaire de Projet",
    "Graphiste",
    "Entrepreneur",
    "Consultant",
    "Photographe",
    "Rédacteur/Contenu",
    "Chargé de Communication",
    "Analyste Métier",
    "Autre",
  ];

  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio_form_visited");
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem("portfolio_form_visited", "true");
    } else {
      setHasApproved(true);
    }
  }, []);

  const handleApproveModal = () => {
    setHasApproved(true);
    setShowModal(false);
    toast.success("Bienvenue! Commencez à créer votre portfolio 🚀", {
      icon: "🎉",
      duration: 4000,
    });
  };

  const handleRejectModal = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.google.com";
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExperienceChange = (id: any, field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      professionalExperiences: prev.professionalExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleProjectChange = (id: any, field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file: any) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file: file,
    }));

    if (formData.images.length + newImages.length > 10) {
      toast.error("❌ Maximum 10 images autorisées");
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    toast.success(`✅ ${newImages.length} image(s) ajoutée(s) avec succès!`, {
      icon: "📸",
    });
  };

  const handleVideoUpload = (e: any) => {
    const files = Array.from(e.target.files || []);
    const newVideos = files.map((file: any) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file: file,
    }));

    if (formData.videos.length + newVideos.length > 1) {
      toast.error("❌ Maximum 1 vidéo autorisée");
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      videos: [...prev.videos, ...newVideos],
    }));

    toast.success("✅ Vidéo ajoutée avec succès!", {
      icon: "🎥",
    });
  };

  const handleDocumentUpload = (e: any) => {
    const files = Array.from(e.target.files || []);
    const newDocuments = files.map((file: any) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));

    setFormData((prev: any) => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments],
    }));

    toast.success(
      `✅ ${newDocuments.length} document(s) ajouté(s)! (Frais applicables)`,
      {
        icon: "📄",
      }
    );
  };

  const removeImage = (id: any) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img: any) => img.id !== id),
    }));
    toast.success("Image supprimée");
  };

  const removeVideo = (id: any) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((vid: any) => vid.id !== id),
    }));
    toast.success("Vidéo supprimée");
  };

  const removeDocument = (id: any) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((doc: any) => doc.id !== id),
    }));
    toast.success("Document supprimé");
  };

  const handleNextStep = (e: any) => {
    e.preventDefault();
    setSubmitError("");

    if (currentStep === 1) {
      toast.success(`Étape 1/10 ✓ - Design configuré!`, {
        icon: "🎨",
      });
    } else if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setSubmitError("Veuillez remplir tous les champs obligatoires");
        toast.error("❌ Veuillez remplir tous les champs obligatoires");
        return;
      }
      toast.success(`Étape 2/10 ✓ - Infos personnelles sauvegardées!`, {
        icon: "👤",
      });
    } else if (currentStep === 3) {
      const isValidProfession =
        formData.profession && formData.profession !== "Autre";
      const isCustomAndFilled =
        formData.profession === "Autre" && formData.customProfession.trim();

      if (!isValidProfession && !isCustomAndFilled) {
        setSubmitError(
          "Veuillez sélectionner une profession ou spécifier la vôtre"
        );
        toast.error(
          "❌ Veuillez sélectionner une profession ou spécifier la vôtre"
        );
        return;
      }

      if (!formData.title || !formData.experience) {
        setSubmitError("Veuillez remplir tous les champs obligatoires");
        toast.error("❌ Veuillez remplir tous les champs obligatoires");
        return;
      }
      toast.success(`Étape 3/10 ✓ - Détails professionnels sauvegardés!`, {
        icon: "💼",
      });
    } else if (currentStep === 4) {
      if (
        !formData.professionalExperiences[0].company ||
        !formData.professionalExperiences[0].position
      ) {
        setSubmitError("Veuillez remplir au moins la première expérience");
        toast.error("❌ Veuillez remplir au moins la première expérience");
        return;
      }
      toast.success(`Étape 4/10 ✓ - Expériences sauvegardées!`, {
        icon: "🏆",
      });
    } else if (currentStep === 5) {
      if (!formData.projects[0].name || !formData.projects[0].description) {
        setSubmitError("Veuillez remplir au moins le premier projet");
        toast.error("❌ Veuillez remplir au moins le premier projet");
        return;
      }
      toast.success(`Étape 5/10 ✓ - Projets sauvegardés!`, {
        icon: "🚀",
      });
    } else if (currentStep === 6) {
      if (
        !formData.linkedin &&
        !formData.twitter &&
        !formData.github &&
        !formData.website &&
        !formData.instagram
      ) {
        setSubmitError("Veuillez ajouter au moins un lien de réseau social");
        toast.error("❌ Veuillez ajouter au moins un lien de réseau social");
        return;
      }
      toast.success(`Étape 6/10 ✓ - Réseaux sociaux sauvegardés!`, {
        icon: "🔗",
      });
    } else if (currentStep === 7) {
      if (!formData.firstProject) {
        setSubmitError("Veuillez répondre à la question");
        toast.error("❌ Veuillez répondre à la question");
        return;
      }
      toast.success(`Étape 7/10 ✓ - Motivations sauvegardées!`, {
        icon: "💡",
      });
    } else if (currentStep === 8) {
      if (!formData.achievement) {
        setSubmitError("Veuillez répondre à la question");
        toast.error("❌ Veuillez répondre à la question");
        return;
      }
      toast.success(`Étape 8/10 ✓ - Succès sauvegardés!`, {
        icon: "⭐",
      });
    } else if (currentStep === 9) {
      toast.success(`Étape 9/10 ✓ - Médias configurés!`, {
        icon: "📸",
      });
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("↩️ Retour à l'étape précédente");
    }
  };

  const uploadFiles = async (userId: string) => {
    try {
      let uploadedCount = 0;

      for (const image of formData.images as ImageFile[]) {
        if (image.file) {
          const formDataFile = new FormData();
          formDataFile.append("file", image.file);

          const response = await fetch(`/api/users/${userId}/upload/images`, {
            method: "POST",
            body: formDataFile,
          });

          if (!response.ok) {
            throw new Error("Erreur upload image");
          }
          uploadedCount++;
        }
      }

      for (const video of formData.videos as VideoFile[]) {
        if (video.file) {
          const formDataFile = new FormData();
          formDataFile.append("file", video.file);

          const response = await fetch(`/api/users/${userId}/upload/videos`, {
            method: "POST",
            body: formDataFile,
          });

          if (!response.ok) {
            throw new Error("Erreur upload vidéo");
          }
          uploadedCount++;
        }
      }

      for (const doc of formData.documents as DocumentFile[]) {
        if (doc.file) {
          const formDataFile = new FormData();
          formDataFile.append("file", doc.file);

          const response = await fetch(
            `/api/users/${userId}/upload/documents`,
            {
              method: "POST",
              body: formDataFile,
            }
          );

          if (!response.ok) {
            throw new Error("Erreur upload document");
          }
          uploadedCount++;
        }
      }

      if (uploadedCount > 0) {
        toast.success(`✅ ${uploadedCount} fichier(s) uploadé(s)!`, {
          icon: "📤",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'upload des fichiers:", error);
      toast.error("❌ Erreur lors de l'upload des fichiers");
      throw error;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const loadingToast = toast.loading("⏳ Création de votre portfolio...");

    try {
      const finalProfession =
        formData.profession === "Autre"
          ? formData.customProfession
          : formData.profession;

      const portfolioData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        profession: finalProfession,
        title: formData.title,
        bio: formData.bio,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        experience: formData.experience,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github,
        website: formData.website,
        instagram: formData.instagram,
        firstProject: formData.firstProject,
        motivation: formData.motivation,
        achievement: formData.achievement,
        professionalExperiences: formData.professionalExperiences.filter(
          (exp) => exp.company && exp.position
        ),
        projects: formData.projects.filter(
          (proj) => proj.name && proj.description
        ),
        palette: selectedPalette === "custom" ? customPalette : selectedPalette,
        paletteName: formData.paletteName || selectedPalette,
        backgroundColor: customPalette.backgroundColor,
        textColor: customPalette.textColor,
        typography:
          selectedTypography === "custom"
            ? customTypography
            : selectedTypography,
        typographyName: formData.typographyName,
        letterSpacing: customTypography.letterSpacing,
        lineHeight: customTypography.lineHeight,
        customTypographyUrl: formData.customTypographyUrl,
        customTypographyName: formData.customTypographyName,
      };

      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur création portfolio");
      }

      const result = await response.json();
      const userId = result.user.id;

      toast.loading("📤 Upload des fichiers en cours...");

      await uploadFiles(userId);

      toast.dismiss();
      toast.success("🎉Données reçu notre equipe créera votre porfolio!", {
        duration: 5000,
        icon: "✨",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erreur:", error);
      toast.dismiss(loadingToast);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du portfolio";

      setSubmitError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (IconComponent: any) => {
    return <IconComponent className="w-5 h-5 md:w-6 md:h-6" />;
  };

  if (!hasApproved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f0f4f8]">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            },
            success: {
              duration: 4000,
              style: {
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#10B981",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#EF4444",
              },
            },
            loading: {
              style: {
                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
              },
            },
          }}
        />

        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
            showModal ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
        />

        <div
          className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-300 ${
            showModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-3 rounded-full">
                  <AlertCircle className="w-8 h-8 text-[#3B82F6]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Attention!</h2>
            </div>

            <div className="p-6 sm:p-8">
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-lg font-semibold">
                  Accès Réservé - Paiement Requis
                </p>

                <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FCD34D] rounded-xl p-4 border-2 border-[#F59E0B]">
                  <p className="text-[#1F2937] font-bold text-base">
                    Ce lien est réservé à ceux qui ont payé{" "}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ Accès complet au formulaire de portfolio</p>
                  <p>✓ Personnalisation avancée</p>
                  <p className="text-[#DC2626] font-semibold">
                    ⚠️ Informations supplémentaires = Frais additionnels
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8 flex-col-reverse sm:flex-row">
                <button
                  onClick={handleRejectModal}
                  className="flex-1 py-3 px-4 rounded-lg font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                >
                  Quitter
                </button>
                <button
                  onClick={handleApproveModal}
                  className="flex-1 py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:shadow-lg transition-all active:scale-95"
                >
                  J&apos;accepte
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                En continuant, vous acceptez les conditions d&apos;accès
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f0f4f8] font-sans overflow-hidden">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          },
          success: {
            duration: 4000,
            style: {
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EF4444",
            },
          },
          loading: {
            style: {
              background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
            },
          },
        }}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes tooltip-pop {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-tooltip-pop {
          animation: tooltip-pop 0.3s ease-out;
        }

        input,
        textarea,
        select {
          font-size: 16px !important;
          font-size: 1rem !important;
        }

        .overflow-x-auto {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f3f4f6;
        }

        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: linear-gradient(
            90deg,
            transparent 0%,
            #f3f4f6 50%,
            transparent 100%
          );
          border-radius: 10px;
          margin: 0 12px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(
            90deg,
            #3b82f6 0%,
            #8b5cf6 50%,
            #06b6d4 100%
          );
          border-radius: 10px;
          border: 2px solid #f3f4f6;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            90deg,
            #2563eb 0%,
            #7c3aed 50%,
            #0891b2 100%
          );
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }

        * {
          transition: all 0.2s ease-in-out;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-30">
        <div className="relative">
          {showInfoTooltip && (
            <div className="absolute bottom-full right-0 mb-3 animate-tooltip-pop">
              <div className="bg-[#1F2937] text-white rounded-lg p-4 w-64 shadow-xl border-l-4 border-[#3B82F6]">
                <p className="text-sm font-semibold mb-2">
                  📌 Information Importante
                </p>
                <p className="text-xs leading-relaxed">
                  Pour toute information complémentaire ajouté dans la section
                  documents, des frais additionnels seront appliqués.
                </p>
              </div>
              <div className="absolute -bottom-1 right-4 w-3 h-3 bg-[#1F2937] transform rotate-45"></div>
            </div>
          )}

          <button
            onClick={() => setShowInfoTooltip(!showInfoTooltip)}
            className="bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
            title="Informations importantes"
          >
            <Info className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#DC2626] rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              !
            </span>
          </button>
        </div>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#06B6D4] rounded-full mix-blend-multiply filter blur-3xl opacity-3 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-3 sm:p-4 md:p-6 py-8 md:py-12">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-white flex items-center justify-center shadow-lg">
              <Image
                src={shiztech}
                alt="Schiz Tech Logo"
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                priority
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#1F2937] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent tracking-tight">
              SCHIZ TECH
            </h2>
          </div>

          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1F2937] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent mb-2 tracking-tight">
              CRÉEZ VOTRE PORTFOLIO
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
              Étape {currentStep} de {totalSteps}
            </p>
          </div>

          <div className="mb-6 md:mb-10">
            <div className="flex justify-between items-center mb-4 md:hidden">
              <div className="flex gap-1 flex-1">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`h-1 rounded-full transition-all flex-1 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="overflow-x-auto md:overflow-x-visible -mx-3 sm:-mx-4 md:mx-0 px-3 sm:px-4 md:px-0 scroll-smooth">
              <div className="flex justify-between items-start md:items-center gap-4 md:gap-2 relative min-w-max md:min-w-0">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative min-w-max md:min-w-0 flex-1 md:flex-none"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 md:mb-3 transition-all duration-300 font-semibold shadow-md flex-shrink-0 ${
                        currentStep >= step.id
                          ? "bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white scale-110"
                          : currentStep === step.id - 1
                          ? "bg-white border-2 border-[#3B82F6] text-[#3B82F6]"
                          : "bg-gray-100 border-2 border-gray-300 text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check size={18} className="md:w-6 md:h-6" />
                      ) : (
                        getStepIcon(step.icon)
                      )}
                    </div>

                    <span
                      className={`text-xs sm:text-sm font-semibold text-center transition-all whitespace-nowrap ${
                        currentStep === step.id
                          ? "text-[#3B82F6]"
                          : currentStep > step.id
                          ? "text-[#8B5CF6]"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>

                    {index < steps.length - 1 && (
                      <div
                        className={`hidden md:block absolute h-1 transition-all ${
                          currentStep > step.id
                            ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"
                            : "bg-gray-300"
                        }`}
                        style={{
                          width: "calc(100% - 0.5rem)",
                          top: "1.75rem",
                          left: "50%",
                          zIndex: -1,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-2 md:hidden">
              <div className="text-xs text-gray-400 font-medium">
                ← Glissez pour voir plus →
              </div>
            </div>
          </div>

          <form
            onSubmit={
              currentStep === totalSteps ? handleSubmit : handleNextStep
            }
            className="space-y-4 md:space-y-6 bg-white bg-opacity-95 backdrop-blur-md border border-gray-200 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl"
          >
            {submitError && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold text-sm">
                  {submitError}
                </p>
              </div>
            )}

            {/* STEP 1: DESIGN */}
            {currentStep === 1 && (
              <div className="space-y-6 md:space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                    <Palette className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                    Choisissez votre Palette de Couleurs
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-6">
                    Sélectionnez un style prédéfini ou créez votre propre
                    palette avec codes couleur
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {colorPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => {
                        setSelectedPalette(palette.id);
                        if (palette.id !== "custom") {
                          setCustomPalette({
                            primary: palette.primary,
                            secondary: palette.secondary,
                            accent: palette.accent,
                            backgroundColor: "#FFFFFF",
                            textColor: "#000000",
                          });
                          toast.success(
                            `✅ Palette "${palette.name}" sélectionnée!`
                          );
                        }
                      }}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 ${
                        selectedPalette === palette.id
                          ? "border-[#3B82F6] shadow-lg ring-2 ring-[#3B82F6] ring-offset-2"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {palette.preview.length > 0 ? (
                        <div className="flex gap-1 sm:gap-1.5 mb-2">
                          {palette.preview.map((color, idx) => (
                            <div
                              key={idx}
                              className="flex-1 h-8 sm:h-10 rounded-lg shadow-md"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-1 sm:gap-1.5 mb-2">
                          <div
                            className="flex-1 h-8 sm:h-10 rounded-lg shadow-md"
                            style={{ backgroundColor: customPalette.primary }}
                          />
                          <div
                            className="flex-1 h-8 sm:h-10 rounded-lg shadow-md"
                            style={{ backgroundColor: customPalette.secondary }}
                          />
                          <div
                            className="flex-1 h-8 sm:h-10 rounded-lg shadow-md"
                            style={{ backgroundColor: customPalette.accent }}
                          />
                        </div>
                      )}
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">
                        {palette.name}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedPalette === "custom" && (
                  <div className="mt-6 p-4 sm:p-6 bg-white from-[#3B82F6] from-opacity-10 to-[#8B5CF6] to-opacity-10 border-2 border-[#3B82F6] border-opacity-30 rounded-xl">
                    <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                      <Palette className="w-4 h-4 md:w-5 md:h-5" />
                      Personnalisez votre Palette (5 Couleurs)
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-4">
                      Entrez vos codes couleur au format hexadécimal (ex:
                      #3B82F6)
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Couleur Principale *
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customPalette.primary}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                primary: e.target.value,
                              })
                            }
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg cursor-pointer border-2 border-gray-200"
                          />
                          <input
                            type="text"
                            value={customPalette.primary}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                primary: e.target.value,
                              })
                            }
                            placeholder="#3B82F6"
                            className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm font-mono text-base"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Couleur Secondaire *
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customPalette.secondary}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                secondary: e.target.value,
                              })
                            }
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg cursor-pointer border-2 border-gray-200"
                          />
                          <input
                            type="text"
                            value={customPalette.secondary}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                secondary: e.target.value,
                              })
                            }
                            placeholder="#8B5CF6"
                            className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm font-mono text-base"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Couleur d&apos;Accent *
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customPalette.accent}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                accent: e.target.value,
                              })
                            }
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg cursor-pointer border-2 border-gray-200"
                          />
                          <input
                            type="text"
                            value={customPalette.accent}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                accent: e.target.value,
                              })
                            }
                            placeholder="#06B6D4"
                            className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm font-mono text-base"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Couleur de Fond (Optionnel)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customPalette.backgroundColor}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                backgroundColor: e.target.value,
                              })
                            }
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg cursor-pointer border-2 border-gray-200"
                          />
                          <input
                            type="text"
                            value={customPalette.backgroundColor}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                backgroundColor: e.target.value,
                              })
                            }
                            placeholder="#FFFFFF"
                            className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm font-mono text-base"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Couleur du Texte (Optionnel)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customPalette.textColor}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                textColor: e.target.value,
                              })
                            }
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg cursor-pointer border-2 border-gray-200"
                          />
                          <input
                            type="text"
                            value={customPalette.textColor}
                            onChange={(e) =>
                              setCustomPalette({
                                ...customPalette,
                                textColor: e.target.value,
                              })
                            }
                            placeholder="#000000"
                            className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm font-mono text-base"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                        Nom de votre Palette (Optionnel)
                      </label>
                      <input
                        type="text"
                        value={formData.paletteName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paletteName: e.target.value,
                          })
                        }
                        placeholder="Ex: Ma Palette Personnalisée"
                        className="w-full px-3 sm:px-4 py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm text-base"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                    <Type className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                    Choisissez votre Typographie
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-6">
                    Sélectionnez un style ou créez votre propre typographie (7
                    propriétés)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {typographies.map((typo) => (
                    <button
                      key={typo.id}
                      type="button"
                      onClick={() => {
                        setSelectedTypography(typo.id);
                        if (typo.id !== "custom") {
                          setCustomTypography({
                            fontFamily: typo.fontFamily,
                            headingSize: typo.fontSizes.heading,
                            bodySize: typo.fontSizes.body,
                            headingWeight: String(typo.fontWeights.heading),
                            bodyWeight: String(typo.fontWeights.body),
                            letterSpacing: "0.05em",
                            lineHeight: "1.6",
                          });
                          toast.success(
                            `✅ Typographie "${typo.name}" sélectionnée!`
                          );
                        }
                      }}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 text-left ${
                        selectedTypography === typo.id
                          ? "border-[#3B82F6] shadow-lg ring-2 ring-[#3B82F6] ring-offset-2"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ fontFamily: typo.fontFamily }}
                    >
                      <p
                        className="font-bold mb-2 text-gray-900"
                        style={{
                          fontSize: typo.fontSizes.heading,
                          fontWeight: typo.fontWeights.heading,
                        }}
                      >
                        Preview
                      </p>
                      <p
                        className="text-gray-700"
                        style={{
                          fontSize: typo.fontSizes.body,
                          fontWeight: typo.fontWeights.body,
                        }}
                      >
                        {typo.name}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedTypography === "custom" && (
                  <div className="mt-6 p-4 sm:p-6 bg-white from-[#3B82F6] from-opacity-10 to-[#8B5CF6] to-opacity-10 border-2 border-[#3B82F6] border-opacity-30 rounded-xl">
                    <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                      <Type className="w-4 h-4 md:w-5 md:h-5" />
                      Personnalisez votre Typographie (7 Propriétés)
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Police de Caractères
                        </label>
                        <select
                          value={customTypography.fontFamily}
                          onChange={(e) =>
                            setCustomTypography({
                              ...customTypography,
                              fontFamily: e.target.value,
                            })
                          }
                          className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] text-base"
                        >
                          <option value="sans-serif">Sans Serif</option>
                          <option value="serif">Serif</option>
                          <option value="monospace">Monospace</option>
                          <option value="cursive">Cursive</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Taille Titre (px)
                          </label>
                          <input
                            type="number"
                            value={parseInt(customTypography.headingSize)}
                            onChange={(e) =>
                              setCustomTypography({
                                ...customTypography,
                                headingSize: e.target.value + "px",
                              })
                            }
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Taille Corps (px)
                          </label>
                          <input
                            type="number"
                            value={parseInt(customTypography.bodySize)}
                            onChange={(e) =>
                              setCustomTypography({
                                ...customTypography,
                                bodySize: e.target.value + "px",
                              })
                            }
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] text-base"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Poids Titre
                          </label>
                          <select
                            value={customTypography.headingWeight}
                            onChange={(e) =>
                              setCustomTypography({
                                ...customTypography,
                                headingWeight: e.target.value,
                              })
                            }
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] text-base"
                          >
                            <option value="400">Normal</option>
                            <option value="600">Semi-bold</option>
                            <option value="700">Bold</option>
                            <option value="800">Extra Bold</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Poids Corps
                          </label>
                          <select
                            value={customTypography.bodyWeight}
                            onChange={(e) =>
                              setCustomTypography({
                                ...customTypography,
                                bodyWeight: e.target.value,
                              })
                            }
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] text-base"
                          >
                            <option value="300">Light</option>
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi-bold</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Espacement Lettres (em)
                          </label>
                          <input
                            type="text"
                            value={customTypography.letterSpacing}
                            onChange={(e) =>
                              setCustomTypography({
                                ...customTypography,
                                letterSpacing: e.target.value,
                              })
                            }
                            placeholder="0.05"
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Hauteur Ligne
                          </label>
                          <input
                            type="text"
                            value={customTypography.lineHeight}
                            onChange={(e) =>
                              setCustomTypography({
                                ...customTypography,
                                lineHeight: e.target.value,
                              })
                            }
                            placeholder="1.6"
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] text-base"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-300 pt-4">
                        <h5 className="text-[#1F2937] text-xs sm:text-sm font-bold mb-3">
                          Typographie Personnalisée (Optionnel)
                        </h5>

                        <div className="mb-3">
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Lien vers votre Typographie (URL)
                          </label>
                          <input
                            type="url"
                            placeholder="https://fonts.google.com/specimen/Roboto"
                            value={formData.customTypographyUrl}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customTypographyUrl: e.target.value,
                              })
                            }
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] text-base"
                          />
                        </div>

                        <div>
                          <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                            Nom/Description
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Roboto Google Fonts, Poppins Bold..."
                            value={formData.customTypographyName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customTypographyName: e.target.value,
                              })
                            }
                            className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] text-base"
                          />
                        </div>
                      </div>

                      <div className="mt-4 p-3 sm:p-4 bg-white border-2 border-gray-200 rounded-lg">
                        <p
                          className="font-bold mb-2 text-gray-900"
                          style={{
                            fontFamily: customTypography.fontFamily,
                            fontSize: customTypography.headingSize,
                            fontWeight: customTypography.headingWeight,
                            letterSpacing: customTypography.letterSpacing,
                            lineHeight: customTypography.lineHeight,
                          }}
                        >
                          Aperçu Titre
                        </p>
                        <p
                          className="text-gray-700"
                          style={{
                            fontFamily: customTypography.fontFamily,
                            fontSize: customTypography.bodySize,
                            fontWeight: customTypography.bodyWeight,
                            letterSpacing: customTypography.letterSpacing,
                            lineHeight: customTypography.lineHeight,
                          }}
                        >
                          Aperçu du texte de votre portfolio avec votre
                          typographie personnalisée
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Nom de votre Typographie (Optionnel)
                        </label>
                        <input
                          type="text"
                          value={formData.typographyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              typographyName: e.target.value,
                            })
                          }
                          placeholder="Ex: Ma Typographie Professionnelle"
                          className="w-full px-3 sm:px-4 py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Personal Info */}
            {currentStep === 2 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                  Informations Personnelles
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Votre prénom"
                      className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+225 XX XX XX XX"
                      className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Localisation
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Abidjan, Côte d'Ivoire"
                      className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Professional Details */}
            {currentStep === 3 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                  <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                  Détails Professionnels
                </h3>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide">
                    Profession *
                  </label>
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                    required
                  >
                    <option value="">Sélectionnez votre profession</option>
                    {professions.map((prof) => (
                      <option key={prof} value={prof}>
                        {prof}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.profession === "Autre" && (
                  <div className="p-4 sm:p-6 bg-gradient-to-br from-[#3B82F6] from-opacity-10 to-[#8B5CF6] to-opacity-10 border-2 border-[#3B82F6] border-opacity-30 rounded-xl">
                    <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Veuillez spécifier votre profession *
                    </label>
                    <input
                      type="text"
                      name="customProfession"
                      value={formData.customProfession}
                      onChange={handleInputChange}
                      placeholder="Ex: Expert en IA, Développeur Full Stack, etc..."
                      className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide">
                    Titre Professionnel *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Lead Developer, Senior Designer, Expert Marketing..."
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide">
                    Biographie
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Parlez-nous de vous, vos passions et vos objectifs..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all resize-none text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide">
                    Compétences (séparées par des virgules) *
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="Ex: React, Communication, Gestion de projet, Design..."
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Niveau d&apos;Expérience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                    required
                  >
                    <option value="">Sélectionnez un niveau</option>
                    <option value="junior">Débutant (0-2 ans)</option>
                    <option value="intermediate">
                      Intermédiaire (2-5 ans)
                    </option>
                    <option value="advanced">Avancé (5-10 ans)</option>
                    <option value="expert">Expert (10+ ans)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: Experiences */}
            {currentStep === 4 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                    Expériences Professionnelles
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-6">
                    Ajoutez jusqu&apos;à 2 expériences professionnelles
                  </p>
                </div>

                {formData.professionalExperiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-gray-200 rounded-xl"
                  >
                    <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                      <Code className="w-4 h-4 md:w-5 md:h-5" />
                      Expérience {index + 1}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Entreprise {index === 0 ? "*" : ""}
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleExperienceChange(
                              exp.id,
                              "company",
                              e.target.value
                            )
                          }
                          placeholder="Nom de l'entreprise"
                          className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                          required={index === 0}
                        />
                      </div>

                      <div>
                        <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                          Poste {index === 0 ? "*" : ""}
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) =>
                            handleExperienceChange(
                              exp.id,
                              "position",
                              e.target.value
                            )
                          }
                          placeholder="Titre du poste"
                          className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                          required={index === 0}
                        />
                      </div>
                    </div>

                    <div className="mt-3 md:mt-4">
                      <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                        Durée (ex: Jan 2020 - Déc 2022)
                      </label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="Jan 2020 - Déc 2022"
                        className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                      />
                    </div>

                    <div className="mt-3 md:mt-4">
                      <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                        Description
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Décrivez vos responsabilités et réalisations..."
                        rows={3}
                        className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all resize-none text-base"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 5: Projects */}
            {currentStep === 5 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                    <Code className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                    Projets Réalisés
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-6">
                    Présentez jusqu&apos;à 2 projets que vous êtes fier
                    d&apos;avoir réalisés
                  </p>
                </div>

                {formData.projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-cyan-50 border-2 border-gray-200 rounded-xl"
                  >
                    <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#3B82F6]" />
                      Projet {index + 1}
                    </h4>

                    <div>
                      <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                        Nom du Projet {index === 0 ? "*" : ""}
                      </label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          handleProjectChange(
                            project.id,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Titre du projet"
                        className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                        required={index === 0}
                      />
                    </div>

                    <div className="mt-3 md:mt-4">
                      <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                        Description {index === 0 ? "*" : ""}
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            project.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Décrivez votre projet, les défis relevés et les résultats..."
                        rows={4}
                        className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all resize-none text-base"
                        required={index === 0}
                      />
                    </div>

                    <div className="mt-3 md:mt-4">
                      <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2">
                        Technologies/Outils Utilisés
                      </label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) =>
                          handleProjectChange(
                            project.id,
                            "technologies",
                            e.target.value
                          )
                        }
                        placeholder="Ex: React, Node.js, MongoDB..."
                        className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                      />
                    </div>

                    <div className="mt-3 md:mt-4">
                      <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Lien du Projet
                      </label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) =>
                          handleProjectChange(
                            project.id,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 6: Social Networks */}
            {currentStep === 6 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                    Vos Réseaux Sociaux
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4">
                    Ajoutez au moins un lien de réseau social ou site web
                  </p>
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourname"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/yourname"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/yourname"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Site Web / Portfolio
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://votresite.com"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base"
                  />
                </div>
              </div>
            )}

            {/* STEP 7: Motivations */}
            {currentStep === 7 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                  <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                  Vos Motivations
                </h3>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    Quel a été votre premier projet/travail? *
                  </label>
                  <textarea
                    name="firstProject"
                    value={formData.firstProject}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre premier projet ou travail et ce que vous en avez appris..."
                    rows={5}
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all resize-none text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Qu&apos;est-ce qui vous motive dans votre domaine?
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Partagez ce qui anime votre passion et vos objectifs professionnels..."
                    rows={5}
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all resize-none text-base"
                  />
                </div>
              </div>
            )}

            {/* STEP 8: Achievements */}
            {currentStep === 8 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                  Votre Plus Grand Succès
                </h3>

                <div>
                  <label className="block text-[#1F2937] text-xs sm:text-sm font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Quel est votre plus grand accomplissement? *
                  </label>
                  <textarea
                    name="achievement"
                    value={formData.achievement}
                    onChange={handleInputChange}
                    placeholder="Parlez-nous de votre plus grand succès professionnel ou personnel..."
                    rows={6}
                    className="w-full px-3 sm:px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all resize-none text-base"
                    required
                  />
                </div>

                <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-br from-[#10B981] from-opacity-10 to-[#06B6D4] to-opacity-10 border-2 border-[#10B981] border-opacity-30 rounded-xl">
                  <p className="text-[#1F2937] text-xs sm:text-sm font-medium flex items-start gap-2">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Félicitations!</strong> Vous avez presque terminé.
                      Vérifiez vos informations une dernière fois avant de
                      soumettre votre portfolio.
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* STEP 9: Media */}
            {currentStep === 9 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                    <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                    Ajoutez vos Médias
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-6">
                    Ajoutez jusqu&apos;à 10 images et 1 vidéo (tous les champs
                    sont facultatifs)
                  </p>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-gray-200 rounded-xl">
                  <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
                    Images ({formData.images.length}/10)
                  </h4>

                  <label className="block mb-4">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={formData.images.length >= 10}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#3B82F6] hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">
                        Cliquez pour ajouter des images
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum 10 images (JPG, PNG, WebP)
                      </p>
                    </div>
                  </label>

                  {formData.images.length > 0 && (
                    <div className="space-y-2">
                      {formData.images.map((image: any) => (
                        <div
                          key={image.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <ImageIcon className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {image.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(image.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-gray-200 rounded-xl">
                  <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                    <Video className="w-4 h-4 md:w-5 md:h-5" />
                    Vidéo ({formData.videos.length}/1)
                  </h4>

                  <label className="block mb-4">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={formData.videos.length >= 1}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#8B5CF6] hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">
                        Cliquez pour ajouter une vidéo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum 1 vidéo (MP4, WebM, AVI)
                      </p>
                    </div>
                  </label>

                  {formData.videos.length > 0 && (
                    <div className="space-y-2">
                      {formData.videos.map((video: any) => (
                        <div
                          key={video.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Video className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {video.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(video.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVideo(video.id)}
                            className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 10: Documents */}
            {currentStep === 10 && (
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-[#1F2937] font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                    Documents Additionnels
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-6">
                    Ajoutez des documents Word, PDF, ou vidéos additionnels
                    (tous les champs sont facultatifs)
                  </p>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-br from-[#FEE2E2] to-[#FEE2E2] border-2 border-[#DC2626] rounded-xl">
                  <div className="flex gap-3">
                    <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-2">
                        ⚠️ Attention à la Facturation
                      </h4>
                      <p className="text-[#1F2937] text-xs sm:text-sm font-medium">
                        Tous les documents additionnels, vidéos additionnelles,
                        ou ajouts au-delà du forfait initial (10 images + 1
                        vidéo) seront <strong>facturés séparément</strong>.
                      </p>
                      <p className="text-[#DC2626] text-xs sm:text-sm font-semibold mt-2">
                        Contactez-nous pour connaître les tarifs additionnels.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-gray-200 rounded-xl">
                  <h4 className="text-[#1F2937] font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 md:w-5 md:h-5" />
                    Documents ({formData.documents.length})
                  </h4>

                  <label className="block mb-4">
                    <input
                      type="file"
                      multiple
                      accept=".doc,.docx,.pdf,.mp4,.webm,.avi,.mov"
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#06B6D4] hover:bg-cyan-50 transition-all">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">
                        Cliquez pour ajouter des documents
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Word, PDF, ou vidéos supplémentaires (frais applicables)
                      </p>
                    </div>
                  </label>

                  {formData.documents.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#DC2626] mb-3">
                        ⚠️ Les documents ci-dessous seront facturés
                      </p>
                      {formData.documents.map((doc: any) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#DC2626] border-opacity-30"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText className="w-4 h-4 text-[#06B6D4] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {doc.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(doc.size / 1024 / 1024).toFixed(2)} MB -{" "}
                                {doc.type || "Unknown type"}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(doc.id)}
                            className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all text-base ${
                  currentStep === 1
                    ? "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:shadow-lg active:scale-95"
                }`}
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">Retour</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all uppercase tracking-wider text-base ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] text-white hover:shadow-lg hover:scale-105 active:scale-95"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Création...</span>
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    <span className="hidden sm:inline">Créer Portfolio</span>
                    <span className="sm:hidden">Créer</span>
                    <Zap size={18} />
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Suivant</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 md:mt-6 h-2 bg-gray-200 rounded-full overflow-hidden shadow-sm">
            <div
              className="h-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
