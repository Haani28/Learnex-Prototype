import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useTheme } from './ThemeProvider';
import { useUser } from './UserProvider';
import { useAuth } from './AuthProvider';
import {  
  Settings, 
  HelpCircle, 
  Bell, 
  Shield, 
  LogOut, 
  Edit,
  Trophy,
  Clock,
  Users,
  GraduationCap,
  Star,
  Award,
  UserCheck,
  UserPlus
} from 'lucide-react';

export function Profile() {
  const { theme, setTheme } = useTheme();
  const { user, setUser, logout: userLogout } = useUser();
  const { user: authUser } = useAuth();

  if (!user) return null;

  const isTeacher = user.role === 'teacher';

  const switchToStudent = () => {
    setUser({
      ...user,
      role: 'student'
    });
  };

  const switchToMentor = () => {
    setUser({
      ...user,
      role: 'teacher'
    });
  };

  const getSkillName = () => {
    const nameMap = {
      coding: 'Programming',
      music: 'Music',
      art: 'Digital Art',
      writing: 'Creative Writing',
      photography: 'Photography',
      cooking: 'Culinary Arts'
    };
    return nameMap[user.primarySkill] || 'Programming';
  };

  const studentAchievements = [
    { name: 'First Quest', icon: '🎯', description: 'Completed your first quest', rarity: 'common' },
    { name: 'Quick Learner', icon: '⚡', description: 'Completed 3 quests in one week', rarity: 'rare' },
    { name: 'Code Warrior', icon: '⚔️', description: 'Mastered advanced concepts', rarity: 'epic' }
  ];

  const teacherAchievements = [
    { name: 'Helpful Mentor', icon: '🤝', description: 'Helped 10 students', rarity: 'common' },
    { name: 'Quick Responder', icon: '💨', description: 'Average response time under 2 hours', rarity: 'rare' },
    { name: 'Student Favorite', icon: '❤️', description: 'Rated 4.8+ by students', rarity: 'legendary' }
  ];

  const achievements = isTeacher ? teacherAchievements : studentAchievements;

  return (
    <div className="p-4 space-y-6 pb-20 md:pb-8">
      <div className="text-center md:text-left space-y-2">
        <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center glow-gradient">
            <span className="text-white font-bold text-sm md:text-base">L</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground glow-text">Profile</h1>
        </div>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {isTeacher && (
        <Card className="p-4 rounded-2xl border-border bg-card glow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-card-foreground">Switch to Student Mode</h3>
              <p className="text-sm text-muted-foreground">Learn new skills alongside your students</p>
            </div>
            <Button 
              onClick={switchToStudent}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl glow-blue"
            >
              <GraduationCap className="mr-2" size={16} />
              Become Student
            </Button>
          </div>
        </Card>
      )}

      {!isTeacher && (
        <Card className="p-4 rounded-2xl border-border bg-card glow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-card-foreground">Switch to Mentor Mode</h3>
              <p className="text-sm text-muted-foreground">Help other students learn and grow</p>
            </div>
            <Button 
              onClick={switchToMentor}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl glow-button"
            >
              <UserPlus className="mr-2" size={16} />
              Become Mentor
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 md:p-8 rounded-2xl border-border bg-card glow-card">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <Avatar className="w-20 h-20 md:w-24 md:h-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-muted text-lg md:text-xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 w-8 h-8 p-0 bg-purple-500 hover:bg-purple-600 rounded-full glow-purple"
            >
              <Edit size={14} className="text-white" />
            </Button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-3 mb-3">
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground">{user.name}</h2>
              {isTeacher ? (
                <Badge className="bg-green-100 text-green-700">🎓 Teacher</Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-700">📚 Student</Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="font-medium">Email:</span>
                <span>{authUser?.email || user.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="font-medium">Skill:</span>
                <Badge variant="outline" className="border-border glow-border">
                  {getSkillName()}
                </Badge>
              </div>
              
              {authUser?.provider && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="font-medium">Login method:</span>
                  <Badge variant="outline" className="border-border">
                    {authUser.provider === 'google' ? '🔗 Google' : '📧 Email'}
                  </Badge>
                </div>
              )}

              {!isTeacher && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Trophy className="text-yellow-500 glow-icon" size={16} />
                  <span>Level {user.level} • {user.xp} XP</span>
                </div>
              )}

              {isTeacher && (
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="text-blue-500 glow-icon" size={16} />
                    <span>24h volunteer time</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="text-green-500 glow-icon" size={16} />
                    <span>12 students helped</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {isTeacher && (
        <Card className="p-6 md:p-8 rounded-2xl border-border bg-card glow-card">
          <h3 className="font-semibold text-card-foreground mb-4 text-lg md:text-xl">Teaching Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-3 bg-muted rounded-xl glow-border">
              <Star className="mx-auto mb-1 text-yellow-500 glow-icon" size={20} />
              <p className="font-semibold text-card-foreground">4.8</p>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-xl glow-border">
              <Award className="mx-auto mb-1 text-purple-500 glow-icon" size={20} />
              <p className="font-semibold text-card-foreground">89</p>
              <p className="text-xs text-muted-foreground">Responses Given</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-xl glow-border">
              <Clock className="mx-auto mb-1 text-blue-500 glow-icon" size={20} />
              <p className="font-semibold text-card-foreground">2h</p>
              <p className="text-xs text-muted-foreground">Avg Response Time</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-xl glow-border">
              <UserCheck className="mx-auto mb-1 text-green-500 glow-icon" size={20} />
              <p className="font-semibold text-card-foreground">75%</p>
              <p className="text-xs text-muted-foreground">Certification Progress</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 rounded-2xl border-border bg-card glow-card">
        <h3 className="font-semibold text-card-foreground mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-xl glow-border">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-lg">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{achievement.name}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge className="text-xs bg-purple-100 text-purple-700">
                {achievement.rarity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 rounded-2xl border-border bg-card glow-card">
        <h3 className="font-semibold text-card-foreground mb-4">Settings</h3>
        <div className="space-y-3">
          <Button 
            variant="ghost" 
            className="w-full justify-start rounded-xl hover:bg-muted glow-card"
          >
            <Bell className="mr-3 glow-icon" size={18} />
            Notifications
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start rounded-xl hover:bg-muted glow-card"
          >
            <Shield className="mr-3 glow-icon" size={18} />
            Privacy & Security
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start rounded-xl hover:bg-muted glow-card"
          >
            <HelpCircle className="mr-3 glow-icon" size={18} />
            Help & Support
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start rounded-xl hover:bg-muted glow-card"
          >
            <Settings className="mr-3 glow-icon" size={18} />
            Account Settings
          </Button>
        </div>
      </Card>

      <Card className="p-4 rounded-2xl border-red-200 bg-red-50 glow-card">
        <Button 
          variant="ghost" 
          onClick={userLogout}
          className="w-full justify-start text-red-600 hover:bg-red-100 rounded-xl"
        >
          <LogOut className="mr-3" size={18} />
          Sign Out
        </Button>
      </Card>
    </div>
  );
}