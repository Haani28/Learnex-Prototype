import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, MessageCircle, Calendar, Award, Users, ArrowLeft } from 'lucide-react';

interface MentorProfileProps {
  onBack: () => void;
}

export function MentorProfile({ onBack }: MentorProfileProps) {
  const mentor = {
    name: 'Sarah Chen',
    title: 'Senior Software Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    students: 127,
    sessions: 340,
    yearsExperience: 8,
    bio: 'Passionate about helping students master programming fundamentals and advanced concepts. Specialized in Python, JavaScript, and web development.',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning', 'Data Science'],
    achievements: [
      'Top Mentor 2023',
      'Student Favorite',
      '500+ Sessions'
    ],
    availability: 'Mon-Fri, 6-9 PM PST',
    responseTime: '< 2 hours'
  };

  const reviews = [
    {
      student: 'Alex Kim',
      rating: 5,
      comment: 'Sarah explains complex concepts in a really clear way. Helped me understand Python loops finally!',
      date: '2 days ago'
    },
    {
      student: 'Jordan Lee',
      rating: 5,
      comment: 'Amazing mentor! Very patient and encouraging. Highly recommend for anyone learning JavaScript.',
      date: '1 week ago'
    },
    {
      student: 'Maya Chen',
      rating: 4,
      comment: 'Great at breaking down problems step by step. Really helped with my React project.',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="rounded-full w-10 h-10 p-0 border-border"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mentor Profile</h1>
        </div>
      </div>

      {/* Mentor Info Card */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={mentor.avatar} />
            <AvatarFallback className="text-2xl bg-muted">SC</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-xl font-bold text-card-foreground">{mentor.name}</h2>
            <p className="text-muted-foreground">{mentor.title}</p>
            
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Star className="text-yellow-500 fill-current" size={20} />
              <span className="font-semibold text-card-foreground">{mentor.rating}</span>
              <span className="text-sm text-muted-foreground">({mentor.students} reviews)</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="text-center">
              <p className="font-semibold text-card-foreground">{mentor.students}</p>
              <p>Students</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-card-foreground">{mentor.sessions}</p>
              <p>Sessions</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-card-foreground">{mentor.yearsExperience}+</p>
              <p>Years Exp</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Bio */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-3">About</h3>
        <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
      </Card>

      {/* Skills & Expertise */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {mentor.skills.map((skill, index) => (
            <Badge key={index} className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50 rounded-full">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">Achievements</h3>
        <div className="space-y-3">
          {mentor.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl">
              <Award className="text-yellow-600 dark:text-yellow-400" size={20} />
              <span className="font-medium text-card-foreground">{achievement}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Availability */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Schedule</span>
            <span className="font-medium text-card-foreground">{mentor.availability}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Response Time</span>
            <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-950/50">
              {mentor.responseTime}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Reviews */}
      <Card className="p-6 rounded-2xl border-border bg-card">
        <h3 className="font-semibold text-card-foreground mb-4">Recent Reviews</h3>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 bg-muted rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-card-foreground">{review.student}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl py-3">
          <MessageCircle className="mr-2" size={18} />
          Connect
        </Button>
        <Button variant="outline" className="flex-1 rounded-xl py-3 border-border">
          <Calendar className="mr-2" size={18} />
          Schedule
        </Button>
      </div>
    </div>
  );
}