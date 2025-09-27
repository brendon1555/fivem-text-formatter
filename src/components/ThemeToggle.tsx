import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getNextTheme = () => {
    switch (theme) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      case 'system':
        return 'light';
      default:
        return 'system';
    }
  };

  const getThemeLabel = (themeType: string) => {
    switch (themeType) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'System';
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-auto h-9 px-3 rounded-lg gap-2"
      title={`Current: ${getThemeLabel(theme)} • Click to switch to ${getThemeLabel(getNextTheme())}`}
    >
      {getThemeIcon()}
      <span className="text-sm hidden sm:inline">{getThemeLabel(theme)}</span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};