
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface VoiceSettingsProps {
  stability: number;
  setStability: (value: number) => void;
  clarity: number;
  setClarity: (value: number) => void;
}

export const VoiceSettings = ({ 
  stability, 
  setStability, 
  clarity, 
  setClarity 
}: VoiceSettingsProps) => {
  return (
    <div className="space-y-6 glass-morphism p-6 rounded-xl">
      <div className="space-y-2">
        <Label htmlFor="stability">Stability ({stability})</Label>
        <Slider
          id="stability"
          min={0}
          max={100}
          step={1}
          value={[stability]}
          onValueChange={(value) => setStability(value[0])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clarity">Clarity ({clarity})</Label>
        <Slider
          id="clarity"
          min={0}
          max={100}
          step={1}
          value={[clarity]}
          onValueChange={(value) => setClarity(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
};
