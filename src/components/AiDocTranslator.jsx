import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { translateDocAPI } from '../API/Ai.api';

const TARGET_LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Hindi',
  'Gujarati',
  'Japanese',
  'Chinese (Mandarin)',
  'Arabic',
  'Russian',
  'Portuguese',
  'Italian',
  'Korean',
  'Marathi',
  'Bengali'
];

const AiDocTranslator = () => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'text'
  const [file, setFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError('');
    }
  };

  const handleTranslate = async (e) => {
    e.preventDefault();

    if (activeTab === 'upload' && !file) {
      setError('Please select a PDF or Text document file to translate.');
      return;
    }
    if (activeTab === 'text' && !rawText.trim()) {
      setError('Please enter text content to translate.');
      return;
    }

    setError('');
    setLoading(true);
    setTranslationResult(null);

    try {
      let payload;
      if (activeTab === 'upload' && file) {
        payload = new FormData();
        payload.append('document', file);
        payload.append('targetLanguage', targetLanguage);
      } else {
        payload = { text: rawText, targetLanguage };
      }

      const res = await translateDocAPI(payload);
      if (res.success) {
        setTranslationResult(res);
      } else {
        setError(res.message || 'Translation failed.');
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

  const handleCopy = () => {
    if (translationResult?.translatedText) {
      navigator.clipboard.writeText(translationResult.translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!translationResult?.translatedText) return;
    const blob = new Blob([translationResult.translatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `translated_${targetLanguage.toLowerCase()}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-400/30 mb-2 sm:mb-3">
            <span>🌐 AI Multilingual Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            PDF & Document AI Translator
          </h2>
          <p className="mt-1 sm:mt-2 text-purple-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Upload PDF files or paste document text to translate into 15+ global languages instantly with preserved layout structure.
          </p>
        </div>
        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10  items-center justify-center text-3xl shadow-inner">
          📄
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm"
      >
        <form onSubmit={handleTranslate} className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => { setActiveTab('upload'); setError(''); }}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeTab === 'upload'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📁 Upload PDF / File
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('text'); setError(''); }}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeTab === 'text'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📝 Raw Text Input
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <label className="text-xs font-bold text-slate-700 flex-shrink-0">Target Language:</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs transition-all"
              >
                {TARGET_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input Section with AnimatePresence */}
          <AnimatePresence mode="wait">
            {activeTab === 'upload' ? (
              <motion.div
                key="tab-upload"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="border-2 border-dashed border-slate-300 hover:border-purple-400 bg-slate-50/70 hover:bg-purple-50/20 transition-all rounded-2xl p-6 sm:p-10 text-center flex flex-col items-center justify-center cursor-pointer relative"
              >
                <input
                  type="file"
                  accept=".pdf,.txt,.md,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-3 shadow-xs"
                >
                  📄
                </motion.div>
                {file ? (
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-purple-900 break-all">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB • Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700">Drop PDF or text document here</p>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-1">Supports PDF, TXT, MD up to 10MB</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="tab-text"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste document text here to translate..."
                  className="w-full h-44 sm:h-52 p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed resize-none shadow-inner"
                />
              </motion.div>
            )}
          </AnimatePresence>

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
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-700/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Translating Document...</span>
              </>
            ) : (
              <>
                <span>🌐 Translate to {targetLanguage}</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Translation Output Dual Section */}
        <AnimatePresence>
          {translationResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="mt-8 border-t border-slate-100 pt-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span>Translated Output ({translationResult.targetLanguage})</span>
                  {translationResult.filename && (
                    <span className="text-[11px] font-normal text-slate-500 truncate max-w-[200px]">
                      ({translationResult.filename})
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copied ? '✅ Copied' : '📋 Copy Text'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    ⬇️ Download TXT
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Original Preview */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                    Original Content
                  </p>
                  <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
                    {translationResult.originalText}
                  </div>
                </div>

                {/* Translated Preview */}
                <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-200 shadow-2xs">
                  <p className="text-[10px] sm:text-xs font-bold text-purple-700 mb-2 uppercase tracking-wider">
                    Translated ({targetLanguage})
                  </p>
                  <div className="prose prose-sm sm:prose-base prose-slate max-w-none text-purple-950 font-medium max-h-72 overflow-y-auto leading-relaxed prose-headings:text-purple-950 prose-headings:font-bold prose-h1:text-lg prose-h2:text-base prose-p:my-2 prose-ul:my-2 prose-li:my-0"><ReactMarkdown>{translationResult.translatedText}</ReactMarkdown></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AiDocTranslator;
