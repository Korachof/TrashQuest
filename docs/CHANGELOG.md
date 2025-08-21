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

## [0.1.3] - 2025-07-07

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

## [0.1.4] - 2025-07-08

### Added

- Created `FormButton.jsx` component for reusable submit buttons with shared styling.
- Declared `formButton` styles in `forms.js` for centralized control.
- Added styled button to `SignupPage.jsx` and wired up `handleSubmit`.
- Created `formButtonStyle` in `forms.js` for reusable button styling.
- Updated `FormButton.jsx` to reference `formButtonStyle` for cleaner abstraction.
- Applied `FormButton` component to `SignupPage.jsx` and confirmed correct rendering and submit behavior.

### Changed

- Refactored `FormGroup.jsx` to use abstracted styles:
  - Introduced `formGroupWrapper` and `formGroupLabel` in `forms.js`.
  - Removed inline styling for wrapper and label.
- Updated `inputField` styling in `forms.js` to achieve proper centering and sizing:
  - Switched back to `width: '100%'` with `maxWidth`.
  - Added `marginLeft: 'auto'`, `marginRight: 'auto'` for centering.
    Renamed style constant from `formButton` to `formButtonStyle` to avoid naming conflicts with the component.
- Updated `.editorconfig` and VS Code `settings.json` to enforce 2-space indentation globally.
- Inserted future consideration notes into `README.md`, capturing possible additions like `LEARNING.md` and `check-env.ps1`.

### Fixed

- Resolved persistent input centering and width issues by coordinating `formContainer` and `inputField` layout logic.
- Corrected import path for `inputField` in `FormGroup.jsx` (`../../styles/forms`).
- Fixed syntax error in `forms.js` export statement that caused `ERR_ABORTED 500` crash.
- Resolved React styling error by replacing invalid syntax with properly nested style object (`style={{ ... }}`).
- Clarified `FormButton` usage patterns vs. inline `<button>` calls to prevent prop misassignment.

## [0.1.5] - 2025-07-09 - 2025-07-10

### Added

- `.prettierrc` configuration for standardized code formatting
- Prettier integration with VS Code for auto-format on save
- Shared `navContainer` style for consistent header/footer layout
- Updated header layout using `flex` with logo + nav cluster
- Spacer logic for controlled logo-nav separation
- Routing and component creation for the following pages:
  - **Header-linked pages**:
    - `HowItWorksPage`
    - `ResourcesPage`
    - `LoginPage` - Added new link to existing page in Header
  - **Footer-linked pages**:
    - `TermsPage`
    - `PrivacyPage`
    - `AboutPage`
    - `ContactPage`

### Changed

- Refactored `Header.jsx` and `Footer.jsx` to use `navContainer` style abstraction for nav layout
- Linked newly created pages to appropriate nav sections (Header and Footer)
- Improved vertical alignment using `alignItems: 'center'` in flex containers
- Consolidated reusable styles into `styles/layout.js`
- Enabled consistent navigation link structure and spacing across app
- Clarified Prettier vs. EditorConfig usage in `.editorconfig`
- Tested Prettier auto-formatting and confirmed clean file saves

- Clarified Prettier vs. EditorConfig purpose in `README.md`
- Changed default padding of `MainContainer.jsx` and `PageLayout.jsx` and `Footer.jsx` for some basic default style settings.

### Fixed

- Fixed persistent vertical scrollbar issue caused by default `<body>` margin in Chrome.
  - Added inline margin reset (`document.body.style.margin = '0'`) to `main.jsx` to eliminate unexpected overflow.
  - Verified layout container (`PageLayout`) stays within `100vh` without side effects.

## [0.1.6] - 2025-07-11

### Changed

- Refactored `MainContainer.jsx` layout styles to improve consistency and maintainability.
- Consolidated padding and margin into shorthand syntax for clarity.
- Moved layout styling to `layoutMainContainerStyle` in `styles/layout.js`.
- Ensured alignment with existing layout patterns (`boxSizing: 'border-box'`, centralized maxWidth).

## [0.1.7] – 2025-07-14

