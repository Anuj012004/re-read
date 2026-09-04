# ReRead 📚

A full-stack platform for buying and selling used books, built with the MERN stack.

## Overview

ReRead is a marketplace that connects book lovers, allowing them to buy and sell pre-owned books. The platform features user authentication, email notifications, and a responsive interface.

## Tech Stack

### Frontend
- **React** with **TypeScript** - Type-safe component development
- **Tailwind CSS** - Utility-first styling
- **Vite** (recommended) - Fast development and building

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **JavaScript** - Server-side logic
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - ODM for MongoDB

### Authentication
- **Passport.js** with **Local Strategy** - Secure username/password authentication
- Session-based authentication

### Email Services
- **Brevo** (formerly Sendinblue) - Transactional email service
- Integrated due to Nodemailer SMTP limitations on Render's free tier

## Features

- 🔐 User authentication and authorization
- 📖 List books for sale with details and pricing
- 🛒 Browse and purchase used books
- 👤 User profiles and dashboards
- 🔍 Search and filter book listings

## Prerequisites

- Node.js 
- MongoDB
- Brevo API key

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/anuj012004/re-read.git
```

### 2. Install dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=2121
NODE_ENV=development

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Session
SESSION_SECRET=your_session_secret_here

# Brevo (Email Service)
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
BREVO_SENDER_NAME=ReRead

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### 4. Run the application

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The application should now be running:
- Frontend: http://localhost:2121
- Backend: http://localhost:5173

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy

**Note:** Render's free tier blocks Nodemailer's default SMTP. This project uses Brevo's API instead.

### Frontend (Render static site)

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

## Why Brevo Instead of Nodemailer?

Render's free tier restricts SMTP port access, preventing traditional Nodemailer SMTP configurations from working. Brevo provides a reliable API-based email service that bypasses these restrictions while offering:

- Free tier with 300 emails/day
- Reliable delivery
- Email tracking and analytics
- Easy integration

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Built with the MERN stack
- Authentication powered by Passport.js
- Email services by Brevo
- Styled with Tailwind CSS

## Contact

email : anuj01062004@gmail.com

Project Link: https://reread.onrender.com

---
