# 📘 PLANNING.md

## 🧠 Purpose & Vision
This project is a complete redesign of [douglasmackrell.com](https://douglasmackrell.com). The goal is to create an interactive, accessibility-first portfolio site presented as a **virtual Choose Your Own Adventure book**.

The site invites visitors to navigate the portfolio by "flipping pages" in a tall, animated book interface, reflecting the charm and nostalgia of the classic book series. Pages will feature sections such as About, Work, Projects, Resume, and Contact—each embedded as narrative "paths" with interactive choices.

## 🧱 Architecture & Tech Stack

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), built with the following tools and conventions:

### ✨ Frontend
- **Framework**: Next.js 14.2.16 (React 18)
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS (utility-first)
  - Styled Components (component-specific styles)
- **UI/Variants**:
  - class-variance-authority (CVA)
  - clsx + tailwind-merge for class composition
  - Lucide React for icons

### 🧪 Testing
- Jest + React Testing Library
- `/__tests__` or `/tests` folders mirror component structure
- All new components and logic must include:
  - ✅ 1 expected case
  - ⚠️ 1 edge case
  - ❌ 1 failure case

### 🔍 Accessibility
- Keyboard navigable
- Screen-reader support
- Prefers-reduced-motion compliance

## 📐 Layout & Behavior

- The "book" UI should:
  - Be a tall rectangle (classic CYOA shape)
  - Be 90% of viewport height and vertically centered
  - Animate in from the bottom on page load (desktop only)
  - Gently shift horizontally when opened (desktop only)
  - Expand to full screen on mobile (no animation on load)
- Each page turn:
  - Is fully animated (~0.5s max)
  - Can go forward or backward
  - Supports “quick travel” links via branching choices
- Page content:
  - Anchored to the **right-hand page**
  - First page should be a traditional “CYOA warning”
- Quick-access links (resume, GitHub, LinkedIn) appear as floating "red pill" badges on the right

## 📏 Constraints & Guidelines
- All components should follow accessibility-first design
- File size limit: 500 lines max per file
- Split logic and layout into reusable modules
- Use consistent naming, routing, and styling patterns from this file and `cursorrules.md`
- Always update this file when global project direction or tooling changes
