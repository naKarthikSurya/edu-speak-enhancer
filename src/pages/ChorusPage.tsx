import { ArrowLeft, Mic, Play, Square, RefreshCw, Volume2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { 
  practiceExamples, 
  getGoogleTTSAudio, 
  fetchAvailableVoices,
  Voice,
  googleVoices
} from '@/services/speechService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ChorusPage = () => {
  const { 
    isRecording, 
    recordingTime,
    feedback, 
    isProcessing,
    startRecording, 
    stopRecording,
    resetRecording
  } = useVoiceRecording();
  
  const { toast } = useToast();
  
  // State variables for text-to-speech functionality
  const [inputText, setInputText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  
  // State for available voices from the API
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);
  
  // Add audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Fetch available voices when component mounts
  useEffect(() => {
    const getVoices = async () => {
      try {
        setIsLoadingVoices(true);
        const voices = await fetchAvailableVoices();
        setAvailableVoices(voices);
        
        // Set a default voice if we got results and don't have one selected yet
        if (voices.length > 0 && !selectedVoice) {
          // Try to select a US English voice by default
          const defaultVoice = voices.find(v => v.id.includes('en-US')) || voices[0];
          setSelectedVoice(defaultVoice.id);
        }
      } catch (err) {
        console.error('Failed to fetch voices:', err);
        toast({
          title: "Couldn't load voices",
          description: "Using default voice options instead",
          variant: "destructive"
        });
        // Use the mock voices as fallback
        setAvailableVoices(googleVoices as Voice[]);
        if (googleVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(googleVoices[0].id);
        }
      } finally {
        setIsLoadingVoices(false);
      }
    };
    
    getVoices();
  }, [selectedVoice]);
  
  // Updated function to play the text with selected voice and speed using Flask backend
  const playText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to read aloud.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedVoice) {
      toast({
        title: "Voice Required",
        description: "Please select a voice first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsPlaying(true);
    setIsLoading(true);
    setError("");
    
    try {
      // Get the selected voice object
      const voice = availableVoices.find(v => v.id === selectedVoice);
      
      toast({
        title: "Generating Speech",
        description: `Using ${voice?.name || 'selected voice'} at ${speechSpeed}x speed`,
      });
      
      // Call the backend TTS API
      const audioData = await getGoogleTTSAudio({
        text: inputText,
        voiceId: selectedVoice,
        speed: speechSpeed,
      });
      
      // Create a blob from the array buffer
      const audioBlob = new Blob([audioData], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play the audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play()
          .catch(err => {
            console.error('Error playing audio:', err);
            setError('Failed to play audio. Please try again.');
          });
        
        // Clean up blob URL when audio finishes playing
        audioRef.current.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setIsPlaying(false);
        };
      }
    } catch (err) {
      console.error('Error with TTS:', err);
      setError('Failed to generate speech. Please try again.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to play provided examples
  const playExample = (phrase: string) => {
    setInputText(phrase);
    
    toast({
      title: "Example Selected",
      description: "Example loaded into the text editor",
    });
  };

  // Create filtered voice lists by accent for better organization
  const organizeVoicesByAccent = () => {
    const accents = Array.from(new Set(availableVoices.map(voice => voice.accent)));
    
    // Sort the accents with English variants first
    accents.sort((a, b) => {
      if (a === "American") return -1;
      if (b === "American") return 1;
      if (a === "British") return -1;
      if (b === "British") return 1;
      return a.localeCompare(b);
    });
    
    return accents.map(accent => ({
      accent,
      voices: availableVoices.filter(voice => voice.accent === accent)
    }));
  };

  const voicesByAccent = organizeVoicesByAccent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header />
      <main className="pt-24 px-6">
        {/* Hidden audio element for playback */}
        <audio ref={audioRef} className="hidden" />
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-edumate-600 hover:text-edumate-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-medium text-edumate-900 mb-4">Chorus</h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Listen to text read aloud in different voices and speeds to enhance your language learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-panel p-8 flex flex-col">
              <h3 className="text-xl font-medium text-edumate-900 mb-4">Enter text to read aloud</h3>
              
              <Textarea 
                placeholder="Type or paste text here..." 
                className="min-h-40 mb-6"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Voice</label>
                  <Select 
                    value={selectedVoice} 
                    onValueChange={setSelectedVoice}
                    disabled={isLoadingVoices}
                  >
                    <SelectTrigger className="w-full">
                      {isLoadingVoices ? (
                        <span className="text-slate-500">Loading voices...</span>
                      ) : (
                        <SelectValue placeholder="Select voice" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {voicesByAccent.map((group) => (
                        <div key={group.accent}>
                          <div className="px-2 py-1.5 text-sm font-medium text-slate-900 bg-slate-100">
                            {group.accent}
                          </div>
                          {group.voices.map((voice) => (
                            <SelectItem key={voice.id} value={voice.id}>
                              {voice.name} ({voice.gender})
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Speech Speed: {speechSpeed.toFixed(1)}x
                  </label>
                  <Slider 
                    value={[speechSpeed]} 
                    min={0.25} 
                    max={4.0} 
                    step={0.1}
                    onValueChange={(value) => setSpeechSpeed(value[0])} 
                    className="my-4"
                  />
                </div>
              </div>
              
              {/* Show error message if there is one */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <Button
                onClick={playText}
                disabled={isPlaying || isLoading || !inputText.trim() || !selectedVoice}
                className="self-start mb-8"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : isPlaying ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Read Aloud
                  </>
                )}
              </Button>
              
              <div className="mt-auto">
                <h3 className="text-xl font-medium text-edumate-900 mb-4">Try these examples:</h3>
                <div className="space-y-3">
                  {practiceExamples.map((phrase, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-slate-100 hover:border-edumate-200 transition-colors">
                      <p className="text-slate-700">{phrase}</p>
                      <button 
                        className="flex items-center text-sm text-edumate-500 mt-2 hover:text-edumate-600 transition-colors"
                        onClick={() => playExample(phrase)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Use this example
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass-panel p-8">
                <h3 className="text-xl font-medium text-edumate-900 mb-6">Speech Analysis</h3>
                
                {feedback ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {Object.entries(feedback)
                        .filter(([key]) => key !== 'suggestions')
                        .map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-700 capitalize">{key}</span>
                              <span className="text-edumate-700 font-medium">{value as number}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div 
                                className="bg-edumate-500 h-2 rounded-full" 
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                          </div>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-edumate-900 mb-3">Suggestions</h4>
                      <ul className="space-y-2">
                        {feedback.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-edumate-100 flex items-center justify-center mr-2 mt-0.5">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="12" 
                                height="12" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="text-edumate-500"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span className="text-slate-700">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-500">Record your speech or use text-to-speech to see analysis and feedback</p>
                  </div>
                )}
              </div>
              
              <div className="glass-panel p-8">
                <h3 className="text-xl font-medium text-edumate-900 mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3 mt-0.5 text-edumate-500 font-medium">1</span>
                    <p className="text-slate-700">Enter text or choose an example from the list</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3 mt-0.5 text-edumate-500 font-medium">2</span>
                    <p className="text-slate-700">Select a voice and adjust the speech speed</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3 mt-0.5 text-edumate-500 font-medium">3</span>
                    <p className="text-slate-700">Click "Read Aloud" to hear the text spoken in the selected voice</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChorusPage;
