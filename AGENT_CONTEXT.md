# Agent Context

## Project Overview

- Vite + React project for a personal portfolio.
- Tailwind CSS is configured and used for styling.
- Entry point uses React StrictMode.

## Key Files

- index.html: Root HTML with favicon and root mount.
- src/main.jsx: Mounts App in StrictMode.
- src/App.jsx: Renders the Portfolio screen.
- src/Portfolio.jsx: Main portfolio page layout and UI sections.
- src/index.css: Tailwind base/components/utilities and global font families.
- src/App.css: Present but empty.
- src/components/MainButton.jsx: Reusable button component with Tailwind classes.
- src/components/PulseIcon.jsx: Small animated dot used in availability badge.

## Dependencies

- React 19, React DOM 19.
- @hugeicons/react and @hugeicons/core-free-icons for icon components.
- Tailwind CSS, PostCSS, Autoprefixer.
- ESLint setup via eslint.config.js.

## Styling Notes

- Tailwind is the primary styling mechanism.
- Google Fonts imported in src/index.css:
  - Plus Jakarta Sans (body)
  - Mrs Saint Delafield (saint-font class)
- Some custom classes exist in markup (nav-icon, carousel, intro-section, etc.), but no custom CSS definitions are present in App.css.

## Portfolio.jsx Structure

- Floating desktop nav bar with icon items and a call-to-action button.
- Mobile menu with toggled panel (isOpen state).
- Intro section with profile placeholder, headline, and availability badge.
- Carousel section with placeholder cards.
- About section with placeholder text.
- Picture cards section with layered cards using absolute positioning.
- Horizontal rule divider at bottom.

## Data In-Component

- navItems array defined in Portfolio.jsx with icon + label.
- carouselItems array defined in Portfolio.jsx with placeholder data.

## Observations

- Repeated markup patterns for nav items and carousel cards.
- No routing or page separation; all content is in a single component.
- App.css is empty; all styling is Tailwind or inline classes.
- Some icon labels use == comparison instead of ===.