### Added

- Created `firebase.js` to initialize Firebase with secure configuration
- Restricted **Firebase API key** to `localhost:5173` using Google Cloud Console
- Enabled only essential Firebase services: Auth, Identity Toolkit, Token Service
- Added app restriction to **Firebase API key** to prevent unauthorized usage
- Documented API key exposure and cleanup in `README.md`
- Reconnected local Git repo to GitHub after history rewrite

### Changed

- Updated Firebase project settings to disable unused APIs (e.g., In-App Messaging, ML Kit, Management API)
- Refined `firebase.js` to use the restricted key and reflect updated service access
- Updated `.gitignore` and project structure to support secure development practices

### Fixed

- Scrubbed exposed **Firebase API key** from Git history using `git filter-repo`
- Removed temporary `replacement.txt` used for Git history rewrite
- Resolved Git remote disconnection caused by history rewrite and restored push access

## [0.1.8] - 2025-07-15

### Added

- Vite build system integrated for improved development speed and production readiness
- `.env.local` created for secure Firebase config handling
- New `vite.config.js` added with React plugin setup

### Changed

- `firebase.js` refactored to pull config from `import.meta.env` variables
- `package.json` updated with Vite-based dev/build/preview scripts
- Security: **Firebase API keys** now stored in `.env.local` and excluded from version control via `.gitignore`

## [0.1.9] — 2025-07-16 - 2025-07-18

### Added

- Firebase `onAuthStateChanged` listener to track user login/logout state
- `currentUser` state in `App.jsx` and passed to relevant components
- Conditional logic in `Header.jsx` to show "Sign In" or "Log Out" based on auth state
- Personalized dashboard greeting using `currentUser.displayName` or email
- `ConfirmLogout` component in `components/shared` for logout confirmation
- Confirmation popup triggered on "Log Out" click with Yes/No options
- Created new `ProfilePage.jsx` displaying current user details (name and email)
- Added route for `/profile` with content personalized via `currentUser`
- Conditionally rendered “Profile” link in `Header.jsx` when user is authenticated
- Introduced `ProtectedRoute` component to guard sensitive routes
- Wrapped `/dashboard` and `/profile` routes in `ProtectedRoute` to prevent access when logged out

### Changed

- Logo link in `Header.jsx` now redirects to `/dashboard` if user is logged in, otherwise to `/`
- Sign in link in `Header.jsx` now changes to a log out button when user is signed in.
- Moved layout responsibility to `App.jsx` using shared `PageLayout` wrapper
- Removed redundant `<PageLayout>` usage from individual page components
- Centralized `popupStyles` in `styles/layout.js` for consistency
- Removed fallback auth check logic from `ProfilePage.jsx` since access is now handled by routing layer
- Updated `Header.jsx` navigation to streamline conditional rendering blocks and maintain styling consistency

### Fixed

- Logout confirmation popup no longer appears after login due to `useEffect` reset on `currentUser` change
- Improved UX by restricting access to sensitive pages and avoiding redundant conditional checks inside components
- Rotated API key credentials in Google Cloud Console to make sure old exposed key isn't still being used.

## [0.2.1] - 2025-07-19

### Added

- Updated `document.title` in all page components to reflect accurate tab titles:
  - `/` → "Welcome | TrashQuest"
  - `/dashboard` → "Dashboard | TrashQuest"
  - `/login` → "Sign In | TrashQuest"
  - `/signup` → "Create Account | TrashQuest"
  - `/how-it-works` → "How It Works | TrashQuest"
  - `/resources` → "Resources | TrashQuest"
  - `/profile` → "Your Profile | TrashQuest"
  - `/terms` → "Terms of Service | TrashQuest"
  - `/privacy` → "Privacy Policy | TrashQuest"
  - `/about` → "About Us | TrashQuest"
  - `/contact` → "Contact Us | TrashQuest"

### Changed

- Improved navigation clarity by setting explicit titles per route for enhanced tab behavior
- Strengthened SEO and accessibility by programmatically defining page context via `document.title`

### Fixed

