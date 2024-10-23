# Pokémon Favorites App

This project is a Pokémon Pokedex-like app built with **Vue 3**, **TypeScript**, and **Pinia**. The app allows users to view a list of Pokémon, search for specific Pokémon, add favorites, and view Pokémon details in a modal.

## Features

- **Pokémon List**: Displays a list of available Pokémon.
- **Search Functionality**: Search bar to find specific Pokémon.
- **Favorites**: Mark Pokémon as favorites.
- **Responsive Design**: Mobile and desktop-friendly layout.
- **Pokémon Details Modal**: View detailed information of a selected Pokémon in a modal.

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/GustavoMartinezFS/pokedex
   cd pokedex
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables. A `.env.example` file is included for customization. You must remove the `example` extension

4. Run the development server:

   ```bash
   npm run dev
   ```

5. To build the project for production:

   ```bash
   npm run build
   ```

6. To preview the production build:
   ```bash
   npm run serve
   ```

## Testing

The project includes unit tests powered by **Vitest**:

- To run all tests:

  ```bash
  npm run test:unit
  ```

- You can also view snapshots for visual testing in the `__snapshots__` folder.

## Project Structure

```bash
.
├── src
│   ├── assets               # Static assets (images, CSS)
│   ├── components           # Vue components (atoms, molecules, organisms)
│   │    └── __tests__       # Unit tests for components
│   ├── router               # Vue router configuration
│   ├── services             # API service to fetch Pokémon data
│   ├── stores               # Pinia store for state management
│   ├── views                # Main view components (Welcome, Home)
│   ├── plugins              # Utility plugins (capitalize, etc.)
│   └── main.ts              # Application entry point
├── public                   # Public assets like favicon
├── .env                     # Environment variables
├── vite.config.ts           # Vite configuration file
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies and scripts
```

## Dependencies

- **Vue 3**: Core JavaScript framework.
- **TypeScript**: Type checking for the project.
- **Pinia**: State management library.
- **Vite**: Build tool for frontend development.
- **Vitest**: Testing framework for unit tests.

## Additional Information

- The design includes a **fixed BottomBar** with buttons to navigate and interact with the Pokémon list.
- **Responsive modals** are used to display detailed Pokémon information over a grassy background.
- Key components are reusable, such as the **BtnAtom** for buttons and **LogoAtom** for the app's logo.

## Deploy

[Link to vercel deploy](https://gm-poke.vercel.app/)
