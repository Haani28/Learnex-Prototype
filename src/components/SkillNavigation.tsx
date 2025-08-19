import { Search, User, TrendingUp, MessageCircle, Users } from 'lucide-react';
import { useUser } from './UserProvider';

interface SkillNavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export function SkillNavigation({ currentScreen, onScreenChange }: SkillNavigationProps) {
  const { user } = useUser();

  if (!user) return null;

  const navItems = [
    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
    { 
      id: 'mentors', 
      icon: user.role === 'teacher' ? Users : Search, 
      label: user.role === 'teacher' ? 'Find Students' : 'Find Mentor' 
    },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'forum', icon: MessageCircle, label: 'Forum' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 z-50 glow-nav">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onScreenChange(id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              currentScreen === id
                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 glow-purple'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={20} className={currentScreen === id ? 'glow-icon' : ''} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}