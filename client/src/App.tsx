import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShowAllBooks from "./pages/ShowAllBooks";
import SellBook from "./pages/sellingForm";
import ProfilePage from "./pages/profile";
import VerifyEmail from "./pages/emailVerification";
import ForgotPassword from "./pages/forgotPass";
import ResetPassword from "./pages/resetPassword";
import ResendVerification from "./pages/resendVerification";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/scrollToTop";
import ProtectedRoute from "./components/protectedRoutes";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allbooks" element={<ShowAllBooks />} />
        <Route path="/sellbook" element={<SellBook />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path= "/aboutUS" element={<AboutUs />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
      </Routes>
    </>
  );
}

export default App;
