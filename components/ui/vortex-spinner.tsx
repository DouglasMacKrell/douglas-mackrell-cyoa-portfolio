'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes animations
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const spinReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

const glow = keyframes`
  0% { filter: blur(3px) brightness(0.8); }
  50% { filter: blur(5px) brightness(1.2); }
  100% { filter: blur(3px) brightness(0.8); }
`;

const glitchEffect = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(var(--char-angle));
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff;
  }
  50% {
    transform: translate(-51%, -51%) rotate(var(--char-angle));
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--char-angle));
    text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff;
  }
`;

// Clockwise glitch effect for secondary spiral
const clockwiseGlitchEffect = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scaleX(-1);
    text-shadow: 0.05em 0 0 #5bf7f7, -0.03em -0.04em 0 #d772f4;
  }
  50% {
    transform: translate(-51%, -51%) rotate(var(--char-angle)) scaleX(-1);
    text-shadow: -0.05em -0.025em 0 #5bf7f7, 0.025em 0.035em 0 #d772f4;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scaleX(-1);
    text-shadow: -0.05em 0 0 #5bf7f7, -0.025em -0.04em 0 #d772f4;
  }
`;

// Update and enhance scanline animation
const scanline = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100vh); }
`;

const glitchLine = keyframes`
  0%, 100% { transform: translateX(0); }
  10% { transform: translateX(-3px); }
  20% { transform: translateX(3px); }
  30% { transform: translateX(-1px); }
  40% { transform: translateX(1px); }
  50% { transform: translateX(-5px); }
  60% { transform: translateX(5px); }
  70% { transform: translateX(0); }
  80% { transform: translateX(-2px); }
  90% { transform: translateX(2px); }
`;

const flicker = keyframes`
  0% { opacity: 0.96; }
  3% { opacity: 0.8; }
  6% { opacity: 0.92; }
  9% { opacity: 0.86; }
  12% { opacity: 0.98; }
  15% { opacity: 0.75; }
  18% { opacity: 0.93; }
  21% { opacity: 0.85; }
  24% { opacity: 0.95; }
  27% { opacity: 0.82; }
  30% { opacity: 0.97; }
  33% { opacity: 0.8; }
  36% { opacity: 0.95; }
  39% { opacity: 0.86; }
  42% { opacity: 0.94; }
  45% { opacity: 0.82; }
  48% { opacity: 0.93; }
  51% { opacity: 0.84; }
  54% { opacity: 0.96; }
  57% { opacity: 0.88; }
  60% { opacity: 0.94; }
  63% { opacity: 0.79; }
  66% { opacity: 0.92; }
  69% { opacity: 0.81; }
  72% { opacity: 0.97; }
  75% { opacity: 0.83; }
  78% { opacity: 0.96; }
  81% { opacity: 0.89; }
  84% { opacity: 0.94; }
  87% { opacity: 0.84; }
  90% { opacity: 0.93; }
  93% { opacity: 0.87; }
  96% { opacity: 0.95; }
  100% { opacity: 0.90; }
`;

// Add more intense neon animation for glows
const neonPulse = keyframes`
  0%, 100% { filter: brightness(1.0) saturate(1.0); }
  50% { filter: brightness(1.3) saturate(1.4); }
`;

// Enhanced RGB shift for more pronounced effect
const rgbShift = keyframes`
  0%, 100% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
  50% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
`;

const glitchBar = keyframes`
  0%, 100% { 
    transform: translateX(-100%);
    opacity: 0; 
  }
  10%, 90% { 
    transform: translateX(100%);
    opacity: 0.8; 
  }
