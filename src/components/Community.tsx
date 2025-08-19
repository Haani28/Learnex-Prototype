import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Code, Music, Paintbrush, BookOpen, Camera, Gamepad2, MessageCircle, Heart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  members: number;
  threads: number;
}

interface Thread {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  replies: number;
  likes: number;
  timeAgo: string;
  isHot: boolean;
}

export function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'coding',
      name: 'Coding',
      icon: Code,
      color: 'from-blue-400 to-blue-600',
      members: 1243,
      threads: 89
    },
    {
      id: 'music',
      name: 'Music',
      icon: Music,
      color: 'from-green-400 to-green-600',
      members: 856,
      threads: 67
    },
    {
      id: 'art',
      name: 'Digital Art',
      icon: Paintbrush,
      color: 'from-pink-400 to-pink-600',
      members: 672,
      threads: 45
    },
    {
      id: 'writing',
      name: 'Writing',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600',
      members: 534,
      threads: 38
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      color: 'from-amber-400 to-amber-600',
      members: 423,
      threads: 29
    },
    {
      id: 'gaming',
      name: 'Game Dev',
      icon: Gamepad2,
      color: 'from-red-400 to-red-600',
      members: 389,
      threads: 23
    }
  ];

  const threads: Thread[] = [
    {
      id: '1',
      title: 'Best Python frameworks for beginners?',
      author: {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      category: 'coding',
      replies: 24,
      likes: 47,
      timeAgo: '2h ago',
      isHot: true
    },
    {
      id: '2',
      title: 'Share your latest guitar covers!',
      author: {
        name: 'Maya Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=100&h=100&fit=crop&crop=face'
      },
      category: 'music',
      replies: 18,
      likes: 52,
      timeAgo: '4h ago',
      isHot: true
    },
    {
      id: '3',
      title: 'Digital painting techniques for portraits',
      author: {
        name: 'Jordan Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      category: 'art',
      replies: 15,
      likes: 38,
      timeAgo: '6h ago',
      isHot: false
    },
    {
      id: '4',
      title: 'Writing prompts for creative blocks',
      author: {
        name: 'Sam Rivera',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face'
      },
      category: 'writing',
      replies: 12,
      likes: 29,
      timeAgo: '8h ago',
      isHot: false
    }
  ];

  const filteredThreads = selectedCategory 
    ? threads.filter(thread => thread.category === selectedCategory)
    : threads;

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Community</h1>
        </div>
        <p className="text-muted-foreground">Connect with fellow learners and share your journey</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className={`p-4 rounded-2xl border-border bg-card cursor-pointer transition-all ${
                selectedCategory === category.id
                  ? 'ring-2 ring-purple-500 dark:ring-purple-400 ring-offset-2 ring-offset-background'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              <div className="text-center space-y-3">
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.members} members</p>
                  <p className="text-xs text-muted-foreground">{category.threads} threads</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter Pills */}
      <div className="flex space-x-2 overflow-x-auto">
        <Button
          size="sm"
          variant={!selectedCategory ? "default" : "outline"}
          className="rounded-full px-4 py-2 whitespace-nowrap"
          onClick={() => setSelectedCategory(null)}
        >
          All Discussions
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full px-4 py-2 whitespace-nowrap bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/30"
        >
          <TrendingUp className="mr-1" size={14} />
          Hot
        </Button>
      </div>

      {/* Discussion Threads */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => (
          <Card key={thread.id} className="p-4 rounded-2xl border-border bg-card">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={thread.author.avatar} />
                  <AvatarFallback className="bg-muted">{thread.author.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-card-foreground truncate">{thread.title}</h3>
                    {thread.isHot && (
                      <Badge className="bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 text-xs px-2 py-0">
                        🔥 Hot
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <span>{thread.author.name}</span>
                    <span>•</span>
                    <span>{thread.timeAgo}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs border-border">
                      {categories.find(c => c.id === thread.category)?.name}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={16} />
                        <span>{thread.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={16} />
                        <span>{thread.likes}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="rounded-full px-4 border-border">
                      View Thread
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create New Thread Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
          size="sm"
        >
          <MessageCircle className="text-white" size={20} />
        </Button>
      </div>
    </div>
  );
}