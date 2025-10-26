import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { resendVerification } from '@/api/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await resendVerification(email);

      if (response.success) {
        setEmailSent(true);
        toast.success(response.message);
      }
    } catch (error: any) {
      console.error('Resend verification error:', error);
      toast.error(error.response?.data?.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                RE-READ
              </span>
            </Link>
            <h2 className="text-3xl font-bold">Resend Verification Email</h2>
            <p className="mt-2 text-muted-foreground">
              Didn't receive the verification email? We'll send you another one
            </p>
          </div>

          {!emailSent ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Verify Your Email</CardTitle>
                <CardDescription className="text-center">
                  Enter your email address to receive a new verification link
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Resend Verification Email"}
                  </Button>
                  
                  <Link to="/login" className="w-full">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  </Link>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Email Sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a new verification link to <strong>{email}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please check your inbox and click the verification link
                  </p>
                </div>
                <div className="space-y-2 pt-4">
                  <Button onClick={() => setEmailSent(false)} variant="outline" className="w-full">
                    Resend Again
                  </Button>
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ResendVerification;