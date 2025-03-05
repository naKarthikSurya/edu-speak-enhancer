
import { ArrowLeft, Mic, Play, Square, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { practiceExamples, getAudioForPhrase } from '@/services/speechService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  
  const playAudio = (phrase: string) => {
    // In a real implementation, this would play the audio
    // For now, we'll just show a toast
    toast({
      title: "Playing Audio",
      description: `"${phrase.substring(0, 30)}..."`,
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
              Enhance your pronunciation and fluency with real-time analysis and feedback as you speak.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-panel p-8 flex flex-col items-center">
              <div className="w-full mb-8">
                <div className="bg-edumate-50 rounded-xl p-6 text-center">
                  <p className="text-lg text-edumate-700 mb-4">
                    {isRecording 
                      ? `Recording: ${recordingTime}s` 
                      : isProcessing
                        ? "Processing your speech..."
                        : "Press the microphone button to start speaking"}
                  </p>
                  <div className={`w-full h-24 rounded-lg bg-white flex items-center justify-center ${isRecording ? 'animate-pulse' : ''}`}>
                    {isRecording ? (
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className="w-2 bg-edumate-500 rounded-full animate-pulse" 
                            style={{
                              height: `${20 + Math.random() * 40}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    ) : isProcessing ? (
                      <div className="flex flex-col items-center">
                        <RefreshCw className="w-8 h-8 text-edumate-500 animate-spin mb-2" />
                        <span className="text-slate-500">Analyzing your speech...</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">Audio visualization will appear here</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mb-8">
                {feedback ? (
                  <Button 
                    variant="outline" 
                    onClick={resetRecording}
                    className="px-6"
                  >
                    Try Again
                  </Button>
                ) : (
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-edumate-500 hover:bg-edumate-600'
                    }`}
                    disabled={isProcessing}
                  >
                    {isRecording ? (
                      <Square className="w-6 h-6 text-white" />
                    ) : (
                      <Mic className="w-6 h-6 text-white" />
                    )}
                  </Button>
                )}
              </div>
              
              <div className="w-full">
                <h3 className="text-xl font-medium text-edumate-900 mb-4">Try these examples:</h3>
                <div className="space-y-3">
                  {practiceExamples.map((phrase, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-slate-100 hover:border-edumate-200 transition-colors">
                      <p className="text-slate-700">{phrase}</p>
                      <button 
                        className="flex items-center text-sm text-edumate-500 mt-2 hover:text-edumate-600 transition-colors"
                        onClick={() => playAudio(phrase)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Listen
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
                    <p className="text-slate-500">Record your speech to see analysis and feedback</p>
                  </div>
                )}
              </div>
              
              <div className="glass-panel p-8">
                <h3 className="text-xl font-medium text-edumate-900 mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3 mt-0.5 text-edumate-500 font-medium">1</span>
                    <p className="text-slate-700">Speak clearly into your microphone when recording</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3 mt-0.5 text-edumate-500 font-medium">2</span>
                    <p className="text-slate-700">Our AI analyzes your pronunciation, fluency, and rhythm</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3 mt-0.5 text-edumate-500 font-medium">3</span>
                    <p className="text-slate-700">Receive instant feedback and suggestions to improve</p>
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
