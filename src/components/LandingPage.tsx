import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import {
  Zap,
  CheckCircle,
  Play,
  Layers,
  Clock,
  Youtube,
  BookOpen,
  Github,
  Award,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Lock,
  Cpu,
  Tv,
  Users
} from "lucide-react";

interface LandingPageProps {
  onLaunch: () => void;
  onGoogleSignIn: (profile: { name: string; email: string; role: string }) => void;
}

export default function LandingPage({ onLaunch, onGoogleSignIn }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Google Sign-In interactive simulation states
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isAuthSigningIn, setIsAuthSigningIn] = useState(false);
  const [signingInUser, setSigningInUser] = useState<string | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [customRole, setCustomRole] = useState("Developer / Engineer");

  const googleAccountsList = [
    {
      name: "Farhan Kabir",
      email: "farhankabir236@gmail.com",
      role: "Developer / Engineer",
      avatarColor: "from-blue-600 to-indigo-500"
    },
    {
      name: "Alex Riviera",
      email: "alex.riviera@googlemail.com",
      role: "Content Creator / Writer",
      avatarColor: "from-purple-500 to-pink-500"
    },
    {
      name: "Dr. Sophia Chen",
      email: "sophia.chen@stanford.edu",
      role: "Student / Researcher",
      avatarColor: "from-emerald-600 to-teal-500"
    }
  ];

  const handleSelectGoogleAccount = (acc: { name: string; email: string; role: string }) => {
    setIsAuthSigningIn(true);
    setSigningInUser(acc.name);
    
    // Simulate highly precise OAuth handshake loop
    setTimeout(() => {
      setIsAuthSigningIn(false);
      setShowGoogleModal(false);
      onGoogleSignIn({
        name: acc.name,
        email: acc.email,
        role: acc.role
      });
    }, 1800);
  };

  const handleCustomGoogleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    
    handleSelectGoogleAccount({
      name: customName,
      email: customEmail,
      role: customRole
    });
  };

  const stats = [
    { value: "48k+", label: "Active Builders" },
    { value: "5.2M+", label: "Tasks Cleared" },
    { value: "320k+", label: "Routines Built" },
    { value: "100%", label: "Local-First Privacy" }
  ];

  const features = [
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: "Core Routine Engine",
      description: "Sequence habits, tools, and scripts into fluid step-by-step streams with persistent visual timeline guides."
    },
    {
      icon: <Clock className="w-5 h-5 text-emerald-400" />,
      title: "Deep Work Focus State",
      description: "Pomodoro core integrated with custom responsive visual soundscape triggers to block cognitive distractions."
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Creator Workspaces",
      description: "Tailored workspaces for YouTube content scripts, LinkedIn templates, and automated markdown notes."
    },
    {
      icon: <Award className="w-5 h-5 text-purple-400" />,
      title: "Gamified Momentum",
      description: "Gain discrete XP, secure daily streak multipliers, and earn achievement achievements without core stress."
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      title: "AI Cognitive Partner",
      description: "Leverages deep LLM contextual models to plan schedules, prioritize routines, and summarize accomplishments."
    },
    {
      icon: <Github className="w-5 h-5 text-zinc-300" />,
      title: "100% Open Source",
      description: "Deploy to your Docker private node. Fully inspectable Prisma schemas, extendable API endpoints, and clean SDK controllers."
    }
  ];

  const faqs = [
    {
      q: "Is my data safe and privately held?",
      a: "Yes. RoutineOS is built key-value first. Your tasks, journals, and workflows reside directly in secure browser storage and only hit your private self-hosted PostgreSQL database. No tracker telemetries or system logs are saved elsewhere."
    },
    {
      q: "How does the AI Assistant connect to LLM APIs?",
      a: "It leverages secure server-side proxy layers using Google Gemini or customized local endpoints in your private configuration. No API credentials are ever exposed client-side."
    },
    {
      q: "Can I self-host RoutineOS with Docker?",
      a: "Absolutely. We provide full-fidelity Docker Compose configurations, customizable Prisma blueprints, and MIT licenses right inside the codebase directory. You can deploy to any modern cloud node in 2 minutes."
    },
    {
      q: "What makes it better than standard Kanban and todo lists?",
      a: "Most planners manage lists but neglect state transitions. RoutineOS links static targets (tasks) with dynamic loops (routines, focus sessions, creator pipelines) to guide exact moment-to-moment behaviors."
    }
  ];

  return (
    <div id="landing-root" className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[1200px] -left-1/3 w-[600px] h-[600px] bg-emerald-950/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Header Navigation */}
      <header id="nav" className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/10">
              <span className="text-white font-bold text-sm tracking-widest">R</span>
            </div>
            <div>
              <span className="font-bold text-lg text-zinc-50 tracking-white">Routine<span className="text-indigo-400">OS</span></span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-zinc-100 transition">Features</a>
            <a href="#showcase" className="hover:text-zinc-100 transition">Interactive Mockup</a>
            <a href="#pricing" className="hover:text-zinc-100 transition">Pricing</a>
            <a href="#open-source" className="hover:text-zinc-100 transition">Self-Hosting</a>
            <a href="#faq" className="hover:text-zinc-100 transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-1 px-3 flex items-center gap-1.5 border border-zinc-800 rounded-md text-xs font-mono hover:bg-zinc-900 transition text-zinc-400 hover:text-white"
            >
              <Github className="w-3.5 h-3.5" />
              <span>v1.2.0</span>
            </a>
            <button
              id="google-signin-header"
              onClick={() => setShowGoogleModal(true)}
              className="hidden sm:flex items-center gap-1.5 border border-zinc-800 rounded-lg text-xs font-semibold hover:bg-zinc-900 transition text-zinc-300 hover:text-white px-3.5 py-1.5 cursor-pointer bg-black/60"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18V4.19C.79 6.96 0 10.13 0 13.52c0 3.39.79 6.56 2.18 9.33l3.66-2.84c-.22-.66-.35-1.36-.35-2.11z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Sign In</span>
            </button>
            <button
              id="btn-launch-header"
              onClick={onLaunch}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/25 transition cursor-pointer"
            >
              Launch RoutineOS
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-20 md:py-32 relative text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-300 mb-8 font-mono animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>RoutineOS Beta now open-source</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-zinc-100 leading-[1.1]">
            Run your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-zinc-100 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              productive life.
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            One minimal, distraction-free environment for developer sprints, student routines, creator content script writing, deep focus sessions, and private ambient soundscapes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="cta-launch-primary"
              onClick={onLaunch}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-xs sm:text-sm shadow-xl shadow-indigo-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              Start Operating System Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="cta-google-signin"
              onClick={() => setShowGoogleModal(true)}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-805 border-zinc-800 text-zinc-200 hover:text-white font-medium rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2.5 cursor-pointer hover:border-zinc-700 shadow-md"
            >
              <svg className="w-4 h-4 select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18V4.19C.79 6.96 0 10.13 0 13.52c0 3.39.79 6.56 2.18 9.33l3.66-2.84c-.22-.66-.35-1.36-.35-2.11z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Sign In with Google</span>
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto px-6 py-3 border border-zinc-800 hover:bg-zinc-950 text-zinc-300 font-medium rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              Explore Features
            </a>
          </div>

          {/* Social Social proof */}
          <div className="mt-16 flex items-center justify-center gap-3 text-xs font-mono text-zinc-500">
            <Github className="w-4 h-4" />
            <span>Starred by 14,204 developers</span>
            <span className="select-none text-zinc-800">•</span>
            <Users className="w-4 h-4" />
            <span>4.9/5 from indiehackers</span>
          </div>
        </div>

        {/* Dashboard Preview mockup container */}
        <div id="landing-preview" className="mt-20 max-w-5xl mx-auto px-4">
          <div className="relative border border-zinc-800 rounded-2xl bg-zinc-950/70 p-1 backdrop-blur-lg shadow-[0_0_50px_rgba(99,102,241,0.08)]">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950 text-zinc-500 text-xs">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="font-mono text-[10px] bg-zinc-900 px-3 py-1 rounded border border-zinc-800/60">
                RoutineOS Workstation Workspace (local-host:3000)
              </div>
              <div className="opacity-0 w-12" />
            </div>

            {/* Simulated Desktop dashboard */}
            <div className="p-4 sm:p-6 bg-black min-h-[300px] text-left grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Routine widget container */}
              <div className="border border-zinc-800/80 rounded-xl bg-zinc-950 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider">Active Routine</span>
                    <span className="bg-indigo-950 border border-indigo-900 text-indigo-400 text-[10px] font-mono px-1.5 py-0.5 rounded">90m Focus Flow</span>
                  </div>
                  <h3 className="text-zinc-200 font-semibold text-sm">Morning Coding Pipeline</h3>
                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs bg-indigo-950/20 border border-indigo-950 p-2 rounded">
                      <span className="text-indigo-300">✓ Step 1: Deep Spec Review</span>
                      <span className="text-zinc-500 text-[10px] font-mono">10m</span>
                    </div>
                    <div className="flex items-center justify-between text-xs bg-zinc-900/60 p-2 rounded border border-zinc-900">
                      <span className="text-zinc-300">▶ Step 2: System Architecture</span>
                      <span className="text-zinc-400 text-[10px] font-mono animate-pulse">Running</span>
                    </div>
                    <div className="flex items-center justify-between text-xs opacity-50 p-2 rounded">
                      <span className="text-zinc-400">• Step 3: Fast Prototyping</span>
                      <span className="text-zinc-500 text-[10px] font-mono">45m</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-900 pt-3 text-xs">
                  <span className="text-zinc-400">Streak: <b className="text-emerald-400">14 Days</b></span>
                  <span className="text-zinc-500 font-mono">XP + 450</span>
                </div>
              </div>

              {/* Tasks preview */}
              <div className="border border-zinc-800/80 rounded-xl bg-zinc-950 p-4">
                <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider block mb-3">Priority Kanban Columns</span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-900 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="text-xs text-zinc-300 font-medium">Configure database triggers</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-sans border border-zinc-800 px-1 rounded uppercase">High</span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-900 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span className="text-xs text-zinc-300 font-medium font-strike line-through opacity-40">Write setup.md instructions</span>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-sans border border-zinc-800 px-1 rounded uppercase">Med</span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-900 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      <span className="text-xs text-zinc-300 font-medium">Record launch YouTube draft</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-sans border border-zinc-800 px-1 rounded uppercase">Low</span>
                  </div>
                </div>
              </div>

              {/* Focus session component */}
              <div className="border border-zinc-800/80 rounded-xl bg-zinc-950 p-4 flex flex-col justify-between">
                <div>
                  <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider block mb-2">Deep Work Focus</span>
                  <div className="text-center py-4 bg-zinc-900/20 border border-zinc-900/50 rounded-lg">
                    <span className="text-2xl font-mono text-indigo-400 tracking-widest font-bold">25:00</span>
                    <span className="block text-[10px] text-zinc-500 uppercase mt-1">Pomodoro Cycle</span>
                  </div>
                </div>
                <div className="space-y-1 mt-4">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Focus Streak</span>
                    <span className="text-zinc-200">3 blocks</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Ambient Sound</span>
                    <span className="text-emerald-400">Forest Rain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            id="cta-sim-dashboard"
            onClick={onLaunch}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 rounded-lg text-xs font-mono transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
            <span>Interactive sandbox live preview below (Click to active full app)</span>
          </button>
        </div>
      </section>

      {/* Grid Statistics Segment */}
      <section className="py-12 border-y border-zinc-950 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl font-sans font-bold text-zinc-50">{item.value}</div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1 font-mono uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Everything you need, zero distractions.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-zinc-400">
            Ditch multiple bloated trackers. One unified local operating workspace engineered exclusively for cognitive focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-950 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-zinc-200">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-6">
                <div className="w-full h-px bg-zinc-900" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-zinc-950 bg-zinc-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-sans font-bold text-zinc-50 select-none">Pricing models designed for builders</h2>
            <div className="mt-4 inline-flex items-center gap-1.5 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-3 py-1 text-xs rounded transition-all ${billingCycle === "monthly" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-3 py-1 text-xs rounded transition-all ${billingCycle === "yearly" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8">
            {/* Tier 1 */}
            <div className="p-8 border border-zinc-850 rounded-2xl bg-zinc-950/50 flex flex-col justify-between relative">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200">Open-Source Core</h3>
                    <p className="text-xs text-zinc-500 mt-1">Fully self-hosted node</p>
                  </div>
                  <span className="px-2 py-0.5 border border-zinc-800 text-[10px] text-zinc-400 font-mono rounded-full uppercase">Docker v1</span>
                </div>
                <div className="mt-6 flex items-baseline text-zinc-200">
                  <span className="text-3xl font-extrabold tracking-tight">$0</span>
                  <span className="ml-1 text-xs text-zinc-500">forever, self-managed</span>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-zinc-400">Best for private hackers, homelab enthusiasts, and privacy-first builders.</p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Private Docker container architecture</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Limitless tasks and checklists</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Unlimited routine timeline sets</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Secure Local Storage database</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onLaunch}
                className="mt-8 w-full py-3 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-semibold rounded-lg text-xs transition uppercase tracking-wider cursor-pointer"
              >
                Launch Self-Managed Core
              </button>
            </div>

            {/* Tier 2 */}
            <div className="p-8 border-2 border-indigo-500 rounded-2xl bg-zinc-950 flex flex-col justify-between relative shadow-lg shadow-indigo-500/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase">
                Most Popular
              </div>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-50">RoutineOS Pro</h3>
                    <p className="text-xs text-indigo-300 mt-1">Direct Cloud Workstation</p>
                  </div>
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-[10px] text-indigo-300 font-mono rounded-full uppercase font-medium">Synced</span>
                </div>
                <div className="mt-6 flex items-baseline text-zinc-50">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {billingCycle === "yearly" ? "$12" : "$15"}
                  </span>
                  <span className="ml-1 text-xs text-zinc-500">/ user / mo</span>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-zinc-400">Perfect for heavy freelancers, content creators, and cross-device sync tasks.</p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Cloud database cloud-level backup & sync</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Advanced AI Planning & coaching endpoints</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Multi-platform creator draft planners</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Advanced SVG weekly analytics heatmaps</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onLaunch}
                className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition uppercase tracking-wider shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                Try RoutineOS Pro Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub & Open Source section */}
      <section id="open-source" className="py-24 max-w-5xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 border border-zinc-900 rounded-3xl bg-zinc-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-indigo-500/5 rounded-full blur-2xl" />

          <Github className="w-10 h-10 mx-auto text-zinc-400 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">Independent. Private. Self-Hostable.</h2>
          <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            RoutineOS is designed with native support for standard Docker pipelines and simple database models. Connect to any standard PostgreSQL container node and stay private.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="p-2 border border-zinc-900 bg-zinc-950 text-xs text-zinc-400 font-mono rounded">
              docker compose up -d
            </span>
            <span className="p-2 border border-zinc-900 bg-zinc-950 text-xs text-zinc-400 font-mono rounded">
              npx prisma db push
            </span>
            <span className="p-2 border border-zinc-900 bg-zinc-950 text-xs text-zinc-400 font-mono rounded">
              npm run build
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-zinc-50 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-zinc-900 bg-zinc-950/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex justify-between items-center bg-zinc-950/30 hover:bg-zinc-950/50 transition duration-200"
              >
                <span className="text-xs sm:text-sm font-semibold text-zinc-300">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-all ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 py-4 border-t border-zinc-900 text-xs text-zinc-400 leading-relaxed bg-black/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer block */}
      <footer className="py-12 border-t border-zinc-900 text-center text-xs text-zinc-500 max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">R</div>
            <span className="font-mono text-zinc-400">RoutineOS</span>
          </div>
          <div>
            <span>© 2026 RoutineOS, INC. Released under MIT Workspace.</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com" className="hover:text-zinc-300">GitHub</a>
            <span className="text-zinc-[800] select-none">•</span>
            <a href="#features" className="hover:text-zinc-300">Docs</a>
            <span className="text-zinc-[800] select-none">•</span>
            <button onClick={onLaunch} className="hover:text-zinc-300 text-indigo-400">Launcher</button>
          </div>
        </div>
      </footer>

      {/* Interactive Google accounts chooser modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 transition-all animate-fade-in">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Modal close */}
            <button
              onClick={() => {
                if (!isAuthSigningIn) {
                  setShowGoogleModal(false);
                  setShowCustomForm(false);
                }
              }}
              disabled={isAuthSigningIn}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors p-1.5 hover:bg-zinc-900 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {isAuthSigningIn ? (
              <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[350px]">
                {/* Simulated Google Spinner loader */}
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-900" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-purple-500 animate-spin" />
                  <div className="absolute inset-2 bg-zinc-950 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 animate-pulse select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18V4.19C.79 6.96 0 10.13 0 13.52c0 3.39.79 6.56 2.18 9.33l3.66-2.84c-.22-.66-.35-1.36-.35-2.11z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-zinc-200 font-semibold tracking-tight text-xs">Signing in with Google Auth</h3>
                <p className="text-zinc-400 text-[10px] font-mono mt-1.5 select-none">{signingInUser}</p>
                
                <div className="mt-6 px-4 py-2 border border-zinc-900 bg-zinc-900/40 rounded-lg text-[9px] text-zinc-500 font-mono truncate max-w-xs">
                  🔑 client_token_exchange_success (JWT V1)
                </div>
              </div>
            ) : showCustomForm ? (
              <div className="p-6">
                {/* Header Google Identity */}
                <div className="flex flex-col items-center text-center mt-2 mb-6">
                  <svg className="w-8 h-8 mb-2.5 select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18V4.19C.79 6.96 0 10.13 0 13.52c0 3.39.79 6.56 2.18 9.33l3.66-2.84c-.22-.66-.35-1.36-.35-2.11z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <h3 className="text-zinc-100 font-bold text-xs select-none">Add Google Account</h3>
                  <p className="text-zinc-500 text-[10px] mt-0.5 select-none">Enter custom developer or workstation credentials</p>
                </div>

                <form onSubmit={handleCustomGoogleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[9px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Farhan Kabir"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-zinc-900 hover:bg-zinc-900/80 border border-zinc-800 text-xs p-2.5 text-zinc-200 rounded-lg outline-none focus:border-indigo-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Google Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., farhankabir236@gmail.com"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full bg-zinc-900 hover:bg-zinc-900/80 border border-zinc-800 text-xs p-2.5 text-zinc-200 rounded-lg outline-none focus:border-indigo-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Workstation Role</label>
                    <select
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 text-zinc-200 rounded-lg outline-none focus:border-indigo-600 transition cursor-pointer"
                    >
                      <option value="Developer / Engineer">Developer / Engineer</option>
                      <option value="Student / Researcher">Student / Researcher</option>
                      <option value="Content Creator / Writer">Content Creator / Writer</option>
                      <option value="Founder / Freelancer">Founder / Freelancer</option>
                    </select>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCustomForm(false)}
                      className="flex-1 py-2 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Authorize</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6">
                {/* Header Google Identity */}
                <div className="flex flex-col items-center text-center mt-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-md mb-2.5">
                    <svg className="w-5 h-5 select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18V4.19C.79 6.96 0 10.13 0 13.52c0 3.39.79 6.56 2.18 9.33l3.66-2.84c-.22-.66-.35-1.36-.35-2.11z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <h3 className="text-zinc-100 font-bold text-xs tracking-tight select-none">Sign In with Google</h3>
                  <p className="text-zinc-500 text-[10px] mt-0.5 select-none">Select an active Google account to grant RoutineOS access</p>
                </div>

                {/* Account items list */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {googleAccountsList.map((acc, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectGoogleAccount(acc)}
                      className="w-full text-left p-2.5 rounded-xl border border-zinc-900 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-800 transition flex items-center gap-3 group cursor-pointer"
                    >
                      <div className={`w-7.5 h-7.5 rounded-full bg-gradient-to-tr ${acc.avatarColor} flex items-center justify-center font-bold text-xs text-white`}>
                        {acc.name[0]}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <span className="text-xs font-semibold text-zinc-300 group-hover:text-zinc-100 block truncate">
                          {acc.name}
                        </span>
                        <span className="text-[9.5px] text-zinc-500 font-mono tracking-tight block truncate">
                          {acc.email}
                        </span>
                      </div>
                      {acc.email === "farhankabir236@gmail.com" && (
                        <span className="text-[8px] font-bold text-indigo-400 bg-indigo-950/60 px-1 py-0.5 rounded border border-indigo-900/40 uppercase">
                          FARHAN
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Use custom account switch */}
                <div className="mt-4 pt-3 border-t border-zinc-900/80">
                  <button
                    onClick={() => setShowCustomForm(true)}
                    className="w-full py-2 font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800 rounded-lg text-[11px] transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Use another Google account</span>
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[9px] text-zinc-650 text-zinc-500 font-mono flex items-center justify-center gap-1 select-none">
                    <ShieldCheck className="w-3 h-3 text-indigo-500 inline" />
                    <span>Authorized Google Secure API loop</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
