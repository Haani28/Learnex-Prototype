import { useUser } from './UserProvider';
import { Search, User, TrendingUp, MessageCircle, Users } from 'lucide-react';

interface DesktopNavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export function DesktopNavigation({ currentScreen, onScreenChange }: DesktopNavigationProps) {
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
    <nav className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border p-6 z-50 glow-nav">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center glow-gradient">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground glow-text">Learnex</h1>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-xl glow-border">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{user.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-card-foreground truncate">{user.name}</p>
              <p className="text-sm text-muted-foreground">
                {user.role === 'teacher' ? '🎓 Teacher' : `📚 Level ${user.level}`}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onScreenChange(id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-left ${
                currentScreen === id
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 glow-purple'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon size={20} className={currentScreen === id ? 'glow-icon' : ''} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}