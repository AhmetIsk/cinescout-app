# CineScout Movie Database Application

CineScout is a modern web application built with React, TypeScript, and Redux that provides a comprehensive movie and TV series database experience. The application allows users to search for movies and TV shows, view detailed information, and explore TV series episodes.

## Features

- **Movie and TV Series Search**: Search for movies and TV shows with real-time filtering
- **Advanced Filtering**: Filter results by type (movie/series) and year
- **Detailed Information**: View comprehensive details about movies and TV shows including ratings, cast, and plot
- **TV Series Episodes**: Browse seasons and episodes for TV series
- **Responsive Design**: Full responsive layout that works on mobile, tablet, and desktop
- **Theme Switching**: Toggle between light and dark themes

## Technology Stack

- **Frontend**: React, TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **UI Components**: Material-UI (MUI)
- **API Calls**: Axios
- **Build Tools**: Create React App with CRACO for customization

## Getting Started

### Prerequisites

- Node.js (version >= 18)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/invent-movie-app.git
   cd invent-movie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your OMDB API key:
   ```
   REACT_APP_OMDB_API_URL=https://www.omdbapi.com
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
  ├── components/           # Reusable UI components
  │   ├── Filters/          # Filtering components
  │   ├── Header/           # Application header
  │   ├── MoviesTable/      # Movie listing table
  │   ├── Pagination/       # Pagination controls
  │   ├── SearchBar/        # Search functionality
  │   ├── SeasonAccordion/  # TV series season/episode viewer
  │   ├── Skeleton/         # Loading placeholders
  │   └── ThemeToggle/      # Theme switching component
  ├── pages/                # Page components
  │   ├── MovieListPage.tsx # Main search results page
  │   ├── MovieDetailPage.tsx  # Movie/series details page
  │   └── EpisodeDetailPage.tsx # TV episode details page
  ├── redux/                # Redux state management
  │   ├── store.ts          # Redux store configuration
  │   ├── moviesSlice.ts    # Movie list state
  │   ├── movieDetailSlice.ts # Movie detail state
  │   ├── episodeDetailSlice.ts # Episode detail state
  │   └── themeSlice.ts     # Theme state
  ├── utils/                # Utility functions
  │   ├── api/              # API-related utilities
  │   ├── formatting/       # Data formatting helpers
  │   └── ui/               # UI-related utilities
  ├── App.tsx               # Main application component
  └── index.tsx             # Application entry point
```

## Best Practices

### Code Organization

1. **Component Structure**:
   - Each component should have its own directory with the main component file and an index.ts export
   - Keep component files focused on a single responsibility
   - Extract complex logic to custom hooks or utilities

2. **Path Aliases**:
   - Use path aliases for cleaner imports (e.g., `@components/Button` instead of `../../components/Button`)
   - Configure paths in both `tsconfig.json` and `craco.config.js`

3. **Naming Conventions**:
   - Use PascalCase for component files and directories
   - Use camelCase for util functions and non-component files
   - Be descriptive with file and function names

### State Management

1. **Redux Best Practices**:
   - Use Redux Toolkit for simplified Redux development
   - Create slice files for each domain area
   - Use thunks for async operations
   - Use selectors to access state in components
   - Keep Redux state normalized

2. **Local vs. Global State**:
   - Use Redux for global application state
   - Use React's useState/useReducer for component-specific state
   - Consider context for intermediate shared state

### TypeScript Usage

1. **Type Definitions**:
   - Define interfaces for all data structures
   - Use TypeScript's utility types when appropriate (Pick, Omit, Partial, etc.)
   - Avoid using `any` type; use `unknown` if type is truly unknown

2. **Type Safety**:
   - Enable strict mode in TypeScript configuration
   - Use proper typing for function parameters and return values
   - Leverage type inference when it makes code cleaner

### UI Development

1. **Responsive Design**:
   - Design mobile-first and scale up
   - Use MUI's responsive helpers (e.g., `useMediaQuery`, responsive props)
   - Test on multiple device sizes

2. **Accessibility**:
   - Include proper ARIA attributes
   - Ensure keyboard navigation works
   - Maintain sufficient color contrast
   - Use semantic HTML elements

3. **Component Composition**:
   - Build complex UIs from simple, reusable components
   - Use composition over inheritance
   - Pass children props when appropriate

### Performance Optimization

1. **Rendering Optimization**:
   - Use React.memo for components that render often but rarely change
   - Implement useMemo and useCallback for expensive calculations or callbacks
   - Use virtualization for long lists (react-window or react-virtualized)

2. **Code Splitting**:
   - Use React.lazy and Suspense for code-splitting
   - Split bundle by route to reduce initial load time

### API Calls

1. **Error Handling**:
   - Implement consistent error handling for all API calls
   - Display user-friendly error messages
   - Log detailed errors for debugging

2. **Loading States**:
   - Show loading indicators during API calls
   - Implement skeleton screens for better user experience
   - Handle edge cases (empty states, errors)

## Folder Structure Conventions

### Components

- Each component should be in its own folder
- Include an index.ts file for clean exports
- For complex components, split into subcomponents

Example:
```
MovieCard/
  ├── MovieCard.tsx      # Main component
  ├── MovieCardSkeleton.tsx  # Loading state
  ├── useMovieCard.ts    # Component-specific hooks
  └── index.ts           # Export file
```

### Redux

- Organize by feature/domain
- Keep related state, actions, and selectors together
- Use slices for most features

### Utils

- Group related utilities in subdirectories
- Maintain clear separation between concerns
- Write unit tests for utility functions

## Commit Guidelines

Follow conventional commits for clear history:

```
feat: add new feature
fix: correct bug
docs: update documentation
style: formatting, missing semi colons, etc.
refactor: code change that neither fixes a bug nor adds a feature
test: adding or refactoring tests
chore: updating build tasks, package manager configs, etc.
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [The Open Movie Database (OMDb API)](https://www.omdbapi.com/)
- UI components from [Material-UI](https://mui.com/)