`;

// More aggressive screen tear effect
const screenTear = keyframes`
  0%, 100% { clip-path: inset(0 0 0 0); }
  5% { clip-path: inset(8% 0 0 0); }
  5.2% { clip-path: inset(0 0 0 0); }
  15% { clip-path: inset(0 0 25% 0); }
  15.2% { clip-path: inset(0 0 0 0); }
  25% { clip-path: inset(20% 0 0 0); }
  25.2% { clip-path: inset(0 0 0 0); }
  45% { clip-path: inset(0 0 15% 0); }
  45.2% { clip-path: inset(0 0 0 0); }
  75% { clip-path: inset(0 0 35% 0); }
  75.2% { clip-path: inset(0 0 0 0); }
`;

// CRT bulge effect
const bulgeFilter = `
  brightness(1.1)
  contrast(1.1)
  drop-shadow(0 0 5px rgba(120, 255, 255, 0.2))
  drop-shadow(0 0 2px rgba(255, 120, 255, 0.2))
`;

// More aggressive tracking error effect
const trackingError = keyframes`
  0%, 95%, 100% { transform: translateX(0); }
  96% { transform: translateX(-5px); }
  97% { transform: translateX(3px); }
  98% { transform: translateX(-1px); }
  99% { transform: translateX(0); }
`;

// Vertical sync loss effect
const verticalSync = keyframes`
  0%, 95%, 100% { transform: translateY(0); }
  96% { transform: translateY(8px); }
  98% { transform: translateY(0); }
`;

// More pixelated text effect
const pixelateEffect = keyframes`
  0%, 100% { 
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scale(1);
    opacity: 1;
  }
  50% { 
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scale(1);
    opacity: 0.95;
  }
`;

// Add pulsing animation back for VorTEXT characters
const characterPulse = keyframes`
  0%, 100% { 
    filter: brightness(1.0) contrast(1.2);
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scale(1.2);
  }
  50% { 
    filter: brightness(1.3) contrast(1.5);
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scale(1.25);
  }
`;

// Add an animation for clockwise VorTEXT to follow spin direction better
const clockwisePulse = keyframes`
  0%, 100% { 
    filter: brightness(0.9) contrast(1.1);
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scaleX(-1) scale(1.2) skewX(5deg);
  }
  50% { 
    filter: brightness(1.1) contrast(1.3);
    transform: translate(-50%, -50%) rotate(var(--char-angle)) scaleX(-1) scale(1.25) skewX(2deg);
  }
`;

// Define the props interface
interface VortexSpinnerProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
}

// Update the container to accept the props
const VortexContainer = styled.div<{ $size?: string; $fullScreen?: boolean }>`
  position: relative;
  width: ${props => 
    props.$fullScreen ? '100vw' : 
    props.$size === 'small' ? '200px' : 
    props.$size === 'large' ? '500px' : 
    '300px'
  };
  height: ${props => 
    props.$fullScreen ? '100vh' : 
    props.$size === 'small' ? '200px' : 
    props.$size === 'large' ? '500px' : 
    '300px'
  };
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
  background-color: transparent;
  will-change: auto; /* Optimize for performance */
`;

// Background styled components
const Background = styled.div<{ $fullScreen?: boolean }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #1e0060 20%,
    #5f0090 35%,
    #ff0066 50%,
    #ff6d2e 60%,
    #2a0040 85%,
    #000000 100%
  );
  z-index: 1;
  border-radius: ${props => props.$fullScreen ? '0' : '12px'};
`;

const SynthwaveSun = styled.div<{ $fullScreen?: boolean }>`
  position: absolute;
  width: ${props => props.$fullScreen ? '40vh' : '40%'};
  height: ${props => props.$fullScreen ? '40vh' : '40%'};
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #ff5e00 0%,
    #ff006a 70%,
    rgba(255, 0, 106, 0) 100%
  );
  bottom: 29%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  box-shadow: 
    0 0 ${props => props.$fullScreen ? '60px' : '30px'} ${props => props.$fullScreen ? '20px' : '10px'} rgba(255, 94, 0, 0.6);
  filter: blur(${props => props.$fullScreen ? '3px' : '2px'});
`;

