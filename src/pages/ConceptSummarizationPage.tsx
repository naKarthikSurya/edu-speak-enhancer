
import { useState } from 'react';
import { ArrowLeft, FileText, Download, Copy, ChevronsDown, ChevronsUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const ConceptSummarizationPage = () => {
  const [inputText, setInputText] = useState(`Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. This process occurs in the chloroplasts of plant cells, specifically within structures called thylakoids which contain the pigment chlorophyll. Chlorophyll absorbs light energy, primarily from the blue and red parts of the electromagnetic spectrum, initiating the photosynthetic process.

The overall reaction of photosynthesis can be summarized by the chemical equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This indicates that carbon dioxide and water, in the presence of light energy, are converted into glucose and oxygen.

Photosynthesis occurs in two main stages: the light-dependent reactions and the light-independent reactions (Calvin cycle). In the light-dependent reactions, which take place in the thylakoid membranes, light energy is converted into chemical energy in the form of ATP and NADPH. Water molecules are split, releasing oxygen as a byproduct. In the Calvin cycle, which occurs in the stroma of the chloroplast, the ATP and NADPH produced during the light-dependent reactions are used to convert carbon dioxide into glucose.

The significance of photosynthesis extends beyond plant nutrition. It plays a crucial role in the global carbon cycle by removing carbon dioxide from the atmosphere and releasing oxygen. This process is vital for maintaining atmospheric oxygen levels necessary for aerobic organisms, including humans. Additionally, photosynthesis is the primary way in which energy enters many ecosystems, as plants and other photosynthetic organisms form the base of food chains and webs.

Factors affecting the rate of photosynthesis include light intensity, carbon dioxide concentration, temperature, and water availability. Understanding these factors is important in agriculture for optimizing crop yields and in ecology for predicting how changes in environmental conditions might impact ecosystem productivity.`);
  
  const [summarizationLevel, setSummarizationLevel] = useState('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const summaryText = {
    high: "Photosynthesis converts light energy into chemical energy (glucose) in plants and some microorganisms. The process occurs in chloroplasts, following the equation 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. It involves light-dependent reactions (producing ATP, NADPH, and O₂) and the Calvin cycle (producing glucose). Photosynthesis is essential for atmospheric oxygen, the carbon cycle, and food chains.",
    medium: "Photosynthesis is the process where plants and certain microorganisms convert light energy into chemical energy as glucose. Occurring in chloroplasts containing chlorophyll, it follows the equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. The process has two stages: light-dependent reactions (producing ATP, NADPH, and oxygen) and the Calvin cycle (using ATP and NADPH to convert CO₂ to glucose). Photosynthesis maintains atmospheric oxygen levels, removes CO₂, and forms the base of food chains. Factors affecting its rate include light intensity, CO₂ concentration, temperature, and water availability.",
    low: "Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy into chemical energy in the form of glucose. This occurs in chloroplasts containing chlorophyll, which absorbs light energy primarily from blue and red spectrum parts. The chemical equation is 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. The process has two stages: light-dependent reactions in thylakoid membranes (producing ATP, NADPH, and oxygen) and the Calvin cycle in the stroma (using ATP and NADPH to convert carbon dioxide to glucose). Photosynthesis is crucial for removing CO₂ from the atmosphere, maintaining oxygen levels for aerobic organisms, and providing energy to ecosystems as the base of food chains. Factors affecting photosynthesis rates include light intensity, carbon dioxide concentration, temperature, and water availability, which are important considerations in agriculture and ecology."
  };
  
  const summarizeLevels = [
    { key: 'high', label: 'High Compression', icon: <ChevronsUp className="w-4 h-4" /> },
    { key: 'medium', label: 'Medium Compression', icon: null },
    { key: 'low', label: 'Low Compression', icon: <ChevronsDown className="w-4 h-4" /> }
  ];
  
  const handleProcess = () => {
    if (inputText.trim() === '') return;
    
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };
  
  const keyConcepts = [
    "Photosynthesis converts light energy to chemical energy",
    "Occurs in chloroplasts containing chlorophyll",
    "Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
    "Two stages: light-dependent reactions and Calvin cycle",
    "Crucial for oxygen production and carbon fixation",
    "Forms the base of most food chains"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header />
      <main className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-edumate-600 hover:text-edumate-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-medium text-edumate-900 mb-4">Concept Summarization</h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Distill lengthy texts into concise, customizable summaries for efficient learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-panel p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium text-edumate-900">Input Text</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-600 hover:text-edumate-600 hover:bg-edumate-50 rounded-lg transition-colors" title="Upload document">
                      <FileText className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full p-4 min-h-[300px] rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-edumate-500 text-slate-800"
                  placeholder="Paste your text here for summarization..."
                ></textarea>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-slate-500">
                    {inputText.length} characters
                  </div>
                  <button
                    onClick={handleProcess}
                    disabled={isProcessing || inputText.trim() === ''}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      isProcessing || inputText.trim() === ''
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-edumate-500 text-white hover:bg-edumate-600'
                    } transition-colors`}
                  >
                    {isProcessing ? 'Processing...' : 'Summarize'}
                  </button>
                </div>
              </div>
              
              <div className="glass-panel p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium text-edumate-900">Summary</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-600 hover:text-edumate-600 hover:bg-edumate-50 rounded-lg transition-colors" title="Copy summary">
                      <Copy className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-edumate-600 hover:bg-edumate-50 rounded-lg transition-colors" title="Download summary">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-slate-100 min-h-[200px]">
                  <p className="text-slate-800 leading-relaxed">
                    {summaryText[summarizationLevel as keyof typeof summaryText]}
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-edumate-900 mb-3">Summarization Level</h4>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    {summarizeLevels.map(level => (
                      <button
                        key={level.key}
                        onClick={() => setSummarizationLevel(level.key)}
                        className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
                          summarizationLevel === level.key
                            ? 'bg-edumate-100 text-edumate-700 border border-edumate-200'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-edumate-200'
                        }`}
                      >
                        {level.icon && <span className="mr-1">{level.icon}</span>}
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                <div className="glass-panel p-8">
                  <h3 className="text-xl font-medium text-edumate-900 mb-6">Key Concepts</h3>
                  
                  <div className="space-y-3">
                    {keyConcepts.map((concept, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-edumate-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-edumate-600 text-xs font-medium">{index + 1}</span>
                        </div>
                        <p className="text-slate-700">{concept}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-edumate-50 rounded-lg p-6 border border-edumate-100">
                  <div className="flex items-center text-edumate-800 mb-4">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <h3 className="text-lg font-medium">Learning Enhancement</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-slate-700 text-sm">
                      Your summary focuses on the fundamental process of photosynthesis, highlighting:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-edumate-600 mr-2">•</span>
                        <span className="text-slate-700">The core chemical reaction and components</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-edumate-600 mr-2">•</span>
                        <span className="text-slate-700">The two-stage process (light-dependent and Calvin cycle)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-edumate-600 mr-2">•</span>
                        <span className="text-slate-700">Ecological importance in oxygen production and as an energy source</span>
                      </li>
                    </ul>
                    <p className="text-slate-700 text-sm">
                      Try adjusting the summarization level to focus on different aspects based on your learning needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConceptSummarizationPage;
