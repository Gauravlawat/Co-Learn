const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
});

// Middleware to make 'io' accessible in our routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Core Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log('>>> A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('--- A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.error("!!! DATABASE CONNECTION FAILED !!!", err.message);
        process.exit(1);
    }
};

startServer();