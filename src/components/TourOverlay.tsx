import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTour } from '@/contexts/TourContext';

interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const TourOverlay: React.FC = () => {
  const { 
    isActive, 
    currentStep, 
    steps, 
    nextStep, 
    previousStep, 
    skipTour, 
    finishTour 
  } = useTour();
  
  const [targetPosition, setTargetPosition] = useState<ElementPosition | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (!isActive || !currentStepData) return;

    const updatePosition = () => {
      let targetElement: Element | null = null;
      
      if (currentStepData.target === 'body') {
        // For body target, center the tooltip
        setTargetPosition(null);
        setTooltipPosition({
          top: window.innerHeight / 2 - 100,
          left: window.innerWidth / 2 - 200,
        });
        return;
      }
      
      if (currentStepData.target === 'header') {
        targetElement = document.querySelector('header');
      } else {
        targetElement = document.querySelector(currentStepData.target);
      }

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const position = {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        };
        setTargetPosition(position);

        // Calculate tooltip position based on placement
        const tooltipWidth = 400;
        const tooltipHeight = 200;
        let tooltipTop = 0;
        let tooltipLeft = 0;

        switch (currentStepData.placement) {
          case 'top':
            tooltipTop = position.top - tooltipHeight - 20;
            tooltipLeft = position.left + (position.width / 2) - (tooltipWidth / 2);
            break;
          case 'bottom':
            tooltipTop = position.top + position.height + 20;
            tooltipLeft = position.left + (position.width / 2) - (tooltipWidth / 2);
            break;
          case 'left':
            tooltipTop = position.top + (position.height / 2) - (tooltipHeight / 2);
            tooltipLeft = position.left - tooltipWidth - 20;
            break;
          case 'right':
            tooltipTop = position.top + (position.height / 2) - (tooltipHeight / 2);
            tooltipLeft = position.left + position.width + 20;
            break;
          default:
            tooltipTop = position.top + position.height + 20;
            tooltipLeft = position.left + (position.width / 2) - (tooltipWidth / 2);
        }

        // Keep tooltip within viewport
        const padding = 20;
        tooltipLeft = Math.max(padding, Math.min(tooltipLeft, window.innerWidth - tooltipWidth - padding));
        tooltipTop = Math.max(padding, Math.min(tooltipTop, window.innerHeight - tooltipHeight - padding));

        setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
      } else {
        setTargetPosition(null);
      }
    };

    // Initial position
    updatePosition();

    // Update on resize or scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isActive, currentStep, currentStepData]);

  // Scroll target element into view
  useEffect(() => {
    if (!isActive || !currentStepData || currentStepData.target === 'body') return;

    const targetElement = currentStepData.target === 'header' 
      ? document.querySelector('header')
      : document.querySelector(currentStepData.target);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentStep, isActive, currentStepData]);

  if (!isActive || !currentStepData) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* Backdrop with precise cutout */}
      {targetPosition ? (
        <>
          {/* Top overlay */}
          <div 
            className="fixed bg-black/70 z-40 transition-all duration-300"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: targetPosition.top - 8,
            }}
          />
          {/* Bottom overlay */}
          <div 
            className="fixed bg-black/70 z-40 transition-all duration-300"
            style={{
              top: targetPosition.top + targetPosition.height + 8,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          {/* Left overlay */}
          <div 
            className="fixed bg-black/70 z-40 transition-all duration-300"
            style={{
              top: targetPosition.top - 8,
              left: 0,
              width: targetPosition.left - 8,
              height: targetPosition.height + 16,
            }}
          />
          {/* Right overlay */}
          <div 
            className="fixed bg-black/70 z-40 transition-all duration-300"
            style={{
              top: targetPosition.top - 8,
              left: targetPosition.left + targetPosition.width + 8,
              right: 0,
              height: targetPosition.height + 16,
            }}
          />
        </>
      ) : (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" />
      )}

      {/* Highlight border for target element */}
      {targetPosition && (
        <div
          className="fixed z-50 pointer-events-none transition-all duration-300"
          style={{
            top: targetPosition.top - 4,
            left: targetPosition.left - 4,
            width: targetPosition.width + 8,
            height: targetPosition.height + 8,
            border: '3px solid rgba(59, 130, 246, 0.8)',
            borderRadius: '8px',
            animation: 'highlightPulse 2s ease-in-out infinite',
          }}
        />
      )}

      {/* Tour tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 bg-card border border-border rounded-lg shadow-2xl max-w-md w-full tour-tooltip"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {currentStepData.title}
              </h3>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipTour}
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {currentStepData.content}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={previousStep}
                disabled={isFirstStep}
                className="gap-1"
              >
                <ChevronLeft className="w-3 h-3" />
                Back
              </Button>
              
              {isLastStep ? (
                <Button
                  onClick={finishTour}
                  size="sm"
                  className="gap-1"
                >
                  Finish
                  <span className="text-xs">🎉</span>
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  size="sm"
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="w-3 h-3" />
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={skipTour}
              className="gap-1 text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="w-3 h-3" />
              Skip Tour
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};