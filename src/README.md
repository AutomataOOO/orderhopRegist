# Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
├── components/            # React components
│   ├── ui/               # Reusable UI components (buttons, inputs, etc.)
│   ├── common/           # Shared components used across features
│   └── layout/           # Layout components (header, footer, etc.)
├── hooks/                # Custom React hooks
├── services/             # API services and external integrations
├── types/                # TypeScript type definitions
├── constants/            # Constants and configuration
├── styles/              # Global styles and CSS modules
├── features/            # Feature-specific components and logic
├── utils/               # Utility functions and helpers
└── lib/                 # Core library code (axios, react-query, etc.)
```

## Directory Descriptions

- `app/`: Next.js 13+ App Router pages and layouts
- `components/`: React components organized by scope
  - `ui/`: Basic UI components (buttons, inputs, cards, etc.)
  - `common/`: Shared components used across multiple features
  - `layout/`: Layout components like header, footer, and navigation
- `hooks/`: Custom React hooks for shared logic
- `services/`: API services, external integrations, and data fetching logic
- `types/`: TypeScript type definitions and interfaces
- `constants/`: Application constants, configuration, and enums
- `styles/`: Global styles, CSS modules, and theme configurations
- `features/`: Feature-specific components and business logic
- `utils/`: Helper functions and utilities
- `lib/`: Core library code and configurations 