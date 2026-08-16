import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';
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
      dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white/60 backdrop-blur-sm border-b border-slate-100 py-4'
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
            {/* <Link
              to="/pricing"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                location.pathname === '/pricing'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Pricing
            </Link> */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-slate-700 rounded-full transform transition-all duration-200 ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                ></span>
                <span
                  className={`h-0.5 w-full bg-slate-700 rounded-full transition-opacity duration-200 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`h-0.5 w-full bg-slate-700 rounded-full transform transition-all duration-200 ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden animate-fade-in border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {state && (
            <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl mb-2 border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                {getInitial()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">{user?.name || 'Account'}</span>
                <span className="text-xs text-slate-500 truncate">{user?.email || 'Logged In'}</span>
              </div>
            </div>
          )}

          <Link
            to="/"
            className={`block py-2 px-3.5 rounded-xl text-xs font-semibold ${
              location.pathname === '/' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={`block py-2 px-3.5 rounded-xl text-xs font-semibold ${
              location.pathname === '/features' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className={`block py-2 px-3.5 rounded-xl text-xs font-semibold ${
              location.pathname === '/pricing' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/faq"
            className={`block py-2 px-3.5 rounded-xl text-xs font-semibold ${
              location.pathname === '/faq' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            FAQ
          </Link>

          {!state ? (
            <div className="pt-2">
              <Link
                to="/auth"
                className="flex items-center justify-center w-full py-2.5 text-center text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`block py-2 px-3.5 rounded-xl text-xs font-semibold ${
                  location.pathname === '/dashboard' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className={`block py-2 px-3.5 rounded-xl text-xs font-semibold ${
                  location.pathname === '/analytics' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Analytics
              </Link>

              <div className="pt-2">
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-center text-xs font-semibold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;