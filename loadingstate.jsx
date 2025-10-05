import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl mx-auto mt-12 text-center"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="inline-block mb-6"
      >
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=200&fit=crop" 
            alt="Searching"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30"></div>
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-xl font-semibold text-white mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Searching NASA databases...
      </motion.h3>
      
      <p className="text-gray-500">
        Querying GeneLab, OSDR, and other NASA sources
      </p>

      <div className="flex justify-center gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}