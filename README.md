# Cheems Writes — Portfolio and Blog Platform

**Cheems Writes** is a personal portfolio and technical blogging platform developed with **Next.js** and **Tailwind CSS** on the frontend, and a **Golang (Gin)** powered backend. It is designed to be fast, minimalistic, and responsive, featuring dedicated sections for technical blogs, LeetCode solutions, and daily learning logs.

## Live Site

[https://cheems-writes.vercel.app](https://cheems-writes.vercel.app)

## Features

* Mobile-first responsive UI built with **Next.js** and **Tailwind CSS**
* Blog content written and rendered using **Markdown**
* Distinct sections:

  * Technical Blogs
  * Periodic Updates
  * LeetCode Solutions
* Card-based layout with subtle animations and a clean design (via `shadcn/ui`)
* Slug-based individual blog pages for structured navigation
* Admin-only blog creation with live Markdown preview

## Project Structure

```
frontend/
├── components/
├── pages/
├── lib/
├── styles/
└── ...
```

## Tech Stack

* **Frontend:** Next.js, Tailwind CSS, shadcn/ui
* **Backend:** Golang (Gin), MongoDB
* **Markdown Rendering:** react-markdown
* **Animations:** Framer Motion
* **Deployment:** Vercel (Frontend), AWS Lambda (Backend)

## Backend Information

The backend for Cheems Writes is actively maintained in a separate repository:

[https://github.com/Cheemx/cw-backend](https://github.com/Cheemx/cw-backend)

This backend is deployed on **AWS Lambda** for production.

Additionally, this repository contains a **modularized monolithic Gin backend** located in the `backend` directory. While the Lambda backend is used in production for scalability and performance, the modular Gin backend provides a more traditional server-based architecture suitable for local development and reference and is currently unused.

## Getting Started

To run the frontend locally:

```bash
git clone https://github.com/Cheemx/cheems-writes.git
cd cheems-writes/frontend
npm install
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000).

### Conclusion
*If you've read it till this end, consider giving a star!*

*Built with ❤️ using Go, designed for self-learning observability by Cheems!*