import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Book, Menu, X, User, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/authContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show auth buttons immediately if not in initial loading state
  const showAuthButtons = !loading || user !== null;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Book className="text-orange-400" size={28} />
          <span
            className="text-lg font-bold text-black cursor-pointer"
            onClick={() => navigate("/")}
          >
            RE-READ
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 text-gray-600">
          <Link
            to="/allbooks"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Book size={18} />
            Browse Books
          </Link>
          <Link
            to="/aboutUs"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            About Us
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4 min-w-[180px] justify-end">
          {!showAuthButtons ? (
            <Loader2 size={20} className="animate-spin text-blue-900" />
          ) : user ? (
            <>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-gray-600 hover:text-orange-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoggingOut && <Loader2 size={16} className="animate-spin" />}
                Logout
              </button>
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-orange-400 text-black px-4 py-2 rounded-full py-2 px-4 hover:bg-orange-300 transition-colors ml-5"
              >
                <User size={18} />
                Profile
                
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-orange-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
              className="bg-orange-400 text-black px-4 py-2 rounded-full hover:bg-orange-500 transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-gray-600">
          <Link
            to="/allbooks"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Book size={18} />
            Browse Books
          </Link>
          <Link
            to="/aboutUs"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            About Us
          </Link>

          {!showAuthButtons ? (
            <div className="flex items-center gap-2 text-orange-900">
              <Loader2 size={18} className="animate-spin" />
              Loading...
            </div>
          ) : user ? (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                disabled={isLoggingOut}
                className="text-gray-600 hover:text-orange-400 text-left disabled:opacity-50 flex items-center gap-2"
              >
                {isLoggingOut && <Loader2 size={16} className="animate-spin" />}
                Logout
              </button>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 bg-orange-400 text-black px-4 py-2 rounded-full hover:bg-orange-300 transition-colors"
              >
                <User size={18} />
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-orange-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-orange-400 border text-black px-4 py-2 rounded-lg hover:bg-orange-500 transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}