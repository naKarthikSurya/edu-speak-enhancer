
// Mock data for speech analysis
interface SpeechFeedback {
  pronunciation: number;
  fluency: number;
  rhythm: number;
  overall: number;
  suggestions: string[];
}

// Define voice interface for text-to-speech options
export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
}

// Available voices for text-to-speech
export const availableVoices: Voice[] = [
  { id: 'en-US-1', name: 'Matthew', gender: 'male', accent: 'American' },
  { id: 'en-US-2', name: 'Olivia', gender: 'female', accent: 'American' },
  { id: 'en-GB-1', name: 'James', gender: 'male', accent: 'British' },
  { id: 'en-GB-2', name: 'Emma', gender: 'female', accent: 'British' },
  { id: 'en-AU-1', name: 'Jack', gender: 'male', accent: 'Australian' },
  { id: 'en-AU-2', name: 'Charlotte', gender: 'female', accent: 'Australian' }
];

// Mock phrases for practice
export const practiceExamples = [
  "The quick brown fox jumps over the lazy dog.",
  "She sells seashells by the seashore.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
];

// Simulate recording and processing speech with random delays
export const analyzeSpeech = (duration: number): Promise<SpeechFeedback> => {
  return new Promise((resolve) => {
    // Simulate backend processing time
    setTimeout(() => {
      // Generate simulated feedback with slight randomness
      resolve({
        pronunciation: 70 + Math.floor(Math.random() * 20),
        fluency: 65 + Math.floor(Math.random() * 25),
        rhythm: 75 + Math.floor(Math.random() * 20),
        overall: 70 + Math.floor(Math.random() * 20),
        suggestions: [
          "Try slowing down on complex words",
          "Pay attention to the 'th' sound",
          "Great job with intonation patterns",
          "Focus on syllable stress in longer words"
        ].sort(() => 0.5 - Math.random()).slice(0, 3)
      });
    }, duration * 300); // Simulate longer processing for longer recordings
  });
};

// Simulate text-to-speech functionality
export const getAudioForPhrase = (
  phrase: string, 
  voiceId: string = 'en-US-1', 
  speed: number = 1.0
): string => {
  // In a real implementation, this would generate or fetch audio files
  // For now, we'll just return a mock URL
  return `https://api.example.com/tts?text=${encodeURIComponent(phrase)}&voice=${voiceId}&speed=${speed}`;
};
