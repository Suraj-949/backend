import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://localhost:5173/ws';

let stompClient = null;

export const connect = (onMessageReceived) => {
    stompClient = new Client({
        webSocketFactory: () => new SockJS(SOCKET_URL),
        onConnect: () => {
            stompClient.subscribe('/topic/messages', (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        }
    });
    stompClient.activate();
};

export const sendMessage = (message) => {
    if (stompClient) {
        stompClient.publish({
            destination: '/app/message',
            body: JSON.stringify(message)
        });
    }
};
