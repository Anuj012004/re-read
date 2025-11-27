import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { registerUser } from '@/api/auth'; 
import type { RegisterResponse } from '@/types/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    try {
      const response: RegisterResponse = await registerUser(formData.name, formData.email, formData.password, formData.confirmPassword);
      
      if (response.success) {
        toast.success(response.message);
        setRegistrationSuccess(true);
      }

    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => toast.error(err.msg));
      } else {
        toast.error(error.response?.data?.message || "Registration failed!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-background w-full overflow-x-hidden">
        <Navbar />
        <div className="flex items-center justify-center py-16 px-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Check Your Email!</h2>
                <p className="text-muted-foreground">
                  We've sent a verification link to <strong>{formData.email}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Please click the link in the email to verify your account and complete registration.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left space-y-2">
                <p className="font-semibold text-blue-900"> Email not received?</p>
                <ul className="text-blue-800 space-y-1 ml-4 list-disc">
                  <li>Check your spam or junk folder</li>
                  <li>Verify you entered the correct email</li>
                  <li>Wait a few minutes for the email to arrive</li>
                </ul>
              </div>
              <div className="space-y-3">
                <Link to="/resend-verification" className="block">
                  <Button variant="outline" className="w-full">
                    Resend Verification Email
                  </Button>
                </Link>
                <Link to="/login" className="block">
                  <Button variant="ghost" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    );
  }

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
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Join RE-READ</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground px-4">
              Create your account to start buying and selling books
            </p>
          </div>

          {/* Registration Form */}
          <Card className="shadow-elegant bg-gradient-card mx-4 sm:mx-0">
            <CardHeader className="space-y-1 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl text-center">Create Account</CardTitle>
              <CardDescription className="text-center text-sm">Fill in your details to get started</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 px-4 sm:px-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                  </div>
                </div>

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
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white" 
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                  <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 text-sm selection:bg-blue-500 selection:text-white" 
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 mt-4">
                <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center px-4">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Register;
