
import React, { useState, useRef, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      if (audioRef.current) {
        audioRef.current.src = url;
      }
      return () => URL.revokeObjectURL(url);
    }
  }, [audioBlob]);

  const startRecording = () => {
    Mp3Recorder.start()
      .then(() => setIsRecording(true))
      .catch((e: Error) => {
        toast({
          title: "Error",
          description: "Please allow microphone access to record audio.",
          variant: "destructive",
        });
      });
  };

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]: [Buffer, Blob]) => {
        setAudioBlob(blob);
        setIsRecording(false);
      })
      .catch((e: Error) => console.error(e));
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center space-y-4 glass-morphism p-6 rounded-xl">
      <div className="flex justify-center items-center space-x-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          size="lg"
          className={`rounded-full w-16 h-16 ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {audioBlob && (
          <Button
            onClick={togglePlayback}
            size="lg"
            className="rounded-full w-16 h-16"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
        )}
      </div>

      {isRecording && (
        <div className="wave-animation flex items-center h-8">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />
    </div>
  );
};
