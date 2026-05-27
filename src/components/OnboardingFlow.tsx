import { useState } from "react";
import { OnboardingData } from "../types";
import {
  Briefcase,
  GraduationCap,
  PenTool,
  Rocket,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Hash
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const roles = [
    { id: "developer", label: "Developer / Engineer", icon: <Briefcase className="w-4 h-4 text-sky-400" /> },
    { id: "student", label: "Student / Researcher", icon: <GraduationCap className="w-4 h-4 text-emerald-400" /> },
    { id: "creator", label: "Content Creator / Writer", icon: <PenTool className="w-4 h-4 text-purple-400" /> },
    { id: "founder", label: "Founder / Freelancer", icon: <Rocket className="w-4 h-4 text-amber-400" /> }
  ];

  const goals = [
    "Manage client development sprints",
    "Track daily workout & water routines",
    "Establish consistent coding & learning rituals",
    "Schedule YouTube & writing blueprints",
    "Capture markdown brainstorm ideas",
    "Strengthen deep work focus endurance"
  ];

  const times = [
    { id: "morning", label: "Morning Routine (6AM - 11AM)", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "afternoon", label: "Afternoon Focus (12PM - 5PM)", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "evening", label: "Evening Recharge (6PM - 10PM)", icon: <Clock className="w-3.5 h-3.5" /> }
  ];

  const defaultCategories = ["Sprint", "Creator", "Health", "Reading", "Life Admin"];

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({
        role,
        goals: selectedGoals,
        preferredRoutineTimes: selectedTimes,
        categories: categories.length > 0 ? categories : defaultCategories,
        completed: true
      });
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const toggleTime = (timeId: string) => {
    setSelectedTimes(prev =>
      prev.includes(timeId) ? prev.filter(t => t !== timeId) : [...prev, timeId]
    );
  };

  const toggleCategory = (cat: string) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg border border-zinc-900 bg-zinc-950 p-6 sm:p-8 rounded-2xl relative shadow-2xl">
        {/* Progress indicators Header */}
        <div className="flex justify-between items-center mb-8">
          <span className="font-mono text-[10px] uppercase text-zinc-500">Setup RoutineOS Workstation</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`w-6 h-1 rounded-full transition-all ${
                  step >= s ? "bg-indigo-600" : "bg-zinc-900"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Select Role */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">What do you primary do?</h2>
            <p className="text-xs text-zinc-500 mt-1 mb-6">We will seed tasks and planner widgets matching your profession.</p>
            <div className="space-y-3">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.label)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition ${
                    role === r.label
                      ? "border-indigo-600 bg-indigo-500/5 text-zinc-100"
                      : "border-zinc-900 hover:border-zinc-850 hover:bg-zinc-900/40 text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                      {r.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{r.label}</span>
                  </div>
                  {role === r.label && <CheckCircle className="w-4 h-4 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Priorities & Goals */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Select your active goals</h2>
            <p className="text-xs text-zinc-500 mt-1 mb-6">Choose any targets you would like to structure today.</p>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {goals.map((g, idx) => {
                const isSelected = selectedGoals.includes(g);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleGoal(g)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-left text-xs transition ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-500/5 text-zinc-100 font-medium"
                        : "border-zinc-900 bg-zinc-950 text-zinc-400 hover:bg-zinc-900/40"
                    }`}
                  >
                    <span>{g}</span>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                      isSelected ? "border-indigo-500 bg-indigo-600 text-white" : "border-zinc-800"
                    }`}>
                      {isSelected && <span className="text-[9px]">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Preferred Routine Times */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Preferred Routine Intervals</h2>
            <p className="text-xs text-zinc-500 mt-1 mb-6">We will load active Routine timers during these hours.</p>
            <div className="space-y-3">
              {times.map(t => {
                const isSelected = selectedTimes.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleTime(t.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-500/5 text-zinc-100"
                        : "border-zinc-900 text-zinc-400 hover:bg-zinc-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-indigo-400">
                        {t.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{t.label}</span>
                    </div>
                    {isSelected && <CheckCircle className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Categories Selection */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Customize work tags</h2>
            <p className="text-xs text-zinc-500 mt-1 mb-6">Select the tags used to label routines, tasks, and notes.</p>
            <div className="flex flex-wrap gap-2.5">
              {defaultCategories.map(cat => {
                const isSelected = categories.includes(cat) || categories.length === 0;
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 bg-zinc-950 border text-xs font-mono rounded-lg transition flex items-center gap-1.5 ${
                      categories.includes(cat)
                        ? "border-indigo-500 text-indigo-300 bg-indigo-500/5"
                        : "border-zinc-900 text-zinc-400 hover:bg-zinc-900"
                    }`}
                  >
                    <Hash className="w-3 h-3 text-zinc-600" />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 p-3 rounded-lg bg-zinc-900/40 border border-indigo-500/10 text-xs text-indigo-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>RoutineOS will seed default habits and focus sessions automatically.</span>
            </div>
          </div>
        )}

        {/* Navigation bottom bar */}
        <div className="mt-8 pt-4 border-t border-zinc-900/80 flex justify-between items-center">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className={`text-xs text-zinc-500 hover:text-zinc-300 disabled:opacity-0 transition ${step === 1 ? "pointer-events-none" : ""}`}
          >
            Go back
          </button>

          <button
            onClick={handleNextStep}
            disabled={step === 1 && !role}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs rounded-lg shadow-lg shadow-indigo-600/15 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{step === 4 ? "Complete Setup" : "Next Segment"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
