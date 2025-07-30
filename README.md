# 📝 Cheems Writes — Portfolio + Blog Site

**Cheems Writes** is a personal portfolio and technical blogging platform built using **Next.js**, **Tailwind CSS** Also a **Golang-Gin** powered backend. It is designed to be elegant, fast, and mobile-first, featuring technical blogs, LeetCode solutions, and daily learning logs.

## 🌐 Live Site

👉 [cheems-writes.vercel.app](https://cheems-writes.vercel.app)

## 📸 Features

- ⚡ Fast, mobile-responsive UI built with **Next.js + Tailwind CSS**
- 📰 Supports **Markdown-based** blog rendering
- 👨‍💻 Three distinct sections:
  - **Tech Blogs**
  - **Daily Logs**
  - **LeetCode Solutions**
- ✨ Clean card-based layout with subtle animations (via `shadcn/ui`)
- 🔍 Individual blog pages rendered using **slugs**
- 🧪 Live Markdown preview while writing (Admin-only)

## 📂 Project Structure

```
frontend/
├── components/
├── pages/
├── lib/
├── styles/
└── ...
```

## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS, shadcn/ui
- **Backend:** Golang-Gin, MongoDB
- **Markdown Parser:** `react-markdown`
- **Animations:** Framer Motion
- **Deployment:** Vercel

## 🚀 Getting Started

Although Backend code is present here but at first it was deployed on render's free instance in oregon-west region which was too slow and it was slowing site's performance hence  current API deployment is available on AWS Lambdas at following repo:

👉 [cw-backend](https://github.com/Cheemx/cw-backend)

```bash
git clone https://github.com/Cheemx/cheems-writes.git
cd cheems-writes
npm install
npm run dev
```