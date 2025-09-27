export interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string; // CSS selector for the element to highlight
  placement: 'top' | 'bottom' | 'left' | 'right';
  optional?: boolean;
}

export interface TourContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTour: () => void;
  finishTour: () => void;
  goToStep: (step: number) => void;
}

export interface TourProviderProps {
  children: React.ReactNode;
}