import { Link } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "@/hooks/authContext";

interface HeroProps {}

export default function Hero({}: HeroProps): JSX.Element {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 flex flex-col md:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
            Welcome to Re-Read
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 italic">
            Buy and sell books with fellow students.
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
            Connect with students from your school, college, or university to buy and sell used books.
            Save money, help the environment, and build your academic community.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <Link
              to="/allbooks"
              className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition transform hover:scale-105 shadow-lg"
            >
              Browse Books
            </Link>

            {isLoggedIn ? (
              <Link
                to="/sellbook"
                className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105 shadow-lg"
              >
                Sell Book
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-white border border-blue-900 text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 animate-fadeIn">
          <img
            src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
            alt="Reading books illustration"
            className="w-full max-w-md mx-auto drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
