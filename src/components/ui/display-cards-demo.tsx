
"use client";

import DisplayCards from "@/components/ui/display-cards";
import { BookOpen, Target, BrainCircuit } from "lucide-react";
import { sampleResources, sampleLearningPaths, targetRoles } from "@/data/resourcesData";

// Create cards based on the resources and learning paths data
const skillMirrorCards = [
  {
    icon: <BookOpen className="size-4 text-green-300" />,
    title: "Learning Paths",
    description: sampleLearningPaths[0].title,
    date: "New pathway",
    iconClassName: "text-green-500",
    titleClassName: "text-green-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 transition-all duration-500 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Target className="size-4 text-blue-300" />,
    title: "Career Goal",
    description: targetRoles[0].name,
    date: "Popular role",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 transition-all duration-500 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <BrainCircuit className="size-4 text-purple-300" />,
    title: "Featured Resource",
    description: sampleResources[0].title,
    date: "Just added",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 transition-all duration-500",
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
