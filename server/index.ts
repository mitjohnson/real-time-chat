import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import database from "./lib/database/index.ts";
import Models from "./lib/models/index.ts";
import chatHandlers from './lib/sockets/index.ts';


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const db = database();
const models = Models(db);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  chatHandlers(socket, io, models);
});
   

server.listen(3000, () => console.log("Server is running on port 3000"));
