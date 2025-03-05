
import { useState } from 'react';
import { analyzeErrors } from '@/services/speechErrorService';
import { useToast } from '@/hooks/use-toast';

interface SpeechError {
  word: string;
  correctPronunciation: string;
  userPronunciation: string;
  explanation: string;
}

interface SpeechErrorAnalysis {
  sentence: string;
  errorWords: string[];
  errors: Record<string, SpeechError>;
}

export const useSpeechError = () => {
  const [analysis, setAnalysis] = useState<SpeechErrorAnalysis | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const { toast } = useToast();
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // In a real app, we would record the audio here
      
      toast({
        title: "Recording Started",
        description: "Speak the sentence clearly into your microphone.",
      });
      
      // For demo purposes, automatically stop after 5 seconds
      setTimeout(() => {
        stopRecording(stream);
      }, 5000);
      
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use this feature.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = async (stream?: MediaStream) => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    setIsRecording(false);
    setIsProcessing(true);
    
    try {
      // Create a mock blob - in a real app, this would be the recorded audio
      const mockBlob = new Blob([], { type: 'audio/wav' });
      const result = await analyzeErrors(mockBlob);
      setAnalysis(result);
      
      // Default select first error word
      if (result.errorWords.length > 0) {
        setSelectedWord(result.errorWords[0]);
      }
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze your speech. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const selectWord = (word: string) => {
    setSelectedWord(word);
  };
  
  const resetAnalysis = () => {
    setAnalysis(null);
    setSelectedWord(null);
  };
  
  return {
    analysis,
    selectedWord,
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    selectWord,
    resetAnalysis
  };
};
