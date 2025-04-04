'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Props interface
interface SystemLogsProps {
  isVisible?: boolean;
  width?: string;
  maxHeight?: string;
  opacity?: number;
  className?: string;
  startImmediately?: boolean;
  stallDetected?: boolean;
}

// Keyframe animations
const textGlitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 #00FF00, -0.05em -0.025em 0 #00FF00;
    transform: skewX(0);
  }
  10% {
    text-shadow: 0.1em 0 0 #00FF00, -0.1em -0.025em 0 #00FF00;
    transform: skewX(-5deg);
  }
  20% {
    text-shadow: 0.05em 0 0 #00FF00, -0.05em -0.025em 0 #00FF00;
    transform: skewX(0);
  }
  30% {
    text-shadow: 0.05em 0 0 #00FF00, -0.1em -0.025em 0 #00FF00;
    transform: skewX(2deg);
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

const blink = keyframes`
  0%, 100% { opacity: 1; }
  40% { opacity: 1; }
  50% { opacity: 0; }
  60% { opacity: 1; }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

// Styled components
const TerminalContainer = styled.div<{ 
  $width: string;
  $maxHeight: string;
  $opacity: number;
  $isVisible: boolean;
}>`
  position: absolute;
  top: 20px;
  right: 20px;
  width: ${props => props.$width};
  max-height: ${props => props.$maxHeight};
  background-color: rgba(0, 20, 0, 0.7);
  border: 2px solid #00FF00;
  border-radius: 4px;
  font-family: 'VT323', monospace;
  color: #00FF00;
  font-size: 14px;
  line-height: 1.2;
  padding: 15px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), inset 0 0 5px rgba(0, 255, 0, 0.3);
  opacity: ${props => props.$isVisible ? props.$opacity : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease, visibility 0.5s ease;
  
  /* Terminal header styling */
  &::before {
    content: 'SYSTEM LOGS';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000;
    padding: 0 10px;
    font-size: 12px;
    color: #00FF00;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid #00FF00;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
    animation: ${flicker} 5s infinite;
  }
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 20, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00FF00;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #00CC00;
  }
`;

const TerminalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 20, 0, 0.1) 0%,
    rgba(0, 10, 0, 0.05) 50%,
    rgba(0, 20, 0, 0.1) 100%
  );
  pointer-events: none;
  z-index: 2;
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(0, 255, 0, 0),
    rgba(0, 255, 0, 0.5),
    rgba(0, 255, 0, 0)
  );
  opacity: 0.7;
  z-index: 3;
  animation: ${scanline} 4s linear infinite;
  pointer-events: none;
`;

const LogsContent = styled.div`
  position: relative;
  z-index: 1;
  
  /* Cursor effect */
  &::after {
    content: '_';
    display: inline-block;
    animation: ${blink} 1s infinite;
  }
`;

const LogEntry = styled.div<{ $type?: string; $delay: number }>`
  margin-bottom: 3px;
  opacity: 0;
  animation: ${flicker} 3s infinite, fadeIn 0.3s forwards;
  animation-delay: ${props => props.$delay}s;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Different log types have different colors */
  ${props => props.$type === 'error' && `
    color: #FF3300;
    text-shadow: 0 0 5px #FF3300;
  `}
  
  ${props => props.$type === 'warning' && `
    color: #FFCC00;
    text-shadow: 0 0 5px #FFCC00;
  `}
  
  ${props => props.$type === 'success' && `
    color: #00FF66;
    text-shadow: 0 0 5px #00FF66;
  `}
  
  /* Command starts with > */
  ${props => props.$type === 'command' && `
    &::before {
      content: '> ';
      color: #00CCFF;
    }
    color: #00CCFF;
    text-shadow: 0 0 5px #00CCFF;
  `}
`;

const Timestamp = styled.span`
  color: #AAFFAA;
  margin-right: 8px;
  font-size: 0.9em;
`;

// Display a placeholder initial log entry when the component first mounts
const InitialLogsEntry = styled.div`
  margin-bottom: 3px;
  color: #00FF00;
`;

// Create static placeholder logs for initial SSR and first client-side render
const placeholderLogs = [
  { text: 'Initializing system boot sequence...', type: 'command' as const, timestamp: '00:00:00.00' },
  { text: 'Loading kernel modules...', timestamp: '00:00:00.00' },
  { text: 'Checking system integrity...', timestamp: '00:00:00.00' },
  { text: 'Mounting file systems...', type: 'success' as const, timestamp: '00:00:00.00' },
  { text: 'Neural network interfaces online', type: 'success' as const, timestamp: '00:00:00.00' },
];