- Prevented stale or incorrect tab titles from persisting across page navigation

## [0.2.2] - 2025-07-21

### Added

- `useRedirectIfAuthenticated` custom hook to redirect authenticated users from login and signup pages
- `AuthContext` created to provide centralized access to the current authenticated user
- Context provider (`<AuthProvider>`) wrapped around key routes/pages to enable global access to auth state
- Reusable `useEscape()` hook for Escape key behavior in modals
- Escape key functionality to `ConfirmLogout` modal via `useEscape()`
- Future consideration note for arrow key + Enter navigation in modals (README)

### Changed

- `LoginPage.jsx` and `SignupPage.jsx` updated to use `useRedirectIfAuthenticated` for lifecycle-based redirects
- `ProfilePage.jsx`, `Dashboard.jsx`, and other authenticated routes updated to consume `useAuth()` from `AuthContext` for accessing current user data
- `ProtectedRoute` updated to support optional `redirectTo` prop with default fallback to `/login`

### Fixed

- Incorrect import path in `useRedirectIfAuthenticated.js` referencing `AuthContext`; updated to match actual folder structure (`context/`)
- Runtime errors caused by missing or incorrect React imports resolved by standardizing usage across JSX files
- Vite build errors related to casing conflicts and stale cache resolved by renaming files and restarting dev server
- `redirectTo is not defined` error in `ProtectedRoute` by updating parameter destructuring
- Import path bug for `useEscape()` in `ConfirmLogout`

## [0.2.3] - 2025-07-25 - 2025-07-26

### Added

- Configured complete Vitest testing environment with jsdom for React component testing
- Created comprehensive test suite for `ProtectedRoute.jsx` component with 3 test cases:
  - Authenticated users can access protected content
  - Unauthenticated users are redirected (protected content hidden)
  - Loading state displays Loader component correctly
- Added `vite.config.js` with testing configuration and globals setup
- Created `src/test-setup.js` to initialize testing library extensions
- Implemented component mocking for `useAuth` hook and `Loader` component using Vitest
- Added `@vitejs/plugin-react` for JSX processing in tests
- Added `jsdom` for browser environment simulation in Node.js testing
- Implemented comprehensive accessibility improvements across all pages:
  - Added semantic `id` attributes to all page headings (`h1` elements)
  - Enhanced form accessibility with proper label-input connections via `htmlFor` and `id` attributes
  - Added `aria-labelledby` attributes to forms connecting them to their headings
  - Implemented live regions for success/error messages using `role="status"` and `role="alert"` with `aria-live` announcements
  - Added `required` prop support to FormGroup component (defaults to `true`)
- Established testing workflow and component mocking strategies

### Changed

- Updated `package.json` test script from error message to `"vitest"`
- Refactored test code to follow DRY principles by extracting shared `TestChild` component
- Removed redundant imports for Page Layout on all pages. We don't need them anymore.
- Refactored all page components to use React Fragments (`<>`) instead of wrapper `<div>` elements for cleaner DOM structure
- Updated FormGroup component to accept `id` prop for proper label-input association
- Enhanced FormButton component accessibility (already had proper `type="submit"` default)
- Removed redundant PageLayout imports from individual page components (already wrapped in App.jsx)

### Fixed

- Corrected import path discrepancy in `ProtectedRoute.test.jsx` for AuthContext (from `../../` to `../../../`)
- Better screen reader support for form interactions and dynamic content updates
- Cleaner component structure with semantic HTML and reduced DOM nesting
- Enhanced keyboard navigation and form usability

## [0.2.3] - 2025-07-27 - 2025-07-31

### Added

- Loading states to `FormButton` so buttons won't be operable after clicking, and will provide a custom, reusable loading text in the button during the process
- Functionality to the scaffolded `Modal.jsx` file, including closing on Escape press.
- **forgot password** functionality by creating `ForgotPasswordModal.jsx`
- "Forgot Password" link added to `LoginPage`
- Vitest Testing suites for
  - `FormGroup.jsx`
  - `FormButton.jsx`
  - `ConfirmLogout.jsx`
  - `Loader.jsx`
  - `Modal.jsx`
  - `ForgotPasswordModal.jsx`
  - `StartQuestButton.jsx`
  - `MainContainer.test.jsx`
  - `PageLayout.jsx`
