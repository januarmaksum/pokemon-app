
![image1asdfasdf](https://github.com/user-attachments/assets/479c8eda-05c4-4a8b-9647-fca593b37e5d)


# Pokémon App

A simple web application built using React, Next.js, and TypeScript that allows users to view a list of Pokémon, see details about each Pokémon, and catch Pokémon to store in their own collection. This project uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data and demonstrates modern web development practices, including a mobile-first design approach and client-side state management with local storage for data persistence.

## Features

- **Pokémon List Page**: Displays a list of Pokémon names and images. Clicking on a Pokémon navigates to its detail page.
- **Pokémon Detail Page**: Shows detailed information about a selected Pokémon, including its picture, moves, stats, and types. Users can attempt to catch the Pokémon with a 50% success rate. Upon catching, the user can give the Pokémon a nickname and add it to their personal collection.
- **My Pokémon List Page**: Displays all the Pokémon the user has caught, including their nicknames. Users can also release a Pokémon from this list. Data persists using `localStorage`, so the list is saved even after a full page reload.
- **Mobile-First Design**: The app is designed to be responsive and provide a great experience on mobile devices.
- **Performance Optimization**: The app is optimized for performance using tools such as Lighthouse and PageSpeed.

## Pages

1. **Pokémon List Page**  
   - Displays Pokémon names and images.
   - Clicking on a Pokémon redirects to the detail page of that Pokémon.

2. **Pokémon Detail Page**  
   - Displays detailed information about a Pokémon, including:
     - Image
     - Moves
     - Types
     - Stats
   - Users can attempt to catch the Pokémon with a 50% chance of success.
   - Upon catching, users can assign a nickname and add it to their collection.

3. **My Pokémon List Page**  
   - Displays all caught Pokémon along with their nicknames.
   - Users can remove/release Pokémon from this list.
   - Pokémon data persists using `localStorage`, so the list is preserved after reloading the page.

## Technical Stack

- **React.js**: For building user interfaces.
- **Next.js**: For server-side rendering and better SEO.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling the UI with a mobile-first approach.
- **Local Storage**: For persisting caught Pokémon data across sessions.
- **PokéAPI**: To fetch data about Pokémon.

## Setup and Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/pokemon-app.git
   ```

2. Navigate to the project folder:
    ```bash
    cd pokemon-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and go to http://localhost:3000 to see the app.

## Deployment
The app is deployed using Vercel. You can access the live version of the app [here](https://pokemon-app-gold-xi.vercel.app/)
