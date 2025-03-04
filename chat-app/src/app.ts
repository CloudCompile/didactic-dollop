import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ChatComponent from './components/ChatComponent';
import { ChatService } from './services/ChatService';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const chatService = new ChatService(io);
const chatComponent = new ChatComponent(chatService);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
    res.send(chatComponent.render());
});

// Socket.io connection
io.on('connection', (socket) => {
    chatService.connect(socket);
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat-app', {
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});