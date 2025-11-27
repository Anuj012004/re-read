import api from "@/lib/axios";

// Register user
export const registerUser = async (name: string, email: string, password: string, confirmPassword: string) => {
  const response = await api.post('/api/auth/register', { name, email, password, confirmPassword });
  return response.data;
};

// Login user
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data; // Returns { success, message, user }
};

// Verify email
export const verifyEmail = async (token: string) => {
  const response = await api.get(`/api/auth/verify-email/${token}`);
  return response.data;
};

// Resend verification email
export const resendVerification = async (email: string) => {
  const response = await api.post('/api/auth/resend-verification', { email });
  return response.data;
};

// Forgot password
export const forgotPassword = async (email: string) => {
  const response = await api.post('/api/auth/forgot-password', { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token: string, password: string) => {
  const response = await api.post(`/api/auth/reset-password/${token}`, { password });
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};

// Get current user - Returns the user object directly
export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  // Return just the user object, not the whole response
  return response.data.user;
};

export default api;