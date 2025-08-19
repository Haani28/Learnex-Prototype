import { useState, useEffect } from 'react';
import { Progress } from './progress';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  onStrengthChange?: (strength: number) => void;
}

interface PasswordRule {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const passwordRules: PasswordRule[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (password: string) => password.length >= 8
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    test: (password: string) => /[A-Z]/.test(password)
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter',
    test: (password: string) => /[a-z]/.test(password)
  },
  {
    id: 'number',
    label: 'One number',
    test: (password: string) => /\d/.test(password)
  },
  {
    id: 'special',
    label: 'One special character (!@#$%^&*)',
    test: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
];

export function PasswordStrength({ password, onStrengthChange }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0);
  const [passedRules, setPassedRules] = useState<string[]>([]);

  useEffect(() => {
    const passed = passwordRules.filter(rule => rule.test(password));
    setPassedRules(passed.map(rule => rule.id));
    
    const strengthScore = (passed.length / passwordRules.length) * 100;
    setStrength(strengthScore);
    
    if (onStrengthChange) {
      onStrengthChange(strengthScore);
    }
  }, [password, onStrengthChange]);

  const getStrengthColor = () => {
    if (strength < 40) return 'from-red-500 to-red-600';
    if (strength < 70) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-green-600';
  };

  const getStrengthLabel = () => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  };

  if (password.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Password strength</span>
          <span className={`font-medium ${
            strength < 40 ? 'text-red-600 dark:text-red-400' :
            strength < 70 ? 'text-yellow-600 dark:text-yellow-400' :
            'text-green-600 dark:text-green-400'
          }`}>
            {getStrengthLabel()}
          </span>
        </div>
        <div className="relative">
          <Progress value={strength} className="h-2" />
          <div 
            className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${getStrengthColor()} transition-all`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {passwordRules.map((rule) => {
          const isPassed = passedRules.includes(rule.id);
          return (
            <div key={rule.id} className="flex items-center space-x-2 text-sm">
              {isPassed ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground" />
              )}
              <span className={isPassed ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
                {rule.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}