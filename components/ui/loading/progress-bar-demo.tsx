'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlitchProgressBar from './glitch-progress-bar';

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 0, 0.3);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h3`
  color: #00FF00;
  margin: 0;
  font-family: 'VT323', monospace;
  text-shadow: 0 0 5px #00FF00;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #002200;
  color: #00FF00;
  border: 1px solid #00FF00;
  padding: 8px 16px;
  font-family: 'VT323', monospace;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 0 5px #00FF00;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #003300;
    box-shadow: 0 0 10px #00FF00;
  }
`;

const ProgressBarDemo: React.FC = () => {
  const [manualProgress, setManualProgress] = useState(25);
  const [autoProgress, setAutoProgress] = useState(false);
  const [reset, setReset] = useState(false);
  
  // Increment progress manually
  const incrementProgress = () => {
    setManualProgress(prev => Math.min(prev + 10, 100));
  };
  
  // Reset progress
  const resetProgress = () => {
    setManualProgress(0);
    setReset(!reset);
  };
  
  // Toggle auto progress
  const toggleAutoProgress = () => {
    resetProgress();
    setAutoProgress(prev => !prev);
  };
  
  return (
    <DemoContainer>
      <Section>
        <Title>Manual Progress Bar</Title>
        <GlitchProgressBar 
          progress={manualProgress} 
          height={25} 
          width="100%" 
        />
        <Controls>
          <Button onClick={incrementProgress}>Increment 10%</Button>
          <Button onClick={resetProgress}>Reset</Button>
        </Controls>
      </Section>
      
      <Section>
        <Title>Auto Progress Bar ({autoProgress ? 'Running' : 'Stopped'})</Title>
        <GlitchProgressBar 
          key={reset ? 'reset' : 'normal'} 
          autoProgress={autoProgress} 
          duration={8000} 
          height={25} 
          width="100%" 
          glitchIntensity="high"
        />
        <Controls>
          <Button onClick={toggleAutoProgress}>
            {autoProgress ? 'Stop Auto Progress' : 'Start Auto Progress'}
          </Button>
        </Controls>
      </Section>
      
      <Section>
        <Title>Different Sizes and Intensities</Title>
        <GlitchProgressBar 
          progress={60} 
          height={10} 
          width="100%" 
          glitchIntensity="low" 
        />
        <GlitchProgressBar 
          progress={70} 
          height={20} 
          width="100%" 
          glitchIntensity="medium" 
        />
        <GlitchProgressBar 
          progress={80} 
          height={30} 
          width="100%" 
          glitchIntensity="high" 
        />
      </Section>
      
      <Section>
        <Title>Without Percentage Text</Title>
        <GlitchProgressBar 
          progress={75} 
          height={15} 
          width="100%" 
          showPercentage={false} 
        />
      </Section>
      
      <Section>
        <Title>Mobile-Friendly Version</Title>
        <GlitchProgressBar 
          progress={65} 
          height={30} 
          width="100%" 
          glitchIntensity="medium" 
        />
      </Section>
    </DemoContainer>
  );
};

export default ProgressBarDemo; 