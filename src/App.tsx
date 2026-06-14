import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  Target, 
  ArrowRight,
  AlertTriangle,
  RotateCcw
} from "lucide-react";

// --- Type Definitions ---
interface InsightModule {
  score: number;
  summary: string;
  bullets: string[];
  tags?: string[];
}

interface BrandMatch {
  name: string;
  score: number;
}

interface AnalysisResult {
  creatorName: string;
  creatorScore: number;
  creatorLevel: string;
  followers: string;
  category: string;
  postingFrequency: string;
  summary: string;
  contentStrategy: InsightModule;
  audienceSignals: InsightModule;
  postingPatterns: InsightModule;
  growthOpportunities: InsightModule;
  brandFit: InsightModule;
  brandMatches: BrandMatch[];
  recommendation: string;
}

const ACCENT_COLORS = {
  purple: "#7C5CFC",
  pink: "#FE2C55",
  teal: "#25F4EE",
  yellow: "#F0C040",
  coral: "#FF6B6B",
};

export default function App() {
  const [view, setView] = useState<"landing" | "processing" | "results">("landing");
  const [url, setUrl] = useState("");
  const [errorString, setErrorString] = useState("");
  const [loadingError, setLoadingError] = useState(false);
  const [detailedError, setDetailedError] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Auto clean URL paste like removing query parameters
  const cleanTikTokUrl = (input: string) => {
    return input.trim();
  };

  const handleStartAnalysis = async () => {
    const cleaned = cleanTikTokUrl(url);
    if (!cleaned) {
      setErrorString("TikTok profile URL is required.");
      return;
    }
    
    // Validate TikTok URL format
    if (!cleaned.includes("tiktok.com/")) {
      setErrorString("Please enter a valid TikTok profile URL (e.g., https://www.tiktok.com/@username)");
      return;
    }

    setErrorString("");
    setLoadingError(false);
    setDetailedError("");
    setView("processing");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleaned }),
      });

      if (!res.ok) {
        let errMsg = "Analysis failed";
        try {
          const errData = await res.json();
          errMsg = errData.error || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const payload = await res.json();
      setAnalysisResult(payload);
    } catch (err: any) {
      console.error(err);
      setDetailedError(err.message || "The AI pipeline encountered a parsing timeout. Please double-check the TikTok URL format and try again.");
      setLoadingError(true);
    }
  };

  const handleReset = () => {
    setUrl("");
    setErrorString("");
    setLoadingError(false);
    setDetailedError("");
    setAnalysisResult(null);
    setView("landing");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans selection:bg-[#7C5CFC]/30 flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Background Noise Line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C5CFC]/20 to-transparent z-50" />

      {/* Global Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-40 relative">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset} id="logo-container">
          <span className="font-display font-extrabold text-2xl tracking-tighter italic bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            TikScope
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#111118]/80 border border-white/5 rounded-full backdrop-blur-md" id="status-pill">
          <span className="w-1.5 h-1.5 bg-[#25F4EE] rounded-full animate-ping" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
            AI-POWERED
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {view === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative py-12"
            >
              {/* Floating aesthetic tags to match Screenshot 1 */}
              <div className="absolute top-0 left-[20%] opacity-20 md:opacity-100">
                <span className="px-3.5 py-1.5 bg-[#111118] border border-white/5 rounded-full text-xs font-medium text-white/50 tracking-wide shadow-2xl">
                  UGC Creator
                </span>
              </div>
              <div className="absolute top-[38%] right-[2%] opacity-20 md:opacity-100">
                <span className="px-3.5 py-1.5 bg-[#111118] border border-white/5 rounded-full text-xs font-medium text-white/50 tracking-wide shadow-2xl">
                  High Engagement
                </span>
              </div>
              <div className="absolute top-2 right-[18%] opacity-20 md:opacity-100">
                <span className="px-3.5 py-1.5 bg-[#111118] border border-white/5 rounded-full text-xs font-medium text-white/50 tracking-wide shadow-2xl">
                  Brand Safe
                </span>
              </div>
              <div className="absolute bottom-[23%] left-[2%] opacity-20 md:opacity-100">
                <span className="px-3.5 py-1.5 bg-[#111118] border border-white/5 rounded-full text-xs font-medium text-white/50 tracking-wide shadow-2xl">
                  Lifestyle
                </span>
              </div>
              <div className="absolute bottom-[26%] right-[32%] opacity-20 md:opacity-100">
                <span className="px-3.5 py-1.5 bg-[#111118] border border-white/5 rounded-full text-xs font-medium text-white/50 tracking-wide shadow-2xl">
                  Fitness
                </span>
              </div>

              {/* Title Section */}
              <div className="text-center mb-12 relative z-10">
                <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] text-white mb-6">
                  Understand Any <br />
                  <span className="inline-block relative">
                    <span className="text-[#FE2C55] drop-shadow-[0_0_15px_rgba(254,44,85,0.15)]">Tik</span>
                    <span className="text-[#25F4EE] drop-shadow-[0_0_15px_rgba(37,244,238,0.15)] italic">Tok</span>
                    <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent ml-3">Account</span>
                  </span> <br />
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    in Seconds
                  </span>
                </h1>

                <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
                  Advanced neural analysis for high-growth brands. Extract performance signals and viral hooks instantly.
                </p>
              </div>

              {/* Analyze Input Card container with subtle purple glow */}
              <div className="max-w-2xl mx-auto mb-16 relative z-10" id="analysis-form">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#7C5CFC]/20 to-[#FE2C55]/20 rounded-[33px] blur-xl opacity-50" />
                <div className="relative p-6 md:p-8 bg-[#111118]/90 border border-white/5 rounded-[32px] backdrop-blur-xl shadow-2xl">
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter TikTok Profile URL"
                        className="w-full bg-[#16161F]/90 border border-white/5 rounded-2xl py-4.5 px-6 outline-none focus:border-[#7C5CFC]/30 focus:ring-1 focus:ring-[#7C5CFC]/20 transition-all text-base text-white placeholder-white/20 font-medium"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleStartAnalysis();
                        }}
                        id="tiktok-url-input"
                      />
                    </div>

                    <button
                      onClick={handleStartAnalysis}
                      className="w-full py-4.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_-5px_#7C5CFC] active:scale-[0.98] group overflow-hidden relative text-white"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT_COLORS.purple}, ${ACCENT_COLORS.pink})`,
                      }}
                      id="analyze-btn"
                    >
                      <span className="relative z-10 tracking-wide">Analyze Architecture</span>
                      <Sparkles size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>

                  {errorString && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-red-400 text-xs font-semibold tracking-wide text-center"
                      id="input-error"
                    >
                      {errorString}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Live Processing progress card to match Landing Screenshot */}
              <div className="max-w-3xl mx-auto p-8 bg-[#111118]/50 border border-white/5 rounded-[32px] backdrop-blur-xl" id="live-processing-card">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wider">Live Processing</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-1.5 h-1.5 bg-[#25F4EE] rounded-full animate-pulse" />
                      <span className="text-[10px] text-white/40 tracking-widest font-bold uppercase">
                        NEURAL STREAM
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <BarChart3 size={16} className="text-[#25F4EE]" />
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "CONTENT STRATEGY", percentage: 92, score: "92%", color: ACCENT_COLORS.purple, glow: "glow-purple" },
                    { label: "AUDIENCE SIGNALS", percentage: 87, score: "87%", color: ACCENT_COLORS.teal, glow: "glow-teal" },
                    { label: "GROWTH VELOCITY", percentage: 90, score: "90%", color: "#6B7280", glow: "" },
                    { label: "BRAND AFFINITY", percentage: 94, score: "94%", color: ACCENT_COLORS.pink, glow: "glow-pink" },
                  ].map((stream, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-white/50">
                        <span>{stream.label}</span>
                        <span style={{ color: stream.color }}>{stream.score}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stream.percentage}%` }}
                          transition={{ duration: 1.2, delay: idx * 0.15, ease: "easeOut" }}
                          className={`h-full rounded-full ${stream.glow}`}
                          style={{ backgroundColor: stream.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === "processing" && (
            <ProcessingScreen
              username={url.toLowerCase().split("@")[1]?.split("/")[0]?.split("?")[0] || "creator"}
              isError={loadingError}
              errorMessage={detailedError}
              onRetry={handleStartAnalysis}
              onCancel={handleReset}
              onFinish={() => {
                if (analysisResult) {
                  setView("results");
                }
              }}
              resultsReady={analysisResult !== null}
            />
          )}

          {view === "results" && analysisResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8 py-4"
            >
              <ResultsScreen data={analysisResult} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Aesthetic Footer */}
      <footer className="w-full text-center py-8 text-white/20 text-xs font-semibold tracking-wider">
        TIKSCOPE &copy; {new Date().getFullYear()} — PREMIUM AI PRODUCT INTEL
      </footer>
    </div>
  );
}

