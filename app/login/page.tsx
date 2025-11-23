// "use client";
// import React, { useState } from "react";
// import { Eye, EyeOff, ArrowRight, Zap } from "lucide-react";

// export default function ShizTechAuth() {
//   const [currentPage, setCurrentPage] = useState("login");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     fullName: "",
//     portfolioTitle: "",
//     bio: "",
//     skills: "",
//     experience: "",
//     projectsLink: "",
//     socialLinks: "",
//     question1: "",
//     question2: "",
//     question3: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login:", {
//       email: formData.email,
//       password: formData.password,
//     });
//     setCurrentPage("portfolio");
//   };

//   const handlePortfolioSubmit = (e) => {
//     e.preventDefault();
//     console.log("Portfolio Data:", formData);
//     alert("Portfolio créé avec succès! 🚀");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#050B1A] via-[#0A1628] to-[#050B1A] font-sans overflow-hidden">
//       {/* Animated background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-[#00D9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
//         <div
//           className="absolute bottom-20 right-10 w-72 h-72 bg-[#FF00FF] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#6B00FF] rounded-full mix-blend-multiply filter blur-3xl opacity-3 animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
//         {currentPage === "login" ? (
//           // LOGIN PAGE
//           <div className="w-full max-w-md">
//             {/* Logo/Brand */}
//             <div className="text-center mb-12">
//               <div className="flex justify-center mb-6">
//                 <div className="relative">
//                   <div className="w-24 h-24 bg-gradient-to-r from-[#00D9FF] to-[#FF00FF] rounded-full opacity-20 blur-2xl"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Zap className="w-12 h-12 text-[#00D9FF]" />
//                   </div>
//                 </div>
//               </div>
//               <h1 className="text-5xl font-bold bg-gradient-to-r from-[#00D9FF] via-[#9D00FF] to-[#FF00FF] bg-clip-text text-transparent mb-2 tracking-wider">
//                 SHIZ TECH
//               </h1>
//               <p className="text-[#00D9FF] text-sm tracking-widest">
//                 INTELLIGENT PORTFOLIO
//               </p>
//             </div>

//             {/* Login Form */}
//             <form onSubmit={handleLoginSubmit} className="space-y-6">
//               {/* Email Input */}
//               <div className="relative group">
//                 <label className="block text-[#00D9FF] text-sm font-semibold mb-3 tracking-wide">
//                   EMAIL
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="your@email.com"
//                     className="w-full px-4 py-3 bg-[#0A1628] border-2 border-[#00D9FF] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
//                     required
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#FF00FF] rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"></div>
//                 </div>
//               </div>

