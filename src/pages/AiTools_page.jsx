import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import AiCodeReviewer from '../components/AiCodeReviewer';
import AiDocTranslator from '../components/AiDocTranslator';
import SEO from '../components/SEO';

const AiTools_page = () => {
  const [activeTool, setActiveTool] = useState('code-review'); // 'code-review' | 'translator'

  return (
    <div className="min-h-screen bg-slate-50/50 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 overflow-x-hidden">`n      <SEO title="AI Hub - Code Review & Translation" description="Supercharge your productivity with LinkVault AI Hub. Instantly review code and translate PDF documents." />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
      >
        {/* Top Header & Navigation Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/95 p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 text-xs font-bold border border-indigo-200/50">
              <span className="animate-pulse">✨</span>
              <span>LinkVault AI Hub</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Productivity Suite
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Smart developer & document tools powered by Gemini AI
            </p>
          </div>

          {/* Active Tool Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto shadow-inner">
            <button
              onClick={() => setActiveTool('code-review')}
              className={`relative flex-1 md:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTool === 'code-review'
                  ? 'bg-white text-indigo-700 shadow-md shadow-indigo-500/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>💻 AI Code Reviewer</span>
            </button>
            <button
              onClick={() => setActiveTool('translator')}
              className={`relative flex-1 md:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTool === 'translator'
                  ? 'bg-white text-purple-700 shadow-md shadow-purple-500/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>📄 PDF / Doc Translator</span>
            </button>
          </div>
        </div>

        {/* Main Active Tool View with AnimatePresence */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTool === 'code-review' ? (
              <motion.div
                key="code-review"
                initial={{ opacity: 0, y: 15, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.99 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <AiCodeReviewer />
              </motion.div>
            ) : (
              <motion.div
                key="translator"
                initial={{ opacity: 0, y: 15, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.99 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
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
