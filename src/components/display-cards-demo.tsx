
"use client";

import DisplayCards from "@/components/ui/display-cards";
import { BrainCircuit, Briefcase, BarChart3 } from "lucide-react";

const skillMirrorCards = [
  {
    icon: <BrainCircuit className="size-4 text-white" />,
    title: "AI Colleagues",
    description: "Practice with AI-powered personas",
    date: "Real-time feedback",
    iconClassName: "text-white",
    titleClassName: "text-white font-semibold",
    bgClassName: "bg-skill-lightBlue",
    className:
      "[grid-area:stack] hover:-translate-y-10 hover:shadow-xl shadow-md border-2 border-white/20 dark:border-white/10",
  },
  {
    icon: <Briefcase className="size-4 text-white" />,
    title: "Workplace Scenarios",
    description: "Industry-specific challenges",
    date: "Realistic training",
    iconClassName: "text-white",
    titleClassName: "text-white font-semibold",
    bgClassName: "bg-skill-purple",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 hover:shadow-xl shadow-md border-2 border-white/20 dark:border-white/10",
  },
  {
    icon: <BarChart3 className="size-4 text-white" />,
    title: "Skill Analytics",
    description: "Track progress with detailed insights",
    date: "Personalized growth",
    iconClassName: "text-white",
    titleClassName: "text-white font-semibold",
    bgClassName: "bg-skill-deepPurple",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 hover:shadow-xl shadow-md border-2 border-white/20 dark:border-white/10",
  },
];

function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={skillMirrorCards} />
      </div>
    </div>
  );
}

export { DisplayCardsDemo };
