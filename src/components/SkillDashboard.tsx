import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useUser } from './UserProvider';
import { Code, Music, Paintbrush, BookOpen, Camera, ChefHat, Play, CheckCircle, Lock } from 'lucide-react';
import { QuestDetail } from './QuestDetail';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites?: string[];
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

export function SkillDashboard() {
  const getDifficultyColor = (level: string) => {
  const map: Record<string, string> = {
    beginner: 'bg-green-400 text-white',
    intermediate: 'bg-yellow-400 text-black',
    advanced: 'bg-red-400 text-white',
  };
  return map[level] || 'bg-gray-400 text-white';
};

  const { user } = useUser();
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  if (!user) return null;

  const getSkillIcon = () => {
    const iconMap = {
      coding: Code,
      music: Music,
      art: Paintbrush,
      writing: BookOpen,
      photography: Camera,
      cooking: ChefHat
    };
    return iconMap[user.primarySkill] || Code;
  };

  const getSkillColor = () => {
    const colorMap = {
      coding: 'from-blue-400 to-blue-600',
      music: 'from-green-400 to-green-600',
      art: 'from-pink-400 to-pink-600',
      writing: 'from-purple-400 to-purple-600',
      photography: 'from-amber-400 to-amber-600',
      cooking: 'from-red-400 to-red-600'
    };
    return colorMap[user.primarySkill] || 'from-blue-400 to-blue-600';
  };

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

  const getSkillSpecificQuests = (): Quest[] => {
    const questTemplates = {
      coding: [
        {
          id: '1',
          title: 'Variables & Data Types',
          description: 'Learn about variables, strings, numbers, and basic data types',
          xp: 50,
          status: 'completed' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '2 hours',
          content: {
            overview: 'This quest introduces you to the fundamental building blocks of programming.',
            learningObjectives: [
              'Understand what variables are and how to use them',
              'Learn about different data types (strings, numbers, booleans)',
              'Practice declaring and manipulating variables',
              'Master basic data type operations'
            ],
            resources: [
              { type: 'video' as const, title: 'Introduction to Variables', url: '#', duration: '15 min' },
              { type: 'article' as const, title: 'Data Types Explained', url: '#' },
              { type: 'exercise' as const, title: 'Practice Variables', url: '#' },
              { type: 'project' as const, title: 'Build a Data Type Explorer', url: '#' }
            ],
            assessment: {
              type: 'quiz' as const,
              description: 'Complete a 10-question quiz about variables and data types'
            }
          }
        },
        {
          id: '2',
          title: 'Control Flow & Loops',
          description: 'Master if statements, loops, and conditional logic',
          xp: 75,
          status: 'in-progress' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '3 hours',
          content: {
            overview: 'Learn how to control the flow of your program with conditions and loops.',
            learningObjectives: [
              'Understand conditional statements (if, else, switch)',
              'Learn about different types of loops (for, while, do-while)',
              'Practice writing efficient control structures',
              'Master logical operators and comparison'
            ],
            resources: [
              { type: 'video' as const, title: 'If Statements and Conditions', url: '#', duration: '20 min' },
              { type: 'video' as const, title: 'Loops Explained', url: '#', duration: '25 min' },
              { type: 'exercise' as const, title: 'Control Flow Challenges', url: '#' },
              { type: 'project' as const, title: 'Build a Simple Calculator', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Create a program that uses loops and conditions to solve a real problem'
            }
          }
        },
        {
          id: '3',
          title: 'Functions & Methods',
          description: 'Create reusable code with functions and methods',
          xp: 100,
          status: 'available' as const,
          difficulty: 'intermediate' as const,
          estimatedTime: '4 hours',
          content: {
            overview: 'Learn to write clean, reusable code using functions and methods.',
            learningObjectives: [
              'Understand function syntax and parameters',
              'Learn about return values and scope',
              'Practice writing modular code',
              'Master function best practices'
            ],
            resources: [
              { type: 'video' as const, title: 'Introduction to Functions', url: '#', duration: '30 min' },
              { type: 'article' as const, title: 'Best Practices for Functions', url: '#' },
              { type: 'exercise' as const, title: 'Function Challenges', url: '#' },
              { type: 'project' as const, title: 'Build a Function Library', url: '#' }
            ],
            assessment: {
              type: 'peer-review' as const,
              description: 'Submit your code for peer review and review others\' work'
            }
          }
        },
        {
          id: '4',
          title: 'Object-Oriented Programming',
          description: 'Learn classes, objects, and OOP principles',
          xp: 150,
          status: 'locked' as const,
          difficulty: 'advanced' as const,
          estimatedTime: '6 hours',
          prerequisites: ['Functions & Methods'],
          content: {
            overview: 'Dive into object-oriented programming concepts and design patterns.',
            learningObjectives: [
              'Understand classes and objects',
              'Learn inheritance and polymorphism',
              'Master encapsulation and abstraction',
              'Practice designing object-oriented solutions'
            ],
            resources: [
              { type: 'video' as const, title: 'OOP Fundamentals', url: '#', duration: '45 min' },
              { type: 'project' as const, title: 'Build a Class Hierarchy', url: '#' },
              { type: 'article' as const, title: 'Design Patterns', url: '#' },
              { type: 'exercise' as const, title: 'OOP Practice Problems', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Design and implement a complete application using OOP principles'
            }
          }
        }
      ],
      music: [
        {
          id: '1',
          title: 'Music Theory Basics',
          description: 'Learn notes, scales, and basic music theory fundamentals',
          xp: 50,
          status: 'completed' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '2 hours',
          content: {
            overview: 'Master the fundamental building blocks of music theory.',
            learningObjectives: [
              'Understand musical notes and the chromatic scale',
              'Learn about major and minor scales',
              'Practice identifying intervals',
              'Master basic chord construction'
            ],
            resources: [
              { type: 'video' as const, title: 'Introduction to Musical Notes', url: '#', duration: '15 min' },
              { type: 'article' as const, title: 'Scales and Key Signatures', url: '#' },
              { type: 'exercise' as const, title: 'Scale Practice', url: '#' },
              { type: 'project' as const, title: 'Build Your First Chord Progression', url: '#' }
            ],
            assessment: {
              type: 'quiz' as const,
              description: 'Complete a 10-question quiz about basic music theory'
            }
          }
        },
        {
          id: '2',
          title: 'Rhythm & Time Signatures',
          description: 'Master rhythm patterns, time signatures, and tempo',
          xp: 75,
          status: 'in-progress' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '3 hours',
          content: {
            overview: 'Learn how to understand and create rhythmic patterns in music.',
            learningObjectives: [
              'Understand different time signatures (4/4, 3/4, 6/8)',
              'Learn about note values and rests',
              'Practice clapping and playing rhythms',
              'Master tempo and beat subdivision'
            ],
            resources: [
              { type: 'video' as const, title: 'Understanding Time Signatures', url: '#', duration: '20 min' },
              { type: 'video' as const, title: 'Rhythm Patterns Explained', url: '#', duration: '25 min' },
              { type: 'exercise' as const, title: 'Rhythm Clapping Exercises', url: '#' },
              { type: 'project' as const, title: 'Create a Rhythm Pattern', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Record yourself playing or clapping a complex rhythm pattern'
            }
          }
        },
        {
          id: '3',
          title: 'Chord Progressions',
          description: 'Build beautiful chord progressions and harmonic structures',
          xp: 100,
          status: 'available' as const,
          difficulty: 'intermediate' as const,
          estimatedTime: '4 hours',
          content: {
            overview: 'Learn to create compelling harmonic progressions in your music.',
            learningObjectives: [
              'Understand diatonic chord progressions',
              'Learn popular chord sequences (I-V-vi-IV, etc.)',
              'Practice voice leading and smooth transitions',
              'Master chord inversions and substitutions'
            ],
            resources: [
              { type: 'video' as const, title: 'Popular Chord Progressions', url: '#', duration: '30 min' },
              { type: 'article' as const, title: 'Voice Leading Techniques', url: '#' },
              { type: 'exercise' as const, title: 'Progression Practice', url: '#' },
              { type: 'project' as const, title: 'Compose a Song with Chords', url: '#' }
            ],
            assessment: {
              type: 'peer-review' as const,
              description: 'Submit your chord progression for peer feedback and review others\' work'
            }
          }
        },
        {
          id: '4',
          title: 'Melody & Composition',
          description: 'Create memorable melodies and complete musical compositions',
          xp: 150,
          status: 'locked' as const,
          difficulty: 'advanced' as const,
          estimatedTime: '6 hours',
          prerequisites: ['Chord Progressions'],
          content: {
            overview: 'Master the art of melody writing and musical composition.',
            learningObjectives: [
              'Understand melodic contour and phrasing',
              'Learn song structure and form',
              'Master melody and harmony interaction',
              'Practice complete song composition'
            ],
            resources: [
              { type: 'video' as const, title: 'Melody Writing Techniques', url: '#', duration: '45 min' },
              { type: 'project' as const, title: 'Write Your First Song', url: '#' },
              { type: 'article' as const, title: 'Song Structure Analysis', url: '#' },
              { type: 'exercise' as const, title: 'Melodic Composition Exercises', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Compose and record a complete original song'
            }
          }
        }
      ],
      art: [
        {
          id: '1',
          title: 'Digital Art Fundamentals',
          description: 'Learn basic digital art tools, layers, and techniques',
          xp: 50,
          status: 'completed' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '2 hours',
          content: {
            overview: 'Master the fundamental tools and concepts of digital art creation.',
            learningObjectives: [
              'Understand digital art software interfaces',
              'Learn about layers and layer modes',
              'Practice basic brush techniques',
              'Master selection and transformation tools'
            ],
            resources: [
              { type: 'video' as const, title: 'Digital Art Software Tour', url: '#', duration: '15 min' },
              { type: 'article' as const, title: 'Understanding Layers', url: '#' },
              { type: 'exercise' as const, title: 'Basic Drawing Exercises', url: '#' },
              { type: 'project' as const, title: 'Create Your First Digital Sketch', url: '#' }
            ],
            assessment: {
              type: 'quiz' as const,
              description: 'Complete a quiz about digital art tools and techniques'
            }
          }
        },
        {
          id: '2',
          title: 'Color Theory & Palettes',
          description: 'Master color relationships, palettes, and color psychology',
          xp: 75,
          status: 'in-progress' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '3 hours',
          content: {
            overview: 'Learn how to use color effectively in your digital artwork.',
            learningObjectives: [
              'Understand the color wheel and color relationships',
              'Learn about warm and cool colors',
              'Practice creating color palettes',
              'Master color psychology and mood'
            ],
            resources: [
              { type: 'video' as const, title: 'Color Theory Basics', url: '#', duration: '20 min' },
              { type: 'video' as const, title: 'Creating Color Palettes', url: '#', duration: '25 min' },
              { type: 'exercise' as const, title: 'Color Harmony Exercises', url: '#' },
              { type: 'project' as const, title: 'Design a Color Palette', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Create artwork using specific color harmonies and palettes'
            }
          }
        },
        {
          id: '3',
          title: 'Composition & Layout',
          description: 'Learn principles of composition, balance, and visual hierarchy',
          xp: 100,
          status: 'available' as const,
          difficulty: 'intermediate' as const,
          estimatedTime: '4 hours',
          content: {
            overview: 'Master the principles of visual composition and design.',
            learningObjectives: [
              'Understand rule of thirds and golden ratio',
              'Learn about visual weight and balance',
              'Practice creating focal points',
              'Master leading lines and visual flow'
            ],
            resources: [
              { type: 'video' as const, title: 'Composition Principles', url: '#', duration: '30 min' },
              { type: 'article' as const, title: 'Visual Hierarchy in Art', url: '#' },
              { type: 'exercise' as const, title: 'Composition Studies', url: '#' },
              { type: 'project' as const, title: 'Create a Balanced Composition', url: '#' }
            ],
            assessment: {
              type: 'peer-review' as const,
              description: 'Submit your composition for peer critique and review others\' work'
            }
          }
        },
        {
          id: '4',
          title: 'Advanced Rendering',
          description: 'Master lighting, shadows, textures, and realistic rendering',
          xp: 150,
          status: 'locked' as const,
          difficulty: 'advanced' as const,
          estimatedTime: '6 hours',
          prerequisites: ['Composition & Layout'],
          content: {
            overview: 'Learn advanced techniques for realistic digital art rendering.',
            learningObjectives: [
              'Understand light sources and shadows',
              'Learn texture painting techniques',
              'Master atmospheric perspective',
              'Practice photorealistic rendering'
            ],
            resources: [
              { type: 'video' as const, title: 'Advanced Lighting Techniques', url: '#', duration: '45 min' },
              { type: 'project' as const, title: 'Create a Photorealistic Portrait', url: '#' },
              { type: 'article' as const, title: 'Texture Painting Guide', url: '#' },
              { type: 'exercise' as const, title: 'Lighting Study Exercises', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Create a fully rendered digital artwork showcasing advanced techniques'
            }
          }
        }
      ],
      writing: [
        {
          id: '1',
          title: 'Story Structure Basics',
          description: 'Learn fundamental story elements, plot, and narrative structure',
          xp: 50,
          status: 'completed' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '2 hours',
          content: {
            overview: 'Master the fundamental elements that make up compelling stories.',
            learningObjectives: [
              'Understand three-act structure',
              'Learn about character, plot, and setting',
              'Practice identifying story elements',
              'Master conflict and resolution'
            ],
            resources: [
              { type: 'video' as const, title: 'Story Structure Explained', url: '#', duration: '15 min' },
              { type: 'article' as const, title: 'Elements of Story', url: '#' },
              { type: 'exercise' as const, title: 'Plot Outline Practice', url: '#' },
              { type: 'project' as const, title: 'Write a Short Story Outline', url: '#' }
            ],
            assessment: {
              type: 'quiz' as const,
              description: 'Complete a quiz about story structure and narrative elements'
            }
          }
        },
        {
          id: '2',
          title: 'Character Development',
          description: 'Create compelling, three-dimensional characters',
          xp: 75,
          status: 'in-progress' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '3 hours',
          content: {
            overview: 'Learn to create memorable and believable characters.',
            learningObjectives: [
              'Understand character archetypes and roles',
              'Learn character motivation and goals',
              'Practice character voice and dialogue',
              'Master character development arcs'
            ],
            resources: [
              { type: 'video' as const, title: 'Creating Memorable Characters', url: '#', duration: '20 min' },
              { type: 'video' as const, title: 'Writing Authentic Dialogue', url: '#', duration: '25 min' },
              { type: 'exercise' as const, title: 'Character Profile Creation', url: '#' },
              { type: 'project' as const, title: 'Develop a Main Character', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Create detailed character profiles and write a character-driven scene'
            }
          }
        },
        {
          id: '3',
          title: 'Dialogue & Voice',
          description: 'Master realistic dialogue and unique narrative voice',
          xp: 100,
          status: 'available' as const,
          difficulty: 'intermediate' as const,
          estimatedTime: '4 hours',
          content: {
            overview: 'Learn to write compelling dialogue and develop your unique writing voice.',
            learningObjectives: [
              'Understand dialogue tags and formatting',
              'Learn subtext and character voice',
              'Practice writing natural conversations',
              'Master narrative voice and style'
            ],
            resources: [
              { type: 'video' as const, title: 'Writing Effective Dialogue', url: '#', duration: '30 min' },
              { type: 'article' as const, title: 'Finding Your Writing Voice', url: '#' },
              { type: 'exercise' as const, title: 'Dialogue Writing Prompts', url: '#' },
              { type: 'project' as const, title: 'Write a Dialogue-Heavy Scene', url: '#' }
            ],
            assessment: {
              type: 'peer-review' as const,
              description: 'Submit your dialogue scenes for peer feedback and critique others\' work'
            }
          }
        },
        {
          id: '4',
          title: 'Advanced Storytelling',
          description: 'Master complex narratives, themes, and literary techniques',
          xp: 150,
          status: 'locked' as const,
          difficulty: 'advanced' as const,
          estimatedTime: '6 hours',
          prerequisites: ['Dialogue & Voice'],
          content: {
            overview: 'Learn advanced storytelling techniques and literary devices.',
            learningObjectives: [
              'Understand theme and symbolism',
              'Learn non-linear narrative structures',
              'Master literary devices and techniques',
              'Practice advanced plotting methods'
            ],
            resources: [
              { type: 'video' as const, title: 'Advanced Narrative Techniques', url: '#', duration: '45 min' },
              { type: 'project' as const, title: 'Write a Complete Short Story', url: '#' },
              { type: 'article' as const, title: 'Literary Device Guide', url: '#' },
              { type: 'exercise' as const, title: 'Theme Development Exercises', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Write and polish a complete short story using advanced techniques'
            }
          }
        }
      ],
      photography: [
        {
          id: '1',
          title: 'Camera Basics & Exposure',
          description: 'Learn camera controls, aperture, shutter speed, and ISO',
          xp: 50,
          status: 'completed' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '2 hours',
          content: {
            overview: 'Master the fundamental technical aspects of photography.',
            learningObjectives: [
              'Understand camera modes and controls',
              'Learn the exposure triangle (aperture, shutter, ISO)',
              'Practice manual camera settings',
              'Master depth of field control'
            ],
            resources: [
              { type: 'video' as const, title: 'Camera Controls Explained', url: '#', duration: '15 min' },
              { type: 'article' as const, title: 'Understanding Exposure', url: '#' },
              { type: 'exercise' as const, title: 'Exposure Practice Shots', url: '#' },
              { type: 'project' as const, title: 'Capture Perfect Exposures', url: '#' }
            ],
            assessment: {
              type: 'quiz' as const,
              description: 'Complete a quiz about camera settings and exposure'
            }
          }
        },
        {
          id: '2',
          title: 'Composition Techniques',
          description: 'Master rule of thirds, leading lines, and visual composition',
          xp: 75,
          status: 'in-progress' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '3 hours',
          content: {
            overview: 'Learn to create visually compelling photographic compositions.',
            learningObjectives: [
              'Understand rule of thirds and golden ratio',
              'Learn about leading lines and patterns',
              'Practice framing and perspective',
              'Master symmetry and balance'
            ],
            resources: [
              { type: 'video' as const, title: 'Composition Rules in Photography', url: '#', duration: '20 min' },
              { type: 'video' as const, title: 'Finding Interesting Perspectives', url: '#', duration: '25 min' },
              { type: 'exercise' as const, title: 'Composition Challenges', url: '#' },
              { type: 'project' as const, title: 'Create a Composition Portfolio', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Submit a series of photos demonstrating different composition techniques'
            }
          }
        },
        {
          id: '3',
          title: 'Lighting & Shadows',
          description: 'Understand natural and artificial lighting in photography',
          xp: 100,
          status: 'available' as const,
          difficulty: 'intermediate' as const,
          estimatedTime: '4 hours',
          content: {
            overview: 'Master the use of light to create mood and drama in your photos.',
            learningObjectives: [
              'Understand different types of lighting',
              'Learn golden hour and blue hour photography',
              'Practice shadow and highlight control',
              'Master artificial lighting techniques'
            ],
            resources: [
              { type: 'video' as const, title: 'Understanding Light in Photography', url: '#', duration: '30 min' },
              { type: 'article' as const, title: 'Working with Natural Light', url: '#' },
              { type: 'exercise' as const, title: 'Light Study Exercises', url: '#' },
              { type: 'project' as const, title: 'Create a Lighting Portfolio', url: '#' }
            ],
            assessment: {
              type: 'peer-review' as const,
              description: 'Submit your lighting portfolio for peer critique and review others\' work'
            }
          }
        },
        {
          id: '4',
          title: 'Post-Processing & Editing',
          description: 'Master photo editing software and post-processing workflows',
          xp: 150,
          status: 'locked' as const,
          difficulty: 'advanced' as const,
          estimatedTime: '6 hours',
          prerequisites: ['Lighting & Shadows'],
          content: {
            overview: 'Learn professional photo editing and post-processing techniques.',
            learningObjectives: [
              'Understand RAW vs JPEG processing',
              'Learn color correction and grading',
              'Master local adjustments and masking',
              'Practice advanced editing workflows'
            ],
            resources: [
              { type: 'video' as const, title: 'Advanced Editing Techniques', url: '#', duration: '45 min' },
              { type: 'project' as const, title: 'Edit a Complete Photo Series', url: '#' },
              { type: 'article' as const, title: 'Professional Workflow Guide', url: '#' },
              { type: 'exercise' as const, title: 'Editing Challenge Exercises', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Process and edit a complete photo shoot from RAW to final images'
            }
          }
        }
      ],
      cooking: [
        {
          id: '1',
          title: 'Kitchen Fundamentals',
          description: 'Learn basic knife skills, cooking methods, and kitchen safety',
          xp: 50,
          status: 'completed' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '2 hours',
          content: {
            overview: 'Master the essential skills and knowledge needed for cooking.',
            learningObjectives: [
              'Understand kitchen safety and sanitation',
              'Learn proper knife handling and cutting techniques',
              'Practice basic cooking methods (sauté, boil, roast)',
              'Master ingredient preparation and mise en place'
            ],
            resources: [
              { type: 'video' as const, title: 'Kitchen Safety Basics', url: '#', duration: '15 min' },
              { type: 'article' as const, title: 'Essential Knife Skills', url: '#' },
              { type: 'exercise' as const, title: 'Knife Skills Practice', url: '#' },
              { type: 'project' as const, title: 'Prepare a Simple Meal', url: '#' }
            ],
            assessment: {
              type: 'quiz' as const,
              description: 'Complete a quiz about kitchen safety and basic techniques'
            }
          }
        },
        {
          id: '2',
          title: 'Flavor Fundamentals',
          description: 'Master seasoning, spices, and flavor combinations',
          xp: 75,
          status: 'in-progress' as const,
          difficulty: 'beginner' as const,
          estimatedTime: '3 hours',
          content: {
            overview: 'Learn how to build and balance flavors in your cooking.',
            learningObjectives: [
              'Understand the five basic tastes',
              'Learn about herbs and spices',
              'Practice seasoning and tasting',
              'Master flavor pairing principles'
            ],
            resources: [
              { type: 'video' as const, title: 'Understanding Flavor Profiles', url: '#', duration: '20 min' },
              { type: 'video' as const, title: 'Spice and Herb Guide', url: '#', duration: '25 min' },
              { type: 'exercise' as const, title: 'Seasoning Practice', url: '#' },
              { type: 'project' as const, title: 'Create Flavor Combinations', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Prepare dishes showcasing different flavor profiles'
            }
          }
        },
        {
          id: '3',
          title: 'Cooking Techniques',
          description: 'Master advanced cooking methods and food preparation',
          xp: 100,
          status: 'available' as const,
          difficulty: 'intermediate' as const,
          estimatedTime: '4 hours',
          content: {
            overview: 'Learn advanced cooking techniques for professional-quality results.',
            learningObjectives: [
              'Understand braising, poaching, and other methods',
              'Learn sauce-making fundamentals',
              'Practice temperature control and timing',
              'Master plating and presentation'
            ],
            resources: [
              { type: 'video' as const, title: 'Advanced Cooking Methods', url: '#', duration: '30 min' },
              { type: 'article' as const, title: 'Sauce-Making Guide', url: '#' },
              { type: 'exercise' as const, title: 'Technique Practice', url: '#' },
              { type: 'project' as const, title: 'Prepare a Multi-Course Meal', url: '#' }
            ],
            assessment: {
              type: 'peer-review' as const,
              description: 'Submit your prepared dishes for peer critique and review others\' work'
            }
          }
        },
        {
          id: '4',
          title: 'Menu Planning & Innovation',
          description: 'Design menus and create original recipes',
          xp: 150,
          status: 'locked' as const,
          difficulty: 'advanced' as const,
          estimatedTime: '6 hours',
          prerequisites: ['Cooking Techniques'],
          content: {
            overview: 'Learn to design balanced menus and develop original recipes.',
            learningObjectives: [
              'Understand menu composition and balance',
              'Learn recipe development and testing',
              'Master cost analysis and portion control',
              'Practice creative cooking and innovation'
            ],
            resources: [
              { type: 'video' as const, title: 'Menu Planning Strategies', url: '#', duration: '45 min' },
              { type: 'project' as const, title: 'Develop an Original Recipe', url: '#' },
              { type: 'article' as const, title: 'Recipe Development Guide', url: '#' },
              { type: 'exercise' as const, title: 'Menu Creation Exercise', url: '#' }
            ],
            assessment: {
              type: 'project' as const,
              description: 'Design and execute a complete menu with original recipes'
            }
          }
        }
      ]
    };

    return questTemplates[user.primarySkill] || questTemplates.coding;
  };
  const quests = getSkillSpecificQuests();

  const completedQuests = quests.filter(q => q.status === 'completed').length;
  const totalQuests = quests.length;
  const progressPercentage = (completedQuests / totalQuests) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500 glow-green" size={20} />;
      case 'in-progress':
        return <Play className="text-blue-500 glow-blue" size={20} />;
      case 'locked':
        return <Lock className="text-muted-foreground" size={20} />;
      default:
        return <div className="w-5 h-5 border-2 border-purple-300 rounded-full glow-purple" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300';
      case 'locked':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300';
    }
  };

  const SkillIcon = getSkillIcon();

  if (selectedQuest) {
    return (
      <QuestDetail 
        quest={selectedQuest} 
        onBack={() => setSelectedQuest(null)} 
        userRole={user.role}
      />
    );
  }

  return (
    <div className="p-4 space-y-6 pb-20 md:pb-8">
    {/* Header */}
    <div className="text-center md:text-left space-y-4">
      <div className="flex items-center justify-center md:justify-start space-x-3">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${getSkillColor()} flex items-center justify-center glow-gradient`}>
          <SkillIcon className="text-white glow-icon" size={24} />
        </div>
        <div className="text-left">
          <h1 className="text-xl md:text-3xl font-bold text-foreground glow-text">{getSkillName()} Roadmap</h1>
          <p className="text-sm md:text-base text-muted-foreground">Level {user.level} • {user.xp} XP</p>
        </div>
      </div>
    </div>

    {/* Progress Overview */}
    <Card className="p-6 rounded-2xl border-border bg-card glow-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-card-foreground">Your Progress</h2>
              <Badge className={`${getDifficultyColor('beginner')} hover:${getDifficultyColor('beginner')}`}>
                Level {user.level || 1}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quests Completed</span>
                <span className="font-medium text-card-foreground">{completedQuests}/{totalQuests}</span>
              </div>
              <Progress value={progressPercentage} className="h-3 glow-purple" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="text-center space-y-1">
                <div className="text-xl font-bold text-card-foreground">{user.xp || 125}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-xl font-bold text-card-foreground">{completedQuests}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-xl font-bold text-card-foreground">{quests.filter(q => q.status === 'in-progress').length}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-xl font-bold text-card-foreground">{user.level || 1}</div>
                <div className="text-xs text-muted-foreground">Current Level</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quest Roadmap */}
    <div className="space-y-4 md:space-y-6">
      <h2 className="font-semibold text-foreground text-lg md:text-xl">Learning Path</h2>

      <div className="md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-6 items-stretch">
        {quests.map((quest, index) => (
          <Card key={quest.id} className="p-4 md:p-6 rounded-2xl border-border bg-card glow-card flex flex-col h-full">
            <div className="flex items-stretch space-x-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(quest.status)}
                {index < quests.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border" />
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-card-foreground">{quest.title}</h3>
                  <Badge className={`text-xs ${getStatusColor(quest.status)} hover:${getStatusColor(quest.status)} glow-border`}>
                    +{quest.xp} XP
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{quest.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="border-border glow-border">
                      {quest.difficulty}
                    </Badge>
                    <span>•</span>
                    <span>{quest.estimatedTime}</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => setSelectedQuest(quest)}
                    disabled={quest.status === 'locked'}
                    className={`rounded-full px-4 ${
                      quest.status === 'locked'
                        ? 'opacity-50 cursor-not-allowed'
                        : quest.status === 'completed'
                        ? 'bg-green-500 hover:bg-green-600 glow-green'
                        : quest.status === 'in-progress'
                        ? 'bg-blue-500 hover:bg-blue-600 glow-blue'
                        : 'bg-purple-500 hover:bg-purple-600 glow-purple'
                    }`}
                  >
                    {quest.status === 'locked' ? 'Locked' :
                     quest.status === 'completed' ? 'Review' :
                     quest.status === 'in-progress' ? 'Continue' : 'Start'}
                  </Button>
                </div>

                {quest.prerequisites && quest.status === 'locked' && (
                  <div className="mt-2 p-2 bg-muted rounded-lg glow-border">
                    <p className="text-xs text-muted-foreground">
                      Prerequisites: {quest.prerequisites.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);
}