- Created `styles/modalStyles.js` file
  - Added reusable modal styles `modalOverlayStyle`, `modalContentStyle`, `modalHeadingStyle`, and `modalTextStyle` for ease of design work in the future

### Changed

- Updated `LoginPage` to add loading state functionality
- Updated `LoginPage` to include Modal functionality
- Updated Forgot Password email sent text for user satisfaction
- Imported and used `modalStyles.js` styles in `Modal`
- Imported and used `modalStyles.js` styles in `ForgotPasswordModal`

### Fixed

- Lots of debugging to get the `Modal` overlay styles to work correctly. Had lots of issues with text overlapping and modal text showing beneath the actual modal layer. Found the issues and fixed.
- Small bug fixes as I tested various suites. Nothing major.

### Issues

- Added an issue to the **Github Repository** and emailed Firebase support due to Forgot Password emails connecting to old API Browser key and not working correctly. Tried to debug and find settings in Firebase and Google Consoles, but at this point I need support to figure out how to update to new API key.

## [0.2.4] - 2025-08-01 - 2025-08-02

### Added

- Vitest testing suites for `Footer.jsx`, `Header.jsx`, and `AuthContext.jsx`

### Changed

- Removed an old firebase.js file that had no content inside of it from original scaffold
- Added a spy call to `ForgotPasswordModal.test.jsx` inside of **Test 6** to avoid the error console log from showing during testing.
- Deleted a redundant `context` folder (from `root`), including deleting an internal `AuthProvider.jsx` file. I checked through imports and files, and found no reference to it. It was likely created during initial scaffolding and then forgotten about as I created more files and made `src/context/AuthContext.jsx`

### Fixed

- Refactored files to use default export directly
- Debugged and fixed testing suite issues for `Header.jsx`
  - Realized that some of the previous issues with mocks had to do with imports not quite matching.

## [0.2.5] - 2025-08-03 - 2025-08-07

### Added

- Created a LogCleanup nav page
- Added the `log-cleanup` route to `App.jsx`
- Created a LogCleanupForm.jsx, still untested until pages are connected
- Added `LogCleanupPage` to the `Header`, making it only visible for authenticated users.
- Added a `ProtectedRoute` wrapper to `log-cleanup`'s navigation, preventing users from navigating to that page if they aren't authenticated. Redirects to `/login`
- Created `PublicOnlyRoute.jsx` file and placed it in `components/shared`. Works similar to `ProtectedRoute.jsx`.

### Changed

- Deleted submissions based scaffolded files that were from an earlier design
- Redesigned the way **log cleanup submissions** will be logged, including removing `UploadPhoto`
- Removed imports for `useRedirectIfAuthenticated` from `SignUpPage` and `LoginPage`
- Removed function calls for **useRedirectIfAuthenticated** from `SignUpPage` and `LoginPage`.
- Imported and wrapped `PublicOnlyRoute` in `App.jsx` for **/signup** and **login**
- Deleted `useRedirectIfAuthenticated` from the **components/hooks**. Ran a script beforehand to make sure I had removed all imports and references beforehand.
- Added a `PublicOnlyRoute` wrapper to the `/` **Welcome Page** route, so it will navigate an authorized user to the dashboard instead.

### Fixed

- A few typos that were causing some route and nav bugs for `log-cleanup`
- Changed **PublicOnlyRoute** function in `PublicOnlyRoute.jsx` to **PublicOnlyRoute**
- Fixed inconsistent re-route handling procedures. Standardized to a route wrapper instead of using a hook. Updated any re-routes needed to follow this logic.

## [0.2.6] - 2025-08-12

### Added

- Created the Firebase firestore database
- Created structure for **users**
- Created sturcture for **cleanupEntries**

### Changed

- Changed firestore security rules from strict to allow users to change access and change their entries in the database, but no one elses'
- Added **Firestore initalization** in my `firebase.js` file.

