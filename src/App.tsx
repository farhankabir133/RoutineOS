import { useState, useEffect, useRef, FormEvent } from "react";
import {
  Zap,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Clock,
  Youtube,
  BookOpen,
  Github,
  Award,
  ArrowRight,
  Plus,
  Trash2,
  Search,
  Check,
  User,
  Sliders,
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
  Calendar,
  Send,
  Download,
  Share2,
  BarChart2,
  Flame,
  LayoutGrid,
  TrendingUp,
  ExternalLink,
  MapPin,
  ListTodo,
  AlertTriangle,
  LogOut,
  ChevronRight,
  Pin
} from "lucide-react";

import { Task, Habit, Routine, Note, CreatorProject, Achievement, UserStats, OnboardingData, KanbanColumn, Priority, CreatorPlatform } from "./types";
import LandingPage from "./components/LandingPage";
import OnboardingFlow from "./components/OnboardingFlow";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function App() {
  // Navigation & States
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Seed Data Trigger
  const [userProfile, setUserProfile] = useState<OnboardingData | null>(() => {
    const saved = localStorage.getItem("routineos_profile");
    return saved ? JSON.parse(saved) : null;
  });

  // Level & XP Stats
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem("routineos_stats");
    return saved ? JSON.parse(saved) : { xp: 120, level: 1, totalFocusedMinutes: 45, streakDays: 12 };
  });

  // Core Arrays
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("routineos_tasks");
    return saved ? JSON.parse(saved) : [
      { id: "t-1", title: "Record preview video template", priority: "high", isCompleted: false, column: "todo", tags: ["Creator"], subtasks: [{ id: "s-1", title: "Write key Hook Script", isCompleted: true }, { id: "s-2", title: "Configure ring light setup", isCompleted: false }] },
      { id: "t-2", title: "Integrate server-side proxy route APIs", priority: "high", isCompleted: true, column: "done", tags: ["Sprint"], subtasks: [] },
      { id: "t-3", title: "Optimize tailwind responsive viewport grid", priority: "medium", isCompleted: false, column: "in_progress", tags: ["Sprint"], subtasks: [] },
      { id: "t-4", title: "Set up homelab Docker compose instructions", priority: "low", isCompleted: false, column: "review", tags: ["Life Admin"], subtasks: [] }
    ];
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem("routineos_habits");
    return saved ? JSON.parse(saved) : [
      { id: "h-1", title: "Read technical docs 30m", category: "Reading", streak: 5, history: ["2026-05-26", "2026-05-25"], targetFrequency: 5 },
      { id: "h-2", title: "Zero refined sugars", category: "Health", streak: 12, history: ["2026-05-26", "2026-05-25", "2026-05-24"], targetFrequency: 7 },
      { id: "h-3", title: "Hydrate morning water", category: "Health", streak: 3, history: ["2026-05-26"], targetFrequency: 7 }
    ];
  });

  const [routines, setRoutines] = useState<Routine[]>(() => {
    const saved = localStorage.getItem("routineos_routines");
    return saved ? JSON.parse(saved) : [
      {
        id: "r-morning",
        title: "Morning Coding Sprint",
        tagline: "High-concentration protocol for active dev cycles",
        color: "blue",
        currentStepIndex: 1,
        elapsedSeconds: 0,
        isRunning: false,
        historyCount: 14,
        steps: [
          { id: "rs-1", title: "Inbox clearing & prioritize tasks", durationMinutes: 10, isCompleted: true, notes: "Archive all stale prompts from workspace" },
          { id: "rs-2", title: "Refactor API client controllers", durationMinutes: 45, isCompleted: false, notes: "Ensure proper error catch blocks are implemented" },
          { id: "rs-3", title: "Write Docker production Dockerfile", durationMinutes: 15, isCompleted: false, notes: "Verify base image Alpine footprint" }
        ]
      },
      {
        id: "r-evening",
        title: "Evening Wind Down & Journaling",
        tagline: "Unload cognitive stack & prepare tomorrow's plan",
        color: "emerald",
        currentStepIndex: 0,
        elapsedSeconds: 0,
        isRunning: false,
        historyCount: 6,
        steps: [
          { id: "rs-4", title: "Clear project local workspace notes", durationMinutes: 10, isCompleted: false, notes: "Put any active drafts into Idea Inbox" },
          { id: "rs-5", title: "10-minute breath with ambient music", durationMinutes: 10, isCompleted: false, notes: "Turn on Forest Rain track" }
        ]
      }
    ];
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("routineos_notes");
    return saved ? JSON.parse(saved) : [
      { id: "n-1", title: "RoutineOS Architecture Blueprint", content: "## Core Strategy\nUse LocalStorage first layout in UI, with server-side proxy handles the Gemini model stream pipeline so users never leak developer keys. MIT licensed.", isPinned: true, tags: ["Sprint"], updatedAt: "2026-05-27" },
      { id: "n-2", title: "Ideas: YouTube Creator scripts", content: "- Speed coding with Tailwind v4 is extremely premium.\n- Focus on local-first database models for extreme privacy.", isPinned: false, tags: ["Creator"], updatedAt: "2026-05-26" }
    ];
  });

  const [creatorProjects, setCreatorProjects] = useState<CreatorProject[]>(() => {
    const saved = localStorage.getItem("routineos_creator");
    return saved ? JSON.parse(saved) : [
      { id: "cp-1", platform: "youtube", title: "How I built RoutineOS - Dev Vlog", status: "scripting", notes: "Focus on visual demonstrations of the routine timers and interactive workspace layouts.", checklist: [{ title: "Draft thumbnail sketches", checked: true }, { title: "Draft A-roll outline", checked: false }, { title: "Confirm local docker builds", checked: true }] },
      { id: "cp-2", platform: "linkedin", title: "The power of micro routines in morning focus", status: "draft", notes: "Share stats on how sequencing habits prevents visual distraction.", checklist: [{ title: "Engage with 10 engineering posts", checked: false }] }
    ];
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "ach-1", title: "SaaS Pioneer", description: "Successfully launched RoutineOS desktop workstation first time", icon: "Rocket", unlockedAt: "2026-05-27", xpReward: 100 },
    { id: "ach-2", title: "Zen Master Focus", description: "Complete your first deep work Pomodoro focus session block", icon: "Clock", xpReward: 150 },
    { id: "ach-3", title: "Consistent Rituals", description: "Maintain a 14-day routine completion cycle streak", icon: "Award", xpReward: 250 },
    { id: "ach-4", title: "AI Guided Momentum", description: "Deploy automated daily planning sequence via Gemini prompts", icon: "Sparkles", xpReward: 150 }
  ]);

  // Modals / Input variables
  const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium");
  const [newTaskTag, setNewTaskTag] = useState<string>("Sprint");

  // Focus Timer Pomodoro States
  const [pomoMinutes, setPomoMinutes] = useState<number>(25);
  const [pomoSeconds, setPomoSeconds] = useState<number>(0);
  const [pomoIsRunning, setPomoIsRunning] = useState<boolean>(false);
  const [selectedAmbientAudio, setSelectedAmbientAudio] = useState<string>("none");
  const [volumeLevel, setVolumeLevel] = useState<number>(50);
  const [pomoCount, setPomoCount] = useState<number>(0);

  // Notes state
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>("n-1");
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [noteEditTitle, setNoteEditTitle] = useState<string>("");
  const [noteEditContent, setNoteEditContent] = useState<string>("");

  // Creator state
  const [showNewProjectModal, setShowNewProjectModal] = useState<boolean>(false);
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectPlatform, setNewProjectPlatform] = useState<CreatorPlatform>("youtube");

  // Settings Simulation
  const [userNotificationAlerts, setUserNotificationAlerts] = useState<boolean>(true);
  const [userTimezone, setUserTimezone] = useState<string>("UTC+6 (Dhaka)");

  // AI Assistant Chat state
  const [aiHistory, setAiHistory] = useState<{ sender: "user" | "ai"; text: string; time: string }[]>([
    { sender: "ai", text: "Ready to run your productive life with RoutineOS. Send any query or click 'AI Plan Today' below to build custom cognitive time blocks.", time: "11:57 AM" }
  ]);
  const [aiInputMessage, setAiInputMessage] = useState<string>("");
  const [isAiPlanningLoading, setIsAiPlanningLoading] = useState<boolean>(false);
  const [aiPlanData, setAiPlanData] = useState<any | null>(null);

  // Audio simulation elements (web-audio ambient simulation)
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("routineos_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("routineos_habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("routineos_routines", JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem("routineos_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("routineos_creator", JSON.stringify(creatorProjects));
  }, [creatorProjects]);

  useEffect(() => {
    localStorage.setItem("routineos_stats", JSON.stringify(stats));
  }, [stats]);

  // Trigger Onboarding if no profile detected
  useEffect(() => {
    if (!userProfile) {
      setShowLanding(true);
    }
  }, [userProfile]);

  // Active Timers logic
  // 1. Pomodoro Focus Timer
  useEffect(() => {
    let interval: any = null;
    if (pomoIsRunning) {
      interval = setInterval(() => {
        if (pomoSeconds > 0) {
          setPomoSeconds(prev => prev - 1);
        } else if (pomoSeconds === 0) {
          if (pomoMinutes > 0) {
            setPomoMinutes(prev => prev - 1);
            setPomoSeconds(59);
          } else {
            // Timer expired!
            handleXPAndProgress(150, "Completed a Pomodoro focus sprint!");
            setPomoCount(prev => prev + 1);
            setPomoIsRunning(false);
            setPomoMinutes(25);
            setPomoSeconds(0);
            playAlertTones(800, 0.4, 200, 3);
            alert("Pomodoro timer completed! Take a 5-minute cognitive rest block.");
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pomoIsRunning, pomoMinutes, pomoSeconds]);

  // 2. Active Routine step tracking duration timer
  useEffect(() => {
    const activeRoutine = routines.find(r => r.isRunning);
    if (!activeRoutine) return;

    const interval = setInterval(() => {
      setRoutines(prev =>
        prev.map(r => {
          if (r.id === activeRoutine.id) {
            const currentStep = r.steps[r.currentStepIndex];
            const maxSeconds = currentStep ? currentStep.durationMinutes * 60 : 3600;

            const incrementedSeconds = r.elapsedSeconds + 1;
            if (incrementedSeconds >= maxSeconds) {
              // Auto-advance step!
              const nextIndex = r.currentStepIndex + 1;
              if (nextIndex < r.steps.length) {
                // Auto complete current step
                const updatedSteps = [...r.steps];
                updatedSteps[r.currentStepIndex] = { ...currentStep, isCompleted: true };
                return {
                  ...r,
                  steps: updatedSteps,
                  currentStepIndex: nextIndex,
                  elapsedSeconds: 0,
                  isRunning: nextIndex < r.steps.length
                };
              } else {
                // Done with all steps!
                const updatedSteps = r.steps.map(s => ({ ...s, isCompleted: true }));
                handleXPAndProgress(250, `Finished routine: ${r.title}`);
                return {
                  ...r,
                  steps: updatedSteps,
                  currentStepIndex: 0,
                  elapsedSeconds: 0,
                  isRunning: false,
                  historyCount: r.historyCount + 1
                };
              }
            }
            return {
              ...r,
              elapsedSeconds: incrementedSeconds
            };
          }
          return r;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [routines]);

  // Safe sound player (Beep synthesizer)
  const playAlertTones = (frequency = 600, typeValue = 0.2, durationMs = 150, repeatTimes = 1) => {
    try {
      if (isAudioMuted) return;
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      let count = 0;
      const interval = setInterval(() => {
        if (count >= repeatTimes) {
          clearInterval(interval);
          return;
        }

        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency + (count * 150), ctx.currentTime);
        gain.gain.setValueAtTime(typeValue, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (durationMs / 1000));

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + (durationMs / 1000));

        count++;
      }, durationMs + 50);
    } catch (e) {
      console.warn("Audio Context init stalled inside preview iframe.", e);
    }
  };

  // Synthesize soft ambient background textures loop (simulates white noise / pink noise in browser)
  const toggleAmbientSoundSynth = (soundType: string) => {
    try {
      if (soundType === "none" || soundType === "") {
        if (oscillatorNodeRef.current) {
          oscillatorNodeRef.current.stop();
          oscillatorNodeRef.current = null;
        }
        return;
      }

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      if (oscillatorNodeRef.current) {
        oscillatorNodeRef.current.stop();
        oscillatorNodeRef.current = null;
      }

      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Configure frequencies for different themes
      if (soundType === "forest") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, ctx.currentTime); // low deep vibration
      } else if (soundType === "waves") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(95, ctx.currentTime); // oceanic deep bass wave
      } else if (soundType === "autumn") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime); // soothing autumn wind
      } else if (soundType === "synth") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(80, ctx.currentTime); // synthwave ambient bass loop
      }

      const calculatedVolume = (volumeLevel / 100) * 0.15; // keep extremely soft and soothing
      gain.gain.setValueAtTime(calculatedVolume, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.loop = true;

      oscillatorNodeRef.current = osc;
      gainNodeRef.current = gain;
    } catch (err) {
      console.warn("Ambient Audio loop could not initiate inside preview sandboxed container", err);
    }
  };

  // Sound Synth Volume adjuster
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      const calculatedVolume = (volumeLevel / 100) * 0.15;
      gainNodeRef.current.gain.setValueAtTime(calculatedVolume, audioContextRef.current.currentTime);
    }
  }, [volumeLevel]);

  // XP Progress & Badge trigger level updates
  const handleXPAndProgress = (points: number, reason: string) => {
    playAlertTones(750, 0.25, 200, 2);
    setStats(prev => {
      const totalXp = prev.xp + points;
      const nextLevel = Math.floor(totalXp / 500) + 1;
      const leveledUp = nextLevel > prev.level;

      if (leveledUp) {
        setTimeout(() => {
          alert(`🎉 LEVEL UNLOCKED! You are now Level ${nextLevel}! Carry on the streak.`);
        }, 150);
      }

      return {
        ...prev,
        xp: totalXp,
        level: nextLevel
      };
    });

    // Notify user of completion alert
    const newAlert = { sender: "ai" as const, text: `✓ Gained +${points} XP: ${reason}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAiHistory(prev => [...prev, newAlert]);
  };

  // Seed tasks and habits matching onboarding selection
  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserProfile(data);
    localStorage.setItem("routineos_profile", JSON.stringify(data));
    setShowOnboarding(false);
    setShowLanding(false);

    // Seed tailored tasks matching role
    const seedTasks: Task[] = [
      { id: "st-1", title: `Review ${data.role} launch workflow docs`, priority: "high", isCompleted: false, column: "todo", tags: [data.categories[0]], subtasks: [] },
      { id: "st-2", title: `Establish preferred timing sequence: ${data.preferredRoutineTimes.join(", ") || "morning"}`, priority: "medium", isCompleted: false, column: "todo", tags: [data.categories[1] || "Sprint"], subtasks: [] },
      { id: "st-3", title: "Review MIT self-hosting installation guide", priority: "low", isCompleted: true, column: "done", tags: ["Sprint"], subtasks: [] }
    ];
    setTasks(seedTasks);

    // Seed healthy habits
    const seedHabits: Habit[] = [
      { id: "sh-1", title: "Execute tailored Routine Block", category: data.categories[0], streak: 1, history: [new Date().toISOString().split("T")[0]], targetFrequency: 5 },
      { id: "sh-2", title: "Complete focus session interval", category: "Health", streak: 0, history: [], targetFrequency: 7 }
    ];
    setHabits(seedHabits);

    handleXPAndProgress(200, "RoutineOS onboarding completed successfully!");
  };

  // Launch app setup flow
  const handleLaunchButton = () => {
    if (userProfile) {
      setShowLanding(false);
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
      setShowLanding(false);
    }
  };

  // Google interactive Sign-In handler
  const handleGoogleSignIn = (profile: { name: string; email: string; role: string }) => {
    // Recommend customized tracker coordinates
    let recommendedGoals: string[] = [
      "Establish consistent coding & learning rituals",
      "Strengthen deep work focus endurance"
    ];
    let recommendedCategories: string[] = ["Sprint", "Health", "Reading", "Life Admin"];

    if (profile.role.includes("Creator") || profile.role.includes("Writer")) {
      recommendedGoals = [
        "Schedule YouTube & writing blueprints",
        "Capture markdown brainstorm ideas",
        "Strengthen deep work focus endurance"
      ];
      recommendedCategories = ["Creator", "Sprint", "Reading", "Life Admin"];
    } else if (profile.role.includes("Researcher") || profile.role.includes("Student")) {
      recommendedGoals = [
        "Establish consistent coding & learning rituals",
        "Capture markdown brainstorm ideas",
        "Strengthen deep work focus endurance"
      ];
      recommendedCategories = ["Reading", "Sprint", "Health", "Life Admin"];
    }

    const newProfile: OnboardingData = {
      role: profile.role,
      goals: recommendedGoals,
      preferredRoutineTimes: ["morning", "afternoon"],
      categories: recommendedCategories,
      completed: true,
      name: profile.name,
      email: profile.email
    };

    setUserProfile(newProfile);
    localStorage.setItem("routineos_profile", JSON.stringify(newProfile));

    // Award sign-in bonus XP!
    handleXPAndProgress(150, `Successfully signed in with Google as ${profile.name}!`);

    // Launch workstation safely
    setShowLanding(false);
    setShowOnboarding(false);
  };

  // Sign out of current workstation session
  const handleSignOut = () => {
    localStorage.removeItem("routineos_profile");
    setUserProfile(null);
    setShowLanding(true);
    setShowOnboarding(false);
    // Beep sound on logging out
    playAlertTones(450, 0.2, 120, 2);
  };

  // Clean / Clear setup for demo
  const handleResetData = () => {
    if (confirm("Reset RoutineOS client storage? This clears all custom routines, tasks, habits, and level indicators.")) {
      localStorage.removeItem("routineos_profile");
      localStorage.removeItem("routineos_tasks");
      localStorage.removeItem("routineos_habits");
      localStorage.removeItem("routineos_routines");
      localStorage.removeItem("routineos_notes");
      localStorage.removeItem("routineos_creator");
      localStorage.removeItem("routineos_stats");
      window.location.reload();
    }
  };

  // Kanban tasks logic helpers
  const handleCreateNewTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      priority: newTaskPriority,
      isCompleted: false,
      column: "todo",
      tags: [newTaskTag],
      subtasks: []
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle("");
    setShowNewTaskModal(false);
    handleXPAndProgress(30, `Added task: "${newTask.title}"`);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleToggleTaskChecked = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const checked = !t.isCompleted;
        if (checked) {
          handleXPAndProgress(40, `Cleared task: "${t.title}"`);
        }
        return { ...t, isCompleted: checked, column: (checked ? "done" : "todo") as KanbanColumn };
      }
      return t;
    }));
  };

  const moveTaskColumn = (taskId: string, targetCol: KanbanColumn) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const wasCompletedBefore = t.isCompleted;
        const nowCompleted = targetCol === "done";
        if (nowCompleted && !wasCompletedBefore) {
          handleXPAndProgress(45, `Moved task "${t.title}" to Complete`);
        }
        return {
          ...t,
          column: targetCol,
          isCompleted: nowCompleted
        };
      }
      return t;
    }));
  };

  // Habits trigger completion toggle for today (Local date)
  const handleCompleteHabitForToday = (habitId: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        if (h.history.includes(todayStr)) {
          // Uncheck
          const filteredHistory = h.history.filter(d => d !== todayStr);
          return {
            ...h,
            streak: Math.max(0, h.streak - 1),
            history: filteredHistory
          };
        } else {
          // Complete
          handleXPAndProgress(50, `Completed daily habit: ${h.title}`);
          return {
            ...h,
            streak: h.streak + 1,
            history: [...h.history, todayStr]
          };
        }
      }
      return h;
    }));
  };

  // Generate 30-day habit streak trends for Recharts LineChart
  const getHabitStreakTrends = () => {
    const dates: { dateStr: string; label: string }[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dates.push({ dateStr, label });
    }

    return dates.map(({ dateStr, label }) => {
      const row: Record<string, any> = { name: label, date: dateStr };
      let totalStreak = 0;

      habits.forEach((habit) => {
        // Find consecutive days ending at dateStr
        let streakCount = 0;
        let checkDate = new Date(dateStr);

        for (let j = 0; j < 30; j++) {
          const checkStr = checkDate.toISOString().split("T")[0];
          const oldestHistoryStr = habit.history.length > 0
            ? habit.history.reduce((min, d) => d < min ? d : min, "9999-12-31")
            : "9999-12-31";
          
          let completed = habit.history.includes(checkStr);
          if (!completed && checkStr < oldestHistoryStr) {
            // Extrapolate past streak for visualization if within streak window
            const checkMs = new Date(checkStr).getTime();
            const oldestMs = new Date(oldestHistoryStr).getTime();
            const dayDiff = Math.round((oldestMs - checkMs) / (1000 * 60 * 60 * 24));
            
            const remainingStreak = habit.streak - habit.history.length;
            if (dayDiff > 0 && dayDiff <= remainingStreak) {
              completed = true;
            }
          }

          if (completed) {
            streakCount++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        row[habit.title] = streakCount;
        totalStreak += streakCount;
      });

      row["Average Streak"] = habits.length > 0 ? parseFloat((totalStreak / habits.length).toFixed(1)) : 0;
      return row;
    });
  };

  // Custom tooltips for Recharts
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-zinc-800 px-3.5 py-2.5 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-[11px] font-mono font-bold text-zinc-400 mb-2 border-b border-zinc-900 pb-1 uppercase tracking-wider">{label}</p>
          <div className="space-y-1.5 font-sans">
            {payload.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 justify-between min-w-[150px]">
                <div className="flex items-center gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] text-zinc-300 font-medium truncate max-w-[120px]">{item.name}</span>
                </div>
                <span className="text-[11px] font-mono font-bold" style={{ color: item.color }}>
                  {item.value}d
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Routine Timers control
  const handleStartRoutine = (routineId: string) => {
    // Pause other running routines
    setRoutines(prev => prev.map(r => {
      if (r.id === routineId) {
        playAlertTones(660, 0.2, 180, 1);
        return { ...r, isRunning: !r.isRunning };
      }
      return { ...r, isRunning: false };
    }));
  };

  const handleResetRoutineToStart = (routineId: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.id === routineId) {
        return {
          ...r,
          currentStepIndex: 0,
          elapsedSeconds: 0,
          isRunning: false,
          steps: r.steps.map(s => ({ ...s, isCompleted: false }))
        };
      }
      return r;
    }));
  };

  const handleCompleteActiveRoutineStep = (routineId: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.id === routineId) {
        const nextIdx = r.currentStepIndex + 1;
        const updatedSteps = [...r.steps];
        if (updatedSteps[r.currentStepIndex]) {
          updatedSteps[r.currentStepIndex].isCompleted = true;
        }

        if (nextIdx < r.steps.length) {
          handleXPAndProgress(60, `Completed step in "${r.title}"`);
          return {
            ...r,
            currentStepIndex: nextIdx,
            elapsedSeconds: 0,
            isRunning: true,
            steps: updatedSteps
          };
        } else {
          // Finished routine entirely
          handleXPAndProgress(180, `Completed core routine: "${r.title}"`);
          return {
            ...r,
            currentStepIndex: 0,
            elapsedSeconds: 0,
            isRunning: false,
            steps: updatedSteps,
            historyCount: r.historyCount + 1
          };
        }
      }
      return r;
    }));
  };

  // Notes drafting handles
  const handleSaveActiveNote = () => {
    if (!selectedNoteId) return;
    setNotes(prev => prev.map(n => {
      if (n.id === selectedNoteId) {
        return {
          ...n,
          title: noteEditTitle,
          content: noteEditContent,
          updatedAt: new Date().toISOString().split("T")[0]
        };
      }
      return n;
    }));
    handleXPAndProgress(25, "Saved markdown progress target");
  };

  const handleCreateEmptyNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim() ? newNoteTitle : "Untitled Cognitive Capture",
      content: "# Captured Idea\nWrite standard markdown specifications here...",
      isPinned: false,
      tags: ["Inbox"],
      updatedAt: new Date().toISOString().split("T")[0]
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    setNoteEditTitle(newNote.title);
    setNoteEditContent(newNote.content);
    setNewNoteTitle("");
    handleXPAndProgress(30, `Added Markdown Note: "${newNote.title}"`);
  };

  // Creator checklist handles
  const handleCreateCreatorProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    const baseChecklist = newProjectPlatform === "youtube"
      ? [
          { title: "Define hook (First 15s)", checked: false },
          { title: "Review thumbnail pacing reference", checked: false },
          { title: "Complete high density scripts draft", checked: false },
          { title: "Configure sound output checks", checked: false }
        ]
      : newProjectPlatform === "linkedin"
      ? [
          { title: "Draft hooks options", checked: false },
          { title: "Check mobile vertical line splits", checked: false },
          { title: "Schedule inside Buffer template", checked: false }
        ]
      : [
          { title: "Outline standard index sections", checked: false },
          { title: "Write initial introduction introduction", checked: false },
          { title: "Proofread & count word targets", checked: false }
        ];

    const cp: CreatorProject = {
      id: `creator-${Date.now()}`,
      platform: newProjectPlatform,
      title: newProjectTitle,
      status: "idea",
      notes: "Edit project specifications or reference outline notes directly.",
      checklist: baseChecklist
    };

    setCreatorProjects(prev => [cp, ...prev]);
    setNewProjectTitle("");
    setShowNewProjectModal(false);
    handleXPAndProgress(40, `Created content matrix: ${cp.title}`);
  };

  const toggleCreatorChecklistItem = (projectId: string, checklistIndex: number) => {
    setCreatorProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updated = [...p.checklist];
        updated[checklistIndex].checked = !updated[checklistIndex].checked;
        if (updated[checklistIndex].checked) {
          handleXPAndProgress(20, `Checked content task: ${updated[checklistIndex].title}`);
        }
        return {
          ...p,
          checklist: updated
        };
      }
      return p;
    }));
  };

  const updateCreatorStepStatus = (projectId: string, newStatus: any) => {
    setCreatorProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  // AI Assistant Plan handler contacting `/api/gemini/plan` or using fallback response
  const handleAITaskPlan = async () => {
    setIsAiPlanningLoading(true);
    setAiPlanData(null);
    try {
      const resp = await fetch("/api/gemini/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentTasks: tasks,
          habits: habits,
          routines: routines,
          userProfile: userProfile
        })
      });
      const resData = await resp.json();
      if (resData.success) {
        setAiPlanData(resData.data);
        handleXPAndProgress(80, "Loaded AI Productivity Roadmap recommendations");
      } else {
        throw new Error(resData.error || "Proxy failed");
      }
    } catch (e) {
      console.warn("Falling back to simulated prompt pipeline on front-end engine.", e);
      // Local fallback in case server encounters issue
      setAiPlanData({
        prioritizedTasks: tasks.map((t, idx) => ({
          id: t.id,
          reason: idx === 0 ? "Blocks high priority release of project features." : "Secures active sprint momentum.",
          suggestedPriority: idx === 0 ? "high" : "medium"
        })),
        suggestedRoutines: [
          { name: "Pomodoro Block 1", time: "09:30 AM", steps: ["Check Slack inbox", "Read spec documentation", "90m coding burst"], reason: "Aligns with your highest productivity hours." }
        ],
        timeBlocks: [
          { block: "10:00 AM - 12:30 PM", focus: "Sprint Tasks Completion Block" },
          { block: "03:00 PM - 04:30 PM", focus: "Creator Scripts & Idea Review" }
        ],
        coachingQuote: "Small incremental micro-routines yield heavy long-term stack compound interests."
      });
    } finally {
      setIsAiPlanningLoading(false);
    }
  };

  // AI Assistant Chat interactive prompt
  const handleSendAiPrompt = async (e: FormEvent) => {
    e.preventDefault();
    if (!aiInputMessage.trim()) return;

    const userMessage = aiInputMessage;
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAiHistory(prev => [...prev, { sender: "user", text: userMessage, time: timestampStr }]);
    setAiInputMessage("");

    // Temporary streaming indicator
    setAiHistory(prev => [...prev, { sender: "ai", text: "Analyzing your workspace goals...", time: timestampStr }]);

    try {
      const resp = await fetch("/api/gemini/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentScore: stats,
          messageHistory: aiHistory.map(m => ({ user: m.sender === "user" ? m.text : undefined, ai: m.sender === "ai" ? m.text : undefined })),
          metrics: { activeTasksCount: tasks.filter(t => !t.isCompleted).length, habitStreaks: habits.map(h => h.streak) }
        })
      });
      const resData = await resp.json();
      if (resData.success) {
        setAiHistory(prev => {
          const removedLoading = prev.filter(m => m.text !== "Analyzing your workspace goals...");
          return [...removedLoading, { sender: "ai", text: resData.text, time: timestampStr }];
        });
      } else {
        throw new Error(resData.error);
      }
    } catch (err) {
      setAiHistory(prev => {
        const removedLoading = prev.filter(m => m.text !== "Analyzing your workspace goals...");
        const fallbackText = "I suggest sorting your dashboard tasks by priority level. Try tracking reading habits or executing one micro-step from your Active Routine builder sequence right now to breaks cognitive blockages.";
        return [...removedLoading, { sender: "ai", text: fallbackText, time: timestampStr }];
      });
    }
  };

  // Real open source JSON file configuration exporter download link
  const handleExportSystemTelemetry = () => {
    const backupState = {
      profile: userProfile,
      tasks,
      habits,
      routines,
      notes,
      creatorProjects,
      stats,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupState, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `routineos_backup_${new Date().toISOString().split("T")[0]}.json`);
    dlAnchorElem.click();
    handleXPAndProgress(40, "Completed data export schema backup.");
  };

  // Load selected Note for Edit
  useEffect(() => {
    if (selectedNoteId) {
      const n = notes.find(item => item.id === selectedNoteId);
      if (n) {
        setNoteEditTitle(n.title);
        setNoteEditContent(n.content);
      }
    }
  }, [selectedNoteId]);

  // Handle Landing Toggling
  if (showLanding) {
    return <LandingPage onLaunch={handleLaunchButton} onGoogleSignIn={handleGoogleSignIn} />;
  }

  // Handle Onboarding Flow Setup Screen
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Filter tasks based on search bar upper header
  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-100 font-sans overflow-x-hidden">
      
      {/* Sidebar navigation styled exact to Sophisticated Dark template wireframe */}
      <aside className="w-64 bg-[#0c0c0e] border-r border-zinc-805 border-zinc-800 flex flex-col shrink-0">
        
        {/* Brand signature header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/40">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight select-none">
              Routine<span className="text-blue-500">OS</span>
            </span>
          </div>
          <button
            onClick={() => setShowLanding(true)}
            className="text-zinc-600 hover:text-zinc-400 text-xs py-1 px-1.5 hover:bg-zinc-900 rounded border border-zinc-900"
            title="Return to Landing Page showcase"
          >
            Landing
          </button>
        </div>

        {/* User Workspace Profiles stats */}
        <div className="mx-4 mb-6 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xs text-white">
              {userProfile?.name ? userProfile.name[0].toUpperCase() : (userProfile?.role?.[0]?.toUpperCase() || "AS")}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate text-zinc-200" title={userProfile?.name || userProfile?.role || "Indie Builder"}>
                {userProfile?.name || userProfile?.role || "Indie Builder"}
              </p>
              <p className="text-[9.5px] text-zinc-500 truncate" title={userProfile?.role || "Indie Builder"}>
                {userProfile?.name ? userProfile.role : "Indie Builder"}
              </p>
              <p className="text-[10px] text-zinc-400 font-mono tracking-tight flex items-center gap-1 mt-0.5">
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400 inline" />
                <span>{stats.streakDays} Day Streak</span>
              </p>
            </div>
          </div>
          {/* Level indicators Progress line */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>LVL {stats.level}</span>
              <span>{stats.xp % 500} / 500 XP</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${((stats.xp % 500) / 500) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Categories and elements */}
        <nav className="flex-1 px-4 space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold px-2 mb-2">Systems Workspace</div>
          
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === "dashboard"
                ? "bg-zinc-800 text-white border-l-2 border-blue-500"
                : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Dashboard Workspace</span>
          </button>

          <button
            onClick={() => setActiveTab("kanban")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === "kanban"
                ? "bg-zinc-800 text-white border-l-2 border-blue-500"
                : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
            }`}
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>Tasks Kanban ({tasks.filter(t => !t.isCompleted).length})</span>
          </button>

          <button
            onClick={() => setActiveTab("routines")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === "routines"
                ? "bg-zinc-800 text-white border-l-2 border-blue-500"
                : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Routine Stream Builder</span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === "notes"
                ? "bg-zinc-800 text-white border-l-2 border-blue-500"
                : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Brain Notes Capturer</span>
          </button>

          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold px-2 mb-2 mt-6">Creator Workspaces</div>

          <button
            onClick={() => setActiveTab("creator")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === "creator"
                ? "bg-zinc-800 text-white border-l-2 border-blue-500"
                : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>Content Planner Tracker</span>
          </button>

          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold px-2 mb-2 mt-6">Telemetry & Cloud</div>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === "settings"
                ? "bg-zinc-800 text-white border-l-2 border-blue-500"
                : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>SaaS Settings Node</span>
          </button>
        </nav>

        {/* Developer license footer info widget */}
        <div className="p-4 mt-auto border-t border-zinc-900 flex flex-col gap-3">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-900/60 hover:bg-zinc-850 hover:text-red-400 text-zinc-400 border border-zinc-800/80 transition-all cursor-pointer"
            title="Sign out of current active workstation session"
          >
            <LogOut className="w-3.5 h-3.5 text-zinc-500 hover:text-red-400" />
            <span>Sign Out Session</span>
          </button>

          <div className="bg-zinc-950 p-2 rounded-lg border border-dashed border-zinc-850">
            <span className="text-[10px] font-mono text-emerald-400 block">• DEV_NODE_CONNECTED</span>
            <span className="text-[9px] font-mono text-zinc-500 block">MIT Open Source Node v1.2</span>
          </div>
        </div>
      </aside>

      {/* Main Workstation Layout Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative">
        
        {/* Upper Search Bar & Global header action pane */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#09090b]/85 backdrop-blur-md sticky top-0 z-10 shrink-0">
          {/* Search bar helper */}
          <div className="flex items-center gap-3 bg-zinc-900/90 px-3.5 py-1.5 rounded-lg border border-zinc-800 w-[320px] sm:w-[400px]">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Quick search active sprints, tags, or guidelines..."
              className="bg-transparent text-xs text-zinc-200 focus:outline-none w-full placeholder:text-zinc-550"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="text-[9px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 font-mono uppercase tracking-widest">⌘ K</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Audio Toggle control element */}
            <button
              onClick={() => {
                setIsAudioMuted(!isAudioMuted);
                if (oscillatorNodeRef.current && !isAudioMuted) {
                  toggleAmbientSoundSynth("none");
                }
              }}
              className="p-2 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 rounded-lg transition"
              title={isAudioMuted ? "Unmute sounds" : "Mute audio focus beeps"}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
            </button>

            {/* AI smart quick-planner recommendation check */}
            <button
              onClick={handleAITaskPlan}
              disabled={isAiPlanningLoading}
              className="px-3.5 py-1.5 border border-indigo-500/30 hover:border-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 font-mono text-xs rounded-lg flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
              <span>{isAiPlanningLoading ? "Consulting AI..." : "Smart AI Plan"}</span>
            </button>

            {/* Universal Quick New Task invocation button */}
            <button
              onClick={() => setShowNewTaskModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-lg shadow-blue-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Task</span>
            </button>
          </div>
        </header>

        {/* Primary workspace layout panel view switcher */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* VIEW 1: MAIN DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-12 gap-6">
              
              {/* Left Column blocks: Timers and Sprints lists (Spans 8 cols) */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                
                {/* 1. Integrated Deep Work Section with ambient custom tones soundscapes */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-48 h-48 bg-blue-600/10 rounded-full blur-[64px]" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div>
                      <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Deep Work Pomodoro Engine</h2>
                      <p className="text-xl font-bold font-sans text-zinc-200">Sustain focused attention sprints</p>
                      
                      {/* Ambient Audio Sounds Panel selector */}
                      <div className="mt-4 flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] text-zinc-400 font-mono mr-1 uppercase">Ambient audio backdrop:</span>
                        {[
                          { id: "none", label: "Mute" },
                          { id: "forest", label: "🌲 Forest Rain" },
                          { id: "waves", label: "🌊 Oceanic Tide" },
                          { id: "autumn", label: "🍂 Autumn Breeze" },
                          { id: "synth", label: "🎹 Synth Wave" }
                        ].map(track => (
                          <button
                            key={track.id}
                            onClick={() => {
                              setSelectedAmbientAudio(track.id);
                              toggleAmbientSoundSynth(track.id);
                            }}
                            className={`px-2 py-1 text-[10px] rounded border transition ${
                              selectedAmbientAudio === track.id
                                ? "border-blue-500 bg-blue-500/10 text-blue-300"
                                : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            {track.label}
                          </button>
                        ))}
                      </div>

                      {/* Sound volume slider bar */}
                      {selectedAmbientAudio !== "none" && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-[9px] text-zinc-500 uppercase font-mono">Volume level:</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volumeLevel}
                            onChange={(e) => setVolumeLevel(Number(e.target.value))}
                            className="accent-blue-500 w-24 h-1 bg-zinc-800 rounded"
                          />
                          <span className="text-[9px] text-zinc-450 font-mono">{volumeLevel}%</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-5">
                        <button
                          onClick={() => {
                            setPomoIsRunning(!pomoIsRunning);
                            playAlertTones(700, 0.2, 150, 1);
                          }}
                          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition duration-200 flex items-center gap-1.5 cursor-pointer ${
                            pomoIsRunning
                              ? "bg-rose-600 text-white shadow-rose-900/10 hover:bg-rose-500"
                              : "bg-white text-black hover:bg-zinc-200"
                          }`}
                        >
                          {pomoIsRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                          <span>{pomoIsRunning ? "Pause Timer" : "Start Pomodoro Cycle"}</span>
                        </button>

                        <button
                          onClick={() => {
                            setPomoIsRunning(false);
                            setPomoMinutes(25);
                            setPomoSeconds(0);
                            playAlertTones(500, 0.1, 100, 1);
                          }}
                          className="p-2.5 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-xl transition"
                          title="Reset focus clock"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>

                        <div className="text-zinc-400 text-xs flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                          <span>Completed: <b className="text-zinc-200">{pomoCount} block(s) today</b></span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-right md:border-l md:border-zinc-800 md:pl-8">
                      <div className="text-6xl sm:text-7xl font-mono font-light tracking-tighter text-blue-400 select-none">
                        {String(pomoMinutes).padStart(2, "0")}:{String(pomoSeconds).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-2 uppercase font-mono tracking-wider">
                        Next break cycle in ~25m
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Plan roadmap suggestions output block (from consultations) */}
                {aiPlanData && (
                  <div className="bg-indigo-950/20 border-2 border-indigo-500/20 rounded-2xl p-5 relative">
                    <button
                      onClick={() => setAiPlanData(null)}
                      className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-300 font-mono text-xs"
                    >
                      ✕ Hide Roadmap
                    </button>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <h3 className="text-sm font-bold text-indigo-300">Gemini Cognitive Timeline Suggestion</h3>
                    </div>
                    <p className="text-xs text-indigo-200 italic mb-4">"{aiPlanData.coachingQuote}"</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black/40 p-3 rounded-lg border border-indigo-950">
                        <span className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider block mb-2">Seeded Task Allocations</span>
                        <div className="space-y-2">
                          {aiPlanData.prioritizedTasks?.map((pt: any, i: number) => (
                            <div key={i} className="text-[11px] text-zinc-300 flex items-start gap-1">
                              <span className="text-indigo-400 font-bold">•</span>
                              <div>
                                <span className="font-semibold">{pt.suggestedPriority.toUpperCase()}: </span>
                                <span>{pt.reason}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-black/40 p-3 rounded-lg border border-indigo-950">
                        <span className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider block mb-2">Suggested Hourly Routine Blocks</span>
                        <div className="space-y-2">
                          {aiPlanData.timeBlocks?.map((tb: any, i: number) => (
                            <div key={i} className="text-[11px] text-zinc-300 flex justify-between">
                              <span className="text-indigo-300 font-mono">{tb.block}</span>
                              <span className="text-zinc-400 text-right">{tb.focus}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CORE SIGNATURE ROUTINE build active timeline */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-bold text-sm text-zinc-200">Interactive Routine Timelines</h3>
                      <p className="text-[11px] text-zinc-500">Real-time task trackers & checklist transition sequence states</p>
                    </div>
                    <span className="text-[10px] bg-zinc-800 px-3 py-1 rounded text-zinc-400 font-mono uppercase">Timeline mode</span>
                  </div>

                  <div className="space-y-6">
                    {routines.map((routine) => {
                      const totalSteps = routine.steps.length;
                      const activeStep = routine.steps[routine.currentStepIndex] || null;
                      
                      return (
                        <div key={routine.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 shadow-sm relative">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${routine.color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                <h4 className="text-sm font-bold text-zinc-100">{routine.title}</h4>
                              </div>
                              <p className="text-[11px] text-zinc-400 mt-0.5">{routine.tagline}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              {routine.isRunning && (
                                <div className="text-right px-3 py-1 bg-blue-950/40 border border-blue-900 rounded text-xs font-mono text-blue-300">
                                  Step timer: {Math.floor(routine.elapsedSeconds / 60)}m {routine.elapsedSeconds % 60}s
                                </div>
                              )}

                              <button
                                onClick={() => handleStartRoutine(routine.id)}
                                className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                                  routine.isRunning
                                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                                    : "bg-blue-600 hover:bg-blue-500 text-white"
                                }`}
                              >
                                {routine.isRunning ? "Pause" : "Start Routine"}
                              </button>

                              <button
                                onClick={() => handleResetRoutineToStart(routine.id)}
                                className="px-2 py-1.5 border border-zinc-800 text-[10px] text-zinc-400 rounded hover:bg-zinc-900 font-mono"
                              >
                                Reset
                              </button>
                            </div>
                          </div>

                          {/* Chronological Visualization timeline sequence */}
                          <div className="relative pt-4 pb-2">
                            <div className="absolute left-4 right-4 h-0.5 bg-zinc-850 top-8 -translate-y-1/2 z-0" />
                            <div className="relative z-10 flex justify-between">
                              {routine.steps.map((step, sIdx) => {
                                const isPassed = sIdx < routine.currentStepIndex;
                                const isCurrent = sIdx === routine.currentStepIndex;
                                
                                return (
                                  <div key={step.id} className="flex flex-col items-center">
                                    <button
                                      onClick={() => {
                                        // Let users manual trigger to jump to step
                                        setRoutines(prev => prev.map(r => {
                                          if (r.id === routine.id) {
                                            return { ...r, currentStepIndex: sIdx, elapsedSeconds: 0 };
                                          }
                                          return r;
                                        }));
                                      }}
                                      className={`w-8 h-8 rounded-full border-4 border-[#09090b] flex items-center justify-center transition-all ${
                                        isPassed
                                          ? "bg-emerald-500 text-black border-zinc-900"
                                          : isCurrent && routine.isRunning
                                          ? "bg-blue-500 text-white ring-2 ring-blue-500/50 blink"
                                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                      }`}
                                    >
                                      {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-mono">{sIdx + 1}</span>}
                                    </button>
                                    <span className="text-[10px] text-zinc-400 font-semibold mt-2 text-center uppercase tracking-tight block max-w-[85px] truncate">
                                      {step.title}
                                    </span>
                                    <span className="text-[9px] text-zinc-650 font-mono text-zinc-500">
                                      {step.durationMinutes}m duration
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Custom sub-notes instruction guide representing current active flow step */}
                          {activeStep && routine.isRunning && (
                            <div className="mt-4 p-3 rounded-lg bg-zinc-900/60 border border-zinc-805 text-xs text-zinc-300">
                              <span className="font-mono text-[9px] uppercase tracking-wider text-blue-400 block mb-1">Active Step Specifics</span>
                              <div className="flex justify-between items-center">
                                <span>{activeStep.notes || "Establish focus workspace parameters."}</span>
                                <button
                                  onClick={() => handleCompleteActiveRoutineStep(routine.id)}
                                  className="px-2 py-1 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded hover:bg-zinc-700 font-semibold text-[10px]"
                                >
                                  Complete Step Check
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="mt-3 pt-3 border-t border-zinc-900/80 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                            <span>Completed: <b className="text-zinc-300">{routine.historyCount} times</b> over lifetime</span>
                            <span className="text-blue-400">Total metrics tracking synced</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Combined Today's Priorities Sprints & Habits Tracker side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Today's Tasks sprint checklists */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>
                        <span className="text-zinc-105 uppercase tracking-wide">Ongoing Task Workspace</span>
                      </h3>
                      <button
                        onClick={() => setActiveTab("kanban")}
                        className="text-[10px] text-zinc-550 hover:text-white uppercase font-bold"
                      >
                        Kanban View
                      </button>
                    </div>

                    <div className="space-y-3">
                      {tasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                            task.isCompleted
                              ? "bg-zinc-950/40 border-zinc-900 text-zinc-600 opacity-60"
                              : "bg-zinc-950 hover:bg-zinc-950/70 border-zinc-850"
                          }`}
                        >
                          <button
                            onClick={() => handleToggleTaskChecked(task.id)}
                            className={`w-4.5 h-4.5 rounded/md border rounded flex-shrink-0 flex items-center justify-center transition-all ${
                              task.isCompleted
                                ? "border-emerald-500 bg-emerald-500 text-black"
                                : "border-zinc-700 hover:border-blue-500"
                            }`}
                          >
                            {task.isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>

                          <div className="flex-1 overflow-hidden">
                            <span className={`text-xs truncate block ${task.isCompleted ? "line-through text-zinc-550" : "text-zinc-200"}`}>
                              {task.title}
                            </span>
                          </div>

                          {/* Priority badge indicators */}
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                            task.priority === 'high' ? 'bg-rose-950 text-rose-400 border border-rose-900' : 'bg-zinc-900 text-zinc-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      ))}

                      {tasks.length === 0 && (
                        <div className="text-center py-6 text-zinc-600 text-xs">
                          No tasks found. Use "New Task" button to seed sprints.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Daily Habits Trackers streaking */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span className="text-zinc-105 uppercase tracking-wide">Daily Mind Habits</span>
                      </h3>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">Click to toggles</span>
                    </div>

                    <div className="space-y-4">
                      {habits.map((habit) => {
                        const todayStr = new Date().toISOString().split("T")[0];
                        const isCompletedToday = habit.history.includes(todayStr);

                        return (
                          <div key={habit.id} className="flex justify-between items-center p-2 rounded-lg bg-zinc-950/50 border border-zinc-900">
                            <div>
                              <span className="text-xs text-zinc-300 font-semibold block">{habit.title}</span>
                              <span className="text-[10px] text-blue-400 tracking-wide font-mono">Streak: {habit.streak} days</span>
                            </div>

                            <button
                              onClick={() => handleCompleteHabitForToday(habit.id)}
                              className={`px-3 py-1 font-mono text-[10px] rounded transition-all cursor-pointer ${
                                isCompletedToday
                                  ? "bg-emerald-600 text-black font-extrabold"
                                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                              }`}
                            >
                              {isCompletedToday ? "✓ COMPLETED" : "MARK DONE"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* 4. Habit Streak Trends over past 30 days line chart */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span>Habit Streak Trends (Past 30 Days)</span>
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        Visualize daily consecutive streaks and historical tracking consistency.
                      </p>
                    </div>

                    {/* Stats summary badges */}
                    <div className="flex items-center gap-3">
                      <div className="bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-850 text-center">
                        <span className="text-[8px] text-zinc-500 font-mono uppercase block">Active Habits</span>
                        <span className="text-xs font-bold text-blue-400 font-mono">{habits.length}</span>
                      </div>
                      <div className="bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-850 text-center">
                        <span className="text-[8px] text-zinc-500 font-mono uppercase block">Peak Streak</span>
                        <span className="text-xs font-bold text-amber-500 font-mono">
                          {habits.length > 0 ? Math.max(...habits.map((h) => h.streak), 0) : 0}d
                        </span>
                      </div>
                    </div>
                  </div>

                  {habits.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 text-xs">
                      No active mind habits found. Complete habits in the list above to draw trajectories.
                    </div>
                  ) : (
                    <div className="w-full h-[240px] mt-2 select-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={getHabitStreakTrends()}
                          margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                        >
                          <CartesianGrid stroke="#1e1e24" strokeDasharray="3 3" opacity={0.3} />
                          <XAxis
                            dataKey="name"
                            stroke="#71717a"
                            fontSize={9}
                            tickLine={false}
                            axisLine={false}
                            dy={8}
                          />
                          <YAxis
                            stroke="#71717a"
                            fontSize={9}
                            tickLine={false}
                            axisLine={false}
                            dx={-8}
                            allowDecimals={false}
                          />
                          <Tooltip content={renderCustomTooltip} />
                          <Legend
                            verticalAlign="top"
                            height={32}
                            iconType="circle"
                            iconSize={6}
                            formatter={(value) => <span className="text-[10px] text-zinc-400 font-medium px-1 capitalize">{value}</span>}
                          />
                          {habits.map((h, index) => {
                            const colors = ["#06b6d4", "#a78bfa", "#f59e0b", "#f43f5e", "#14b8a6", "#ec4899"];
                            return (
                              <Line
                                key={h.id}
                                type="monotone"
                                dataKey={h.title}
                                name={h.title.length > 20 ? h.title.substring(0, 18) + "..." : h.title}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={{ r: 0 }}
                                activeDot={{ r: 4, stroke: "#09090b", strokeWidth: 2 }}
                              />
                            );
                          })}
                          <Line
                            type="monotone"
                            dataKey="Average Streak"
                            name="Average Streak"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            strokeDasharray="4 4"
                            dot={{ r: 0 }}
                            activeDot={{ r: 5, stroke: "#09090b", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column blocks: Productivity heat pulse and AI Coach companion (Spans 4 cols) */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                
                {/* 1. Productivity pulse tracker widget representing custom stats */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-blue-400" />
                    <span>Active Productivity Pulse</span>
                  </h3>
                  
                  {/* Styled bar chart representing weekday hourly outputs */}
                  <div className="flex items-end gap-1.5 h-24 mb-4 pt-4 border-b border-zinc-850 px-2 justify-between">
                    {[
                      { l: "Mon", h: 40 },
                      { l: "Tue", h: 60 },
                      { l: "Wed", h: 30 },
                      { l: "Thu", h: 80, active: true },
                      { l: "Fri", h: 95 },
                      { l: "Sat", h: 50 },
                      { l: "Sun", h: 20 }
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full rounded-t transition-all duration-700 ${
                            bar.active ? "bg-blue-500 shadow-lg shadow-blue-500/20" : "bg-zinc-800 hover:bg-zinc-700"
                          }`}
                          style={{ height: `${bar.h}%`, minHeight: "4px" }}
                          title={`${bar.h}% focus density metric`}
                        />
                        <span className="text-[8px] text-zinc-500 font-mono mt-1 pt-1 block">{bar.l}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-center">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono">Cognitive Score</p>
                      <p className="text-xl font-bold font-sans text-emerald-400">92%</p>
                    </div>
                    <div className="border-l border-zinc-800 h-8" />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono">Streak count</p>
                      <p className="text-xl font-bold text-orange-400">{stats.streakDays}d</p>
                    </div>
                    <div className="border-l border-zinc-805 border-zinc-800 h-8" />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono">Focused hours</p>
                      <p className="text-xl font-bold text-blue-400">{(stats.totalFocusedMinutes / 60).toFixed(1)}h</p>
                    </div>
                  </div>
                </div>

                {/* 2. Interactive AI Assistant chat interactive container */}
                <div className="bg-[#121217] border border-blue-900/30 rounded-2xl p-5 shadow-2xl shadow-blue-500/5 relative">
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-900 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Gemini Assistant</span>
                    </h3>
                    <span className="text-[10px] text-zinc-550 font-mono">Server Proxy Connected</span>
                  </div>

                  {/* Conversation stream box */}
                  <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 mb-4">
                    {aiHistory.map((item, id) => (
                      <div key={id} className={`p-2.5 rounded text-xs select-none ${
                        item.sender === "ai"
                          ? "bg-zinc-900/90 border border-zinc-800 text-zinc-300"
                          : "bg-blue-600 border border-blue-500 text-zinc-100 ml-4 self-end"
                      }`}>
                        <div className="flex justify-between text-[9px] text-zinc-500 mb-0.5 font-mono">
                          <span>{item.sender === "ai" ? "ROUTINE COACH" : "YOU"}</span>
                          <span>{item.time}</span>
                        </div>
                        <p className="leading-relaxed font-sans">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Suggestion Prompts Tags */}
                  <div className="mb-3 flex flex-wrap gap-1">
                    {[
                      "Suggest morning routines",
                      "Analyze current streaks",
                      "How to avoid visual noise?"
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAiInputMessage(p);
                        }}
                        className="text-[9px] text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2 py-0.5 rounded transition"
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSendAiPrompt} className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 bg-zinc-950 border border-zinc-850 rounded-lg text-xs p-2 text-zinc-100 focus:outline-none focus:border-blue-500"
                      placeholder="Ask Gemini micro strategy coach..."
                      value={aiInputMessage}
                      onChange={(e) => setAiInputMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* 3. Upcoming Milestone goals lists */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Milestone Achievements</h3>
                  <div className="space-y-3">
                    {achievements.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-2 rounded bg-zinc-950/40 border border-zinc-900">
                        <div className="p-1 rounded-lg bg-zinc-900 text-yellow-500 border border-zinc-800 shrink-0">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-zinc-200">{item.title}</p>
                          <p className="text-[10px] text-zinc-500">{item.description}</p>
                          <span className="text-[9px] font-mono text-zinc-600">{item.unlockedAt ? `✓ Unlocked with +${item.xpReward} XP` : `Locked (${item.xpReward} XP reward)`}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* VIEW 2: TASK KANBAN MANAGEMENT SYSTEM */}
          {activeTab === "kanban" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-200">Interactive Kanban Studio</h2>
                  <p className="text-xs text-zinc-500 mt-1">Surgical task coordination with sub-checklists tracking</p>
                </div>
                <button
                  onClick={() => setShowNewTaskModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition self-start flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Seed Custom Task</span>
                </button>
              </div>

              {/* Responsive columns grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: "todo" as KanbanColumn, name: "Inbox / To Do", color: "bg-blue-500" },
                  { id: "in_progress" as KanbanColumn, name: "In Progress Sprints", color: "bg-amber-500" },
                  { id: "review" as KanbanColumn, name: "Quality Review", color: "bg-purple-500" },
                  { id: "done" as KanbanColumn, name: "Completed targets", color: "bg-emerald-500" }
                ].map((col) => {
                  const tasksInCol = filteredTasks.filter(t => t.column === col.id);
                  return (
                    <div key={col.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col min-h-[480px]">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-850">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${col.color}`} />
                          <span className="text-xs font-bold text-zinc-300">{col.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-555 px-1.5 py-0.5 bg-zinc-950 rounded font-semibold text-zinc-400">
                          {tasksInCol.length}
                        </span>
                      </div>

                      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                        {tasksInCol.map((task) => (
                          <div key={task.id} className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-850/80 hover:border-zinc-700 transition space-y-3">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-xs text-zinc-200 font-medium block leading-snug">{task.title}</span>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-zinc-600 hover:text-rose-400 p-1 rounded transition shrink-0"
                                title="Delete sprint"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Column flow progression controllers */}
                            <div className="pt-2 border-t border-zinc-900 flex justify-between items-center bg-zinc-900/20 p-1.5 rounded">
                              <span className="text-[9px] uppercase font-mono text-zinc-500">Fast Move:</span>
                              <div className="flex gap-1">
                                {col.id !== 'todo' && (
                                  <button
                                    onClick={() => moveTaskColumn(task.id, 'todo')}
                                    className="text-[9px] bg-zinc-900 p-1 rounded hover:text-white"
                                    title="Move left to Todo"
                                  >
                                    ◀
                                  </button>
                                )}
                                {col.id !== 'in_progress' && (
                                  <button
                                    onClick={() => moveTaskColumn(task.id, 'in_progress')}
                                    className="text-[9px] bg-zinc-900 p-1 rounded hover:text-white"
                                    title="Move to Active InProgress"
                                  >
                                    ⚙
                                  </button>
                                )}
                                {col.id !== 'review' && (
                                  <button
                                    onClick={() => moveTaskColumn(task.id, 'review')}
                                    className="text-[9px] bg-zinc-900 p-1 rounded hover:text-white"
                                    title="Move to Review state"
                                  >
                                    👁
                                  </button>
                                )}
                                {col.id !== 'done' && (
                                  <button
                                    onClick={() => moveTaskColumn(task.id, 'done')}
                                    className="text-[9px] bg-zinc-905 bg-zinc-900 p-1 rounded text-emerald-400 font-bold"
                                    title="Mark complete done"
                                  >
                                    ✓
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 items-center justify-between text-[9px] font-mono mt-2">
                              {task.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded">
                                  #{tag}
                                </span>
                              ))}
                              
                              <span className={`px-1.5 py-0.5 font-bold rounded uppercase ${
                                task.priority === 'high' ? 'text-rose-550 text-rose-450 text-rose-400' : 'text-zinc-500'
                              }`}>
                                {task.priority} INTENSITY
                              </span>
                            </div>
                          </div>
                        ))}

                        {tasksInCol.length === 0 && (
                          <div className="text-center py-10 border border-zinc-850/40 border-dashed rounded-lg text-zinc-600 text-xs">
                            Empty state.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: SIGNATURE ROUTINE TIMELINE BUILDER */}
          {activeTab === "routines" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-200">Signature Routine Timeline Builder</h2>
                  <p className="text-xs text-zinc-500 mt-1">Structure habits and focus timers inside comprehensive procedural flows</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration side block */}
                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 h-fit">
                  <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">Dynamic Seeder Setup</h3>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 text-xs text-zinc-400 leading-relaxed">
                    Set up personalized sequences matching daily routines such as "Exercise workflow", "Client demo sprints", or "Weekly study drills". Seeding custom timers triggers automatic progression logs.
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        const newRoutine: Routine = {
                          id: `r-${Date.now()}`,
                          title: "New Custom Project Pipeline",
                          tagline: "Custom timed micro sequence",
                          color: "emerald",
                          currentStepIndex: 0,
                          elapsedSeconds: 0,
                          isRunning: false,
                          historyCount: 0,
                          steps: [
                            { id: `rs-c1`, title: "Step A: Brainstorming draft", durationMinutes: 10, isCompleted: false },
                            { id: `rs-c2`, title: "Step B: High intensity execution", durationMinutes: 40, isCompleted: false },
                            { id: `rs-c3`, title: "Step C: Final code audits", durationMinutes: 10, isCompleted: false }
                          ]
                        };
                        setRoutines(prev => [...prev, newRoutine]);
                        handleXPAndProgress(60, "Configured custom Routine tracker");
                      }}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition"
                    >
                      + Register Seer Stream
                    </button>
                    <button
                      onClick={() => {
                        setRoutines(prev => prev.filter(r => r.id === 'r-morning' || r.id === 'r-evening'));
                        alert("Reset back to default template configurations.");
                      }}
                      className="w-full py-2 border border-zinc-800 hover:bg-zinc-950 text-zinc-400 text-xs rounded-lg transition"
                    >
                      Restore Defaults
                    </button>
                  </div>
                </div>

                {/* Main list of routines interactive */}
                <div className="lg:col-span-2 space-y-4">
                  {routines.map((routine) => (
                    <div key={routine.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-c border-zinc-800 space-y-4">
                      <div className="flex sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-base font-bold text-zinc-200">{routine.title}</h3>
                          <span className="text-xs text-zinc-500 block italic">"{routine.tagline}"</span>
                        </div>
                        <button
                          onClick={() => {
                            setRoutines(prev => prev.filter(item => item.id !== routine.id));
                          }}
                          className="text-zinc-650 hover:text-rose-400 text-xs"
                          title="Remove custom timeline"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Configured milestones:</span>
                        {routine.steps.map((step, stepId) => (
                          <div key={step.id} className="flex justify-between items-center bg-zinc-950 p-2.5 rounded border border-zinc-900 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400">
                                {stepId + 1}
                              </span>
                              <span className="text-zinc-300 font-medium">{step.title}</span>
                            </div>
                            <span className="text-zinc-500 font-mono text-[10px]">{step.durationMinutes} minutes timer</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: NOTES / SECOND BRAIN */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-805 border-zinc-800 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-zinc-200">Brain notes capturer</h2>
                <p className="text-xs text-zinc-500 mt-1">Capture spontaneous ideas, scripts scripts outlines, and sprint notes</p>
              </div>

              {/* Grid split pane draft editor */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Left pane: lists of existing notes */}
                <div className="space-y-3 md:col-span-1">
                  <div className="p-1 border-b border-zinc-850 mb-2">
                    <input
                      type="text"
                      className="w-full bg-transparent text-xs text-zinc-100 p-1.5 focus:outline-none"
                      placeholder="Name new capture note..."
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCreateEmptyNote();
                        }
                      }}
                    />
                    <button
                      onClick={handleCreateEmptyNote}
                      className="w-full mt-2 py-1.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 text-[10px] rounded border border-zinc-800 transition"
                    >
                      + Create Note
                    </button>
                  </div>

                  <div className="space-y-2">
                    {notes.map((note) => (
                      <button
                        key={note.id}
                        onClick={() => setSelectedNoteId(note.id)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition block ${
                          selectedNoteId === note.id
                            ? "bg-zinc-800 border-blue-500 text-white"
                            : "bg-zinc-950/60 border-zinc-900 text-zinc-400 hover:bg-zinc-900"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold block truncate leading-tight">{note.title}</span>
                          {note.isPinned && <Pin className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">Updated: {note.updatedAt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right pane: text writing workspace */}
                <div className="md:col-span-3 p-6 rounded-2xl bg-zinc-900 border border-zinc-850 space-y-4">
                  {selectedNoteId ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                        <input
                          type="text"
                          className="bg-transparent text-base font-bold text-zinc-100 focus:outline-none w-full border-b border-transparent focus:border-zinc-700 pb-1"
                          value={noteEditTitle}
                          onChange={(e) => setNoteEditTitle(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setNotes(prev => prev.map(n => {
                                if (n.id === selectedNoteId) {
                                  return { ...n, isPinned: !n.isPinned };
                                }
                                return n;
                              }));
                            }}
                            className="bg-zinc-950 hover:bg-zinc-900 text-[10px] text-zinc-300 px-2 py-1.5 border border-zinc-800 rounded transition"
                          >
                            Toggle Pin
                          </button>

                          <button
                            onClick={handleSaveActiveNote}
                            className="bg-blue-600 hover:bg-blue-500 text-[10.5px] font-bold text-white px-3.5 py-1.5 rounded transition shadow-lg shadow-blue-900/10"
                          >
                            ✓ Save Note
                          </button>
                        </div>
                      </div>

                      <textarea
                        className="w-full h-80 bg-zinc-950/40 p-3.5 rounded-lg border border-zinc-850 text-xs font-mono text-zinc-200 focus:outline-none focus:border-blue-500"
                        placeholder="Write standard markdown or bullet planning notes..."
                        value={noteEditContent}
                        onChange={(e) => setNoteEditContent(e.target.value)}
                      />

                      <span className="text-[10px] font-mono text-zinc-500 block text-right">
                        Local-First persistent cloud buffer storage active.
                      </span>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-zinc-500 text-xs">
                      Select or create any note from the left side shelf input field.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* VIEW 5: CREATOR WORSPACE SYSTEM */}
          {activeTab === "creator" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-200">YouTube, LinkedIn & Writer matrices</h2>
                  <p className="text-xs text-zinc-500 mt-1">Design production script checklists & post planning streams</p>
                </div>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  + Add Content Draft
                </button>
              </div>

              {/* Lists of active content systems */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creatorProjects.map((project) => (
                  <div key={project.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                    <div className="flex justify-between items-start border-b border-zinc-850 pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          {project.platform === 'youtube' ? (
                            <Youtube className="w-4 h-4 text-rose-500" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-sky-400" />
                          )}
                          <span className="text-xs font-mono uppercase tracking-wide text-zinc-400">{project.platform}</span>
                        </div>
                        <h3 className="text-sm font-bold text-zinc-200 mt-1">{project.title}</h3>
                      </div>

                      {/* Status selectors */}
                      <select
                        className="bg-zinc-950 text-[10px] text-zinc-400 border border-zinc-800 p-1 rounded font-mono"
                        value={project.status}
                        onChange={(e) => updateCreatorStepStatus(project.id, e.target.value as any)}
                      >
                        <option value="idea">Idea Stage</option>
                        <option value="scripting">Scripting</option>
                        <option value="draft">Review Draft</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    {/* Step checklists inside content */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">Production Roadmap Checklist:</span>
                      {project.checklist.map((item, cId) => (
                        <button
                          key={cId}
                          onClick={() => toggleCreatorChecklistItem(project.id, cId)}
                          className={`w-full text-left p-2.5 rounded border transition flex items-center justify-between text-xs font-medium cursor-pointer ${
                            item.checked
                              ? "bg-zinc-950/40 border-zinc-900 text-zinc-500 line-through"
                              : "bg-zinc-950 hover:bg-zinc-950/70 border-zinc-850 text-zinc-300"
                          }`}
                        >
                          <span>{item.title}</span>
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            item.checked ? "border-emerald-500 bg-emerald-600 font-mono text-black text-[9px]" : "border-zinc-750"
                          }`}>
                            {item.checked && "✓"}
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-zinc-500 italic">Notes: Verify base thumbnails scripts are structured properly prior to active record slots.</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 6: SETTINGS / DEVHUB */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-zinc-200 font-sans">SaaS Workstation Settings</h2>
                <p className="text-xs text-zinc-500 mt-1">Configure timezone intervals & telemetry backups</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Homelab Docker Parameters</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Local Timezone Range:</label>
                    <select
                      className="w-full bg-zinc-950 text-xs text-zinc-300 p-2.5 rounded-lg border border-zinc-800"
                      value={userTimezone}
                      onChange={(e) => setUserTimezone(e.target.value)}
                    >
                      <option value="UTC+6 (Dhaka)">UTC+6 (Bangladesh, Dhaka)</option>
                      <option value="UTC+0 (London)">UTC+0 (Europe, London)</option>
                      <option value="UTC-5 (New York)">UTC-5 (America, New York)</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t border-zinc-900">
                    <div>
                      <span className="text-xs font-semibold text-zinc-300 block">System completion notification alert sound.</span>
                      <span className="text-[10px] text-zinc-500">Synthesize alert beep sounds upon session finishes</span>
                    </div>
                    <button
                      onClick={() => setUserNotificationAlerts(!userNotificationAlerts)}
                      className={`px-3 py-1 font-mono text-[10px] rounded transition-all cursor-pointer ${
                        userNotificationAlerts ? "bg-emerald-600 text-black" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {userNotificationAlerts ? "✓ ACTIVE ENABLED" : "MUTED"}
                    </button>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t border-zinc-900">
                    <div>
                      <span className="text-xs font-semibold text-zinc-300 block">MIT Open Source Telemetry Export Setup:</span>
                      <span className="text-[10px] text-zinc-550 block text-zinc-550 text-zinc-500">Backs up your workflow stats instantly into downloadable JSON files ready to sync homelabs</span>
                    </div>
                    <button
                      onClick={handleExportSystemTelemetry}
                      className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 rounded-lg text-xs hover:text-white flex items-center gap-1.5 transition leading-none"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      <span>Export JSON</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-zinc-300 block">Sign Out Current Session:</span>
                      <span className="text-[10px] text-zinc-500">Log out of the current active profile workstation and return to landing page</span>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-rose-500 block">Emergency memory flush:</span>
                      <span className="text-[10px] text-zinc-650 text-zinc-550 text-zinc-500">Wipe clean entire LocalStorage telemetry</span>
                    </div>

                    <button
                      onClick={handleResetData}
                      className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-900 text-xs rounded transition"
                    >
                      Reset Workspace
                    </button>
                  </div>
                </div>
              </div>

              {/* open source docker container instructions */}
              <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-zinc-850 space-y-3">
                <span className="text-xs text-zinc-400 font-mono block">Contribution & deployment details</span>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  RoutineOS fully conforms to modern MIT workflow licenses. Feel free to clone standard GitHub packages or configure the express ports dynamically using standard Docker variables.
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[10px] font-mono text-blue-400 hover:underline flex items-center gap-1">
                    <span>Explore source on repository</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Command Hints quick reference bar styled exact to Dark Sophisticated prototype */}
        <div className="h-10 border-t border-zinc-900 bg-[#0c0c0e] flex items-center justify-between px-8 text-[9px] text-zinc-500 font-mono tracking-wider uppercase shrink-0">
          <div className="flex gap-5">
            <span>KEY_HINTS:</span>
            <span>T - QUICK TASK</span>
            <span>A - COGNITIVE PLANNER RECOMMENDATIONS</span>
            <span>R - TIMELINES</span>
          </div>
          <div>
            <span>SYSTEM_NODE: ACTIVE_HOST_3000</span>
          </div>
        </div>
      </main>

      {/* MODAL 1: NEW TASK CREATION */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 p-6 rounded-2xl space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-xs font-mono uppercase text-zinc-500">Seed New Task Target</span>
              <button onClick={() => setShowNewTaskModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateNewTask} className="space-y-4">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Task Specification Title:</label>
                <input
                  type="text"
                  required
                  className="w-full bg-zinc-900 text-xs p-2.5 rounded-lg border border-zinc-800 text-zinc-100 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Write README contribution guidelines"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Priority Intensity:</label>
                  <select
                    className="w-full bg-zinc-900 text-xs p-2.5 rounded-lg border border-zinc-800 text-zinc-300"
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  >
                    <option value="low">Low Intensity</option>
                    <option value="medium">Medium Momentum</option>
                    <option value="high">High priority critical</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Workspace Category Tag:</label>
                  <select
                    className="w-full bg-zinc-900 text-xs p-2.5 rounded-lg border border-zinc-800 text-zinc-300"
                    value={newTaskTag}
                    onChange={(e) => setNewTaskTag(e.target.value)}
                  >
                    <option value="Sprint">Sprint Project</option>
                    <option value="Creator">Creator flow</option>
                    <option value="Health">Health / Rituals</option>
                    <option value="Life Admin">Life Administration</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition"
              >
                Register Task and Gain XP
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATOR PROJECT DRAFT INCORPORATION */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 p-6 rounded-2xl space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-xs font-mono uppercase text-zinc-500">Add Content matrix</span>
              <button onClick={() => setShowNewProjectModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateCreatorProject} className="space-y-4">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Platform Category:</label>
                <select
                  className="w-full bg-zinc-900 text-xs p-2.5 rounded-lg border border-zinc-800 text-zinc-300 font-mono"
                  value={newProjectPlatform}
                  onChange={(e) => setNewProjectPlatform(e.target.value as any)}
                >
                  <option value="youtube">YouTube Project workflow</option>
                  <option value="linkedin">LinkedIn post target</option>
                  <option value="writing">Technical draft book / document</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Content Post Draft Title:</label>
                <input
                  type="text"
                  required
                  className="w-full bg-zinc-900 text-xs p-2.5 rounded-lg border border-zinc-800 text-zinc-100 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Scaling Docker nodes dynamically"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition"
              >
                Incorporate Matrix
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
