import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { reviewCodeAPI } from '../API/Ai.api';

const LANGUAGES = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'C#', value: 'csharp' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'PHP', value: 'php' },
  { label: 'HTML/CSS', value: 'html' },
  { label: 'SQL', value: 'sql' },
];

/**
 * Animated Smooth Score Counter Component
 */
const AnimatedScoreGauge = ({ rawText }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Extract score number from review text (e.g., "85/100" or "Rating: 90")
    let targetScore = 85;
    if (rawText) {
      const match = rawText.match(/(\d{1,3})\s*\/\s*100/) || rawText.match(/(\d{2,3})%/);
      if (match && match[1]) {
        targetScore = Math.min(100, Math.max(0, parseInt(match[1], 10)));
      }
    }

    let start = 0;
    const duration = 1200; // ms
    const increment = Math.max(1, Math.floor(targetScore / (duration / 20)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetScore) {
        setScore(targetScore);
        clearInterval(timer);
      } else {
        setScore(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [rawText]);

  const getScoreColor = () => {
    if (score >= 80) return 'from-emerald-500 to-teal-600 text-emerald-400 border-emerald-500/30';
    if (score >= 60) return 'from-amber-500 to-yellow-600 text-amber-400 border-amber-500/30';
    return 'from-rose-500 to-red-600 text-rose-400 border-rose-500/30';
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border border-indigo-500/20 mb-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getScoreColor()} flex items-center justify-center font-black text-lg sm:text-xl shadow-lg border`}>
          {score}
        </div>
        <div>
          <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
            <span>Overall Quality Score</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-400/30">
              AI Rating
            </span>
          </div>
          <div className="text-[11px] text-slate-300 mt-0.5">
            {score >= 80 ? '🌟 Excellent Code Architecture' : score >= 60 ? '⚡ Good, with optimization opportunities' : '⚠️ Refactoring recommended'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-24 sm:w-32 hidden sm:block">
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className={`h-full rounded-full bg-gradient-to-r ${getScoreColor()}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const AiCodeReviewer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [instruction, setInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleReview = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter source code to review.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await reviewCodeAPI({ code, language, instruction });
      if (res.success) {
        setResult(res.review);
      } else {
        setError(res.message || 'Failed to analyze code.');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          'Failed to connect to AI server. Please check your Gemini API key configuration.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Banner with Gradient Animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold border border-indigo-400/30 mb-2 sm:mb-3">
            <span>⚡ AI Code Architect</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            Instant Code Review & Refactoring
          </h2>
          <p className="mt-1 sm:mt-2 text-indigo-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Detect security risks, bug vulnerabilities, performance bottlenecks, and get clean, refactored code instantly.
          </p>
        </div>
        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10  items-center justify-center text-3xl shadow-inner">
          💻
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Code Input Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm flex flex-col justify-between"
        >
          <form onSubmit={handleReview} className="space-y-4 flex-1 flex flex-col">
            <div className="flex flex-row justify-between items-center gap-3">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                <span>Source Code</span>
              </label>

              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs transition-all cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Code Input Box */}
            <div className="relative flex-1 min-h-[280px] sm:min-h-[320px]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`// Paste your ${language} code here...\n\nfunction calculateTotal(items) {\n  let total = 0;\n  for (let i = 0; i < items.length; i++) {\n    total += items[i].price;\n  }\n  return total;\n}`}
                className="w-full h-full min-h-[280px] sm:min-h-[320px] p-3.5 sm:p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed shadow-inner"
                spellCheck="false"
              />
            </div>

            {/* Optional Instruction Focus */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Specific Focus (Optional)
              </label>
              <input
                type="text"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g. Focus on memory usage, security, or Async performance"
                className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium"
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Code...</span>
                </>
              ) : (
                <>
                  <span>🚀 Run AI Review</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* AI Output Result Panel */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Review Report</span>
              {result && (
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Completed
                </span>
              )}
            </h3>
            {result && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyResult}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? '✅ Copied' : '📋 Copy Report'}
              </motion.button>
            )}
          </div>

          <div className="flex-1 min-h-[300px] sm:min-h-[380px] overflow-y-auto">
            {loading ? (
              <div className="h-full min-h-[300px] sm:min-h-[380px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-2xl animate-bounce shadow-xs">
                    ✨
                  </div>
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">Analyzing Logic & Security</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400">Inspecting logic, performance metrics, and refactoring possibilities...</p>
                </div>

                {/* Animated Skeleton Loading lines */}
                <div className="w-full max-w-xs space-y-2 pt-4">
                  <div className="h-3 bg-slate-100 rounded-full animate-pulse w-3/4"></div>
                  <div className="h-3 bg-slate-100 rounded-full animate-pulse w-full"></div>
                  <div className="h-3 bg-slate-100 rounded-full animate-pulse w-5/6"></div>
                </div>
              </div>
            ) : result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Smooth Score Gauge Badge */}
                <AnimatedScoreGauge rawText={result} />

                {/* Full Review Text Body */}
                <div className="prose prose-sm sm:prose-base prose-slate max-w-none font-sans text-slate-700 leading-relaxed bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm prose-headings:text-indigo-950 prose-headings:font-extrabold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-a:text-indigo-600 prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-semibold prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:shadow-inner prose-pre:border prose-pre:border-slate-800 prose-li:marker:text-indigo-400">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[300px] sm:min-h-[380px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-100 rounded-2xl">
                <span className="text-3xl sm:text-4xl mb-3">🔍</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-700">No Review Generated Yet</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                  Paste your code snippet on the left and click "Run AI Review" to generate instant feedback.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AiCodeReviewer;
