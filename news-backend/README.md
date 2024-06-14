# News Backend Laravel Application

This is a Laravel application for managing news articles, categories, sources, and comments.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [PHP](https://www.php.net/) >= 7.3
- You have installed [Composer](https://getcomposer.org/)
- You have installed [Node.js](https://nodejs.org/)
- You have installed [NPM](https://www.npmjs.com/)
- You have a database (MySQL, PostgreSQL, SQLite, etc.) set up

## Installation

1. **Get into project folder:**

    ```bash
    cd news_backend
    ```

2. **Install PHP dependencies:**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

    Modify the `.env` file to match your environment. Set the database credentials and any other necessary environment variables.

5. **Generate application key:**

    ```bash
    php artisan key:generate
    ```

6. **Run database migrations and seeders:**

    ```bash
    php artisan migrate --seed
    ```

## Running the Application

1. **Start the development server:**

    ```bash
    php artisan serve
    ```

    This will start the server at `http://localhost:8000`.

## API Endpoints

Here are some of the API endpoints available:

- **Get all news articles:**
  ```bash
  GET /api/news
- **Get a single news article:**
  ```bash
  GET /api/news{id}
- **Post a comment on a news article:**
  ```bash
  POST /api/news/{id}/comment
- **Get all categories:**
  ```bash
  GET /api/categories
- **Get all sources:**
  ```bash
  GET /api/sources
