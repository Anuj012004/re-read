import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Book, Menu, X, User, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/authContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Book className="text-blue-900" size={28} />
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
            className="flex items-center gap-2 hover:text-blue-900"
          >
            <Book size={18} />
            Browse Books
          </Link>
          <Link
            to="/aboutUs"
            className="flex items-center gap-2 hover:text-blue-900"
          >
            {/* <Building2 size={18} /> */}
            About Us
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <Loader2 size={20} className="animate-spin text-blue-900" />
          ) : user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-blue-900 cursor-pointer"
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                <User size={18} />
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-900"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
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
            className="text-blue-900"
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
            className="flex items-center gap-2 hover:text-blue-900"
          >
            <Book size={18} />
            Browse Books
          </Link>
          <Link
            to="/aboutUs"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-blue-900"
          >
            {/* <Building2 size={18} /> */}
            About Us
          </Link>

          {loading ? (
            <div className="flex items-center gap-2">
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
                className="text-gray-600 hover:text-blue-900 text-left"
              >
                Logout
              </button>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
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
                className="hover:text-blue-900"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
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
