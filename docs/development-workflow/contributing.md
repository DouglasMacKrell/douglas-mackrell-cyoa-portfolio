# 🤝 Contributing Guide

This document outlines the process for contributing to the CYOA Portfolio project, ensuring consistent and high-quality code contributions.

## Development Workflow

We follow a Git Flow inspired branching strategy:

```
main
 ├── develop
 │    ├── feature/page-turning
 │    ├── feature/quick-links
 │    └── docs/overhaul
 └── bugfix/animation-glitch
```

### Branches

- **`main`** - Production-ready code, deployed to production
- **`develop`** - Main development branch, contains latest approved features
- **`feature/*`** - Feature branches for new functionality
- **`bugfix/*`** - Bug fix branches
- **`docs/*`** - Documentation updates

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/DouglasMacKrell/douglas-mackrell-cyoa-portfolio.git
   cd douglas-mackrell-cyoa-portfolio
   ```

2. **Create a new branch**
   Always create feature branches from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   Follow the project's [style guide](../guides/style-guide.md) and ensure you write tests for new functionality.

4. **Commit your changes**
   We use conventional commit messages:
   ```bash
   git commit -m "feat: add page turning animation"
   git commit -m "fix: correct book cover alignment"
   git commit -m "docs: update testing guide"
   git commit -m "refactor: simplify animation logic"
   git commit -m "test: add tests for page component"
   ```

5. **Push your branch**
   ```bash
   git push -u origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Open a PR against the `develop` branch
   - Include a clear description of changes
   - Reference relevant issues or tasks
   - Ensure tests pass

## Test Driven Development (TDD)

We follow TDD practices for all new functionality:

1. Write failing tests that define the expected behavior
2. Implement the feature to make the tests pass
3. Refactor the code while maintaining passing tests

## Code Review Guidelines

When reviewing PRs, check for:

- **Functionality**: Does the code work as expected?
- **Test Coverage**: Are there appropriate tests?
- **Code Quality**: Does it follow our style guide?
- **Performance**: Are there any performance concerns?
- **Accessibility**: Does it meet accessibility standards?
- **Documentation**: Are changes documented appropriately?

## Definition of Done

A feature is considered "done" when:

- ✅ Code is written according to the style guide
- ✅ All tests pass
- ✅ Code has been reviewed by at least one other developer
- ✅ Documentation is updated (if applicable)
- ✅ Changes have been merged into the `develop` branch
- ✅ The task is marked as completed in `TASK.md`

## Updating Documentation

When making significant changes:

1. Update relevant documentation in the `docs/` directory
2. Update `SUMMARY.md` with a brief description of your change
3. If adding a new feature, ensure it's documented in `PLANNING.md`

## Release Process

1. Features are developed and merged into `develop`
2. When ready for release, `develop` is merged into `main`
3. A tag is created for the version
4. The `main` branch is deployed to production

## Troubleshooting

If you encounter any issues during development:

1. Check the documentation in the `docs/` directory
2. Look for similar issues in the GitHub issue tracker
3. Ask for help in the project's communication channels 