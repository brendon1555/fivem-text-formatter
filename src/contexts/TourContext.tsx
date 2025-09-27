import React, { createContext, useContext, useState, useCallback } from 'react';
import type { TourContextType, TourStep, TourProviderProps } from '../types/tour';

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to FiveM Text Formatter! 🎮',
    content: 'This tool helps you create and preview formatted text for FiveM/GTA V. Let\'s take a quick tour to get you started!',
    target: 'header',
    placement: 'bottom'
  },
  {
    id: 'theme-toggle',
    title: 'Theme Selection',
    content: 'Switch between Light, Dark, and System themes to match your preference. Click to cycle through options!',
    target: '[data-tour="theme-toggle"]',
    placement: 'bottom'
  },
  {
    id: 'text-editor',
    title: 'Text Editor',
    content: 'Type your text here and use FiveM formatting codes like ~r~ for red text, ~g~ for green, ~h~ for bold, and ~n~ for new lines.',
    target: '[data-tour="text-editor"]',
    placement: 'right'
  },
  {
    id: 'formatting-buttons',
    title: 'Quick Formatting',
    content: 'Use these buttons to quickly insert common formatting codes. Click any button to add it at your cursor position.',
    target: '[data-tour="formatting-buttons"]',
    placement: 'top'
  },
  {
    id: 'examples',
    title: 'Example Texts',
    content: 'Load pre-made examples to see different formatting techniques and learn from them. Perfect for inspiration!',
    target: '[data-tour="examples"]',
    placement: 'bottom'
  },
  {
    id: 'actions',
    title: 'Text Actions',
    content: 'Copy your formatted text to use in FiveM, or clear the editor to start fresh.',
    target: '[data-tour="actions"]',
    placement: 'bottom'
  },
  {
    id: 'preview',
    title: 'Live Preview',
    content: 'See exactly how your text will look in FiveM! The preview updates in real-time as you type and maintains the authentic game appearance.',
    target: '[data-tour="preview"]',
    placement: 'left'
  },
  {
    id: 'quick-reference',
    title: 'Quick Reference',
    content: 'When the preview is empty, you\'ll see this handy reference guide with the most commonly used formatting codes.',
    target: '[data-tour="quick-reference"]',
    placement: 'left'
  },
  {
    id: 'documentation',
    title: 'Learn More',
    content: 'Need more advanced formatting? Click here to view the official FiveM documentation for all available codes and features.',
    target: '[data-tour="documentation"]',
    placement: 'top'
  },
  {
    id: 'finish',
    title: 'You\'re All Set! 🎉',
    content: 'You now know how to use the FiveM Text Formatter! Start creating amazing formatted text for your FiveM server. You can restart this tour anytime from the help menu.',
    target: 'body',
    placement: 'bottom'
  }
];

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishTour();
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    // Mark tour as completed so it doesn't show again
    localStorage.setItem('fivem-formatter-tour-completed', 'true');
  }, []);

  const finishTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem('fivem-formatter-tour-completed', 'true');
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < TOUR_STEPS.length) {
      setCurrentStep(step);
    }
  }, []);

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStep,
        steps: TOUR_STEPS,
        startTour,
        nextStep,
        previousStep,
        skipTour,
        finishTour,
        goToStep,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};