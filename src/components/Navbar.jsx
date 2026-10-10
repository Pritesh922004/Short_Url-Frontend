import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { SignOutUser } from '../API/User.api';
import { logout } from '../store/slice/Auth.Slice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.Auth);
  const state = isAuthenticated;
  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await SignOutUser();
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem('token');
      dispatch(logout());
      window.location.reload();
    }
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white/90 border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                LinkVault
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 sm:space-x-1.5">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                location.pathname === '/'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                location.pathname === '/features'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Features
            </Link>
            <Link
              to="/ai-hub"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 ${
                location.pathname.startsWith('/ai-hub')
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50/80'
              }`}
            >
              <span>AI Hub</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-purple-500 text-white font-extrabold rounded-full animate-pulse">✨</span>
            </Link>
            <Link
              to="/faq"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                location.pathname === '/faq'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              FAQ
            </Link>

            {!state ? (
              <div className="flex items-center gap-3 pl-2">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-500/25 hover:shadow-md hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.98]"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 pl-2">
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                    location.pathname === '/dashboard'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                    location.pathname === '/analytics'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  Analytics
                </Link>

                <div className="h-4 w-px bg-slate-200 mx-1"></div>

                {/* User Pill */}
                <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-100/80 rounded-full border border-slate-200/60">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {getInitial()}
                  </div>
                  <span className="text-xs font-medium text-slate-700 max-w-[100px] truncate">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-700 hover:text-red-600 hover:bg-red-50/80 border border-slate-200 hover:border-red-200 transition-all duration-150 cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button with Glitter Ring Effect */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-0.5 rounded-2xl transition-all duration-300 ${
                isOpen
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-purple-500/30 '
                  : 'bg-transparent'
              }`}
              aria-label="Toggle menu"
            >
              <div className="p-2 bg-white rounded-xl text-slate-700 hover:text-slate-900 flex items-center justify-center">
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`h-0.5 w-full bg-slate-800 rounded-full transform transition-all duration-300 ${
                      isOpen ? 'rotate-45 translate-y-1.5 bg-indigo-600' : ''
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-full bg-slate-800 rounded-full transition-opacity duration-300 ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-full bg-slate-800 rounded-full transform transition-all duration-300 ${
                      isOpen ? '-rotate-45 -translate-y-2 bg-indigo-600' : ''
                    }`}
                  ></span>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown with Glitter Accent Line & Staggered Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-white shadow-2xl border-b border-slate-200/80 relative mt-3"
          >
            {/* Shimmering Glitter Accent Top Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.4 }}
              className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full origin-left"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
              }}
              className="px-4 pt-3 pb-6 space-y-2.5"
            >
              {state && (
                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -8 }
                  }}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 rounded-2xl mb-2 border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {getInitial()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{user?.name || 'Account'}</span>
                    <span className="text-xs text-slate-500 truncate">{user?.email || 'Logged In'}</span>
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -8 }
                }}
              >
                <Link
                  to="/"
                  className={`block py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    location.pathname === '/' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  🏠 Home
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -8 }
                }}
              >
                <Link
                  to="/features"
                  className={`block py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    location.pathname === '/features' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  ⚡ Features
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -8 }
                }}
              >
                <Link
                  to="/ai-hub"
                  className={`block py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20 flex items-center justify-between`}
                >
                  <span>✨ AI Hub Suite</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -8 }
                }}
              >
                <Link
                  to="/faq"
                  className={`block py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    location.pathname === '/faq' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  ❓ FAQ
                </Link>
              </motion.div>

              {!state ? (
                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -8 }
                  }}
                  className="pt-2"
                >
                  <Link
                    to="/auth"
                    className="flex items-center justify-center w-full py-3 text-center text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
                  >
                    Sign In
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -8 }
                    }}
                  >
                    <Link
                      to="/dashboard"
                      className={`block py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                        location.pathname === '/dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      📊 Dashboard
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -8 }
                    }}
                  >
                    <Link
                      to="/analytics"
                      className={`block py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                        location.pathname === '/analytics' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      📈 Analytics
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -8 }
                    }}
                    className="pt-2"
                  >
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-center text-xs font-bold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
