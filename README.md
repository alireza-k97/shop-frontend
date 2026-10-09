# Shop Frontend

A responsive e-commerce frontend built with Next.js and TypeScript, with product browsing, category pages, authentication, and an admin dashboard.

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Fetch API
* TanStack Query
* Zod

## Features

* Product listing and product detail pages
* Product categories
* Sign-in and sign-up pages
* Dashboard pages for products, categories, brands, and media
* Create and edit pages for dashboard resources
* API integration with a backend service
* Proxy-based request handling and access control
* Production build and static page optimization

## Project Structure

```text
app/
├── category/
├── dashboard/
├── product/
├── products/
├── sign-in/
└── sign-up/

components/
lib/
schemas/
services/
types/
public/
proxy.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by your backend integration.

Do not commit `.env.local` or publish credentials, tokens, or other secrets.

### 3. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Create a production build

```bash
npm run build
```

## Backend

This frontend is designed to communicate with a separate Express.js and MongoDB backend. Configure the appropriate API URL and environment variables for your local setup.

## Project Status

The project is under development. Some features may require further integration and testing.

## Author

**Alireza Karami**

* GitHub: [alireza-k97](https://github.com/alireza-k97)
