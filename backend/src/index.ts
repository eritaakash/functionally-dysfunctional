import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import { Server } from 'socket.io';
import http from 'http';

const app = express();
app.use(cors());

const server = new http.Server(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen((process.env.PORT || 3000), () => {
    console.log(`[!]: Backend Started.`);
});