
import { useState } from 'react';
import { summarizeConcept, sampleText, CompressionLevel } from '@/services/conceptService';
import { useToast } from '@/hooks/use-toast';

export const useConceptSummarization = () => {
  const [inputText, setInputText] = useState(sampleText);
  const [summary, setSummary] = useState("");
  const [keyConcepts, setKeyConcepts] = useState<string[]>([]);
  const [learningEnhancement, setLearningEnhancement] = useState<{
    focusPoints: string[];
    suggestedRelatedTopics: string[];
  }>({
    focusPoints: [],
    suggestedRelatedTopics: []
  });
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const { toast } = useToast();
  
  const generateSummary = async () => {
    if (inputText.trim() === '') {
      toast({
        title: "Empty Text",
        description: "Please enter some text to summarize.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await summarizeConcept(inputText, compressionLevel);
      setSummary(result.summary);
      setKeyConcepts(result.keyConcepts);
      setLearningEnhancement(result.learningEnhancement);
      setIsGenerated(true);
      
      toast({
        title: "Summary Generated",
        description: `Created a ${compressionLevel} compression summary.`,
      });
    } catch (error) {
      toast({
        title: "Summarization Failed",
        description: "Could not summarize your text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const changeCompressionLevel = (level: CompressionLevel) => {
    setCompressionLevel(level);
    
    // If summary already exists, regenerate with new compression level
    if (isGenerated) {
      generateSummary();
    }
  };
  
  const resetSummary = () => {
    setIsGenerated(false);
    setSummary("");
    setKeyConcepts([]);
    setLearningEnhancement({
      focusPoints: [],
      suggestedRelatedTopics: []
    });
  };
  
  return {
    inputText,
    setInputText,
    summary,
    keyConcepts,
    learningEnhancement,
    compressionLevel,
    isProcessing,
    isGenerated,
    generateSummary,
    changeCompressionLevel,
    resetSummary
  };
};
