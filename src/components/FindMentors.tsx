import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { useUser } from './UserProvider';
import { Star, MessageCircle, Clock, Search, Filter, Users, GraduationCap } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  avatar: string;
  skill: string;
  rating?: number;
  students?: number;
  level?: number;
  yearsExperience?: number;
  responseTime?: string;
  specialties: string[];
  bio: string;
  isOnline: boolean;
  hourlyRate?: string;
  questsCompleted?: number;
  learningGoals?: string[];
}

export function FindMentors() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  if (!user) return null;

  const isTeacher = user.role === 'teacher';

  const people: Person[] = isTeacher ? [
    // Students for teachers
    {
      id: '1',
      name: 'Emma Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=200&h=200&fit=crop&crop=face',
      skill: user.primarySkill,
      level: 3,
      questsCompleted: 5,
      specialties: user.primarySkill === 'coding' ? ['JavaScript', 'HTML/CSS', 'React Basics'] : ['Foundation Skills', 'Creative Projects'],
      bio: `Passionate learner focusing on ${user.primarySkill}. Looking for guidance to take my skills to the next level.`,
      isOnline: true,
      learningGoals: ['Complete 10 quests this month', 'Build a portfolio project', 'Learn advanced concepts']
    },
    {
      id: '2',
      name: 'Marcus Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      skill: user.primarySkill,
      level: 2,
      questsCompleted: 3,
      specialties: user.primarySkill === 'coding' ? ['Python', 'Algorithms', 'Problem Solving'] : ['Beginner Level', 'Fundamentals'],
      bio: `New to ${user.primarySkill} but very motivated. Need help understanding core concepts and best practices.`,
      isOnline: false,
      learningGoals: ['Master the basics', 'Complete first project', 'Find study partner']
    },
    {
      id: '3',
      name: 'Sofia Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      skill: user.primarySkill,
      level: 4,
      questsCompleted: 8,
      specialties: user.primarySkill === 'coding' ? ['Frontend', 'UI/UX', 'Mobile Apps'] : ['Advanced Techniques', 'Professional Work'],
      bio: `Experienced learner in ${user.primarySkill}. Looking for mentorship to transition into professional work.`,
      isOnline: true,
      learningGoals: ['Build professional portfolio', 'Prepare for job interviews', 'Learn industry standards']
    }
  ] : [
    // Mentors for students
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=200&h=200&fit=crop&crop=face',
      skill: user.primarySkill,
      rating: 4.9,
      students: 127,
      yearsExperience: 8,
      responseTime: '< 2 hours',
      specialties: user.primarySkill === 'coding' ? ['Python', 'JavaScript', 'React', 'Backend'] : ['Fundamentals', 'Advanced Techniques'],
      bio: `Passionate about helping students master ${user.primarySkill}. I believe in hands-on learning and personalized guidance.`,
      isOnline: true,
      hourlyRate: 'Free'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      skill: user.primarySkill,
      rating: 4.8,
      students: 89,
      yearsExperience: 5,
      responseTime: '< 4 hours',
      specialties: user.primarySkill === 'coding' ? ['Mobile Apps', 'UI/UX', 'Database'] : ['Project-based Learning', 'Portfolio Building'],
      bio: `Industry professional with a love for teaching. I focus on real-world applications and career preparation.`,
      isOnline: false,
      hourlyRate: 'Free'
    },
    {
      id: '3',
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      skill: user.primarySkill,
      rating: 4.7,
      students: 156,
      yearsExperience: 12,
      responseTime: '< 1 hour',
      specialties: user.primarySkill === 'coding' ? ['Algorithms', 'Data Structures', 'Interview Prep'] : ['Advanced Concepts', 'Professional Development'],
      bio: `Senior mentor with extensive experience. I specialize in helping students land their dream opportunities.`,
      isOnline: true,
      hourlyRate: 'Free'
    }
  ];

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleConnect = (person: Person) => {
    console.log(`Connecting to ${isTeacher ? 'student' : 'mentor'}:`, person.name);
  };

  return (
    <div className="p-4 space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center glow-gradient">
            <span className="text-white font-bold text-sm md:text-base">L</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground glow-text">
            {isTeacher ? 'Find Students' : 'Find Mentors'}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {isTeacher 
            ? `Connect with ${user.primarySkill} students who need your guidance`
            : `Connect with experienced ${user.primarySkill} mentors`
          }
        </p>
      </div>

      {/* Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground glow-icon" size={18} />
          <Input
            placeholder={`Search ${isTeacher ? 'students' : 'mentors'} or specialties...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-border glow-border"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto">
          <Button variant="outline" size="sm" className="rounded-full px-4 py-2 whitespace-nowrap border-border glow-card">
            <Filter className="mr-2" size={14} />
            All {isTeacher ? 'Students' : 'Mentors'}
          </Button>
          <Button variant="outline" size="sm" className="rounded-full px-4 py-2 whitespace-nowrap border-border glow-card">
            Online Now
          </Button>
          <Button variant="outline" size="sm" className="rounded-full px-4 py-2 whitespace-nowrap border-border glow-card">
            {isTeacher ? 'Needs Help' : 'Quick Response'}
          </Button>
        </div>
      </div>

      {/* People List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPeople.map((person) => (
          <Card key={person.id} className="p-4 md:p-6 rounded-2xl border-border bg-card glow-card overflow-hidden">
            <div className="space-y-4 w-full">
              {/* Person Header */}
              <div className="flex items-start space-x-4 w-full">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback className="bg-muted">{person.name[0]}</AvatarFallback>
                  </Avatar>
                  {person.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-background rounded-full glow-green" />
                  )}
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-card-foreground">{person.name}</h3>
                    {!isTeacher && person.hourlyRate && (
                      <Badge className="bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-950/50 glow-purple">
                        {person.hourlyRate}
                      </Badge>
                    )}
                    {isTeacher && person.level && (
                      <Badge className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50 glow-blue">
                        Level {person.level}
                      </Badge>
                    )}
                  </div>

                  {!isTeacher && person.rating && (
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="text-yellow-500 fill-current glow-icon" size={16} />
                      <span className="font-semibold text-card-foreground">{person.rating}</span>
                      <span className="text-sm text-muted-foreground">({person.students} students)</span>
                    </div>
                  )}

                  {isTeacher && person.questsCompleted && (
                    <div className="flex items-center space-x-1 mb-2">
                      <GraduationCap className="text-purple-500 glow-icon" size={16} />
                      <span className="font-semibold text-card-foreground">{person.questsCompleted} quests completed</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    {!isTeacher && person.yearsExperience && (
                      <>
                        <span>{person.yearsExperience} years exp</span>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{person.responseTime}</span>
                        </div>
                      </>
                    )}
                    {isTeacher && person.learningGoals && (
                      <span>{person.learningGoals.length} learning goals</span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{person.bio}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {person.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-border glow-border">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Learning Goals (for students) */}
                  {isTeacher && person.learningGoals && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-card-foreground mb-2">Learning Goals:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {person.learningGoals.slice(0, 2).map((goal, index) => (
                          <li key={index}>• {goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 w-full">
                    <Button
                      onClick={() => handleConnect(person)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl glow-button"
                    >
                      <MessageCircle className="mr-2" size={16} />
                      {isTeacher ? 'Offer Help' : 'Connect'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedPerson(person)}
                      className="w-full rounded-xl border-border glow-card"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPeople.length === 0 && (
        <Card className="p-8 text-center rounded-2xl border-border bg-card glow-card">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Search className="text-muted-foreground" size={24} />
            </div>
            <h3 className="font-semibold text-card-foreground">
              No {isTeacher ? 'students' : 'mentors'} found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or check back later for new {isTeacher ? 'students' : 'mentors'}.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
              className="border-border glow-card"
            >
              Clear Search
            </Button>
          </div>
        </Card>
      )}

      {/* Auto-Match Suggestion */}
      <Card className="p-6 rounded-2xl border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 glow-gradient">
        <div className="text-center space-y-3">
          <h3 className="font-semibold text-foreground glow-text">Can't decide?</h3>
          <p className="text-sm text-muted-foreground">
            {isTeacher 
              ? 'Let our AI match you with students who need your expertise most.'
              : 'Let our AI match you with the perfect mentor based on your learning style and goals.'
            }
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl glow-button">
            Auto-Match Me
          </Button>
        </div>
      </Card>
    </div>
  );
}