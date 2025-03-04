import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ChatComponent from './components/ChatComponent';
import ChatService from './services/ChatService';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const chatService = new ChatService(io);
const chatComponent = new ChatComponent(chatService);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(chatComponent.render());
});

io.on('connection', (socket) => {
    chatService.connect(socket);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});