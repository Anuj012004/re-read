import { Link } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "@/hooks/authContext";
import { Book} from "lucide-react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

interface HeroProps {}

export default function Hero({}: HeroProps): JSX.Element {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <>
      {/* Main Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-24 lg:py-10 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-20 max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-sm font-medium">
              <Book size={16} />
              Books Marketplace
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-5xl">
              Buy and Sell Used Books within{" "}
              <ContainerTextFlip className="bg-orange-400 text-black shadow-lg px-4 rounded-lg"
              words={['colleges','schools','University','organizations']} />
             
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed">
             Connect with buyers and sellers across schools, colleges, universities, and organizations. Save money, help the environment, and build your community
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
              <Link
                to="/allbooks"
                className="group bg-orange-400 text-black px-8 py-4 rounded-full hover:bg-orange-300 transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg font-semibold text-lg flex items-center justify-center gap-2"
              >
                Browse Books
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/sellbook"
                  className="border text-black px-8 py-4 rounded-full transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg font-semibold text-lg"
                >
                  Sell Your Books
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="bg-white border-2 border-black-900 px-8 py-4 rounded-full hover:bg-orange-300 transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg font-semibold text-lg"
                >
                  Get Started Free
                </Link>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>100% Free to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Community Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>


     
    </>
  );
}
