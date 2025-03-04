import { ChatComponent } from '../components/ChatComponent';
import { Server } from 'socket.io';

export class ChatService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.initialize();
  }

  private initialize() {
    this.io.on('connection', (socket) => {
      new ChatComponent(socket);
    });
  }
}