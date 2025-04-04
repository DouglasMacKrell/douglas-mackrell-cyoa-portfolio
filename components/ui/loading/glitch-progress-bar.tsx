'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Progress bar props interface
interface GlitchProgressBarProps {
  progress?: number; // 0 to 100
  autoProgress?: boolean; // Automatically increment progress
  duration?: number; // Duration in ms for auto progress
  height?: number; // Height in pixels
  width?: string; // Width as CSS value (e.g. '80%', '300px')
  showPercentage?: boolean; // Show percentage text
  glitchIntensity?: 'low' | 'medium' | 'high'; // Control glitch effect intensity
  loadingText?: string; // Text to display above the progress bar
  className?: string; // For external styling
}

// Keyframe animations
const textGlitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 #00FF00, -0.05em -0.025em 0 #00FF00;
    transform: skewX(0);
  }
  10% {
    text-shadow: 0.1em 0 0 #00FF00, -0.1em -0.025em 0 #00FF00;
    transform: skewX(-15deg);
  }
  20% {
    text-shadow: 0.05em 0 0 #00FF00, -0.05em -0.025em 0 #00FF00;
    transform: skewX(0);
  }
  30% {
    text-shadow: 0.05em 0 0 #00FF00, -0.1em -0.025em 0 #00FF00;
    transform: skewX(5deg);
  }
  40% {
    text-shadow: 0.05em 0 0 #00FF00, -0.05em -0.075em 0 #00FF00;
    transform: skewX(0);
  }
  100% {
    text-shadow: 0.05em 0 0 #00FF00, -0.05em -0.025em 0 #00FF00;
    transform: skewX(0);
  }
`;

const flicker = keyframes`
  0% { opacity: 1.0; filter: brightness(1.5); }
  4% { opacity: 0.8; filter: brightness(1.0); }
  8% { opacity: 1.0; filter: brightness(1.8); }
  12% { opacity: 0.7; filter: brightness(1.2); }
  16% { opacity: 1.0; filter: brightness(1.5); }
  20% { opacity: 0.9; filter: brightness(1.7); }
  70% { opacity: 1.0; filter: brightness(1.5); }
  72% { opacity: 0.8; filter: brightness(1.3); }
  74% { opacity: 1.0; filter: brightness(1.8); }
  76% { opacity: 0.9; filter: brightness(1.5); }
  78% { opacity: 1.0; filter: brightness(2.0); }
  100% { opacity: 0.9; filter: brightness(1.5); }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const pulse = keyframes`
  0% { 
    box-shadow: 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00;
    filter: brightness(1.2); 
  }
  50% { 
    box-shadow: 0 0 15px #00FF00, 0 0 30px #00FF00, 0 0 50px #00FF00;
    filter: brightness(1.5); 
  }
  100% { 
    box-shadow: 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00;
    filter: brightness(1.2); 
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  40% { opacity: 1; }
  50% { opacity: 0; }
  60% { opacity: 1; }
`;

// Styled components
const ProgressBarWrapper = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.$width};
  margin: 0 auto;
  position: relative;
`;

const LoadingTextContainer = styled.div`
  font-family: 'VT323', monospace;
  font-size: 28px;
  color: #00FF00;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #00FF00, 0 0 20px #00FF00;
  animation: ${textGlitch} 3s infinite alternate-reverse, ${flicker} 4s infinite;
  position: relative;
  will-change: auto;
  z-index: 100;
  font-weight: bold;
  pointer-events: none;
  
  &::after {
    content: '_';
    position: absolute;
    animation: ${blink} 1s infinite;
  }
`;

const ProgressBarContainer = styled.div<{ $width: string }>`
  position: relative;
  width: 100%;
  background-color: rgba(0, 15, 0, 0.5);
  border: 3px solid #00FF00;
  border-radius: 0;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 0 15px #00FF00, inset 0 0 10px #00FF00;
  padding: 4px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 40, 0, 0.3) 0%,
      rgba(0, 80, 0, 0.2) 50%,
      rgba(0, 40, 0, 0.3) 100%
    );
    pointer-events: none;
    z-index: 1;
  }
  
  // Add terminal-style corner brackets
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid transparent;
    border-image: linear-gradient(45deg, #00FF00 0%, transparent 30%, transparent 70%, #00FF00 100%) 1;
    pointer-events: none;
    z-index: 5;
    opacity: 0.8;
  }
`;

const ProgressFill = styled.div.attrs<{
  $progress: number; 
  $glitchIntensity: string;
  $height: number;
}>(props => ({
  style: {
    width: `${props.$progress}%`,
    height: `${props.$height}px`,
  }
}))<{ 
  $progress: number; 
  $glitchIntensity: string;
  $height: number;
}>`
  background: repeating-linear-gradient(
    90deg,
    #00FF00,
    #00FF00 ${props => Math.max(props.$height / 3, 10)}px,
    #00AA00 ${props => Math.max(props.$height / 3, 10)}px,
    #00AA00 ${props => Math.max(props.$height / 1.5, 20)}px
  );
  position: relative;
  animation: ${flicker} 2s infinite alternate-reverse;
  box-shadow: 0 0 15px #00FF00, 0 0 30px #00FF00;
  will-change: auto;
  z-index: 2;
  transition: width 0.2s step-end; // Make the progress more blocky with step transitions
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 255, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    animation: ${pulse} 2s infinite ease-in-out;
  }
