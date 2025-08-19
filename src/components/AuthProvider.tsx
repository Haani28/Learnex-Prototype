import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: 'email' | 'google';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - accept any valid email format and any password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) && password.length > 0) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face`,
        provider: 'email',
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      setIsLoading(false);
      return { success: true, message: 'Login successful!' };
    } else {
      setIsLoading(false);
      return { success: false, message: 'Please enter a valid email address and password.' };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockUser: User = {
      id: '2',
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: `https://images.unsplash.com/photo-1494790108755-2616b332c5cf?w=200&h=200&fit=crop&crop=face`,
      provider: 'google',
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return { success: true, message: 'Google login successful!' };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock registration - always succeeds in prototype
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      name: name,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face`,
      provider: 'email',
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return { success: true, message: 'Account created successfully!' };
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}