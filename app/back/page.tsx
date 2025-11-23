"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Users,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Briefcase,
  Code,
  Award,
  Loader,
} from "lucide-react";
import toast from "react-hot-toast";

interface Portfolio {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  experiences: any[];
  projects: any[];
  images: any[];
  videos: any[];
  documents: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);

  useEffect(() => {
    // Check authentication on mount
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchPortfolios();
    } else {
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  const fetchPortfolios = async () => {
    try {
      setIsLoadingPortfolios(true);

      const response = await fetch("/api/portfolio");
      console.log("Response status:", response.status);

      // Vérifiez d'abord si la réponse est OK
      if (!response.ok) {
        // Essayez de récupérer le message d'erreur du serveur
        let errorMessage = `Erreur: ${response.status} ${response.statusText}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error("Could not parse error response:", parseError);
        }

        console.error("Failed to fetch portfolios:", errorMessage);
        toast.error(`❌ ${errorMessage}`, { duration: 5000 });
        return;
      }

      // Parsez les données si la réponse est OK
      const data = await response.json();
      setPortfolios(data);
      console.log("Portfolios fetched successfully:", data);
    } catch (error) {
      // Capturez les erreurs réseau ou parsing
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur inconnue lors de la récupération";

      console.error("Error fetching portfolios:", errorMessage);
      toast.error(`❌ ${errorMessage}`, { duration: 5000 });
    } finally {
      setIsLoadingPortfolios(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/");
  };

  const filteredPortfolios = portfolios.filter(
    (portfolio) =>
      portfolio.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            <CheckCircle className="w-3 h-3" />
            Complété
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            <Clock className="w-3 h-3" />
            En Cours
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
            <AlertCircle className="w-3 h-3" />
            En Attente
          </span>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: portfolios.length,
    completed: portfolios.filter((p) => p.status === "completed").length,
    inProgress: portfolios.filter((p) => p.status === "in-progress").length,
    pending: portfolios.filter((p) => p.status === "pending").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f0f4f8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Tableau de Bord Admin
              </h1>
              <p className="text-white text-opacity-90 text-sm mt-1">
                Gestion des portfolios clients
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white text-[#3B82F6] rounded-lg font-bold hover:bg-opacity-90 transition-all text-sm md:text-base flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Portfolios
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-[#3B82F6]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Complétés</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.completed}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">En Cours</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {stats.inProgress}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">En Attente</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {stats.pending}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou profession..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-all bg-white"
            />
          </div>
        </div>

        {/* Portfolios Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] p-6 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Portfolios Clients ({filteredPortfolios.length})
            </h2>
          </div>

          {isLoadingPortfolios ? (
            <div className="p-8 text-center">
              <Loader className="w-8 h-8 animate-spin text-[#3B82F6] mx-auto mb-4" />
              <p className="text-gray-600">Chargement des portfolios...</p>
            </div>
          ) : filteredPortfolios.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Profession
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Contenu
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Créé
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPortfolios.map((portfolio) => (
                    <tr
                      key={portfolio.id}
                      className="hover:bg-gray-50 transition-all"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {portfolio.firstName} {portfolio.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {portfolio.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {portfolio.profession}
                        </p>
                        <p className="text-xs text-gray-500">
                          {portfolio.title}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {portfolio.experiences.length}
                          </span>
                          <span className="flex items-center gap-1">
                            <Code className="w-4 h-4" />
                            {portfolio.projects.length}
                          </span>
                          <span className="flex items-center gap-1">
                            📷 {portfolio.images.length}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(portfolio.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(portfolio.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/client/${portfolio.id}`}
                          className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all"
                        >
                          Voir Détails
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">Aucun portfolio trouvé</p>
              <p className="text-sm">
                {searchQuery
                  ? "Essayez une autre recherche"
                  : "Les portfolios créés apparaîtront ici"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
