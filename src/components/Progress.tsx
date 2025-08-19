import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress as ProgressBar } from './ui/progress';
import { useUser } from './UserProvider';
import { Trophy, Clock, Target, Award, TrendingUp, Calendar } from 'lucide-react';

export function Progress() {
  const { user } = useUser();

  if (!user) return null;

  const studentProgress = {
    totalXP: user.xp,
    level: user.level,
    questsCompleted: 2,
    totalQuests: 4,
    currentStreak: 5,
    hoursLearned: 12,
    badges: [
      { name: 'First Quest', icon: '🎯', date: '2024-01-15', rarity: 'common' },
      { name: 'Quick Learner', icon: '⚡', date: '2024-01-18', rarity: 'rare' },
      { name: 'Code Warrior', icon: '⚔️', date: '2024-01-20', rarity: 'epic' }
    ],
    weeklyProgress: [
      { day: 'Mon', xp: 45 },
      { day: 'Tue', xp: 30 },
      { day: 'Wed', xp: 75 },
      { day: 'Thu', xp: 20 },
      { day: 'Fri', xp: 85 },
      { day: 'Sat', xp: 40 },
      { day: 'Sun', xp: 60 }
    ]
  };

  const teacherProgress = {
    volunteerHours: 24,
    studentsHelped: 12,
    responsesGiven: 89,
    rating: 4.8,
    certificateProgress: 75, // Towards teaching certification
    badges: [
      { name: 'Helpful Mentor', icon: '🤝', date: '2024-01-10', rarity: 'common' },
      { name: 'Quick Responder', icon: '💨', date: '2024-01-15', rarity: 'rare' },
      { name: 'Student Favorite', icon: '❤️', date: '2024-01-22', rarity: 'legendary' }
    ]
  };

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
      case 'rare': return 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300';
      case 'epic': return 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300';
      case 'legendary': return 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const progress = user.role === 'student' ? studentProgress : teacherProgress;

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {user.role === 'student' ? 'Your Progress' : 'Teaching Stats'}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {user.role === 'student' ? 'Track your learning journey' : 'Your impact as a mentor'}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {user.role === 'student' ? (
          <>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <Trophy className="mx-auto mb-2 text-yellow-500" size={24} />
              <p className="font-bold text-card-foreground">{'totalXP' in progress ? progress.totalXP : 0}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <Target className="mx-auto mb-2 text-blue-500" size={24} />
              <p className="font-bold text-card-foreground">{studentProgress.questsCompleted}/{studentProgress.totalQuests}</p>
              <p className="text-xs text-muted-foreground">Quests</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <TrendingUp className="mx-auto mb-2 text-green-500" size={24} />
              <p className="font-bold text-card-foreground">{studentProgress.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <Clock className="mx-auto mb-2 text-purple-500" size={24} />
              <p className="font-bold text-card-foreground">{studentProgress.hoursLearned}h</p>
              <p className="text-xs text-muted-foreground">Learning Time</p>
            </Card>
          </>
        ) : (
          <>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <Clock className="mx-auto mb-2 text-blue-500" size={24} />
              <p className="font-bold text-card-foreground">{teacherProgress.volunteerHours}h</p>
              <p className="text-xs text-muted-foreground">Volunteer Hours</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <Target className="mx-auto mb-2 text-green-500" size={24} />
              <p className="font-bold text-card-foreground">{teacherProgress.studentsHelped}</p>
              <p className="text-xs text-muted-foreground">Students Helped</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <Trophy className="mx-auto mb-2 text-purple-500" size={24} />
              <p className="font-bold text-card-foreground">{teacherProgress.responsesGiven}</p>
              <p className="text-xs text-muted-foreground">Responses Given</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl border-border bg-card">
              <Award className="mx-auto mb-2 text-yellow-500" size={24} />
              <p className="font-bold text-card-foreground">{teacherProgress.rating}★</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </Card>
          </>
        )}
      </div>

      {/* Level Progress (Student) or Certification Progress (Teacher) */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">
          {user.role === 'student' ? `Level ${user.level} Progress` : 'Teaching Certification'}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {user.role === 'student' ? 'Current XP' : 'Progress'}
            </span>
            <span className="font-semibold text-card-foreground">
              {user.role === 'student' ? `${user.xp}/100` : `${teacherProgress.certificateProgress}%`}
            </span>
          </div>
          <ProgressBar 
            value={user.role === 'student' ? (user.xp % 100) : teacherProgress.certificateProgress} 
            className="h-3"
          />
          <p className="text-sm text-muted-foreground">
            {user.role === 'student' 
              ? `${100 - (user.xp % 100)} XP to level ${user.level + 1}`
              : `${100 - teacherProgress.certificateProgress}% to earn teaching certificate`
            }
          </p>
        </div>
      </Card>

      {/* Weekly Activity (Student only) */}
      {user.role === 'student' && (
        <Card className="p-6 rounded-2xl border-border bg-card">
          <h3 className="font-semibold text-card-foreground mb-4">This Week's Activity</h3>
          <div className="flex justify-between items-end space-x-2">
            {studentProgress.weeklyProgress.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div 
                  className="w-full bg-purple-200 dark:bg-purple-900/30 rounded-sm relative overflow-hidden"
                  style={{ height: '60px' }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-sm transition-all"
                    style={{ height: `${(day.xp / 85) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
                <span className="text-xs font-semibold text-card-foreground">{day.xp}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Certificate Request (Teacher only) */}
      {user.role === 'teacher' && (
        <Card className="p-6 rounded-2xl border-border bg-card">
          <h3 className="font-semibold text-card-foreground mb-4">Teaching Certificate</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">Requirements:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✅ 20+ volunteer hours (24h completed)</li>
                <li>✅ 10+ students helped (12 completed)</li>
                <li>✅ 4.5+ average rating (4.8 achieved)</li>
                <li>⏳ Complete certification quiz</li>
              </ul>
            </div>
            <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all">
              <Calendar className="inline mr-2" size={16} />
              Request Certificate
            </button>
          </div>
        </Card>
      )}

      {/* Badges & Achievements */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">Badges & Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {progress.badges.map((badge, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-2xl">
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{badge.name}</p>
                <Badge className={`text-xs ${getBadgeColor(badge.rarity)} hover:${getBadgeColor(badge.rarity)}`}>
                  {badge.rarity}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{badge.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Goals Section */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">
          {user.role === 'student' ? 'Learning Goals' : 'Teaching Goals'}
        </h3>
        <div className="space-y-3">
          {user.role === 'student' ? (
            <>
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <span className="text-sm text-card-foreground">Complete 5 quests this month</span>
                <Badge variant="outline" className="border-border">2/5</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <span className="text-sm text-card-foreground">Maintain 7-day learning streak</span>
                <Badge variant="outline" className="border-border">5/7</Badge>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <span className="text-sm text-card-foreground">Help 20 students this month</span>
                <Badge variant="outline" className="border-border">12/20</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <span className="text-sm text-card-foreground">Earn teaching certificate</span>
                <Badge variant="outline" className="border-border">75%</Badge>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}