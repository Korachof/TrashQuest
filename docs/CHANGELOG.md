# 📓 TrashQuest – Changelog

## Introduction

This changelog documents key updates to the TrashQuest project. It follows semantic versioning principles where applicable (`MAJOR.MINOR.PATCH`) and tracks changes to functionality, structure, and content.

---

## 📅 Versions
- [0.1.0 – 2025-06-30 - 2025-07-01]
- [0.1.1 - 2025-07-02 - 2025-07-03]

## [0.1.0] – 2025-06-30 - 2025-07-01
### Added
- Initial GitHub repository created
- Added `.gitignore` with Node.js, Firebase, and VS settings
- Created `/docs/` folder to house planning docs
- Added `USER_STORIES.md` with empathy-first personas
- Added `ROADMAP.md` with three-phase dev timeline
- Added `WIREFRAMES.md` for major screen flows
- Started `README.md` with mission statement and project overview
- Logged first GitHub Issues for setup tasks
- Added `Table of Contents` to docs files ROADMAP, USER_STORIES, WIREFRAMES
- Added `Changelog.md` with previous changes and planned changes + Versions ToC


## [0.1.1] – 2025-07-02 - 2025-07-03
### Added
- Created core component scaffolding: `Header`, `Footer`, `SubmissionForm`, `EcoItemCard`, etc.
- Initialized empty folders with `.gitkeep`: `assets/`, `utils/`, `styles/`
- Added Boilerplate code to `Header`, etc.
- Created rendering for a basic landing page using npm
- Added content to `Header.jsx` for a basic page header.
- Added content to `Footer.jsx` for a basic page footer.
- Added `DashBoardPage.jsx` for scaffolding.

### Changed
- Updated `HomePage.jsx` with semantic `<main>` tag and header integration
- Updated `HomePage.jsx` with Footer integration
- Renamed `HomePage.jsx` to `WelcomePage.jsx` to clarify its role as the public splash screen
- Refactored various files to match `WelcomePage.jsx` name change.


## [0.1.2] - 2025-07-04 - 2025-07-05
### Added
- Created `PageLayout.jsx` to abstract and centralize `Header`, `MainContainer`, and `Footer`
- Added new route to `App.jsx`: `/login` renders `LoginPage.jsx`
- Created functional `StartQuestButton.jsx` with navigation to `/login` via `useNavigate`
- Integrated `StartQuestButton` into `WelcomePage.jsx` for interactive flow
- Added fallback navigation from `LoginPage.jsx` back to `WelcomePage` using logo link
- Created LogoStyles const in Header.jsx and created a better visual style for the logo as a link, which involved keeping it eco green (`#28a745`) to match brand identity (For now).

### Changed
- Refactored `WelcomePage.jsx` to use reusable `PageLayout.jsx` for consistent layout scaffolding
- Updated `MainContainer.jsx` usage to follow DRY principles across pages
- Updated `Header.jsx` to link the TrashQuest logo to `/` for intuitive navigation

### Fixed
- Resolved missing `React` imports across pages to prevent JSX render errors


## [0.1.3] - 2025-07-06

### Added
- Created `SignupPage.jsx` with layout via reusable `PageLayout`
- Added `/signup` route to `App.jsx` for public onboarding access
- Linked `LoginPage.jsx` to `/signup` via `<Link>` for new users
- Linked `SignupPage.jsx` back to `/login` for returning users
- Created `FormGroup.jsx` in `components/shared/` to abstract label/input pairs for reuse across forms

### Changed
- Refactored `SignupPage.jsx` to use `FormGroup` for display name, email, and password inputs
- Updated `<form>` styling in `SignupPage` to center all form elements (labels, inputs, and button) relative to the page
- Improved visual hierarchy and spacing for form layout and call-to-action button

### Fixed
- Fixed `App.jsx` showing up as `app.jsx` in Git.
- Fixed staging issues with `App.jsx` not importing correctly due to cache.
- Resolved persistent alignment issue where input fields and button were left-aligned despite centered headings


---

### Planned (Upcoming)
- `DATA_MODELS.md` with Firestore schema plans
- Firebase project setup (`Auth`, `Firestore`, `Storage`)
- `src/` scaffolding with `/components`, `/pages`, etc.
- MVP feature implementation: submission form, EcoPack draw, streak logic

---

> ✏️ Tip: You can use GitHub’s release tagging to link each version later (e.g. via `git tag v0.1.0`)

