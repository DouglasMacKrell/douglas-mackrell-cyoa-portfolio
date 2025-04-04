'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

// This registry is based on the latest styled-components v6 recommendations
// for Next.js 14 server components setup.
export function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create stylesheet once with lazy initial state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // If we're in the browser, render children without StyleSheetManager
  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  // If we're on the server, render with StyleSheetManager
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
} 