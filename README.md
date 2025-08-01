# TrashQuest

TrashQuest is an environmentally-focused app that encourages trash cleanup with gatcha-style mechanics. By doing this, it rewards real-world action with digital collectibles. Unlike many gatcha-style games, the "capsules" cannot be obtained through money or video game mechanics, but instead only through real-life trash cleanup.

## Table of Contents

- [Features](#features)
- [Tech Stack](#-tech-stack)
- [Local Development](#-local-development)
- [Pages](#pages)
- [Component Structure](#component-structure)
- [Navigation Components](#navigation-components)
- [Routes](#routes)
- [Layout System](#layout-system)
- [Firebase Integration](#-firebase-integration)
- [Firebase Setup - Coming Soon](#️-firebase-setup-coming-soon)
- [Authentication Flow](#authentication-flow)
- [Shared Styles](#shared-styles)
- [Future Considerations](#future-considerations)
- [Notes](#notes)

---

## Features

- **User Authentication via Firebase**

  - Tracks login/logout state in real time
  - Enables dynamic routing and personalized content

- **Dynamic Header Navigation**

  - Displays "Sign In" or "Log Out" based on user session
  - Logo link redirects to `/dashboard` when logged in, `/` otherwise

- **Logout Confirmation Dialog**

  - Prevents accidental sign-outs with a Yes/No popup
  - Reusable component for future confirmation needs

- **Centralized Layout Wrapper**

  - Shared `PageLayout` component wraps all routes
  - Simplifies structure and ensures consistent header/footer across pages

- **Personalized Dashboard Greeting**
  - Displays user's name or email on dashboard
  - Enhances user experience with a welcoming touch

## 🚀 Tech Stack

- **React**: Component-based UI
- **Vite**: Lightning-fast dev server and bundler
- **Firebase**: Auth, Firestore, and Storage
- **Modular Architecture**: Built for scalability and reuse

## 🔧 Local Development

### Install dependencies

<!-- bash
npm install */} -->

## Pages

- `WelcomePage.jsx`: Public-facing entry screen for TrashQuest
- `DashboardPage.jsx`: (Coming soon) Post-login user dashboard with personalized content
- `LoginPage.jsx`: Public-facing login screen for users.
- `HowItWorksPage.jsx`: Public-facing overview of how TrashQuest works
- `ResourcesPage.jsx`: Collection of learning materials and eco-education links
- `TermsPage.jsx`: Legal terms of service and usage guidelines
- `PrivacyPage.jsx`: Details on TrashQuest’s data handling and user privacy policies
- `AboutPage.jsx`: Background story and mission behind TrashQuest
- `ContactPage.jsx`: User-facing contact form and support information

## Component Structure

Components are organized by domain for scalability:

- `eco/`: EcoPoints, EcoItems, EcoCapsuleModal
- `submission/`: Form for submitting trash entries
- `layout/`: Header, Footer, EmptyState
- `navigation/`: Reusable buttons for UI flow
- `shared/`: Generic utilities like Loader and ErrorMessage

## Navigation Components

Components (buttons, links, etc) for user Navigation

- `TrashQuest Header Logo` (in-progress): Navigates users from any page back to either `WelcomePage.jsx` or `DashboardPage.jsx`, depending on if they are logged in or not.
- `StartQuestButton.jsx`: Navigates users from the WelcomePage to the LoginPage using React Router's `useNavigate()`.
- Navigation layout styles (used in `Header.jsx` and `Footer.jsx`) are centralized in `styles/layout.js` under **navContainer**. This enforces consistent flex behavior, spacing, and alignment across navigation components.

## Routes

- `/` — WelcomePage (public landing page)
- `/login` — LoginPage (access dashboard features)
- `/signup` — SignupPage (new user registration)
- `/dashboard` — DashboardPage (requires authentication) [coming soon]
- `/how-it-works` — HowItWorksPage (educational overview for new users)
- `/resources` — ResourcesPage (eco-learning hub)
- `/terms` — TermsPage (user agreement and service terms)
- `/privacy` — PrivacyPage (explains data collection and usage)
- `/about` — AboutPage (TrashQuest mission and team info)
- `/contact` — ContactPage (reach out to support or leave feedback)

## Layout System

TrashQuest uses a reusable `PageLayout.jsx` to ensure consistent structure and styling across pages.

<!--
<PageLayout>
  {/* Page-specific content goes here */}
</PageLayout>
-->

To ensure consistent vertical sizing and prevent browser scrollbars on sparse pages:

- All pages are wrapped in `PageLayout.jsx` with `height: 100vh`.
- Chrome applies default margin to `<body>`, which triggers overflow.
- This is resolved in `main.jsx` using:

<!-- document.body.style.margin = '0'; -->

## 🔥 Firebase Integration

This project uses Firebase to support authentication and backend services. The configuration is handled in [`src/firebase.js`](src/firebase.js), which:

- Initializes Firebase with a restricted API key scoped to `localhost:5173`
- Enables only essential services: Authentication, Identity Toolkit, and Token Service
- Is designed strictly for development use—no production credentials are stored or exposed

## ⚙️ Firebase Setup (Coming Soon)

Further integration with Firebase is planned, including Auth flows and backend services.

Setup instructions and contributor guidelines will be added once the implementation is finalized.

## Authentication Flow

TrashQuest uses separate pages for login and signup:

- Users start on `WelcomePage` with a call-to-action button.
- `StartQuestButton.jsx` navigates to `/login`.
- From `LoginPage`, users can navigate to `/signup` if they don’t have an account.
- From `SignupPage`, returning users can navigate back to `/login`.

This structure ensures clear, intuitive onboarding with room for future logic integration.

## Shared Styles

All layout-related styles are extracted into `styles/layout.js` for reuse across components.

### Shared constants

- `layoutPageStyleWrapper`: wraps overall page structure (used in `PageLayout.jsx`)
- `layoutMainContainerStyle`: used for central page content alignment (used in `MainContainer.jsx`)
- `navContainer`: navigation layout styling for header components

This approach ensures consistent spacing, sizing, and alignment throughout TrashQuest without relying on external CSS files.

### Shared Form Styling

To maintain consistency and DRY principles across form views:

- **FormGroup.jsx** uses `formGroupWrapper`, `formGroupLabel`, and `inputField` from `forms.js`.
- **FormButton.jsx** provides a centralized component for form submissions like login and account creation.
- Button and input styling are declared in `src/styles/forms.js`, making it easy to apply consistent theming across form pages.

This structure allows for scalable refinement as visual design evolves—without changing page-level layout logic.

### Shared Button Styling

- `FormButton.jsx` handles form submission buttons with centralized styling via `formButtonStyle` in `forms.js`.
- Consistent padding, margin, and colors ensure visual harmony across pages like `SignupPage`, `LoginPage`, and future profile actions.
- Styling abstraction allows for easy modification and theming as TrashQuest evolves.

## Future Considerations

- Create `LEARNING.md` to log architectural decisions and debugging insights
- Add `check-env.ps1` to confirm project folder before launching dev server
- Explore button variant support in `FormButton.jsx` (primary, secondary)
- Consider hover styling for form buttons in `formButtonStyle`
- Add optional accessibility labels to `FormGroup` components
- Add a **variant style prop** to formButton with styling variants like "primary" and "secondary" using a conditional style switch.
- Explore refactoring FormGroup to integrate semantic input components and shared styles via inputField
- Update header layout using `flex` with logo + nav dev cluster
- Keyboard Navigation for Modals: Consider adding arrow key + Enter navigation support for modal buttons and abstracting into a reusable hook for future components.
- Test other components like FormGroup, Header, or AuthContext
- Add integration tests for the login/signup flow
- Build the actual trash logging form (photo upload, location, trash type)
- Create the gacha/reward system for opening "eco capsules"
- Design the dashboard with user stats and progress
- Improve error handling and validation
- Add "forgot password" styling to make the modal look better
- Add confirmation dialogs for important actions
- User profile page with stats and settings
- Simple leaderboard or progress tracking
- Basic trash collection history/log
- Add more comprehensive error boundaries
- Create a proper build/deployment pipeline

## Notes

- Git does not track empty folders. We use `.gitkeep` to retain empty scaffolding folders for `utils/`, `assets/`, and `styles/`.
- To keep a semantic structure and clean JSX returns, we are using <>...</> (React Fragments).
- Project now uses `.editorconfig` and VS Code `settings.json` to enforce 2-space indentation across all files.
- Terminal scripts and PowerShell commands are tailored for Windows development consistency.
- Signup form now uses a shared `FormGroup` component for consistent styling and layout
- Prettier is now configured in .prettierrc at the project root. Developers using VS Code should install the Prettier extension and enable "editor.formatOnSave" in settings.
- A **Firebase API key** was previously exposed in commit history. It has been secured, restricted, and scrubbed from Git. History was rewritten on July 14, 2025, to remove the key. All current configurations are safe.
