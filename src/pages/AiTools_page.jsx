import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import AiCodeReviewer from '../components/AiCodeReviewer';
import AiDocTranslator from '../components/AiDocTranslator';
import SEO from '../components/SEO';

const AiTools_page = () => {
  const [activeTool, setActiveTool] = useState('code-review'); // 'code-review' | 'translator'

  return (
    <div className="min-h-screen cyber-grid-light py-6 sm:py-10 px-3 sm:px-6 lg:px-8 overflow-x-hidden relative">
      <SEO 
        title="AI Hub Suite - Code Review &amp; Document Translation" 
        description="Supercharge developer workflows with LinkVault AI Hub. Instantly review code syntax, detect bugs, and translate PDF technical documentation." 
      />

      {/* Ambient Radial Cyber Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[350px] pointer-events-none -z-10">
        <div className="absolute top-[-30px] left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20px] right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10"
      >
        {/* Top Header & Glassmorphic Navigation Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/90 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 text-xs font-bold border border-purple-200/60 shadow-xs">
              <span className="animate-pulse">✨</span>
              <span className="font-mono text-[11px] uppercase tracking-wider">Gemini 2.5 Multi-Modal Suite</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              AI Productivity Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Architectural code reviews, vulnerability checks &amp; technical PDF translations powered by Gemini AI
            </p>
          </div>

          {/* Active Tool Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl w-full md:w-auto shadow-inner border border-slate-200/60">
            <button
              onClick={() => setActiveTool('code-review')}
              className={`relative flex-1 md:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTool === 'code-review'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>💻 AI Code Reviewer</span>
            </button>
            <button
              onClick={() => setActiveTool('translator')}
              className={`relative flex-1 md:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTool === 'translator'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>📄 Document Translator</span>
            </button>
          </div>
        </div>

        {/* Main Active Tool View with AnimatePresence */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTool === 'code-review' ? (
              <motion.div
                key="code-review"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <AiCodeReviewer />
              </motion.div>
            ) : (
              <motion.div
                key="translator"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <AiDocTranslator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AiTools_page;
