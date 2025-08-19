import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useUser } from './UserProvider';
import { useAuth } from './AuthProvider';
import { Code, Music, Paintbrush, BookOpen, Camera, ChefHat, Users, GraduationCap } from 'lucide-react';

type UserRole = 'student' | 'teacher';
type Skill = 'coding' | 'music' | 'art' | 'writing' | 'photography' | 'cooking';

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [name, setName] = useState('');
  const { completeOnboarding } = useUser();
  const { user: authUser } = useAuth();
  const hasInitializedName = useRef(false);

  // Initialize name with auth user's name only once
  useEffect(() => {
    if (authUser?.name && !hasInitializedName.current) {
      setName(authUser.name);
      hasInitializedName.current = true;
    }
  }, [authUser?.name]);

  const skills = [
    { id: 'coding', name: 'Programming', icon: Code, color: 'from-blue-400 to-blue-600', description: 'Learn coding & software development' },
    { id: 'music', name: 'Music', icon: Music, color: 'from-green-400 to-green-600', description: 'Master instruments & music theory' },
    { id: 'art', name: 'Digital Art', icon: Paintbrush, color: 'from-pink-400 to-pink-600', description: 'Create stunning digital artwork' },
    { id: 'writing', name: 'Creative Writing', icon: BookOpen, color: 'from-purple-400 to-purple-600', description: 'Craft compelling stories & content' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'from-amber-400 to-amber-600', description: 'Capture and edit amazing photos' },
    { id: 'cooking', name: 'Culinary Arts', icon: ChefHat, color: 'from-red-400 to-red-600', description: 'Master cooking techniques & recipes' }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
    setStep(3);
  };

  const handleComplete = () => {
    if (selectedRole && selectedSkill && name && authUser) {
      completeOnboarding(selectedRole, selectedSkill, name, authUser.email);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Learnex</h1>
          </div>
          <p className="text-muted-foreground">Welcome to your learning journey!</p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Choose your role</h2>
              <p className="text-sm text-muted-foreground">How would you like to use Learnex?</p>
            </div>

            <div className="space-y-3">
              <Card 
                className="p-6 cursor-pointer hover:shadow-md transition-all border-border bg-card"
                onClick={() => handleRoleSelect('student')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">I'm here to learn</h3>
                    <p className="text-sm text-muted-foreground">Explore skills, complete quests, and connect with mentors</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-md transition-all border-border bg-card"
                onClick={() => handleRoleSelect('teacher')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">I'm here to teach</h3>
                    <p className="text-sm text-muted-foreground">Share your expertise and guide students on their journey</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Skill Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">
                {selectedRole === 'student' ? 'What do you want to learn?' : 'What would you like to teach?'}
              </h2>
              <p className="text-sm text-muted-foreground">Choose your primary skill area</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <Card
                    key={skill.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-all border-border bg-card"
                    onClick={() => handleSkillSelect(skill.id as Skill)}
                  >
                    <div className="text-center space-y-3">
                      <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground text-sm">{skill.name}</h3>
                        <p className="text-xs text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Button 
              variant="outline" 
              onClick={() => setStep(1)}
              className="w-full border-border"
            >
              Back
            </Button>
          </div>
        )}

        {/* Step 3: Name Input */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Almost there!</h2>
              <p className="text-sm text-muted-foreground">
                {authUser?.name ? `Hi ${authUser.name}! Let's customize your profile.` : 'What should we call you?'}
              </p>
            </div>

            <div className="text-center p-4 bg-muted rounded-xl">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Badge className="bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300">
                  {selectedRole === 'student' ? 'Student' : 'Teacher'}
                </Badge>
                <Badge variant="outline" className="border-border">
                  {skills.find(s => s.id === selectedSkill)?.name}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-border"
              />

              <div className="space-y-2">
                <Button 
                  onClick={handleComplete}
                  disabled={!name.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl py-3"
                >
                  Start Learning Journey
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="w-full border-border"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}