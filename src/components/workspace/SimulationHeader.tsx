
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pause, Play, Clock } from "lucide-react";

interface SimulationHeaderProps {
  simulationDay: number;
  currentTime: string;
  isPaused: boolean;
  onTogglePause: () => void;
  userName?: string;
}

export const SimulationHeader: React.FC<SimulationHeaderProps> = ({
  simulationDay,
  currentTime,
  isPaused,
  onTogglePause,
  userName = ""
}) => {
  return (
    <div className="flex items-center justify-between w-full bg-background border-b p-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm font-medium">Simulation Day: {simulationDay}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{currentTime}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onTogglePause}
        >
          {isPaused ? (
            <>
              <Play className="h-4 w-4 mr-2" />
              Resume Simulation
            </>
          ) : (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause Simulation
            </>
          )}
        </Button>
        {userName && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-sm font-medium">{userName}</span>
          </div>
        )}
      </div>
    </div>
  );
};
