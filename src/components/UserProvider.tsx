import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthProvider';

type UserRole = 'student' | 'teacher';
type Skill = 'coding' | 'music' | 'art' | 'writing' | 'photography' | 'cooking';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  primarySkill: Skill;
  level: number;
  xp: number;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isOnboarded: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  completeOnboarding: (role: UserRole, skill: Skill, name: string, email: string) => void;
  updateUserProgress: (xp: number) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading] = useState(false);
  const { user: authUser, logout: authLogout } = useAuth();

  // Reset user state when auth user changes
  useEffect(() => {
    if (!authUser) {
      setUserState(null);
      setIsOnboarded(false);
    }
  }, [authUser]);

  const setUser = (userData: User) => {
    setUserState(userData);
  };

  const completeOnboarding = (role: UserRole, skill: Skill, name: string, email: string) => {
    if (!authUser) return;

    const newUser: User = {
      id: authUser.id,
      name,
      email,
      role,
      primarySkill: skill,
      level: 1,
      xp: 0,
      avatar: authUser.avatar
    };

    setUserState(newUser);
    setIsOnboarded(true);
  };

  const updateUserProgress = (xpGained: number) => {
    if (!user) return;

    const newXp = user.xp + xpGained;
    const newLevel = Math.floor(newXp / 100) + 1;

    setUserState({
      ...user,
      xp: newXp,
      level: newLevel
    });
  };

  const logout = () => {
    setUserState(null);
    setIsOnboarded(false);
    authLogout();
  };

  return (
    <UserContext.Provider value={{
      user,
      isOnboarded,
      isLoading,
      setUser,
      completeOnboarding,
      updateUserProgress,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}