const SystemLogs: React.FC<SystemLogsProps> = ({
  isVisible = true,
  width = '350px',
  maxHeight = '300px',
  opacity = 0.9,
  className,
  startImmediately = true,
  stallDetected = false,
}) => {
  // Sample system logs - expanded for longer sequence
  const systemLogs: Array<{
    text: string;
    type?: 'error' | 'warning' | 'success' | 'command';
  }> = [
    { text: 'Initializing system boot sequence...', type: 'command' },
    { text: 'Loading kernel modules...' },
    { text: 'Checking system integrity...' },
    { text: 'Mounting file systems...', type: 'success' },
    { text: 'WARNING: Memory allocation suboptimal', type: 'warning' },
    { text: 'Neural network interfaces online', type: 'success' },
    { text: 'Quantum encryption protocols active' },
    { text: 'ERROR: Failed to connect to remote server', type: 'error' },
    { text: 'Retrying connection...' },
    { text: 'Connection established to central mainframe', type: 'success' },
    { text: 'Loading user profile...' },
    { text: 'Biometric authentication systems online', type: 'success' },
    { text: 'Activating cyberspace protocols...', type: 'command' },
    { text: 'Engaging neural interface drivers...' },
    { text: 'Syncing with global network grid...' },
    { text: 'Calibrating reality distortion matrix...', type: 'success' },
    { text: 'WARNING: Cybersecurity threats detected', type: 'warning' },
    { text: 'Activating defense algorithms...' },
    { text: 'Checking for system updates...', type: 'command' },
    { text: 'Update package verified - applying patches', type: 'success' },
    { text: 'Initializing virtual environment...' },
    { text: 'Scanning for malware...', type: 'command' },
    { text: 'Firewall rules updated', type: 'success' },
    { text: 'Establishing secure connections...', type: 'command' },
    { text: 'VPN tunnels activated' },
    { text: 'WARNING: Bandwidth throttling detected', type: 'warning' },
    { text: 'Optimizing network protocols' },
    { text: 'Loading firmware updates...' },
    { text: 'Quantum processor online', type: 'success' },
    { text: 'ERROR: Virtual memory fragmentation detected', type: 'error' },
    { text: 'Running memory defragmentation...', type: 'command' },
    { text: 'Memory optimization complete', type: 'success' },
    { text: 'Initializing holographic interfaces...' },
    { text: 'Calibrating neural feedback loops' },
    { text: 'Synchronizing time with atomic clock' },
    { text: 'Loading AI assistance modules...', type: 'command' },
    { text: 'Personality matrix activated', type: 'success' },
    { text: 'WARNING: High CPU temperature detected', type: 'warning' },
    { text: 'Activating thermal management protocols...', type: 'command' },
    { text: 'Temperature stabilized', type: 'success' },
    { text: 'Analyzing user biometric data...' },
    { text: 'Identity confirmed', type: 'success' },
    { text: 'Accessing secure databases...' },
    { text: 'Decrypting classified information', type: 'command' },
    { text: 'Running final diagnostics...' },
    { text: 'All systems operational', type: 'success' },
    { text: 'System ready - Awaiting user command', type: 'success' },
  ];

  // Special logs for stall situations
  const stallLogs: Array<{
    text: string;
    type?: 'error' | 'warning' | 'success' | 'command';
  }> = [
    { text: 'WARNING: Network latency detected', type: 'warning' },
    { text: 'Initiating connection retry sequence...', type: 'command' },
    { text: 'Optimizing bandwidth allocation', type: 'command' },
    { text: 'Checking CDN availability...', type: 'command' },
    { text: 'Rerouting through alternate channels', type: 'command' },
    { text: 'Requesting reduced payload size', type: 'command' },
    { text: 'WARNING: Resource contention detected', type: 'warning' },
    { text: 'Prioritizing critical system components', type: 'command' },
    { text: 'Applying progressive enhancement protocols', type: 'command' },
    { text: 'Enabling low-bandwidth optimization mode', type: 'success' },
    { text: 'Compressing data streams', type: 'command' },
    { text: 'Analyzing network congestion points', type: 'command' },
    { text: 'ERROR: Timeout on primary connection', type: 'error' },
    { text: 'Falling back to secondary connection', type: 'command' },
    { text: 'Implementing exponential backoff strategy', type: 'command' },
    { text: 'Caching available resources', type: 'success' },
  ];

  // Preload more initial logs to be visible immediately
  const initialLogsCount = 9;
  
  // Use state with initial values that match the placeholders to prevent visual jumps
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [stallLogInserted, setStallLogInserted] = useState(false);
  const [stallLogIndex, setStallLogIndex] = useState(0);
  const [logs, setLogs] = useState<Array<{
    text: string;
    type?: 'error' | 'warning' | 'success' | 'command';
    timestamp: string;
  }>>([...placeholderLogs]); // Initialize with placeholder logs to prevent empty initial render
  
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stallLogIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentLogIndexRef = useRef<number>(initialLogsCount);
  
  const generateTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 2
    });
  };
  
  // First useEffect - mounting logic with improved cleanup
  useEffect(() => {
    // Avoid running anything during SSR
    if (typeof window === 'undefined') return;
    
    let isMounted = true;
    
    // Set mounted flag and initialize logs with timestamps
    setMounted(true);
    
    // Generate real timestamps for the placeholder logs
    const currentTime = generateTimestamp();
    setLogs(prev => prev.map(log => ({
      ...log,
      timestamp: currentTime
    })));
    
    // Scroll to bottom immediately with shorter timeout
    const scrollTimeout = setTimeout(() => {
      if (isMounted && logsEndRef.current) {
        logsEndRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }, 20);
    
    return () => {
      isMounted = false;
      clearTimeout(scrollTimeout);
    };
  }, []); // Empty dependency array - only run once
  
  // Initialize client-side logs after component has mounted with proper cleanup
  useEffect(() => {
    if (!mounted) return;
    
    let isMounted = true;
    
    // Mark as initialized
    setInitialized(true);
    
    // Define log addition function
    const addNextLog = () => {
      if (!isMounted || currentLogIndexRef.current >= systemLogs.length) {
        if (logIntervalRef.current) {
          clearInterval(logIntervalRef.current);
          logIntervalRef.current = null;
        }
        return;
      }
      
      const newLog = {
        ...systemLogs[currentLogIndexRef.current],
        timestamp: generateTimestamp()
      };
      
      setLogs(prevLogs => [...prevLogs, newLog]);
      
      if (logsEndRef.current) {
        logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      currentLogIndexRef.current++;
    };
    
    // Start adding logs with minimal delay and higher frequency
    const initialTimeout = setTimeout(() => {
      if (isMounted) {
        logIntervalRef.current = setInterval(addNextLog, 50);
      }
    }, 50);
    
    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
      
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
        logIntervalRef.current = null;
      }
      if (stallLogIntervalRef.current) {
        clearInterval(stallLogIntervalRef.current);
        stallLogIntervalRef.current = null;
      }
    };
  }, [mounted]); // Only depend on mounted state
  
  // Handle stall detection with additional special logs and proper cleanup
  useEffect(() => {
    if (!mounted || !isVisible || !initialized || !stallDetected || stallLogInserted) return;
    
    let isMounted = true;
    
    // Insert a stall notification log
    const stallNotification = {
      text: 'WARNING: Network connection unstable, optimizing for low bandwidth...',
      type: 'warning' as const,
      timestamp: generateTimestamp()
    };
    
    setLogs(prevLogs => [...prevLogs, stallNotification]);
    setStallLogInserted(true);
    
    // Define stall log addition function
    const addStallLog = () => {
      if (!isMounted) return;
      
      const currentIndex = stallLogIndex >= stallLogs.length ? 0 : stallLogIndex;
      
      const newStallLog = {
        ...stallLogs[currentIndex],
        timestamp: generateTimestamp()
      };
      
      setLogs(prevLogs => [...prevLogs, newStallLog]);
      setStallLogIndex(prev => (prev + 1) % stallLogs.length); // Loop with modulo
      
      if (logsEndRef.current) {
        logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    // Add stall logs at a moderate pace
    stallLogIntervalRef.current = setInterval(addStallLog, 400);
    
    return () => {
      isMounted = false;
      
      if (stallLogIntervalRef.current) {
        clearInterval(stallLogIntervalRef.current);
        stallLogIntervalRef.current = null;
      }
    };
  }, [mounted, isVisible, initialized, stallDetected, stallLogInserted, stallLogs]);
  
  return (
    <TerminalContainer 
      className={className}
      $width={width}
      $maxHeight={maxHeight}
      $opacity={opacity}
      $isVisible={isVisible}
    >
      <TerminalOverlay />
      <ScanLine />
      <LogsContent>
        {logs.map((log, index) => (
          <LogEntry 
            key={index} 
            $type={log.type} 
            $delay={0} // No delay for immediate visibility
          >
            <Timestamp>[{log.timestamp}]</Timestamp> {log.text}
          </LogEntry>
        ))}
        <div ref={logsEndRef} />
      </LogsContent>
    </TerminalContainer>
  );
};

export default SystemLogs; 