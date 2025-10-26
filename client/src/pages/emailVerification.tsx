import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/authContext';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth(); 
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        const { verifyEmail } = await import('@/api/auth');
        const data = await verifyEmail(token!);

        if (data.success) {
          setStatus('success');
          setMessage(data.message);
          toast.success('Email verified successfully!');
          
          //  Refresh user to update auth context
          await refreshUser();
          
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message);
          toast.error(data.message);
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        const errorMessage = error.response?.data?.message || 'Failed to verify email. Please try again.';
        setStatus('error');
        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    };

    if (token) {
      verifyEmailToken();
    }
  }, [token, navigate, refreshUser]); 

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {status === 'loading' && (
              <>
                <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">Verifying your email...</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">{message}</p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to home page...
                  </p>
                </div>
                <Button onClick={() => navigate('/', { replace: true })} className="w-full">
                  Go to Home
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 mx-auto text-red-500" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">Verification Failed</p>
                  <p className="text-sm text-muted-foreground">{message}</p>
                </div>
                <div className="space-y-3">
                  <Button onClick={() => navigate('/login', { replace: true })} className="w-full">
                    Go to Login
                  </Button>
                  <Link to="/resend-verification" className="block">
                    <Button variant="outline" className="w-full">
                      Resend Verification Email
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;