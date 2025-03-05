
import { ArrowLeft, Mic, Play, Square, RefreshCw, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { practiceExamples, getAudioForPhrase, availableVoices } from '@/services/speechService';
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
  
  // New state variables for text-to-speech functionality
  const [inputText, setInputText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(availableVoices[0].id);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Function to play the text with selected voice and speed
  const playText = () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to read aloud.",
        variant: "destructive"
      });
      return;
    }
    
    setIsPlaying(true);
    
    // Get the selected voice object
    const voice = availableVoices.find(v => v.id === selectedVoice);
    
    toast({
      title: "Playing Audio",
      description: `Reading with ${voice?.name} voice at ${speechSpeed}x speed`,
    });
    
    // Simulate text to speech playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000); // Simulate 3 seconds of playback
  };
  
  // Function to play provided examples
  const playExample = (phrase: string) => {
    setInputText(phrase);
    
    toast({
      title: "Example Selected",
      description: "Example loaded into the text editor",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header />
      <main className="pt-24 px-6">
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
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          {voice.name} ({voice.accent})
                        </SelectItem>
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
                    min={0.5} 
                    max={2.0} 
                    step={0.1}
                    onValueChange={(value) => setSpeechSpeed(value[0])} 
                    className="my-4"
                  />
                </div>
              </div>
              
              <Button
                onClick={playText}
                disabled={isPlaying || !inputText.trim()}
                className="self-start mb-8"
              >
                {isPlaying ? (
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
                            <span className="text-edumate-700 font-medium">{value}%</span>
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
