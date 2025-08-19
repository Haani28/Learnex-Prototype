import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { useUser } from './UserProvider';
import { MessageCircle, Heart, Eye, Search, Plus, TrendingUp, Clock } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: 'student' | 'teacher';
    level?: number;
  };
  category: string;
  replies: number;
  likes: number;
  views: number;
  timeAgo: string;
  isHot: boolean;
  tags: string[];
}

export function SkillForum() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!user) return null;

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

  const categories = [
    'all',
    'questions',
    'show-and-tell', 
    'resources',
    'challenges',
    'career-advice'
  ];

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: user.primarySkill === 'coding' ? 'Help with Python loops!' : 'Need help with the basics!',
      content: user.primarySkill === 'coding' ? 
        'I\'m struggling to understand how for loops work in Python. Can someone explain with examples?' :
        'I\'m having trouble with some fundamental concepts. Any tips for beginners?',
      author: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'student',
        level: 2
      },
      category: 'questions',
      replies: 12,
      likes: 8,
      views: 156,
      timeAgo: '2h ago',
      isHot: true,
      tags: user.primarySkill === 'coding' ? ['python', 'loops', 'beginner'] : ['beginner', 'fundamentals']
    },
    {
      id: '2', 
      title: user.primarySkill === 'coding' ? 'Built my first web app!' : 'Just completed my first project!',
      content: user.primarySkill === 'coding' ?
        'After weeks of learning, I finally built a simple to-do app using React. So excited to share!' :
        'Just finished my first major project! Really proud of how it turned out. Here\'s what I learned...',
      author: {
        name: 'Maya Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=100&h=100&fit=crop&crop=face',
        role: 'student',
        level: 5
      },
      category: 'show-and-tell',
      replies: 24,
      likes: 47,
      views: 312,
      timeAgo: '5h ago',
      isHot: true,
      tags: user.primarySkill === 'coding' ? ['react', 'project', 'web-development'] : ['project', 'showcase', 'achievement']
    },
    {
      id: '3',
      title: user.primarySkill === 'coding' ? 'Best resources for learning JavaScript' : 'Recommended learning resources',
      content: user.primarySkill === 'coding' ?
        'I\'ve compiled a list of the best free resources for learning JavaScript. Hope this helps!' :
        'Here are some amazing resources I\'ve found that really helped me improve my skills.',
      author: {
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        role: 'teacher'
      },
      category: 'resources',
      replies: 18,
      likes: 35,
      views: 289,
      timeAgo: '1d ago',
      isHot: false,
      tags: user.primarySkill === 'coding' ? ['javascript', 'resources', 'learning'] : ['resources', 'learning', 'tips']
    },
    {
      id: '4',
      title: user.primarySkill === 'coding' ? 'Weekly coding challenge!' : 'Creative challenge for this week!',
      content: user.primarySkill === 'coding' ?
        'This week\'s challenge: Build a calculator using only HTML, CSS, and JavaScript. Who\'s in?' :
        'This week\'s creative challenge is here! Let\'s see what amazing things you can create.',
      author: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        role: 'teacher'
      },
      category: 'challenges',
      replies: 31,
      likes: 62,
      views: 445,
      timeAgo: '3d ago',
      isHot: false,
      tags: user.primarySkill === 'coding' ? ['challenge', 'javascript', 'project'] : ['challenge', 'creative', 'project']
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="p-4 space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm md:text-base">L</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{getSkillName()} Forum</h1>
        </div>
        <p className="text-muted-foreground">Connect, share, and learn with the community</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search posts, topics, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl border-border"
        />
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category}
            size="sm"
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full px-4 py-2 whitespace-nowrap border-border"
          >
            {formatCategoryName(category)}
          </Button>
        ))}
      </div>

      {/* Hot Topics */}
      <Card className="p-4 rounded-2xl border-border bg-card">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="text-red-500" size={20} />
          <h3 className="font-semibold text-card-foreground">Trending Now</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.primarySkill === 'coding' ? (
            <>
              <Badge variant="outline" className="border-border">#python-help</Badge>
              <Badge variant="outline" className="border-border">#react-tips</Badge>
              <Badge variant="outline" className="border-border">#beginner-friendly</Badge>
              <Badge variant="outline" className="border-border">#code-review</Badge>
            </>
          ) : (
            <>
              <Badge variant="outline" className="border-border">#beginner-tips</Badge>
              <Badge variant="outline" className="border-border">#project-showcase</Badge>
              <Badge variant="outline" className="border-border">#learning-resources</Badge>
              <Badge variant="outline" className="border-border">#creative-challenge</Badge>
            </>
          )}
        </div>
      </Card>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="p-4 rounded-2xl border-border bg-card">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-muted">{post.author.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-card-foreground">{post.title}</h3>
                    {post.isHot && (
                      <Badge className="bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 text-xs px-2 py-0">
                        🔥 Hot
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <span>{post.author.name}</span>
                    <Badge variant="outline" className="text-xs border-border">
                      {post.author.role === 'teacher' ? 'Mentor' : `Level ${post.author.level}`}
                    </Badge>
                    <span>•</span>
                    <span>{post.timeAgo}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-border">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={16} />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={16} />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{post.views}</span>
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

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card className="p-8 text-center rounded-2xl border-border bg-card">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="text-muted-foreground" size={24} />
            </div>
            <h3 className="font-semibold text-card-foreground">No posts found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or be the first to post!</p>
            <Button variant="outline" className="border-border">
              Clear Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Create Post Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
          size="sm"
        >
          <Plus className="text-white" size={20} />
        </Button>
      </div>

      {/* Quick Actions for Teachers */}
      {user.role === 'teacher' && (
        <Card className="p-4 rounded-2xl border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <h3 className="font-semibold text-foreground mb-3">Teacher Actions</h3>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1 rounded-xl border-border">
              <Clock className="mr-2" size={16} />
              Unanswered Questions
            </Button>
            <Button size="sm" variant="outline" className="flex-1 rounded-xl border-border">
              <MessageCircle className="mr-2" size={16} />
              Weekly Challenge
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}