const Horizon = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.95);
  bottom: 20%;
  left: 0;
  right: 0;
  z-index: 5;
  box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.7);
`;

const VerticalLines = styled.div`
  position: absolute;
  width: 140%;
  height: 100%;
  left: -20%;
  bottom: 0;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.12) 1px,
    transparent 1px,
    transparent calc((100%) / 35)
  );
  transform-style: preserve-3d;
  transform: perspective(800px) rotateX(60deg);
  z-index: 7;
`;

const Grid = styled.div`
  position: absolute;
  width: 180%;
  height: 300%;
  left: -40%;
  bottom: -40%;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.17),
    rgba(255, 255, 255, 0.17) 1px,
    transparent 1px,
    transparent calc((100%) / 20)
  );
  transform-style: preserve-3d;
  transform: perspective(1200px) rotateX(75deg);
  z-index: 6;
  animation: gridFlow 8s infinite linear;
  
  @keyframes gridFlow {
    0% {
      transform: perspective(1200px) rotateX(75deg) translateY(0%);
    }
    100% {
      transform: perspective(1200px) rotateX(75deg) translateY(5%);
    }
  }
`;

const Mountains = styled.div`
  position: absolute;
  width: 100%;
  height: 20%;
  bottom: 20%;
  left: 0;
  z-index: 4;
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent 0%, #000 90%);
    clip-path: polygon(
      0% 100%,
      10% 40%,
      20% 65%,
      30% 30%,
      40% 50%,
      50% 20%,
      60% 40%,
      70% 15%,
      80% 45%,
      90% 30%,
      100% 60%,
      100% 100%
    );
    box-shadow: 0 0 15px rgba(157, 0, 255, 0.8);
    filter: drop-shadow(0 0 8px rgba(157, 0, 255, 0.3));
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent 0%, #000 90%);
    clip-path: polygon(
      0% 100%,
      5% 50%,
      15% 70%,
      25% 40%,
      35% 60%,
      45% 35%,
      55% 55%,
      65% 25%,
      75% 45%,
      85% 20%,
      95% 50%,
      100% 70%,
      100% 100%
    );
    transform: translateY(20%);
    filter: drop-shadow(0 0 6px rgba(145, 0, 255, 0.3));
  }
`;

const Stars = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      white 1px,
      transparent 1px
    );
    background-size: 50px 50px;
    opacity: 0.5;
  }
  
  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      white 0.5px,
      transparent 0.5px
    );
    background-size: 30px 30px;
    opacity: 0.3;
  }
`;

// Vortex spinner - reduce z-index to ensure it's below CRT effects
const VortexSpinner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: min(80vw, 500px);
  max-height: min(80vh, 500px);
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  border-radius: 50%;
  z-index: 9; /* Lower z-index to sit below the CRT effects */
`;

// Ring - add blur to edges for more organic feel
const Ring = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #0c4a6e 0deg,
    #075985 60deg,
    #0284c7 120deg, 
    #0ea5e9 180deg,
    #0284c7 240deg,
    #075985 300deg,
    #0c4a6e 360deg
  );
  -webkit-mask: radial-gradient(
    circle at center,
    transparent 25%,
    #000 30%,
    #000 70%,
    transparent 75%
  );
  mask: radial-gradient(
    circle at center,
    transparent 25%,
    #000 30%,
    #000 70%,
    transparent 75%
  );
  animation: ${spin} 10s linear infinite;
  box-shadow: 
    0 0 30px 8px rgba(14, 165, 233, 0.9),
    0 0 60px 12px rgba(6, 182, 212, 0.7);
  filter: brightness(1.2) saturate(1.3) blur(1px); /* Added blur for softer edges */
`;

