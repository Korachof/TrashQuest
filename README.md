# TrashQuest
TrashQuest is an environmentally-focused app that encourages trash cleanup with gatcha-style mechanics. By doing this, it rewards real-world action with digital collectibles. Unlike many gatcha-style games, the "capsules" cannot be obtained through money or video game mechanics, but instead only through real-life trash cleanup.

## Pages
- `WelcomePage.jsx`: Public-facing entry screen for TrashQuest
- `Dashboard.jsx`: (Coming soon) Post-login user dashboard with personalized content

## Component Structure
Components are organized by domain for scalability:
- `eco/`: EcoPoints, EcoItems, EcoCapsuleModal
- `submission/`: Form for submitting trash entries
- `layout/`: Header, Footer, EmptyState
- `navigation/`: Reusable buttons for UI flow
- `shared/`: Generic utilities like Loader and ErrorMessage

## Notes
- Git does not track empty folders. We use `.gitkeep` to retain empty scaffolding folders for `utils/`, `assets/`, and `styles/`.
- To keep a semantic structure and clean JSX returns, we are using <>...</> (React Fragments).


