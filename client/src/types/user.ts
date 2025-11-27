
export interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
  requiresVerification?: boolean;
}