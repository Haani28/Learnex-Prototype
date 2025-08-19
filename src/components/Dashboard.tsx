import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Star, Zap, Trophy, Users, Target, HelpCircle } from 'lucide-react';

export function Dashboard() {
  const currentXP = 850;
  const nextLevelXP = 1000;
  const currentLevel = 7;
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  const stats = [
    { icon: Trophy, label: 'Quests Completed', value: '12', color: 'text-yellow-500' },
    { icon: Users, label: 'Mentors Met', value: '3', color: 'text-blue-500' },
    { icon: Star, label: 'Avg Rating', value: '4.8', color: 'text-purple-500' },
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Learnex</h1>
        </div>
        <h2 className="text-xl font-bold text-foreground">Welcome back, Alex! 👋</h2>
        <p className="text-muted-foreground">Ready to level up your skills today?</p>
      </div>

      {/* XP and Level Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-100 dark:border-purple-900/20 rounded-2xl">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="text-purple-600 dark:text-purple-400" size={24} />
            <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">Level {currentLevel}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentXP} XP</span>
              <span>{nextLevelXP} XP</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-purple-100 dark:bg-purple-900/20" />
            <p className="text-sm text-muted-foreground">{nextLevelXP - currentXP} XP to next level</p>
          </div>

          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-3">
            <Users className="mr-2" size={18} />
            Auto-Match with Mentor
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ icon: Icon, label, value, color }, index) => (
          <Card key={index} className="p-4 text-center rounded-2xl border-border bg-card">
            <Icon className={`mx-auto mb-2 ${color}`} size={24} />
            <p className="text-lg font-bold text-card-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start rounded-xl border-border">
            <Target className="mr-3 text-blue-500" size={18} />
            Continue Python Quest
          </Button>
          <Button variant="outline" className="w-full justify-start rounded-xl border-border">
            <HelpCircle className="mr-3 text-green-500" size={18} />
            Ask for Help
          </Button>
        </div>
      </Card>
    </div>
  );
}