import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <style>{`
        :root {
          --background: 240 10% 3.9%;
          --foreground: 0 0% 98%;
          --primary: 217 91% 60%;
          --primary-foreground: 0 0% 98%;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.3) rgba(0, 0, 0, 0.3);
        }
        
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        *::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      {children}
    </div>
  );
}