// Core
const Core = styled.div`
  position: absolute;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 1) 0%,
    rgba(186, 230, 253, 0.9) 20%,
    rgba(125, 211, 252, 0.8) 40%,
    rgba(56, 189, 248, 0.7) 60%,
    rgba(14, 165, 233, 0.6) 80%,
    rgba(3, 105, 161, 0.5) 100%
  );
  box-shadow: 
    0 0 20px rgba(186, 230, 253, 0.95),
    0 0 40px rgba(56, 189, 248, 0.8),
    0 0 60px rgba(14, 165, 233, 0.6);
  animation: ${glow} 3s ease-in-out infinite;
  z-index: 20;
  filter: ${bulgeFilter} brightness(1.2);
`;

// Data stream
const DataStream = styled.div`
  position: absolute;
  width: 85%;
  height: 85%;
  border-radius: 50%;
  animation: ${spin} 15s linear infinite;
  z-index: 5;
  background-image: 
    repeating-radial-gradient(
      circle at center,
      transparent 0px,
      transparent 10px,
      rgba(125, 211, 252, 0.1) 10px,
      rgba(125, 211, 252, 0.1) 15px
    );
`;

// Counter-rotating spiral container (main)
const SpiralContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: ${spinReverse} 20s linear infinite;
  transform-origin: center center;
  z-index: 10;
`;

// Clockwise rotating spiral container (secondary, dimmer)
const SecondSpiralContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: ${spin} 25s linear infinite;
  transform-origin: center center;
  z-index: 9;
  opacity: 0.6; /* Dimmer than the main spiral */
`;

// Text character - main spiral
const TextChar = styled.div.attrs<{
  $x: number;
  $y: number;
  $size: number;
  $angle: number;
  $delay: number;
  $color: string;
  $scaleFactor: number;
  $glitchIntensity: number;
}>(props => ({
  style: {
    fontSize: `${props.$size * 0.7 * props.$scaleFactor}px`,
    color: props.$color,
    left: `calc(50% + ${props.$x * props.$scaleFactor}px)`,
    top: `calc(50% + ${props.$y * props.$scaleFactor}px)`,
    '--char-angle': `${-props.$angle}deg`,
    textShadow: `0 0 5px ${props.$color}, 0 0 8px ${props.$color}, 0 0 12px ${props.$color}`,
  },
}))<{
  $x: number;
  $y: number;
  $size: number;
  $angle: number;
  $delay: number;
  $color: string;
  $scaleFactor: number;
  $glitchIntensity: number;
}>`
  position: absolute;
  font-family: "Courier New", monospace;
  font-weight: 900;
  transform: translate(-50%, -50%) rotate(var(--char-angle)) scale(1.2);
  animation: ${rgbShift} 2s infinite linear, ${characterPulse} ${props => 2 + Math.abs(props.$delay % 3)}s infinite ease-in-out;
  z-index: 10;
  will-change: transform;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  filter: contrast(1.8) brightness(1.2);
  image-rendering: pixelated;
  letter-spacing: -0.3em;
  transform-style: preserve-3d;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  -webkit-text-stroke: 0.5px currentColor;
  paint-order: stroke fill;
`;

// Text character - secondary spiral (dimmer, fewer properties)
const SecondaryTextChar = styled.div.attrs<{
  $x: number;
  $y: number;
  $size: number;
  $angle: number;
  $color: string;
  $scaleFactor: number;
}>(props => ({
  style: {
    fontSize: `${props.$size * 0.7 * props.$scaleFactor}px`,
    color: props.$color,
    left: `calc(50% + ${props.$x * props.$scaleFactor}px)`,
    top: `calc(50% + ${props.$y * props.$scaleFactor}px)`,
    '--char-angle': `${-props.$angle - 70}deg`,
    textShadow: `0 0 5px ${props.$color}, 0 0 10px ${props.$color}`,
  },
}))<{
  $x: number;
  $y: number;
  $size: number;
  $angle: number;
  $color: string;
  $scaleFactor: number;
}>`
  position: absolute;
  font-family: "Courier New", monospace;
  font-weight: 900;
  transform: translate(-50%, -50%) rotate(var(--char-angle)) scaleX(-1) scale(1.2) skewX(5deg);
  animation: ${clockwisePulse} ${props => 2.5 + Math.abs((props.$angle || 0) % 3)}s infinite ease-in-out;
  opacity: 0.7;
  z-index: 8;
  letter-spacing: -0.2em;
  will-change: transform;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  image-rendering: pixelated;
  filter: contrast(1.8);
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  -webkit-text-stroke: 0.5px currentColor;
`;