`;

const SegmentOverlay = styled.div<{ 
  $height: number;
  $glitchIntensity: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background-image: ${props => `repeating-linear-gradient(
    90deg,
    transparent,
    transparent ${Math.max(props.$height / 3, 6)}px,
    rgba(0, 0, 0, 0.1) ${Math.max(props.$height / 3, 6)}px,
    rgba(0, 0, 0, 0.1) ${Math.max(props.$height / 1.5, 12)}px
  )`};
  pointer-events: none;
`;

const ScanLine = styled.div<{ $height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => Math.max(props.$height / 5, 3)}px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.5),
    rgba(0, 255, 0, 0.3)
  );
  opacity: 0.7;
  z-index: 3;
  animation: ${scanline} 2s linear infinite;
  pointer-events: none;
  will-change: transform;
`;

const ProgressText = styled.div<{ $height: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00FF00;
  font-family: 'VT323', monospace;
  font-size: ${props => Math.max(props.$height * 0.7, 16)}px;
  font-weight: bold;
  text-shadow: 0 0 10px #00FF00;
  text-transform: uppercase;
  z-index: 4;
  animation: ${textGlitch} 3s infinite alternate-reverse;
  white-space: nowrap;
`;

// Segments to create the blocky terminal feel
const SegmentMarkers = styled.div<{ $height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 2;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: rgba(0, 255, 0, 0.5);
  }
  
  &::before {
    left: 25%;
  }
  
  &::after {
    left: 75%;
  }
`;

// Add terminal-style segments on the bar
const BlockOverlay = styled.div<{ $height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background-image: linear-gradient(
    to right,
    transparent 0%,
    transparent 12.5%,
    rgba(0, 0, 0, 0.05) 12.5%,
    rgba(0, 0, 0, 0.05) 25%,
    transparent 25%,
    transparent 37.5%,
    rgba(0, 0, 0, 0.05) 37.5%,
    rgba(0, 0, 0, 0.05) 50%,
    transparent 50%,
    transparent 62.5%,
    rgba(0, 0, 0, 0.05) 62.5%,
    rgba(0, 0, 0, 0.05) 75%,
    transparent 75%,
    transparent 87.5%,
    rgba(0, 0, 0, 0.05) 87.5%,
    rgba(0, 0, 0, 0.05) 100%
  );
  pointer-events: none;
`;

const GlitchProgressBar: React.FC<GlitchProgressBarProps> = ({
  progress = 0,
  autoProgress = false,
  duration = 5000,
  height = 30,
  width = '80%',
  showPercentage = false,
  glitchIntensity = 'medium',
  loadingText = "Loading...",
  className,
}) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  
  // Handle external progress updates ONLY when autoProgress is false
  // This is critical to prevent the infinite update loop
  useEffect(() => {
    if (autoProgress) return; // Skip if auto-progressing
    
    // Only update when progress actually changes
    if (progress !== currentProgress) {
      setCurrentProgress(progress);
    }
  }, [progress, autoProgress, currentProgress]);
  
  // Completely separate effect for auto-progress mode
  useEffect(() => {
    if (!autoProgress) return; // Only run in auto-progress mode
    
    const startTime = Date.now();
    let isMounted = true;
    
    const interval = setInterval(() => {
      if (!isMounted) return;
      
      const elapsedTime = Date.now() - startTime;
      const calculatedProgress = Math.min(100, (elapsedTime / duration) * 100);
      
      setCurrentProgress(calculatedProgress);
      
      if (calculatedProgress >= 100) {
        clearInterval(interval);
      }
    }, 50); // Update frequently for smooth animation
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
    
    // Only depend on autoProgress and duration
    // Explicitly NOT depending on currentProgress which would cause loop
  }, [autoProgress, duration]);
  
  return (
    <ProgressBarWrapper className={className} $width={width}>
      <LoadingTextContainer>{loadingText}</LoadingTextContainer>
      <ProgressBarContainer $width={width}>
        <ProgressFill 
          $progress={currentProgress} 
          $glitchIntensity={glitchIntensity}
          $height={height}
        />
        <SegmentOverlay
          $height={height}
          $glitchIntensity={glitchIntensity}
        />
        <BlockOverlay $height={height} />
        <SegmentMarkers $height={height} />
        <ScanLine $height={height} />
        {showPercentage && (
          <ProgressText $height={height}>
            {Math.round(currentProgress)}%
          </ProgressText>
        )}
      </ProgressBarContainer>
    </ProgressBarWrapper>
  );
};

export default GlitchProgressBar; 