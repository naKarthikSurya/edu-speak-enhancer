
// Mock data for speech error analysis
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

// Mock practice sentences
export const practiceSentences = [
  "She recognized the symptoms of the illness immediately.",
  "The necessary documents were signed and delivered yesterday.",
  "The temperature fluctuated throughout the week.",
  "The beautiful mountain range was visible from the kitchen window.",
  "I particularly enjoyed the exhibition at the museum."
];

// Simulate processing speech with errors
export const analyzeErrors = (recordingBlob: Blob): Promise<SpeechErrorAnalysis> => {
  return new Promise((resolve) => {
    // Simulate backend processing time
    setTimeout(() => {
      // In real implementation, this would analyze the audio and detect errors
      resolve({
        sentence: "The beautiful mountain range was visible from the kitchen window.",
        errorWords: ["mountain", "visible"],
        errors: {
          "mountain": {
            word: "mountain",
            correctPronunciation: "/ˈmaʊntən/ (moun-tuhn)",
            userPronunciation: "/ˈmaʊnteɪn/ (moun-tayn)",
            explanation: "The second syllable should be a schwa sound (ə), not a long \"a\" sound."
          },
          "visible": {
            word: "visible",
            correctPronunciation: "/ˈvɪzəbəl/ (viz-uh-buhl)",
            userPronunciation: "/ˈvɪsəbəl/ (vis-uh-buhl)",
            explanation: "The \"s\" in \"visible\" should be pronounced as a \"z\" sound."
          }
        }
      });
    }, 1500);
  });
};

// Simulate text-to-speech functionality for correct pronunciation
export const getErrorAudio = (word: string, isCorrect: boolean): string => {
  // In a real implementation, this would generate or fetch audio files
  // For now, we'll just return a mock URL
  return `https://api.example.com/tts?text=${encodeURIComponent(word)}&isCorrect=${isCorrect}`;
};
