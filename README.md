## BHA Learning platform

This is a [Next.js](https://nextjs.org) project to build a fullstack learning web app.

## Getting Started

to run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## suggested project structure 
it is a suggested structure that can be modified as the requirements updates

learning-platform-app/
├── app/                      # Next.js App Router (or pages/ for Pages Router)
│   ├── api/                # API Routes (backend logic - Next.js serverless functions)
│   │   ├── courses/
│   │   ├── users/
│   │   ├── ...
│   ├── auth/               # Authentication related code (Keycloak integration)
│   │   ├── components/     # Auth-related UI components (login form, etc.)
│   │   └── utils/          # Auth utility functions
│   ├── student/            # Student Interface Feature Area
│   │   ├── courses/        # Student Course Browsing/Enrollment
│   │   │   ├── components/
│   │   │   └── page.tsx
│   │   ├── dashboard/      # Student Dashboard
│   │   │   ├── components/
│   │   │   └── page.tsx
│   │   └── layout.tsx      # Student interface layout
│   │   └── page.tsx        # Student root page (if needed)
│   ├── instructor/         # Instructor Interface Feature Area (similar structure to student)
│   │   ├── courses/        # Instructor Course Management
│   │   ├── dashboard/      # Instructor Dashboard
│   │   └── layout.tsx
│   │   └── page.tsx
│   ├── admin/              # Admin Interface Feature Area (similar structure to student/instructor)
│   │   ├── users/          # User Management
│   │   ├── courses/        # Course Management
│   │   ├── categories/     # Category Management
│   │   └── layout.tsx
│   │   └── page.tsx
│   ├── components/         # Reusable UI Components (global components)
│   │   ├── ui/             # General UI elements (buttons, inputs, cards, etc.)
│   │   ├── layouts/        # Common layouts (e.g., dashboard layout)
│   │   ├── navigation/     # Navigation components (header, sidebar)
│   │   └── ...
│   ├── context/            # React Context Providers (if using Context API for state)
│   ├── hooks/              # Custom React Hooks
│   ├── lib/                # Utility functions, API client, database helpers
│   │   ├── api-client.ts   # Functions to interact with backend API routes
│   │   ├── db.ts           # MongoDB connection and helpers
│   │   └── utils.ts        # General utility functions
│   ├── models/             # Data Models/Schemas (TypeScript interfaces/types)
│   ├── styles/             # Tailwind CSS configuration, global styles
│   │   ├── globals.css
│   │   └── tailwind.config.js
│   ├── public/             # Static assets (images, fonts)
│   ├── layout.tsx          # Root layout for the entire app
│   ├── page.tsx            # Homepage
│   └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

