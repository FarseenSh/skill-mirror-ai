
"use client";

import DisplayCards from "@/components/ui/display-cards";
import { BrainCircuit, Briefcase, BarChart3 } from "lucide-react";

const skillMirrorCards = [
  {
    icon: <BrainCircuit className="size-4 text-skill-lightBlue" />,
    title: "AI Colleagues",
    description: "Practice with AI-powered personas",
    date: "Real-time feedback",
    iconClassName: "text-skill-lightBlue",
    titleClassName: "text-skill-lightBlue",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Briefcase className="size-4 text-skill-purple" />,
    title: "Workplace Scenarios",
    description: "Industry-specific challenges",
    date: "Realistic training",
    iconClassName: "text-skill-purple",
    titleClassName: "text-skill-purple",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <BarChart3 className="size-4 text-skill-deepPurple" />,
    title: "Skill Analytics",
    description: "Track progress with detailed insights",
    date: "Personalized growth",
    iconClassName: "text-skill-deepPurple",
    titleClassName: "text-skill-deepPurple",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
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