// Enhanced CRT overlay - ensure it covers everything
const CRTOverlay = styled.div<{ $fullScreen?: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 200; /* Increase z-index to ensure it's above everything */
  overflow: hidden;
  mix-blend-mode: overlay;
  border-radius: ${props => props.$fullScreen ? '0' : '12px'};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      transparent 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
    border-radius: inherit;
    overflow: hidden;
  }
`;

// Add dust and scratches overlay
const DustAndScratches = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 1.5%),
    radial-gradient(circle at 50% 60%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 1%),
    radial-gradient(circle at 80% 40%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 2%),
    linear-gradient(45deg, transparent 98%, rgba(255,255,255,0.2) 99%, transparent 100%),
    linear-gradient(135deg, transparent 97%, rgba(255,255,255,0.2) 98%, transparent 100%);
  z-index: 103;
  opacity: 0.4;
  pointer-events: none;
`;

// Enhanced scanlines with VCR-like effects - make more visible
const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.7) 3px,
      rgba(0, 0, 0, 0.7) 5px
    );
  opacity: 0.95;
  z-index: 100;
  animation: ${scanline} 8s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.9);
    opacity: 0;
    z-index: 105;
    animation: ${glitchBar} 4s infinite;
  }
`;

// Tracking distortion effect container
const TrackingDistortion = styled.div`
  position: absolute;
  inset: 0;
  z-index: 103;
  overflow: hidden;
  animation: ${verticalSync} 20s step-end infinite;
  opacity: 0.8;
  
  &::before {
    content: '';
    position: absolute;
    top: 33%;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.95);
    transform: scaleY(5);
    opacity: 0;
    animation: ${glitchBar} 8s infinite;
    animation-delay: 2.2s;
  }
`;

// More intense and frequent glitch bars
const GlitchBars = styled.div`
  position: absolute;
  inset: 0;
  z-index: 101;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 7px;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
    animation: ${glitchBar} 3s infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 45%;
    left: 0;
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
    animation: ${glitchBar} 4s infinite;
    animation-delay: 1.5s;
  }
`;

// Enhanced screen tearing effect
const ScreenTear = styled.div`
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 102;
  animation: ${screenTear} 6s infinite step-end;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: transparent;
    z-index: 103;
    border-top: 2px solid rgba(255, 255, 255, 0.4);
    border-bottom: 2px solid rgba(255, 255, 255, 0.4);
    transform: translateY(50%);
  }
`;

// Enhanced flicker with stronger RGB shift
const CRTFlicker = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(18, 16, 16, 0.25);
  mix-blend-mode: overlay;
  animation: ${flicker} 0.1s infinite steps(1);
  z-index: 101;
  will-change: opacity;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg, 
      rgba(255, 0, 0, 0.15), 
      rgba(0, 255, 0, 0.15), 
      rgba(0, 0, 255, 0.15)
    );
    background-size: 3px 100%;
    opacity: 0.5;
    pointer-events: none;
  }
`;

// More intense vignette effect
const VignetteEffect = styled.div`
  position: absolute;
  inset: 0;
  box-shadow: 
    inset 0 0 100px rgba(0, 0, 0, 0.95),
    inset 0 0 60px rgba(0, 0, 0, 0.8),
    inset 0 0 25px rgba(0, 0, 0, 0.7);
  background: radial-gradient(
    circle at center,
    transparent 40%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 102;
`;

