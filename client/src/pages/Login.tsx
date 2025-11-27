import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/hooks/authContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from context
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNeedsVerification(false);

    try {
      // Use login from context to update AuthProvider state
      await login(formData.email, formData.password);

      toast.success("Logged in successfully!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate("/"); // Navigate after successful login
    } catch (error: any) {
      console.error('Login error:', error.response?.data);
      
      const errorData = error.response?.data;
      
      if (errorData?.requiresVerification) {
        setNeedsVerification(true);
        setUserEmail(errorData.email || formData.email);
        toast.error(errorData.message);
      } else {
        toast.error(errorData?.message || 'Login failed!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    navigate('/resend-verification');
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navbar />
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md w-full space-y-6">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                RE-READ
              </span>
            </Link>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground px-4">
              Sign in to continue to your account
            </p>
          </div>

          {/* Verification Alert */}
          {needsVerification && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-semibold text-orange-900">
                      Email Verification Required
                    </p>
                    <p className="text-sm text-orange-800">
                      Please verify your email address ({userEmail}) before logging in. Check your inbox for the verification link.
                    </p>
                    <Button 
                      onClick={handleResendVerification}
                      variant="outline" 
                      size="sm"
                      className="mt-2 border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Resend Verification Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Login Form */}
          <Card className="shadow-elegant bg-gradient-card mx-4 sm:mx-0">
            <CardHeader className="space-y-1 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center text-sm">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 px-4 sm:px-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="selection:bg-blue-500 selection:text-white pl-10 text-sm" 
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me
                <div className="flex items-center space-x-2">
                  <input 
                    id="remember" 
                    type="checkbox" 
                    className="rounded border-border" 
                  />
                  <Label htmlFor="remember" className="text-xs sm:text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div> */}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 mt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center px-4">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Login;
