# **App Name**: PackVision Campus

## Core Features:

- Static Page & Component Rendering: Build all specified website sections (Header, Hero, Figures, Programs, Apprenticeship, News, Partners, Footer) as responsive Next.js components and generate them as static HTML pages.
- Navigation & Layout System: Implement the main navigation (desktop) and mobile hamburger menu, along with a consistent page layout system for the content.
- Visual Interaction Elements: Develop interactive elements such as call-to-action buttons, program cards, news cards, and a horizontally scrolling partner logo carousel.
- Dynamic Content Placeholders: Integrate explicit placeholders within the UI components to facilitate future data fetching from Firebase Firestore for sections like 'Programmes,' 'Actualités,' and 'Partenaires.'
- Scroll-Triggered Content Reveal: Implement smooth 'fade-in' animations for various content sections as the user scrolls, using modern web APIs like Intersection Observer.
- AI-powered Content Summary Tool: A generative AI tool designed to automatically create concise summaries or engaging 'extraits' for future dynamic news articles or program descriptions, streamlining content population for administrators.

## Style Guidelines:

- Primary action color: A vibrant orange-red (#E94E1B) [HSL: 13, 86%, 51%]. This energetic hue will draw attention to key calls-to-action and interactive elements, reflecting dynamism and passion.
- Main background color: A clean, soft off-white (#F8F9FA) [HSL: 210, 14%, 98%]. This near-neutral base provides a professional, calming backdrop for content, ensuring readability and clarity.
- Structural highlight color: A deep, authoritative blue (#1A2B4C) [HSL: 217, 52%, 20%]. Used for prominent structural areas like the header and footer, it conveys trust, stability, and professionalism, contrasting effectively with lighter elements.
- Text color: A dark, highly legible grey (#333333) [HSL: 0, 0%, 20%]. This provides excellent contrast against the light backgrounds, ensuring optimal readability for all textual content.
- Headings: 'Poppins' (sans-serif) for its modern, geometric appearance that conveys precision and innovation. Body text: 'Inter' (sans-serif) for its high readability and versatile, objective aesthetic.
- Utilize FontAwesome icons throughout the site, particularly for the 'Chiffres' section, social media links, and navigational cues. Opt for a consistent style (e.g., solid or regular) to maintain a cohesive and professional visual language.
- Implement a responsive, mobile-first design leveraging a modern component-based structure. Employ CSS Grid for multi-column layouts like program cards and news articles, and Flexbox for horizontal arrangements such as key figures and the partner carousel, ensuring fluid adaptation across all device sizes.
- Introduce subtle scroll-triggered 'fade-in' animations for content sections using the Intersection Observer API, providing a polished and engaging user experience. An optional automatic horizontal scroll for the partner logo carousel will add understated dynamism.