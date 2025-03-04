export class ChatService {
    private socket: WebSocket;

    constructor(private url: string) {}

    connect(): void {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('Connected to the chat server');
        };

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
        };

        this.socket.onclose = () => {
            console.log('Disconnected from the chat server');
        };
    }

    sendMessage(message: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ message }));
        } else {
            console.error('Socket is not open. Unable to send message.');
        }
    }

    private handleMessage(message: any): void {
        // Handle incoming messages
        console.log('Received message:', message);
    }
}