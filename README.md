# TrashQuest
TrashQuest is an environmentally-focused app that encourages trash cleanup with gatcha-style mechanics. By doing this, it rewards real-world action with digital collectibles. Unlike many gatcha-style games, the "capsules" cannot be obtained through money or video game mechanics, but instead only through real-life trash cleanup.

## Pages
- `WelcomePage.jsx`: Public-facing entry screen for TrashQuest
- `LoginPage.jsx`: Public-facing login screen for users.
- `DashboardPage.jsx`: (Coming soon) Post-login user dashboard with personalized content

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

## Routes
- `/` — WelcomePage (public landing page)
- `/login` — LoginPage (access dashboard features)
- `/signup` — SignupPage (new user registration)
- `/dashboard` — DashboardPage (requires authentication) *[coming soon]*

## Layout System

TrashQuest uses a reusable `PageLayout.jsx` to ensure consistent structure and styling across pages.
<!--
<PageLayout>
  {/* Page-specific content goes here */}
</PageLayout>
-->

## Auth Flow
TrashQuest uses separate pages for login and signup:

- Users start on `WelcomePage` with a call-to-action button.
- `StartQuestButton.jsx` navigates to `/login`.
- From `LoginPage`, users can navigate to `/signup` if they don’t have an account.
- From `SignupPage`, returning users can navigate back to `/login`.

This structure ensures clear, intuitive onboarding with room for future logic integration.

## Shared Form Styling
To maintain consistency and DRY principles across form views:

- **FormGroup.jsx** uses `formGroupWrapper`, `formGroupLabel`, and `inputField` from `forms.js`.
- **FormButton.jsx** provides a centralized component for form submissions like login and account creation.
- Button and input styling are declared in `src/styles/forms.js`, making it easy to apply consistent theming across form pages.

This structure allows for scalable refinement as visual design evolves—without changing page-level layout logic.

## Future Considerations
- Create `LEARNING.md` to log architectural decisions and debugging insights
- Add `check-env.ps1` to confirm project folder before launching dev server
- Explore button variant support in `FormButton.jsx` (primary, secondary)
- Consider hover styling for form buttons in `formButtonStyle`
- Add optional accessibility labels to `FormGroup` components

## Notes
- Git does not track empty folders. We use `.gitkeep` to retain empty scaffolding folders for `utils/`, `assets/`, and `styles/`.
- To keep a semantic structure and clean JSX returns, we are using <>...</> (React Fragments).
- Signup form now uses a shared `FormGroup` component for consistent styling and layout



