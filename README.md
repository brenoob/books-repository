# Book Repository

A simple Vue 3 application that allows users to search for books using the Google Books API, view detailed book information, and manage a list of favorite books. The favorites are stored using `localStorage`, ensuring persistence across sessions.

# Accessing the App Online

You can access the live version of the application at:

#### [books-repository](https://books-repository.vercel.app/)

## Features

- **Search for books**: Users can search for books by title using the Google Books API.
- **Book Details**: View detailed information about each book, including the title, authors, description, and cover image.
- **Favorites**: Users can mark books as favorites, and the list of favorite books is saved using `localStorage`, ensuring persistence.
- **Responsive Design**: The application is fully responsive and provides an optimal experience on both desktop and mobile devices.

### Technologies Used
Vue 3: Frontend framework.
Pinia: State management.
Google Books API: Used to fetch book data.

## Installation

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/brenoob/books-repository.git
```

### 2. Install dependencies
Navigate to the project folder and install the required dependencies using pnpm:

```bash
cd books-repository
pnpm install
```

### 3. Run the development server
Once the dependencies are installed, you can start the development server:

```bash
pnpm dev
```

This will start the application on http://localhost:5173 (or another port, if specified).

you can also choose the port like this
```bash
npx vite --port=4000
```