//               {/* Password Input */}
//               <div className="relative group">
//                 <label className="block text-[#00D9FF] text-sm font-semibold mb-3 tracking-wide">
//                   PASSWORD
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-3 bg-[#0A1628] border-2 border-[#00D9FF] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00D9FF] hover:text-[#FF00FF] transition-colors"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember & Forgot */}
//               <div className="flex justify-between items-center text-sm">
//                 <label className="flex items-center text-[#00D9FF] hover:text-[#FF00FF] cursor-pointer transition-colors">
//                   <input
//                     type="checkbox"
//                     className="mr-2 w-4 h-4 bg-[#0A1628] border border-[#00D9FF] rounded"
//                   />
//                   Remember me
//                 </label>
//                 <a
//                   href="#"
//                   className="text-[#9D00FF] hover:text-[#FF00FF] transition-colors"
//                 >
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-gradient-to-r from-[#00D9FF] via-[#9D00FF] to-[#FF00FF] text-[#050B1A] font-bold rounded-lg mt-8 hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 uppercase tracking-wider"
//               >
//                 <span>Enter Portal</span>
//                 <ArrowRight size={20} />
//               </button>

//               {/* Sign Up Link */}
//               <div className="text-center mt-6">
//                 <p className="text-gray-400">
//                   New to SHIZ TECH?{" "}
//                   <a
//                     href="#"
//                     className="text-[#00D9FF] hover:text-[#FF00FF] font-semibold transition-colors"
//                   >
//                     Create Account
//                   </a>
//                 </p>
//               </div>
//             </form>

//             {/* Footer */}
//             <div className="mt-12 pt-6 border-t border-[#00D9FF] border-opacity-20 text-center text-xs text-gray-500">
//               <p>Secured by SHIZ TECH • © 2024</p>
//             </div>
//           </div>
//         ) : (
//           // PORTFOLIO FORM PAGE
//           <div className="w-full max-w-2xl">
//             {/* Header */}
//             <div className="text-center mb-10">
//               <button
//                 onClick={() => setCurrentPage("login")}
//                 className="mb-6 text-[#00D9FF] hover:text-[#FF00FF] transition-colors text-sm"
//               >
//                 ← Back
//               </button>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00D9FF] via-[#9D00FF] to-[#FF00FF] bg-clip-text text-transparent mb-2 tracking-wider">
//                 BUILD YOUR PORTFOLIO
//               </h1>
//               <p className="text-gray-400">
//                 Tell us about yourself to create your AI-powered portfolio
//               </p>
//             </div>

//             {/* Portfolio Form */}
//             <form
//               onSubmit={handlePortfolioSubmit}
//               className="space-y-6 bg-[#0A1628] bg-opacity-50 backdrop-blur-md border border-[#00D9FF] border-opacity-20 p-8 rounded-2xl"
//             >
//               {/* Personal Info Section */}
//               <div>
//                 <h3 className="text-[#00D9FF] font-bold text-lg mb-4 flex items-center gap-2">
//                   <div className="w-1 h-6 bg-gradient-to-b from-[#00D9FF] to-[#FF00FF]"></div>
//                   PERSONAL INFORMATION
//                 </h3>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       placeholder="Your name"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       Portfolio Title
//                     </label>
//                     <input
//                       type="text"
//                       name="portfolioTitle"
//                       value={formData.portfolioTitle}
//                       onChange={handleInputChange}
//                       placeholder="e.g., Full Stack Developer | AI Enthusiast"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       Bio
//                     </label>
//                     <textarea
//                       name="bio"
//                       value={formData.bio}
//                       onChange={handleInputChange}
//                       placeholder="Tell us about yourself..."
//                       rows="4"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all resize-none"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Professional Section */}
//               <div>
//                 <h3 className="text-[#00D9FF] font-bold text-lg mb-4 flex items-center gap-2">
//                   <div className="w-1 h-6 bg-gradient-to-b from-[#00D9FF] to-[#FF00FF]"></div>
//                   PROFESSIONAL DETAILS
//                 </h3>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       Skills (comma-separated)
//                     </label>
//                     <input
//                       type="text"
//                       name="skills"
//                       value={formData.skills}
//                       onChange={handleInputChange}
//                       placeholder="React, Node.js, Python, AI, Machine Learning"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       Experience Level
//                     </label>
//                     <select
//                       name="experience"
//                       value={formData.experience}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all"
//                       required
//                     >
//                       <option value="">Select experience level</option>
//                       <option value="junior">Junior (0-2 years)</option>
//                       <option value="mid">Mid-Level (2-5 years)</option>
//                       <option value="senior">Senior (5+ years)</option>
//                       <option value="expert">Expert (10+ years)</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       Projects Link (GitHub/Portfolio)
//                     </label>
//                     <input
//                       type="url"
//                       name="projectsLink"
//                       value={formData.projectsLink}
//                       onChange={handleInputChange}
//                       placeholder="https://github.com/yourname"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       Social Links (comma-separated URLs)
//                     </label>
//                     <input
//                       type="text"
//                       name="socialLinks"
//                       value={formData.socialLinks}
//                       onChange={handleInputChange}
//                       placeholder="https://linkedin.com/in/yourname, https://twitter.com/yourname"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Questions Section */}
//               <div>
//                 <h3 className="text-[#00D9FF] font-bold text-lg mb-4 flex items-center gap-2">
//                   <div className="w-1 h-6 bg-gradient-to-b from-[#00D9FF] to-[#FF00FF]"></div>
//                   SECURITY QUESTIONS
//                 </h3>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       What was your first coding project?
//                     </label>
//                     <textarea
//                       name="question1"
//                       value={formData.question1}
//                       onChange={handleInputChange}
//                       placeholder="Describe your first coding project..."
//                       rows="3"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all resize-none"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       What motivates you in tech?
//                     </label>
//                     <textarea
//                       name="question2"
//                       value={formData.question2}
//                       onChange={handleInputChange}
//                       placeholder="Share what drives your passion..."
//                       rows="3"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all resize-none"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[#00D9FF] text-sm font-semibold mb-2">
//                       What's your biggest achievement?
//                     </label>
//                     <textarea
//                       name="question3"
//                       value={formData.question3}
//                       onChange={handleInputChange}
//                       placeholder="Tell us about your greatest accomplishment..."
//                       rows="3"
//                       className="w-full px-4 py-2 bg-[#0A1628] border border-[#00D9FF] border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] focus:border-opacity-100 transition-all resize-none"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-3 mt-8 bg-gradient-to-r from-[#00D9FF] via-[#9D00FF] to-[#FF00FF] text-[#050B1A] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 uppercase tracking-wider"
//               >
//                 <span>Create Portfolio</span>
//                 <Zap size={20} />
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const SECRET_CODE = "27012014";

export default function AuthPage() {
  const router = useRouter();
  const [secretInput, setSecretInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (secretInput === SECRET_CODE) {
        // Store auth state
        localStorage.setItem("isAuthenticated", "true");
        // Redirect to dashboard
        router.push("/back");
      } else {
        setAuthError("Code secret incorrect");
        setSecretInput("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f0f4f8] flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-full">
                <Lock className="w-8 h-8 text-[#3B82F6]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Accès Sécurisé</h1>
            <p className="text-white text-opacity-90 mt-2">
              Espace Réservé aux Administrateurs
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <form onSubmit={handleAuthentication} className="space-y-6">
              {/* Secret Code Input */}
              <div>
                <label className="block text-[#1F2937] font-bold mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Code Secret
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={secretInput}
                    onChange={(e) => setSecretInput(e.target.value)}
                    placeholder="Entrez le code secret"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-base pr-12"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#3B82F6] transition-all"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {authError && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm font-medium">
                    {authError}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white uppercase tracking-wider transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:shadow-lg active:scale-95"
                }`}
              >
                {isLoading ? "Vérification..." : "Accéder"}
              </button>
            </form>

            {/* Info Message */}
            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-blue-700 text-xs sm:text-sm font-medium">
                💡 Veuillez entrer le code secret fourni pour accéder à cet
                espace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
