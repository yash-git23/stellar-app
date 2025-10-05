import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentSearches({ searches, onSelectSearch }) {
  if (!searches || searches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-4xl mx-auto mt-12"
    >
      <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-blue-400" />
            Recent Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {searches.slice(0, 5).map((search, index) => (
              <motion.div
                key={search.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800/50"
                  onClick={() => onSelectSearch(search.question)}
                >
                  <TrendingUp className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="truncate">{search.question}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}