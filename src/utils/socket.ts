import { Socket, io } from 'socket.io-client';

// Define the type for the socket URL
const SOCKET_URL: string = 'http://192.168.10.202:9090'; // Replace with your server URL

// Define a type for the socket instance
let socket: Socket | null = null;

// Initialize the socket connection
export const initiateSocket = (): void => {
  if (socket) {
    console.log('Socket is already initialized');
    return;
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket'], // or ['polling', 'websocket'] depending on your server configuration
  });

  socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
  });
};

// Disconnect the socket connection
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null; // Reset the socket instance after disconnection
    console.log('Socket is disconnected');
  } else {
    console.log('No socket to disconnect');
  }
};

// Get the current socket instance
export const getSocket = (): Socket | null => socket;