// Add red laser grid from horizon - fix to properly extend from horizon line
const LaserGrid = styled.div`
  position: absolute;
  width: 200%;
  height: 80%;
  left: -50%;
  bottom: 20%; /* Align precisely with the horizon line at 20% */
  background-image: 
    repeating-linear-gradient(
      to bottom,
      rgba(255, 30, 0, 0.5) 0px,
      rgba(255, 0, 0, 0.2) 3px,
      rgba(255, 60, 0, 0.4) 6px,
      rgba(255, 90, 0, 0.2) 9px
    );
  background-size: 20px 20px;
  transform-style: preserve-3d;
  transform-origin: top center; /* Set origin exactly at the top */
  transform: perspective(500px) rotateX(60deg); /* Correct angle for floor effect */
  z-index: 4; /* Between mountains and horizon */
  opacity: 0.8;
  pointer-events: none;
  filter: drop-shadow(0 0 15px rgba(255, 30, 0, 0.5)) brightness(1.5);
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      repeating-linear-gradient(
        90deg,
        rgba(255, 60, 0, 0.4) 0px,
        rgba(255, 30, 0, 0.2) 1px,
        transparent 2px,
        transparent 20px
      );
    background-size: 20px 20px;
    opacity: 0.9;
  }
`;

// The main spinner component
const VortexSpinnerComponent: React.FC<VortexSpinnerProps> = ({
  className,
  style,
  size = 'default',
  fullScreen = false,
}) => {
  // For responsive scaling
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isClient, setIsClient] = useState(false);
  
  // Preload fonts aggressively on component mount
  useEffect(() => {
    setIsClient(true);
        
    // Update scale factor on resize
    const handleResize = () => {
      if (spinnerRef.current) {
        const containerWidth = spinnerRef.current.clientWidth;
        setScaleFactor(Math.min(containerWidth / 500, 1.2));
      }
    };
    
    handleResize();
    
    // Use a throttled resize handler for better performance
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', throttledResize);
    
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);
  
  // Deterministic pseudo-random function with seed
  const getPseudoRandom = (index: number, seed: number = 42) => {
    // Simple deterministic hash function
    const hash = ((index * 1237 + seed * 374761) % 233333) / 233333;
    return hash;
  };
  
  // Get deterministic random number in range
  const getSeededRandom = (min: number, max: number, index: number) => {
    return min + getPseudoRandom(index) * (max - min);
  };
  
  // Get deterministic character
  const getCharacter = (index: number, charSet: string[], prevChars: string[] = []) => {
    // Use a varying seed for each character to increase randomness while staying deterministic
    const seed = index * 42 + (index % 13) * 7;
    let attempts = 0;
    let char = '';
    
    // Try up to 5 times to get a character that hasn't been used in the last few positions
    do {
      const charIndex = Math.floor(getPseudoRandom(index + attempts, seed) * charSet.length);
      char = charSet[charIndex];
      attempts++;
      // Only try 5 times to avoid infinite loops in edge cases
    } while (prevChars.includes(char) && attempts < 5);
    
    return char;
  };
  
  // Generate main vortex text - with increased tapering and spacing
  const generateVortexText = () => {
    const characters: Array<{
      char: string;
      x: number;
      y: number;
      size: number;
      angle: number;
      delay: number;
      color: string;
      glitchIntensity: number;
    }> = [];
    
    // OPTIMIZATION: Reduce number of tendrils and characters
    const numTendrils = 12; // Reduced from 18
    const charsPerTendril = 30; // Reduced from 40
    
    // Characters to use
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()".split("");
    
    // Cyberpunk colors
    const colors = [
      "#00FFFF", // Cyan
      "#FF00FF", // Magenta
      "#FFFFFF", // White
      "#FF50E5", // Pink
      "#7DF9FF", // Light cyan
      "#FE00FE"  // Bright magenta
    ];
    
    // Create tendrils
    for (let t = 0; t < numTendrils; t++) {
      const startAngle = (t * 360) / numTendrils;
      const color = colors[t % colors.length];
      // Keep track of last 3 characters for each tendril to avoid repetition
      const recentChars: string[] = [];
      
      for (let i = 0; i < charsPerTendril; i++) {
        const angle = startAngle + (i * 5); // Increased from 4 to 5 for more spacing
        
        // Exponential growth for spiral - adjusted for increased tapering
        const radius = 5 + Math.pow(i, 1.65) * 3.7; // Adjusted exponent and multiplier
        
        // Calculate position - Ensure consistent decimal precision to avoid hydration mismatches
        const x = parseFloat((radius * Math.cos(angle * Math.PI / 180)).toFixed(15));
        const y = parseFloat((radius * Math.sin(angle * Math.PI / 180)).toFixed(15));
        
        // Deterministic character selection with previous character awareness
        const charIndex = t * charsPerTendril + i;
        const char = getCharacter(charIndex, chars, recentChars);
        
        // Update recent characters list (keep only last 3)
        recentChars.push(char);
        if (recentChars.length > 3) {
          recentChars.shift();
        }
        
        // Size calculation with more controlled growth and larger end sizes
        let size;
        if (i < 10) {
          size = 6 + (i * 0.7); 
        } else if (i < 20) {
          size = 13 + (i - 10) * 2.8; // Increased scaling
        } else if (i < charsPerTendril) { // Fixed condition to avoid potential out-of-bounds
          size = 41 + Math.pow(i - 20, 1.9) * 1.1; // Larger end sizes
        } else {
          size = 135 + Math.pow(i - charsPerTendril, 2.7) * 1.5; // Increased tapering
        }
        
        // Animation timing - using deterministic values
        const delay = 0.2 + (i * 0.05) + (t * 0.08);
        
        // Glitch intensity increases toward edges
        const glitchIntensity = 0.3 + (i / charsPerTendril) * 0.7;
        
        characters.push({
          char,
          x,
          y,
          size,
          angle,
          delay,
          color,
          glitchIntensity
        });
      }
    }
    
    return characters;
  };
  
  // Generate secondary vortex text - with increased tapering and spacing
  const generateSecondaryVortexText = () => {
    const characters: Array<{
      char: string;
      x: number;
      y: number;
      size: number;
      angle: number;
      color: string;
    }> = [];
    
    // OPTIMIZATION: fewer tendrils and characters
    const numTendrils = 8; // Reduced from 10
    const charsPerTendril = 25; // Reduced from 35
    
    // Characters to use
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    
    // Dimmer colors for secondary spiral
    const colors = [
      "#00CCCC", // Dimmer cyan
      "#CC00CC", // Dimmer magenta
      "#CCCCCC", // Dimmer white
      "#CC50B5", // Dimmer pink
      "#5DF9FF"  // Light cyan
    ];
    
    // Create tendrils
    for (let t = 0; t < numTendrils; t++) {
      const startAngle = (t * 360) / numTendrils;
      const color = colors[t % colors.length];
      // Keep track of last 3 characters for each tendril to avoid repetition
      const recentChars: string[] = [];
      
      for (let i = 0; i < charsPerTendril; i++) {
        const angle = startAngle + (i * 5);
        const radius = 5 + Math.pow(i, 1.65) * 3.7;
        
        // Use fixed precision for position calculations
        const x = parseFloat((radius * Math.cos(angle * Math.PI / 180)).toFixed(15));
        const y = parseFloat((radius * Math.sin(angle * Math.PI / 180)).toFixed(15));
        
        // Deterministic character selection with different seed and previous character awareness
        const charIndex = t * charsPerTendril + i + 1000; // Add offset to get different chars from main spiral
        const char = getCharacter(charIndex, chars, recentChars);
        
        // Update recent characters list (keep only last 3)
        recentChars.push(char);
        if (recentChars.length > 3) {
          recentChars.shift();
        }
        
        // Size calculation - larger for tapering
        let size;
        if (i < 10) {
          size = 6 + (i * 0.6); 
        } else if (i < 20) {
          size = 12 + (i - 10) * 2.2;
        } else if (i < charsPerTendril) { // Fixed condition to avoid potential out-of-bounds
          size = 34 + Math.pow(i - 20, 1.7) * 1.2; // Increased tapering
        } else {
          size = 34; // Default fallback size
        }
        
        characters.push({
          char,
          x,
          y,
          size,
          angle,
          color
        });
      }
    }
    
    return characters;
  };
  
  // Generate character arrays only once with fixed seed
  // Use React.useMemo with empty deps array to ensure the exact same result on server and client
  const vortexText = useMemo(() => generateVortexText(), []);
  const secondaryVortexText = useMemo(() => generateSecondaryVortexText(), []);

  // Handle server-side rendering gracefully
  if (typeof window === 'undefined') {
    // Return a simplified version for SSR to avoid hydration mismatches
    return (
      <VortexContainer 
        className={className}
        style={style}
        $size={size}
        $fullScreen={fullScreen}
        role="progressbar"
        aria-label="Loading"
      >
        <Background $fullScreen={fullScreen} />
        <SynthwaveSun $fullScreen={fullScreen} />
        <Mountains />
        <Horizon />
        <LaserGrid />
        <Grid />
        <VerticalLines />
        <VortexSpinner ref={spinnerRef}>
          <Ring />
          <Core />
        </VortexSpinner>
        <CRTOverlay $fullScreen={fullScreen}>
          <Scanlines />
          <VignetteEffect />
        </CRTOverlay>
      </VortexContainer>
    );
  }
  
  // Client-side rendering with full effects
  return (
    <VortexContainer 
      className={className}
      style={style}
      $size={size}
      $fullScreen={fullScreen}
      role="progressbar"
      aria-label="Loading"
    >
      <Background $fullScreen={fullScreen} />
      <Stars />
      <SynthwaveSun $fullScreen={fullScreen} />
      <Mountains />
      <Horizon />
      <LaserGrid />
      <Grid />
      <VerticalLines />
      <VortexSpinner ref={spinnerRef}>
        <Ring />
        <DataStream />
        
        {/* Only render these on the client side */}
        {isClient && (
          <>
            {/* Secondary clockwise spiral */}
            <SecondSpiralContainer>
              {secondaryVortexText.map((char, i) => (
                <SecondaryTextChar
                  key={`secondary-${i}`}
                  $x={char.x}
                  $y={char.y}
                  $size={char.size}
                  $angle={char.angle}
                  $color={char.color}
                  $scaleFactor={scaleFactor}
                >
                  {char.char}
                </SecondaryTextChar>
              ))}
            </SecondSpiralContainer>
            
            {/* Main counter-clockwise spiral */}
            <SpiralContainer>
              {vortexText.map((char, i) => (
                <TextChar
                  key={`vortex-${i}`}
                  $x={char.x}
                  $y={char.y}
                  $size={char.size}
                  $angle={char.angle}
                  $delay={char.delay}
                  $color={char.color}
                  $scaleFactor={scaleFactor}
                  $glitchIntensity={char.glitchIntensity}
                >
                  {char.char}
                </TextChar>
              ))}
            </SpiralContainer>
          </>
        )}
        
        <Core />
      </VortexSpinner>
      
      {/* CRT overlay effects */}
      <CRTOverlay $fullScreen={fullScreen}>
        <Scanlines />
        <TrackingDistortion />
        <GlitchBars />
        <CRTFlicker />
        <VignetteEffect />
        <DustAndScratches />
      </CRTOverlay>
    </VortexContainer>
  );
};

// Export the component
export default VortexSpinnerComponent; 