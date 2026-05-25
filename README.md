# Fluency Sprint

Fluency Sprint is a modern English language learning platform designed to help learners achieve fluency through immersive practice, real conversations, and advanced learning techniques. The application provides a comprehensive course structure with multiple learning tiers, interactive features, and a premium user experience.

## Overview

Fluency Sprint offers three distinct learning paths tailored to different proficiency levels:

- **English Foundations**: A 6-week program for beginner to intermediate learners (A2/B1 level)
- **Structured Fluency Development**: A 12-week rigorous immersion for intermediate to advanced learners (B2/C1 level)
- **Advanced Fluency Mastery**: A 24-week elite mentoring program for advanced master level learners (C1/C2 level)

The platform emphasizes practical speaking, real-life communication, and modern interactive learning methods to accelerate English fluency development.

## Features

- **Responsive Design**: Fully responsive interface optimized for desktop, tablet, and mobile devices
- **Interactive Course Cards**: Detailed course information with pricing, duration, and feature lists
- **Smooth Animations**: Premium motion effects using Motion (Framer Motion) for enhanced user experience
- **Modal System**: Interactive modals for course exploration and registration
- **Dynamic Navigation**: Sticky glass-morphism navbar with scroll-based active section highlighting
- **Contact Integration**: Contact section with diagnostic booking capabilities
- **Modern UI**: Contemporary dark theme with gradient accents and glass-panel effects
- **Accessibility**: Keyboard navigation support and focus management

## Technology Stack

- **Frontend Framework**: React 19.0.1 with TypeScript 5.8.2
- **Build Tool**: Vite 6.2.3
- **Styling**: Tailwind CSS 4.1.14 with custom brand colors
- **Animations**: Motion 12.23.24 (Framer Motion)
- **Icons**: Lucide React 0.546.0
- **Backend Integration**: Express 4.21.2
- **AI Integration**: Google Gemini AI SDK 1.29.0
- **Environment Management**: dotenv 17.2.3

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager



## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Remove build artifacts

## Project Structure

```
fluency-sprint/
├── public/
│   └── logo.jpg                 # Application logo
├── src/
│   ├── components/
│   │   ├── About.tsx           # About/philosophy section
│   │   ├── Contact.tsx         # Contact and diagnostic booking
│   │   ├── Courses.tsx         # Course cards and pricing
│   │   ├── CTASection.tsx      # Call-to-action section
│   │   ├── ExploreModal.tsx    # Course details modal
│   │   ├── Footer.tsx          # Footer component
│   │   ├── GoogleSheetsInstructions.tsx  # Integration instructions
│   │   ├── Hero.tsx            # Hero section with main CTA
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── RegistrationModal.tsx  # Registration form modal
│   ├── App.tsx                 # Main application component
│   ├── index.css               # Global styles and Tailwind directives
│   ├── main.tsx                # Application entry point
│   └── types.ts                # TypeScript type definitions
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom brand colors defined in the configuration. The primary color palette includes:
- Brand Cyan: #00f2fe
- Brand Purple: #a855f7
- Brand Gold: #e2b13c
- Brand Dark: Various shades for the dark theme

### TypeScript

TypeScript is configured with strict mode enabled for type safety. The project includes type definitions for courses, modal states, and component props.

## Deployment

### Production Build

Build the application for production:
```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Cloud Deployment

The application is designed for deployment on cloud platforms such as Google Cloud Run. Ensure environment variables are properly configured in your deployment environment.

## API Integration

The application integrates with Google Gemini AI for enhanced features. Configure the API key in your environment variables to enable AI functionality.

## Browser Support

The application supports modern browsers including:
- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

## License

This project is private and proprietary. All rights reserved.

## Support

For technical support or inquiries, please refer to the contact section within the application or contact the development team directly.
