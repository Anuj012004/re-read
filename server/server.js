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
const { config } = require('dotenv');
require('dotenv').config({ path: "./config/.env" });
require("./config/passport");
const PORT = process.env.PORT || 2121

// Connect to DB
connectDB();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'https://reread.onrender.com', 
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: 'https://reread.onrender.com',
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
