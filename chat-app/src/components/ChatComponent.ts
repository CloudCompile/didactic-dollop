import { Socket } from 'socket.io';

class ChatComponent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
        this.initialize();
        this.messages = [];
        this.user = null;
    }

    private initialize() {
        this.socket.on('message', (msg) => {
            console.log('message: ' + msg);
            this.socket.broadcast.emit('message', msg);
        });
    }

    render() {
        // Code to render the chat interface
        console.log("Rendering chat interface...");
    }

    sendMessage(message) {
        // Code to handle sending messages
        if (this.user) {
            this.messages.push({ user: this.user, text: message });
            console.log(`Message sent: ${message}`);
        } else {
            console.log("User not set. Cannot send message.");
        }
    }

    setUser(user) {
        this.user = user;
    }
}

export default ChatComponent;