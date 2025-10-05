import React, { useState, useEffect } from 'react';
import { InvokeLLM } from '@/integrations/Core';
import { SearchHistory } from '@/entities/SearchHistory';
import SearchBar from '../components/search/SearchBar';
import AnswerDisplay from '../components/search/AnswerDisplay';
import LoadingState from '../components/search/LoadingState';
import RecentSearches from '../components/search/RecentSearches';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    const searches = await SearchHistory.list('-created_date', 10);
    setRecentSearches(searches);
  };

  const handleSearch = async (question) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await InvokeLLM({
        prompt: `You are a NASA data specialist. Search for and provide ONE single authoritative answer to this space biology question using ONLY official NASA sources (GeneLab, OSDR, APOD, TechPort, NASA Images, Mars missions, etc.).

Question: "${question}"

Requirements:
1. Find the MOST RELEVANT NASA source for this question
2. Provide a concise, accurate answer based on that source
3. Include the specific NASA source URL
4. If no relevant NASA data exists, return null for the answer

Focus on these NASA sources in priority order:
- GeneLab (genelab.nasa.gov) - for space biology experiments
- OSDR (osdr.nasa.gov) - for life sciences data
- NASA TechPort - for technology and missions
- NASA APOD - for astronomy images and explanations
- NASA Images API - for official media and captions

Return ONLY the most relevant single answer, not multiple options.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            answer: {
              type: ["string", "null"],
              description: "Concise answer from NASA source, or null if no relevant data found"
            },
            source: {
              type: ["string", "null"],
              description: "Full URL to the NASA source"
            },
            source_type: {
              type: "string",
              enum: ["genelab", "osdr", "apod", "techport", "images", "mission", "donki", "neows", "other"],
              description: "Type of NASA source"
            },
            relevance_score: {
              type: "number",
              description: "Relevance score from 0-100"
            }
          }
        }
      });

      const searchResult = {
        question,
        answer: response.answer,
        source: response.source,
        source_type: response.source_type || 'other',
        relevance_score: response.relevance_score || 0
      };

      await SearchHistory.create(searchResult);
      
      setResult(searchResult);
      loadRecentSearches();

    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search NASA databases. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Stellar
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore space biology knowledge from NASA's official databases
          </p>
          <p className="text-sm text-gray-600 mt-2">
            GeneLab • OSDR • TechPort • APOD • Mars Missions
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Error Alert */}
        {error && (
          <div className="w-full max-w-3xl mx-auto mt-8">
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {!isLoading && result && (
          <AnswerDisplay
            question={result.question}
            answer={result.answer}
            source={result.source}
            sourceType={result.source_type}
          />
        )}

        {/* Recent Searches */}
        {!isLoading && !result && recentSearches.length > 0 && (
          <RecentSearches 
            searches={recentSearches} 
            onSelectSearch={handleSearch}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-24 pb-12">
          <p className="text-gray-600 text-sm mb-4">
            Built with NASA's public APIs • Data updated in real-time
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500 text-xs">
            <a href__="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              NASA API
            </a>
            <span>•</span>
            <a href__="https://genelab.nasa.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              GeneLab
            </a>
            <span>•</span>
            <a href__="https://osdr.nasa.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              OSDR
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}