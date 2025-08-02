# PORTFOLIO WEBSITE V1

### Video Demo:

### Description:

A personal portfolio built as part of my journey to become a backend engineer and beyond.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)
- [Contact](#contact)

## Overview

This portfolio is self-built web application for showcasing my development. It includes:

- A hero section with a basic introduction, utilizing a typewriter effect.
- An about section that briefly outlines my personal history, goals, and current/future tech skills.
- An interactive timeline showing my learning milestones.
- A projects page with dynamic placeholders that can be replaced with real work when needed.
- A contact form with client-side validation and feedback.
- A continuous animated background canvas.

All interactivity is implemented in JavaScript to reflect skills learned in CS50x. The site is responsive and structured and intended for additions to be easy when implementing my future projects or to improve the website aesthetically to be more professional / bespoke as my skills progress. New timeline events or projects are added through data arrays.

## Features

- **Dynamic Timeline:** Data-based timeline with alternating card placement.
- **Project Templates:** Placeholder project cards rendered from a JavaScript array. Easily configurable with title, status, tech stack, live demo and repository links.
- **Contact Form:** Client-side form validation with live feedback (success/error).
- **Responsive Navigation:** Fixed top navigation with active section highlighting using scrollspy logic that accounts for header height.
- **Readability Design:** Dark theme with optimized typography (line length control, line height, softed colours) for legibility.
- **Animated Background:** Custom canvas particle system that adapts based on whether the hero section is in view (interactive vs static).
- **Designed for Enhancement:** Data arrays drive the content so the site can have ease of use when it comes to adding real work.

## Tech Stack

- **HTML5** - Semantic structure for accessibility.
- **CSS** - Custom styling using grids and flexboxes, responsive breakpoints and transitions.
- **JavaScript** - DOM manipulation, form logic, scrollspy, timeline rendering, particle animation, typewriter effect.
- **No UI Frameworks / No Third-party Form Backend** - Chose to keep things relatively straight forward and foundational for V1 version.

## File Structure

- **index.html** - Main foundation containing hero, about, timeline, projects, contact sections.
- **css/styles.css** - All styling; layout, responsive rules, readability tweaks, form styling, navigation.
- **js/typewriter.js** - Typewriter effect in hero section.
- **js/timeline.js** - Renders and animates the developer timeline.
- **js/projects.js** - Builds the placeholder project cards dynamically.
- **js/contact.js** - Handles contact form validation, feedback animations.
- **js/scrollspy.js** - Highlights active nav link based on scroll position with IntersectionObserver.
- **js/navbar.js** - Navigation-related behaviour.
- **js/canvas.js** - Background particle system with interactive/static modes.
- **assets/icons/** - SVG icons for technologies and GitHub, used in about/contact.
- **README.md** - This documentation.

## Design Decisions

- **Vanilla JavaScript** to keep things at a foundational level, as well as coincide with the skills learned on the course this project was built for (CS50x).

- **IntersectionObserver for scroll-aware UI** for the ability to have more seamless transition. Original design decision was to have separate HTML pages, this solution seemed more elegant as well as lead to other dynamic features (e.g, Nav link highlighting that accounts for fixed header).

- **Responsive layout with CSS Grid / Flexbox** to try to keep things resposive based on viewport so that legibility and aesthetic remain intact when on various screen sizes.

- **Client-side form validation with feedback** just to allow for some responsiveness to the website. Debated making server-side validation as well as a SQL database for the responses. Also looked into third-party options for storing the responses on a google sheet, however decided to keep it relatively simple for V1.

- **Readability focus** leading to making adjustments with text-shadow, line height, subtle lifts, softened off-white text in order to improve legibility and reduce eye strain on a somewhat noisy background.

- **Active navigation highlighting** for a bit more of an elegant solution to having a fixed header at the top of each page. JavaScript logic offsets by navbar height so the "current" section reflects what the user actually sees. Previously the highlighting would be incorrect due to not accounting for the navbar.

- **Progressive content model** for the ability to trivially add or update content with arrays without having to template systems. Original idea was to have projects be somewhat static with their own pages and require lots of copy pasting using a template. This seemed like a much more dynamic and future-proof system.

- **Visual depth via dynamic canvas** to showcase JavaScript skills as well as create some interactivity with a website that is mostly only reading content. Original idea was to have just a static image background but I wanted to make something more intriguing and eye-catching. I also decided to remove the interactivity and replace it with a static version of the particle canvas, keeping the "noise" off to the side away from the main reading content.

- **Configurable const declarations** for ease of editing the canvas.js. Early on in my project I found myself constantly having to edit several lines of code just to change one parameter of the canvas so I decided to create a control section at the top of canvas.js in order to tweak anything quickly as well as adjust based on viewport size.

## Future Improvements

### Priority 1: Finalize Core Features

- **Add a self-hosted backend for contact persistence.** Replace the current client-side form with a lightweight API so messages are stored and retrievable permanently.

- **Replace placeholder projects with real work.** Ship actual projects, include live demos, screenshots, and real repository links to show progression from concept to execution.

- **Build an admin interface for messages.** A secure, authenticated dashboard to view and manage incoming contact form submissions.

### Priority 2: UX and Robustness

- **Refine mobile UX and navigation.** Mobile UX was out of scope for V1. Clean up the UX on mobile to be more legible as well as aesthetically pleasing. Full adaptability for any realistic screen size would be the goal.

- **Spam mitigation on form submissions.** A bit of focus on making the site more secure and showcase awareness in cybersecurity and it's importance.

- **Refine / clean up code to remove redundancies.** Code could be cleaned up to be a bit more organized, making edits and maintenance easier as well as overall navigation. Optimizations to remove repetition is also possible.

### Priority 3: Polish

- **Introduce theme toggling / user preferences.** Extend the dark theme with light or high-contrast modes to accommodate alternative user preferences.

- **Implement analytics.** Add engagement tracking such as for project clicks to see which projects are attracting the most interest.

- **CI/CD pipeline.** Ensure quality and functionality as complexity increases.

- **Improve versioning and changelog.** More descriptive and in-depth changelogs to properly differentiate versions.

- **Notifications.** Add alerts for new messages when someone makes a submission into the system (e.g email alert).

## Contact

Cal M Dev

GitHub: https://github.com/Cal-M-Dev

Email: cal.mc.dev@gmail.com
