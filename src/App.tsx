import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { UserProvider, useUser } from './components/UserProvider';
import { Auth } from './components/Auth';
import { Onboarding } from './components/Onboarding';
import { SkillNavigation } from './components/SkillNavigation';
import { DesktopNavigation } from './components/DesktopNavigation';
import { SkillDashboard } from './components/SkillDashboard';
import { FindMentors } from './components/FindMentors';
import { Progress } from './components/Progress';
import { SkillForum } from './components/SkillForum';
import { Profile } from './components/Profile';
import { useIsMobile } from './components/ui/use-mobile';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { user, isOnboarded } = useUser();
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const isMobile = useIsMobile();

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Auth />;
  }

  // Show onboarding if authenticated but not onboarded
  if (!isOnboarded || !user) {
    return <Onboarding />;
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <SkillDashboard />;
      case 'mentors':
        return <FindMentors />;
      case 'progress':
        return <Progress />;
      case 'forum':
        return <SkillForum />;
      case 'profile':
        return <Profile />;
      default:
        return <SkillDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      {isMobile && (
        <div className="max-w-md mx-auto bg-background min-h-screen relative">
          {renderCurrentScreen()}
          <SkillNavigation 
            currentScreen={currentScreen} 
            onScreenChange={setCurrentScreen} 
          />
        </div>
      )}

      {/* Desktop/Tablet Layout */}
      {!isMobile && (
        <div className="flex min-h-screen">
          {/* Desktop Sidebar Navigation */}
          <DesktopNavigation 
            currentScreen={currentScreen} 
            onScreenChange={setCurrentScreen} 
          />
          
          {/* Main Content Area */}
          <div className="flex-1 ml-64">
            <div className="min-h-screen bg-background">
              {/* Content wrapper with responsive max-width */}
              <div className="max-w-4xl mx-auto px-6 py-8">
                {renderCurrentScreen()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <UserProvider>
          <AppContent />
          <Toaster />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}