// --- SCREEN 2: PROCESSING COMPONENT ---
interface ProcessingProps {
  username: string;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
  onCancel: () => void;
  onFinish: () => void;
  resultsReady: boolean;
}

function ProcessingScreen({ username, isError, errorMessage, onRetry, onCancel, onFinish, resultsReady }: ProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const stepsList = [
    "Parsing TikTok URL",
    "Extracting creator signals",
    "Identifying content niche",
    "Mapping audience behavior",
    "Detecting posting patterns",
    "Calculating creator score", // Match request and schema description
    "Preparing report",
  ];

  // Rotate through steps
  useEffect(() => {
    if (isError) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < stepsList.length - 1) {
          return prev + 1;
        } else {
          // If we are at the last step and our results are back, transition out
          if (resultsReady) {
            clearInterval(timer);
            onFinish();
          }
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(timer);
  }, [resultsReady, isError]);

  // Handle case where we already have steps complete but results finished later
  useEffect(() => {
    if (currentStep === stepsList.length - 1 && resultsReady) {
      const timeout = setTimeout(onFinish, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, resultsReady]);

  const floatingTags = [
    "UGC Creator",
    "High Engagement",
    "Brand Safe",
    "Viral Hooks",
    "Tech",
    "Lifestyle",
    "Education",
  ];

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-12 bg-[#111118] border border-red-500/20 rounded-[32px] text-center shadow-2xl relative overflow-hidden"
        id="error-card"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500" />
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-2xl font-display font-extrabold mb-3">Analysis Failed</h3>
        <p className="text-white/40 text-sm mb-8 leading-relaxed">
          {errorMessage || "The AI pipeline encountered a parsing timeout. Please double-check the TikTok URL format and try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-4.5 bg-[#FE2C55] hover:bg-[#FE2C55]/90 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
            id="retry-btn"
          >
            <RotateCcw size={16} /> Try Again
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-4.5 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 text-white/60 hover:text-white"
            id="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center py-8"
      id="processing-flow"
    >
      {/* Dynamic Orbits Graph Graphic */}
      <div className="relative w-72 h-72 md:w-80 md:h-80 mb-16 flex items-center justify-center">
        {/* Ring Layers */}
        <div className="absolute inset-0 border border-white/5 rounded-full" />
        <div className="absolute inset-6 border border-white/5 rounded-full animate-[spin_5s_linear_infinite]" />
        <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
        
        {/* Highlighted Glowing Active Slices */}
        <div className="absolute inset-0 border-2 border-transparent border-t-[#25F4EE]/30 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-6 border border-transparent border-b-[#7C5CFC]/30 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
        
        {/* Floating AI tags positioned orb-style */}
        {floatingTags.map((tag, i) => {
          const angle = (i * 2 * Math.PI) / floatingTags.length;
          const radius = i % 2 === 0 ? 110 : 135; // alternating orbits
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isVisible = i <= currentStep; // appear progressively as we scan !

          return (
            <AnimatePresence key={tag}>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className="absolute px-3 py-1 bg-[#111118]/90 border border-white/10 rounded-full text-[10px] font-bold text-white/80 whitespace-nowrap shadow-xl"
                  style={{
                    x,
                    y,
                  }}
                >
                  {tag}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}

        {/* Center Scanner Nucleus */}
        <div className="text-center z-10 p-4">
          <p className="text-[#25F4EE] text-[10px] font-black tracking-[0.3em] uppercase mb-1.5 animate-pulse">
            SCANNING...
          </p>
          <h3 className="text-base font-mono font-bold text-white max-w-[150px] truncate" title={`@${username}`}>
            @{username}
          </h3>
        </div>
      </div>

      {/* Progress Card */}
      <div className="w-full max-w-md p-8 bg-[#111118]/80 border border-white/5 rounded-[32px] shadow-2xl backdrop-blur-md">
        <h4 className="text-lg font-display font-extrabold mb-1">Analyzing Creator Profile</h4>
        <p className="text-white/40 text-xs font-medium mb-6">Extracting signals and preparing intelligence report.</p>

        <div className="space-y-4">
          {stepsList.map((stepMessage, i) => {
            const isCompleted = i < currentStep;
            const isActive = i === currentStep;

            return (
              <div
                key={i}
                className={`flex items-center justify-between transition-all duration-300 ${
                  isCompleted ? "opacity-100" : isActive ? "opacity-100 scale-[1.01]" : "opacity-20"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-[#25F4EE]" />
                  ) : isActive ? (
                    <div className="relative">
                      <div className="w-[18px] h-[18px] border-2 border-[#7C5CFC] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] border border-white/10 rounded-full" />
                  )}
                  <span className={`text-xs font-semibold ${isActive ? "text-[#7C5CFC]" : isCompleted ? "text-white" : "text-white/60"}`}>
                    {stepMessage}
                  </span>
                </div>
                {isCompleted && (
                  <span className="text-[10px] font-mono tracking-wider text-[#25F4EE] font-bold">READY</span>
                )}
                {isActive && (
                  <span className="text-[10px] font-mono tracking-wider text-[#7C5CFC] font-black animate-pulse">PROCESSING</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// --- SCREEN 3: RESULTS COMPONENT ---
interface ResultsProps {
  data: AnalysisResult;
  onReset: () => void;
}

function ResultsScreen({ data, onReset }: ResultsProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>("Content Strategy & Niche");

  // Format score offsets for perfect circular SVG draw
  const polarDashArray = 2 * Math.PI * 65; // ~408.4px (65px is radius)

  const modules = [
    {
      title: "Content Strategy & Niche",
      icon: Zap,
      color: ACCENT_COLORS.purple,
      data: data.contentStrategy,
      scoreLabel: "STRATEGY SCORE",
    },
    {
      title: "Audience Signals",
      icon: ShieldCheck,
      color: ACCENT_COLORS.teal,
      data: data.audienceSignals,
      scoreLabel: "SIGNAL STRENGTH",
    },
    {
      title: "Posting Patterns & Hooks",
      icon: Clock,
      color: ACCENT_COLORS.pink,
      data: data.postingPatterns,
      scoreLabel: "HOOK EFFICIENCY",
    },
    {
      title: "Growth Opportunities",
      icon: BarChart3,
      color: ACCENT_COLORS.yellow,
      data: data.growthOpportunities,
      scoreLabel: "UPSIDE POTENTIAL",
    },
    {
      title: "Brand & Creator Fit",
      icon: Target,
      color: ACCENT_COLORS.coral,
      data: data.brandFit,
      scoreLabel: "FIT PERCENTILE",
    },
  ];

  const toggleModule = (title: string) => {
    setExpandedModule(expandedModule === title ? null : title);
  };

  return (
    <div className="space-y-8 pb-12" id="results-dashboard">
      {/* MODULE 1: Hero Creator Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-8 md:p-10 bg-[#111118]/80 border border-white/5 rounded-[40px] flex flex-col md:flex-row items-center gap-8 md:gap-10 shadow-3xl glow-purple relative overflow-hidden"
        id="hero-creator-card"
      >
        <div className="absolute -top-[50%] -left-[20%] w-[350px] h-[350px] bg-[#7C5CFC]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Side Avatar */}
        <div className="relative flex-shrink-0" id="avatar-container">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#FE2C55] p-[3px] shadow-2xl relative">
            <div className="w-full h-full rounded-full bg-[#111118] flex items-center justify-center text-4xl font-display font-extrabold italic text-white">
              {data.creatorName[1] ? data.creatorName[1].toUpperCase() : "C"}
            </div>
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#25F4EE] text-black text-[9px] font-black tracking-widest rounded-full uppercase shadow-lg">
            VERIFIED
          </div>
        </div>

        {/* Mid Side Info */}
        <div className="flex-1 text-center md:text-left space-y-4" id="creator-meta">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight italic text-white flex items-center justify-center md:justify-start gap-2">
            {data.creatorName}
          </h2>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            <span className="px-3.5 py-1.5 bg-[#16161F] border border-white/5 rounded-full text-[10px] font-bold text-white/70 uppercase tracking-widest">
              {data.followers} Followers
            </span>
            <span className="px-3.5 py-1.5 bg-[#16161F] border border-white/5 rounded-full text-[10px] font-bold text-[#7C5CFC] uppercase tracking-widest">
              {data.category}
            </span>
            <span className="px-3.5 py-1.5 bg-[#16161F] border border-white/5 rounded-full text-[10px] font-bold text-white/70 uppercase tracking-widest">
              {data.postingFrequency}
            </span>
          </div>

          <p className="text-white/50 text-xs md:text-sm font-medium leading-relaxed max-w-lg">
            {data.summary}
          </p>
        </div>

        {/* Right Side Circular Progress Chart with custom state */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center text-center p-3 relative" id="circular-score-ring">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background slot */}
              <circle
                cx="72"
                cy="72"
                r="65"
                className="stroke-white/5 fill-none"
                strokeWidth="7"
              />
              {/* Filled indicator */}
              <motion.circle
                cx="72"
                cy="72"
                r="65"
                className="stroke-[#7C5CFC] fill-none"
                strokeWidth="7"
                strokeLinecap="round"
                initial={{ strokeDashoffset: polarDashArray }}
                animate={{ strokeDashoffset: polarDashArray - (polarDashArray * data.creatorScore) / 100 }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                style={{ strokeDasharray: polarDashArray }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-extrabold tracking-tighter text-white">
                {data.creatorScore}
              </span>
              <span className="text-[9px] text-white/30 font-bold tracking-widest">/ 100</span>
            </div>
          </div>
          <span className="mt-3 text-[9px] font-black uppercase text-[#7C5CFC] tracking-[0.25em]">
            Creator Score
          </span>
        </div>
      </motion.div>

      {/* Title block for modules */}
      <div className="pt-4 flex justify-between items-center px-1">
        <h3 className="text-base font-display font-extrabold tracking-wide uppercase text-white/80">
          Core Insights
        </h3>
        <span className="text-[10px] text-white/30 font-black tracking-widest uppercase">
          5 DIMENSION DIAGNOSIS
        </span>
      </div>

      {/* MODULE 2: Core Insights Lists (staggered load) */}
      <div className="space-y-4" id="insights-accordion">
        {modules.map((m, i) => {
          const isExpanded = expandedModule === m.title;
          const IconComponent = m.icon;

          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className={`border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 bg-[#111118]/80`}
              style={{
                borderColor: isExpanded ? `${m.color}20` : "rgba(255,255,255,0.05)",
              }}
            >
              {/* Accordion Head */}
              <button
                onClick={() => toggleModule(m.title)}
                className="w-full p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/[0.01] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 bg-white/5 rounded-2xl border border-white/5 flex-shrink-0"
                    style={{ color: isExpanded ? m.color : "rgba(255,255,255,0.4)" }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-sm tracking-wide md:text-base transition-colors"
                      style={{ color: isExpanded ? m.color : "rgba(255,255,255,0.85)" }}
                    >
                      {m.title}
                    </h4>
                    <p className="text-xs text-white/30 font-medium truncate max-w-[280px] md:max-w-md">
                      {m.data.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                  <div className="text-left md:text-right space-y-1">
                    {/* Tiny visual bar indicator on the right side header */}
                    <div className="h-1 w-20 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${m.data.score}%`, backgroundColor: m.color }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold font-mono tracking-tight text-white/90">
                        {m.data.score}
                      </span>
                      <span className="text-[8px] font-black text-white/30 tracking-widest uppercase">
                        {m.scoreLabel}
                      </span>
                    </div>
                  </div>
                  <div className="text-white/20">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </button>

              {/* Accordion Body */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 md:pb-8 pt-2 border-t border-white/5 bg-white/[0.01]">
                      <div className="grid md:grid-cols-5 gap-8">
                        <div className="md:col-span-3 space-y-6">
                          <div>
                            <span className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase block mb-2">
                              Diagnostic Summary
                            </span>
                            <p className="text-sm text-white/70 font-medium leading-relaxed">
                              {m.data.summary}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase block mb-3">
                              Strategic Bulletins
                            </span>
                            <ul className="space-y-3">
                              {m.data.bullets.map((bullet, bidx) => (
                                <li key={bidx} className="flex items-start gap-2.5 text-xs text-white/60 font-medium leading-relaxed">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/25 mt-1.5 flex-shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right tags column if present */}
                        {m.data.tags && m.data.tags.length > 0 && (
                          <div className="md:col-span-2 space-y-3">
                            <span className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase block mb-2">
                              Algorithmic Tags
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {m.data.tags.map((tag, tagidx) => (
                                <span
                                  key={tagidx}
                                  className="px-3.5 py-1.5 bg-[#16161F] border border-white/5 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-colors cursor-default"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* MODULE 3: Brand Matches */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4"
        id="brand-matches"
      >
        <div className="px-1">
          <h3 className="text-xs font-black tracking-widest text-[#7C5CFC] uppercase">
            Top Brand Matches
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {data.brandMatches.map((brand, bidx) => {
            // Apply custom accent colors to first two and fallback of grey/muted to rest to match exactly with landing
            const colorClass = bidx === 0 
              ? "text-[#7C5CFC]" 
              : bidx === 1 
                ? "text-[#25F4EE]" 
                : "text-white/40";

            return (
              <div
                key={brand.name}
                className="px-5 py-3 bg-[#111118]/80 border border-white/5 rounded-2xl flex items-center gap-3 shadow-lg"
              >
                <span className="font-bold text-sm tracking-wide text-white/90">
                  {brand.name}
                </span>
                <span className={`text-xs font-bold ${colorClass}`}>
                  {brand.score}%
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* MODULE 4: Strategic Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="p-8 md:p-10 bg-[#111118]/90 border border-white/5 rounded-[40px] relative overflow-hidden shadow-2xl glow-pink"
        id="strategic-recommendation"
      >
        {/* Abstract glowing visual shape matching Screenshot 3 */}
        <div className="absolute top-[20%] -right-[15%] w-72 h-72 bg-[#FE2C55]/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full inline-flex items-center gap-2">
            <Sparkles size={14} className="text-[#7C5CFC]" />
            <span className="text-[9px] font-black tracking-[0.2em] text-white/80 uppercase">
              TOP AI RECOMMENDATION
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-display font-extrabold tracking-tight">
              Strategic Recommendation
            </h3>
            <p className="text-[9px] font-black tracking-[0.25em] text-[#FE2C55] uppercase">
              AI GENERATED INSIGHT
            </p>
          </div>

          {/* Highlighted text paragraph matching screenshot styled blocks precisely */}
          <div className="pl-6 border-l-2 border-[#7C5CFC]/30 text-base md:text-lg text-white/80 leading-relaxed font-semibold max-w-3xl">
            {/* Split "3.4x higher conversion" and highlight in glowing teal as seen in illustration */}
            {data.recommendation.includes("3.4x higher conversion") ? (
              <>
                {data.recommendation.split("3.4x higher conversion")[0]}
                <span className="text-[#25F4EE] drop-shadow-[0_0_10px_rgba(37,244,238,0.25)] font-bold">
                  3.4x higher conversion
                </span>
                {data.recommendation.split("3.4x higher conversion")[1]}
              </>
            ) : (
              data.recommendation
            )}
          </div>

          <button className="px-7 py-4 bg-[#16161F] hover:bg-[#16161F]/80 border border-white/5 hover:border-white/10 rounded-2xl font-bold text-xs tracking-wider uppercase text-white hover:text-[#25F4EE] flex items-center gap-3.5 transition-all duration-300">
            Deploy Campaign Strategy <ArrowRight size={14} className="text-[#25F4EE]" />
          </button>
        </div>
      </motion.div>

      {/* MODULE 5: Reset Call to Action */}
      <div className="pt-12 text-center">
        <button
          onClick={onReset}
          className="cursor-pointer text-white/40 hover:text-white transition-colors text-[10px] font-black tracking-[0.3em] uppercase underline underline-offset-8 decoration-white/10"
          id="analyze-another-btn"
        >
          Analyze Another Account
        </button>
      </div>
    </div>
  );
}
