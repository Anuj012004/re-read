const express = require('express');
const http = require('http'); 
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config({ path: "./config/.env" });
const { config } = require('dotenv');

require("./config/passport");
const PORT = process.env.PORT
const FRONTEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://reread.onrender.com'
  : 'http://localhost:5173';

// Connect to DB
connectDB();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin:FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// --- Socket.IO logic ---
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io available in routes
app.set('io', io);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO ready`);
});
