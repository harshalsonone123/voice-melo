
import React, { useState } from 'react';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { VoiceSettings } from '@/components/VoiceSettings';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

const Index = () => {
  const [stability, setStability] = useState(50);
  const [clarity, setClarity] = useState(50);

  const handleGenerate = () => {
    // This will be implemented with ElevenLabs API integration
    console.log('Generating voice with settings:', { stability, clarity });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Voice Generator</h1>
          <p className="text-muted-foreground">Record and transform your voice with AI</p>
        </div>

        <VoiceRecorder />
        
        <VoiceSettings
          stability={stability}
          setStability={setStability}
          clarity={clarity}
          setClarity={setClarity}
        />

        <Button 
          onClick={handleGenerate}
          className="w-full font-semibold h-12"
        >
          <Wand2 className="mr-2 h-5 w-5" />
          Generate Voice
        </Button>
      </div>
    </div>
  );
};

export default Index;
