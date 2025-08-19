import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageCircle, Clock, CheckCircle, Send, Filter } from 'lucide-react';
import { useState } from 'react';

interface HelpRequest {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'answered' | 'resolved';
  mentor?: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  responses: number;
}

export function Help() {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  
  const helpRequests: HelpRequest[] = [
    {
      id: '1',
      title: 'How to handle exceptions in Python?',
      category: 'Coding',
      status: 'answered',
      mentor: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=100&h=100&fit=crop&crop=face'
      },
      createdAt: '2 hours ago',
      responses: 3
    },
    {
      id: '2',
      title: 'Guitar finger positioning tips',
      category: 'Music',
      status: 'pending',
      createdAt: '1 day ago',
      responses: 0
    },
    {
      id: '3',
      title: 'Color theory for digital art',
      category: 'Art',
      status: 'resolved',
      mentor: {
        name: 'Mike Torres',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      createdAt: '3 days ago',
      responses: 5
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'answered':
        return <MessageCircle className="text-blue-500" size={16} />;
      default:
        return <Clock className="text-amber-500" size={16} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-950/50">Resolved</Badge>;
      case 'answered':
        return <Badge className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50">Answered</Badge>;
      default:
        return <Badge className="bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/50">Pending</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Need Help?</h1>
        </div>
        <p className="text-muted-foreground">Ask mentors for guidance on your learning journey</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-xl p-1">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${
            activeTab === 'new'
              ? 'bg-background text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          Ask for Help
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${
            activeTab === 'history'
              ? 'bg-background text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          Your Requests
        </button>
      </div>

      {activeTab === 'new' ? (
        <Card className="p-6 rounded-2xl border-border bg-card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                What do you need help with?
              </label>
              <Input
                placeholder="e.g., Python loops, Guitar chord transitions..."
                className="rounded-xl border-border focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Category
              </label>
              <Select>
                <SelectTrigger className="rounded-xl border-border">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Describe your question
              </label>
              <Textarea
                placeholder="Provide more details about what you're struggling with..."
                rows={4}
                className="rounded-xl border-border focus:ring-purple-500 focus:border-purple-500 resize-none"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl py-3">
              <Send className="mr-2" size={18} />
              Submit Request
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{helpRequests.length} requests</span>
            <Button variant="outline" size="sm" className="rounded-full border-border">
              <Filter className="mr-2" size={16} />
              Filter
            </Button>
          </div>

          {helpRequests.map((request) => (
            <Card key={request.id} className="p-4 rounded-2xl border-border bg-card">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1">{request.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{request.category}</span>
                      <span>•</span>
                      <span>{request.createdAt}</span>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                {request.mentor && (
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-xl">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={request.mentor.avatar} />
                      <AvatarFallback className="bg-muted-foreground/20">{request.mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Answered by {request.mentor.name}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {getStatusIcon(request.status)}
                    <span>{request.responses} responses</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full border-border">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}