
import { useState, useEffect } from 'react';
import { analyzeSpeech } from '@/services/speechService';
import { useToast } from '@/hooks/use-toast';

interface RecordingState {
  isRecording: boolean;
  recordingTime: number;
  audioURL: string | null;
}

interface SpeechFeedback {
  pronunciation: number;
  fluency: number;
  rhythm: number;
  overall: number;
  suggestions: string[];
}

export const useVoiceRecording = () => {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    recordingTime: 0,
    audioURL: null
  });
  const [feedback, setFeedback] = useState<SpeechFeedback | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  
  // Timer for recording duration
  useEffect(() => {
    let interval: number | null = null;
    
    if (state.isRecording) {
      interval = window.setInterval(() => {
        setState(prev => ({ ...prev, recordingTime: prev.recordingTime + 1 }));
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isRecording]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      setAudioChunks([]);
      setFeedback(null);
      
      recorder.ondataavailable = (e) => {
        setAudioChunks(chunks => [...chunks, e.data]);
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setState(prev => ({ ...prev, audioURL: audioUrl }));
        
        // Simulate sending to backend for processing
        setIsProcessing(true);
        try {
          const result = await analyzeSpeech(state.recordingTime);
          setFeedback(result);
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
      
      recorder.start();
      setMediaRecorder(recorder);
      
      setState({
        isRecording: true,
        recordingTime: 0,
        audioURL: null
      });
      
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use this feature.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && state.isRecording) {
      mediaRecorder.stop();
      
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      
      setState(prev => ({ ...prev, isRecording: false }));
    }
  };
  
  const resetRecording = () => {
    setState({
      isRecording: false,
      recordingTime: 0,
      audioURL: null
    });
    setFeedback(null);
  };
  
  return {
    ...state,
    feedback,
    isProcessing,
    startRecording,
    stopRecording,
    resetRecording
  };
};
