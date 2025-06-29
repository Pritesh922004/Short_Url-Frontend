import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';
import { SignOutUser } from '../API/User.api';
import { logout } from '../store/slice/Auth.Slice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.Auth);
  const state = isAuthenticated
  const dispatch = useDispatch()

  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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


  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Shorter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!state ? (
              <div className="pt-2 space-y-2">
                <Link to="/auth" className="block w-full py-2 text-center rounded-lg border border-blue-600 text-blue-600 px-4 hover:bg-blue-600 hover:text-white transition-all duration-500">
                  Sign In
                </Link>
              </div>
            ) : (
              <>
                <Link to="/" className={` hover:text-blue-600 transition-all duration-500 ${location.pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-700'
                  }`}>
                  Home
                </Link>
                <Link to="/dashboard" className={` hover:text-blue-600  transition-all duration-500 ${location.pathname === '/dashboard' ? 'text-blue-600 font-semibold ' : 'text-gray-700'
                  }`}>
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="block w-full py-2 text-center rounded-lg border border-blue-600 text-blue-600 px-4 hover:bg-blue-600 hover:text-white transition-all duration-500 cursor-pointer">
                  Log Out
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${isOpen ? 'rotate-45 top-2.5' : 'top-0'
                  }`}></span>
                <span className={`absolute h-0.5 w-6 bg-gray-800 top-2 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                <span className={`absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${isOpen ? '-rotate-45 top-2.5' : 'top-4'
                  }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-4 pt-2 pb-4 bg-white space-y-3 shadow-lg">
          

          {!state ? (
            <div className="pt-2 space-y-2">
              <Link to="/auth" className="block w-full py-2 text-center rounded-lg border border-blue-600 text-blue-600">
                Sign In
              </Link>
            </div>
          ) : (
            <>
            <Link to="/" className={`block py-2 px-3 rounded-md ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}>
            Home
          </Link>
            <Link to="/dashboard" className={`block py-2 px-3 rounded-md ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}>
              Dashboard
            </Link> 
            <button onClick={handleSignOut} className="block w-full py-2 text-center rounded-lg border border-blue-600 text-blue-600">
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;