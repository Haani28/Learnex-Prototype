import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Code, Music, Paintbrush, BookOpen, Play, CheckCircle, Clock } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  status: 'not-started' | 'ongoing' | 'complete';
  progress: number;
  category: string;
  icon: any;
  color: string;
}

export function Quests() {
  const quests: Quest[] = [
    {
      id: '1',
      title: 'Python Fundamentals',
      description: 'Master the basics of Python programming',
      xp: 150,
      status: 'ongoing',
      progress: 65,
      category: 'Coding',
      icon: Code,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: '2',
      title: 'Guitar Chords Mastery',
      description: 'Learn 20 essential guitar chords',
      xp: 100,
      status: 'complete',
      progress: 100,
      category: 'Music',
      icon: Music,
      color: 'from-green-400 to-green-600'
    },
    {
      id: '3',
      title: 'Digital Art Basics',
      description: 'Create your first digital artwork',
      xp: 120,
      status: 'not-started',
      progress: 0,
      category: 'Art',
      icon: Paintbrush,
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: '4',
      title: 'Creative Writing',
      description: 'Write your first short story',
      xp: 80,
      status: 'ongoing',
      progress: 30,
      category: 'Writing',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'ongoing':
        return <Play className="text-blue-500" size={20} />;
      default:
        return <Clock className="text-muted-foreground" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-950/50">Complete</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50">Ongoing</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground hover:bg-muted">Not Started</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Learning Quests</h1>
        </div>
        <p className="text-muted-foreground">Complete quests to earn XP and level up!</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 rounded-full px-4 py-2 text-white whitespace-nowrap">
          All Quests
        </Button>
        <Button variant="outline" size="sm" className="rounded-full px-4 py-2 whitespace-nowrap border-border">
          Ongoing
        </Button>
        <Button variant="outline" size="sm" className="rounded-full px-4 py-2 whitespace-nowrap border-border">
          Complete
        </Button>
      </div>

      {/* Quests List */}
      <div className="space-y-4">
        {quests.map((quest) => {
          const Icon = quest.icon;
          return (
            <Card key={quest.id} className="p-4 rounded-2xl border-border bg-card">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${quest.color} flex-shrink-0`}>
                  <Icon className="text-white" size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-card-foreground truncate">{quest.title}</h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(quest.status)}
                      <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">+{quest.xp} XP</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{quest.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(quest.status)}
                      <span className="text-xs text-muted-foreground">{quest.category}</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className={`rounded-full px-4 ${
                        quest.status === 'complete' 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : quest.status === 'ongoing'
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-purple-500 hover:bg-purple-600'
                      }`}
                    >
                      {quest.status === 'complete' ? 'View' : quest.status === 'ongoing' ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                  
                  {quest.status !== 'not-started' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{quest.progress}%</span>
                      </div>
                      <Progress value={quest.progress} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}