## [0.2.7] - 2025-08-16 - 2025-08-17

### Added

- Created a `PointsDisplay` reusable component with size props to make it reusable across a variety of display types and components.
- Added code to `LogCleanupButton` to take props for sizing to make it reusable across pages and components.
- Created a `buttonStyles` file that houses reusable styles for buttons across the app. Uses swiches for **size** (small, medium, large) and **color** (font and bg color - primary and secondary) to make it reusable across the app for different styles of buttons.
- Created `CleanupEntriesList.jsx`, an **Eco** component that shows user logged cleanup entries. Reusable so it can be truncated or show the entire list on a dedicated page.
- An index to Firebase for **cleanup entries** that allows for ordering the entries by **desc**
- Created `CleanupEntriesListPage.jsx`, to house the complete entries list from an authorized user. Added the boilerplate code that all of my pages use, including calling `ProtectedRoute`. For now, the logic to connect to the user's entries isn't there just yet. Simple page first.

### Changed

- Added functionality to `LogCleanupForm` to calculate and store user points from logged cleanup entries.
- Changed navigation for `LogCleanupForm` so that it navigates to user Dashboard after a completed entry, and resets the form when a user hits cancel.
- Added a points visual to `DashboardPage` so user can see updated totals.
- Renamed `LogTrashButton` to `LogCleanupButton`
- Refactored `LogCleanupButton` to take in the styles from `buttonStyles` and make it more reusable. Has default parameters for sizing and color (large and primary).
- Changed the `DashboardPage` to take in the `LogCleanupButton` with the changes.
- Refactored `StartQuestButton` component to take in buttonStyles. I did not make this one as reusable, as it doesn't take in default parameters for sizing and color as I think it will only be used in one place.
- Changed a few basic values in `buttonStyling` to match the original values in the original `StartQuestButton`.
- Updated `DashboardPage` to take `CleanupEntries` list. Shows the last 3 entries and a view all button that will navigate to a dedicate entries page.
- Added the route to `App.jsx` for `CleanupEntriesListPage.jsx`.

### Fixed

- Fixed the dropdowns not showing up correctly in `LogCleanupForm`
- Fixed bugs that were causing errors in submitting the `LogCleanupForm`
- Fixed the variable from the alert message in `LogCleanupForm` that is supposed to show EcoPoints. Needed to change from regular single quotes to backticks.
- Fixed a bug that was causing the city and state fields in `LogCleanupForm` to be required even though they weren't explictly set.

## [0.2.8] - 2025-08-19

### Added

- Created a `colors.js` file in styles that allows for reusable colors across the app instead of hardcoded colors. Will make design changes much easier in the future.
- Created a `jsconfig` file that will hopefully create more consistency in how **VS Code** recognizes files and imports them.

### Changed

- Incorporated `CleanupEntriesList` into `CleanupEntriesListPage` to show all entries once user navigates there.
- Updated the `src_structure.txt` file
- Updated `CleanupEntriesListPage` so it only shows the 10 most recent, and then offers a **Show All** button to view the rest.
- Added the button styling component to `CleanupEntriesList` to take on reusable button styling.
- Incorporated `colors.js` into `buttonStyles` so the buttons can draw from those colors directly instead of hardcoding.
- Added a **navButtonTextColor** into `colors.js` and used that in `LoginPage.jsx` so the nav button color is reused.
- Added a **ecoDisplayTextColor** option in colors, to be reused for Eco-text display items.
- Imported `colors` to both `CleanupEntriesList` and `PointsDisplay` and used **ecoDisplayTextColor** for the points gained and displayed.

### Fixed

- Inconsistent file recognition with **VS Code**.

## [0.2.9] - 2025-08-20

### Added

