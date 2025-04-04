# ✅ TASK.md

## 🚀 Immediate Priority
- [ ] Create feature branch (docs/overhaul) to revamp documentation:
  - [ ] Audit and clean existing documentation
  - [ ] Organize project documentation structure
  - [ ] Create foundation documents needed for ongoing development
  - [ ] Standardize documentation format and conventions

## 🚧 Active Work
- [x] Build initial page layout and full-screen book container
- [x] Create animated "book entrance" effect from bottom of viewport (desktop)
- [x] Implement first cover page component
- [ ] Create animated page turn logic (forwards and backwards)
- [ ] Design accessible floating "red pill" quick links (resume, GitHub, LinkedIn)
- [x] Remove loading screen implementation (currently overkill)
- [x] Remove cover image randomizer and use a single specific image
- [x] Set up testing infrastructure (Jest, RTL)

## 🔜 Backlog
- [ ] Add branching logic and "choice" pages
- [ ] Add PDF resume download functionality
- [ ] Create mobile flow (full-screen book without entrance animation)
- [ ] Add first content pages: About, Work, Projects, Contact
- [ ] Implement "warning" intro page
- [ ] Add accessibility audit (tab focus, aria, screen readers)
- [ ] Add `reduced motion` support fallback
- [ ] Fix ESLint issues for production build

## 🪄 Discovered During Work
- [x] Implemented complex loading screen with vortex spinner and terminal logs (removed)
- [x] Created cover image randomizer with 6 different hero images (removed)
- [ ] Need to refactor page.tsx to be more modular (currently over 400 lines)
- [x] Simplified page loading by removing unnecessary complexity
- [x] Implemented comprehensive test suite with 28 tests covering components and page flows

## 🎯 Milestones
- [x] **Milestone 1**: Cover page, page turn system, and initial animation behavior
- [ ] **Milestone 2**: First full traversal flow (e.g. About → Projects → Contact)
- [ ] **Milestone 3**: Full accessibility compliance and mobile optimization
- [ ] **Milestone 4**: Deploy live site to replace douglasmackrell.com
