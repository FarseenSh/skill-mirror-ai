
"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  bgClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-white" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-white",
  titleClassName = "text-white font-semibold",
  bgClassName = "bg-primary",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 backdrop-blur-sm px-4 py-3 transition-all duration-700 hover:border-white/20 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        bgClassName,
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-black/20 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-white">{description}</p>
      <p className="text-white/80">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      bgClassName: "bg-primary",
      className: "[grid-area:stack] hover:-translate-y-10 border-white/20 dark:border-white/10",
    },
    {
      bgClassName: "bg-secondary",
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 border-white/20 dark:border-white/10",
    },
    {
      bgClassName: "bg-accent",
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10 border-white/20 dark:border-white/10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
