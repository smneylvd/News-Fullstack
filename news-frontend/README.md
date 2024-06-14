# News Frontend React Application

This is a React application for displaying news articles, categories, sources, and comments.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) >= 12.x
- You have installed [NPM](https://www.npmjs.com/) 

## Installation

1. **Open project folder:**

    ```bash
    cd news-frontend
    ```

2. **Install dependencies:**

    Using NPM:

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of your project and add the necessary environment variables. For example:

    ```env
    REACT_APP_ADMIN_API_BASE_URL=http://your-api-url.com/api
    ```

## Running the Application

1. **Start the development server:**

    Using NPM:

    ```bash
    npm start
    ```

    This will start the server at `http://localhost:3000`.

2. **Build for production:**

    Using NPM:

    ```bash
    npm run build
    ```

    This will create a `build` folder with the production build of your application.


3. **Serve the Production Build:**

    To serve the production build locally, you can use a tool like `serve`:

    ```bash
    npm install -g serve
    serve -s build
    ```

    This will serve your application at `http://localhost:5000`.

## Project Structure

- `src/components`: Contains all the React components.
- `src/store`: Contains Redux store, actions, and reducers.
- `src/pages`: Contains different pages of the application.
- `src/utils`: Contains utility functions.
- `src/shared`: Contains shared resources like colors, constants, etc.
