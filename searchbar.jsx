// SearchPage.jsx (or App.jsx)

import React, { useState } from 'react';
import SearchBar from './components/search/SearchBar'; // Assuming the path is correct
import LoadingState from './components/search/LoadingState'; // Assuming this exists
import AnswerDisplay from './components/search/AnswerDisplay'; // Assuming this exists
import { getSpaceBiologyAnswer } from './api/gemini'; // Import the new API utility

export default function SearchPage() {
  const [answerData, setAnswerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setAnswerData(null); 
    setError(null);
    setIsLoading(true);

    try {
      // 🚀 EXECUTE GEMINI API CALL HERE 🚀
      const aiAnswer = await getSpaceBiologyAnswer(query);

      // In a real app, you'd fetch the actual NASA source link.
      // For this example, we mock the data structure required by AnswerDisplay.
      const result = {
        question: query,
        answer: aiAnswer,
        source: "https://nasa-data-summary-via-gemini.com", 
        sourceType: "other", 
        relevance_score: 1.0
      };

      setAnswerData(result);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unknown error occurred during search.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      {/* SearchBar is clean and ready */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && <LoadingState />}
      
      {error && (
        <p className="text-red-500 text-center mt-6 text-lg">{error}</p>
      )}

      {answerData && (
        <AnswerDisplay 
          question={answerData.question}
          answer={answerData.answer}
          source={answerData.source}
          sourceType={answerData.sourceType}
        />
      )}
    </div>
  );
}