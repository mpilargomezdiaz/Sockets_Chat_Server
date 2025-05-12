import express, { urlencoded } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import mysql from 'mysql2/promise';

const port = process.env.PORT ?? 3001;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', async (socket) => {
    console.log('A user has connected!');

    socket.on('disconnect', () => {
        console.log('A user has disconnected!');
    });

    socket.on('chat message', async (message) => {
       
    
        io.emit('chat message', message);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});