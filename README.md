# Josias Moukpe - Personal Website

Personal website and portfolio for Josias Moukpe, Senior AI/ML Research Scientist.

**Live Site:** [jomoukpe.github.io](https://jomoukpe.github.io)

## Overview

This is a modern, responsive academic personal website built with vanilla HTML, CSS, and JavaScript. The site showcases research interests, publications, projects, professional experience, and provides an interactive timeline of career milestones.

## Features

### Core Features
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Light/Dark Mode Toggle** - User-selectable theme with persistent preference storage
- **Smooth Animations** - Subtle transitions and hover effects throughout
- **Accessibility** - Semantic HTML, ARIA labels, and keyboard navigation support

### Interactive Elements
- **Vertical Scroll Navigation** - Fixed sidebar with progress bar, section markers, and quick navigation buttons
- **Horizontal Timeline** - Scrollable career timeline with date markers and hover effects
- **Collapsible Research Interests** - Expandable descriptions for each research area
- **Literature Database** - Curated collection of research paper summaries across multiple domains

### Content Sections
1. **Bio** - Professional summary with links to affiliations (NASA, NVIDIA Inception, Algorithmic Research Group)
2. **Research Interests** - SICC, AI Agents, Open-Ended Optimization, Recursive Self-Improvement, Humanoid Robots, Autonomous Vehicles, Additive Manufacturing
3. **Open to Opportunities** - Call-to-action for collaboration and employment
4. **Recent Updates** - Interactive timeline of career milestones
5. **Selected Works** - Publications, products, and projects with color-coded categories
6. **Miscellanea** - Awards, technical highlights, talks, and resources
7. **Origins** - Interactive map showing Lomé, Togo

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)** - Vanilla JS for all interactions
- **Fonts:**
  - [Space Mono](https://fonts.google.com/specimen/Space+Mono) - Primary monospace font
  - [Fira Code](https://fonts.google.com/specimen/Fira+Code) - Code and UI elements
  - [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) - Body text
- **Icons:**
  - [Font Awesome](https://fontawesome.com/) - General icons
  - [Academicons](https://jpswalsh.github.io/academicons/) - Academic/research icons

## Project Structure

```
jomoukpe.github.io/
├── index.html              # Main landing page
├── css/
│   ├── academic.css        # Main stylesheet
│   ├── base.css           # Legacy styles
│   ├── main.css           # Legacy styles
│   └── vendor.css         # Third-party styles
├── js/
│   ├── academic.js        # Main interactive features
│   └── main.js            # Legacy scripts
├── assets/
│   ├── favicon.jpeg       # Site favicon
│   ├── pp.jpeg           # Profile photo
│   └── resume_cv.pdf     # Downloadable resume
├── literature/
│   ├── index.html         # Literature hub
│   ├── representation/    # Representation learning papers
│   ├── pertinentml/       # Pertinent ML papers
│   ├── mypapers/          # Published works
│   ├── imbalanced_classification/
│   ├── imbalanced_regression/
│   └── sepforecasting/    # SEP forecasting papers
└── images/                # Project and research images

```

## Key Interactions

### Scroll Navigation
- Fixed vertical progress bar with clickable section markers
- Smooth scroll to section on marker click
- Auto-disable top/bottom buttons at scroll limits

### Timeline
- Native horizontal scrolling with custom navigation buttons
- Mouse wheel support (vertical scroll → horizontal movement)
- Touch/swipe friendly on mobile
- Hover effects on timeline items (scale text + tick)

### Theme Toggle
- Persistent preference saved to `localStorage`
- Smooth transitions between light and dark modes
- Respects system preference on first visit

## Color Scheme

### Light Mode
- Primary Accent: `#2563eb` (Blue)
- Hover: `#1d4ed8` (Darker Blue)
- Publications: `#4285f4` (Blue)
- Products: `#ea8c00` (Orange)
- Projects: `#34a853` (Green)

### Dark Mode
- Primary Accent: `#58a6ff` (Light Blue)
- Hover: `#79b8ff` (Lighter Blue)
- Background: `#0d1117`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Development

No build process required. Simply open `index.html` in a browser or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# VS Code Live Server extension
```

## Deployment

Hosted on GitHub Pages. Automatic deployment on push to `main` branch.

## Credits

- Design inspired by academic personal websites and modern portfolio layouts
- Icons from Font Awesome and Academicons
- Fonts from Google Fonts
- Map integration via OpenStreetMap

## License

All rights reserved. Content and design © 2025 Josias Moukpe.

## Contact

- **Email:** josiasmoukpe@gmail.com
- **Google Scholar:** [Profile](https://scholar.google.com/citations?user=W1DOvzUAAAAJ)
- **GitHub:** [@ERUD1T3](https://github.com/ERUD1T3)
- **LinkedIn:** [Josias Moukpe](https://www.linkedin.com/in/josias-moukpe/)
- **X/Twitter:** [@josiasmoukpe](https://twitter.com/josiasmoukpe)

---

**Last Updated:** December 2024
