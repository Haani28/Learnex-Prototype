import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Clock, Trophy, ExternalLink, Upload, CheckCircle } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  content: {
    overview: string;
    learningObjectives: string[];
    resources: Array<{
      type: 'video' | 'article' | 'exercise' | 'project';
      title: string;
      url: string;
      duration?: string;
    }>;
    assessment: {
      type: 'quiz' | 'project' | 'peer-review';
      description: string;
    };
  };
}

interface QuestDetailProps {
  quest: Quest;
  onBack: () => void;
  userRole: 'student' | 'teacher';
}

export function QuestDetail({ quest, onBack, userRole }: QuestDetailProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'submit'>('content');
  const [submission, setSubmission] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📄';
      case 'exercise': return '💪';
      case 'project': return '🚀';
      default: return '📚';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Here you would normally send the submission to your backend
  };

  const handleMarkComplete = () => {
    // Mark quest as complete
    onBack();
  };

  return (
    <div className="p-4 space-y-6 pb-20 md:pb-8">
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
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{quest.title}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Badge className={`text-xs ${getDifficultyColor(quest.difficulty)} hover:${getDifficultyColor(quest.difficulty)}`}>
              {quest.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs border-border">
              +{quest.xp} XP
            </Badge>
          </div>
        </div>
      </div>

      {/* Quest Info Card */}
      <Card className="p-6 md:p-8 rounded-2xl border-border bg-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{quest.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy size={16} />
                <span>{quest.xp} XP</span>
              </div>
            </div>
            {quest.status === 'completed' && (
              <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-950/50">
                <CheckCircle size={14} className="mr-1" />
                Completed
              </Badge>
            )}
          </div>
          <p className="text-card-foreground">{quest.description}</p>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-xl p-1">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${
            activeTab === 'content'
              ? 'bg-background text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          Learning Content
        </button>
        {userRole === 'student' && (
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === 'submit'
                ? 'bg-background text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            Submit Work
          </button>
        )}
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Overview */}
          <Card className="p-6 rounded-2xl border-border bg-card">
            <h3 className="font-semibold text-card-foreground mb-3">Overview</h3>
            <p className="text-muted-foreground">{quest.content.overview}</p>
          </Card>

          {/* Learning Objectives */}
          <Card className="p-6 rounded-2xl border-border bg-card">
            <h3 className="font-semibold text-card-foreground mb-3">Learning Objectives</h3>
            <ul className="space-y-2">
              {quest.content.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Resources */}
          <Card className="p-6 rounded-2xl border-border bg-card">
            <h3 className="font-semibold text-card-foreground mb-4">Resources</h3>
            <div className="space-y-3">
              {quest.content.resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getResourceIcon(resource.type)}</span>
                    <div>
                      <p className="font-medium text-card-foreground">{resource.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="border-border">
                          {resource.type}
                        </Badge>
                        {resource.duration && <span>• {resource.duration}</span>}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full border-border">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Assessment */}
          <Card className="p-6 rounded-2xl border-border bg-card">
            <h3 className="font-semibold text-card-foreground mb-3">Assessment</h3>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/50">
                  {quest.content.assessment.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{quest.content.assessment.description}</p>
            </div>
          </Card>

          {/* Teacher-specific content */}
          {userRole === 'teacher' && (
            <Card className="p-6 rounded-2xl border-border bg-card">
              <h3 className="font-semibold text-card-foreground mb-3">Teaching Notes</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Review student submissions and provide constructive feedback</p>
                <p>• Look for common misconceptions and address them in the forum</p>
                <p>• Encourage students to help each other in peer reviews</p>
              </div>
              <Button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white rounded-xl">
                View Student Submissions
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Submit Tab (Student only) */}
      {activeTab === 'submit' && userRole === 'student' && (
        <div className="space-y-6">
          <Card className="p-6 rounded-2xl border-border bg-card">
            <h3 className="font-semibold text-card-foreground mb-4">Submit Your Work</h3>
            
            {!isSubmitted ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Describe what you learned and show your work:
                  </label>
                  <Textarea
                    placeholder="Share your solution, explain your thought process, or describe what you learned..."
                    rows={6}
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    className="rounded-xl border-border resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl border-border"
                  >
                    <Upload className="mr-2" size={18} />
                    Upload Files (Optional)
                  </Button>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={!submission.trim()}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                    >
                      Submit for Review
                    </Button>
                    <Button
                      onClick={handleMarkComplete}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                    >
                      Mark Complete
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Submission Received!</h4>
                  <p className="text-sm text-muted-foreground">Your work has been submitted for mentor review.</p>
                </div>
                <Button onClick={onBack} className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl">
                  Back to Roadmap
                </Button>
              </div>
            )}
          </Card>

          {/* Submission Tips */}
          <Card className="p-6 rounded-2xl border-border bg-card">
            <h3 className="font-semibold text-card-foreground mb-3">💡 Tips for Great Submissions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Explain your thought process and any challenges you faced</li>
              <li>• Include screenshots or code snippets when relevant</li>
              <li>• Ask specific questions if you need clarification</li>
              <li>• Show what you learned, even if your solution isn't perfect</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}