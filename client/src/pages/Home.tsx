import type { JSX } from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Cards from "@/components/InfoCards"
import SaveMoneySection from "@/components/SaveMoneySection";
import { BooksShowcase } from "@/components/BooksShowcase";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/authContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Home(): JSX.Element {
  const { user } = useAuth(); // Get user from auth context
  const navigate = useNavigate(); // For navigation
  
  const isLoggedIn = !!user; 

  // Handle login action
  const handleLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <div>
      <Navbar />
      <div>
        <Hero />
      </div>
      < Cards />
      <SaveMoneySection />
      <div>
        <BooksShowcase 
          isLoggedIn={isLoggedIn} 
          onLogin={handleLogin} 
        />
      </div>
      <Footer />
    </div>
   
  );
}