- Created a `DeleteCleanupEntryModal.jsx` file that shows a modal for all users when they click the X button for deleting a logged entry.
- Created a `useCleanupEntries` hook, which is used to fetch and update data for `CleanupEntriesList`
- Added a **isCancel prop** to `FormButton` to allow for differences in cancel button styling.
- Added delete logic to `CleanupEntriesList` to allow for deletion of logged entries.
- Added logic to `CleanupEntriesList` to take on the `DeleteCleanupEntryModal`.
- Added **deleteEntry** to the hook call in `CleanupEntriesList` and changed **onDeleteSuccess** to **onConfirm**
- Added logic so `CleanupEntriesList` navigates back to dashboard after a deleted entry is confirmed.
- Added **useLocation** to `PointsDisplay` and use **location.key** when fetching user points to properly reload the information on the page, so that `PointsDisplay` doesn't require a refesh

### Changed

- Passed the **isCancel prop** into `LogCleanupForm` to allow for styling differences in the form.
- Deleted **formButtonStyles** from `styles/forms`, as the new standard will be using `buttonStyles` for all buttons.
- Deleted most of the logic from `jsconfig` to stop **VS Code** from assuming all imports are on the same level as the file using the import
- Moved the useEffect block from `CleanupEntriesList` to `useCleanupEntries` and deleted any leftover imports and constants.
- Added user points fetching to the `useCleanupEntries` hook.
- Updated the return for `usecleanupEntries` to include the user points, and updated `CleanupEntriesList` to match.
- Removed the **handleConfirmDelete** logic in `DeleteCleanupEntryModal` and added the delete logic to `useCleanupEntries`.
- Added an **await to onConfirm** for `CleanupEntriesList`, so it will wait for that process to finish.
- Changed the **onClick** function in `CleanupEntriesList` to use **React Router** instead of **window.location.href** for consistency and efficiency.

### Fixed

- **Cancel button** now has a different color than the Confirm button.
- User points showing as **0** in the `DeleteCleanupEntryModal`.
- User points not updating when a deletion occurs, creating permanent user points discrepencies.
- A bug preventing user points from updating properly via `PointsDisplay` without a refresh

## [0.3.1] - 2025-08-21

### Added

- Added an edit button to each **cleanup entry**
- Added **cleanup entry** handling and fetching logic for editing
- Added **state variables** to `CleanupEntriesList`
- Created a `UpdateCleanupEntryModal.jsx` modal that pops up when a user hits the edit button on any entry. Uses `LogCleanupForm` directly.
- Added the `UpdatecleanupEntryModal` reference to `CleanupEntries`
- Added logic to **HandleSubmit** in `LogCleanupForm` so the alert changes depending if they are creating or updating.
- Added a refresh for **onUpdate** so it properly refreshes the current page/state with user points.
- Added state management to handle edited entries and to properly refresh data on the screen.
- Created a `PointsContext.jsx` file that grabs and updates the user points in one dedicated place.
- Wrapped my **App** with **PointsProvider** from `PointsContext`

### Changed

- Modified `LogCleanupForm` to accept and handle existing entries, instead of just new ones. Includes new props for cancelling, editing, and existing entries.
- Edited the form button in `LogCleanupForm` with a tenary operator so it uses onCancel in edit mode, and handleCancel when it just wants a refresh.
- Removed the points fetch logic and so on from `PointsDisplay` and used `PointsDisplay` directly.
- Removed the fetching logic for user points from `useCleanupEntries` and used **usePoints** directly from `PointsContext` for both deleting and updating.
- Cleaned up `DashboardPage` by removing stale, unused imports and state variables.
- Deleted `EcoPointsDisplay`, since it was from my old scaffold and is redundant with `PointsDisplay`.

### Fixed

- Fixed an issue where the `UpdateCleanupEntryModal` wasn't closing properly on cancel, and was instead just clearing the form.
- Fixed an issue where `PointsDisplay` was refreshing much later/required a refresh than the edited entries were refreshing.

---

### Planned (Upcoming)

- `DATA_MODELS.md` with Firestore schema plans
- Firebase project setup (`Auth`, `Firestore`, `Storage`)
- `src/` scaffolding with `/components`, `/pages`, etc.
- MVP feature implementation: submission form, EcoPack draw, streak logic
- Use GitHub’s release tagging to link each version later (e.g. via `git tag v0.1.0`)
