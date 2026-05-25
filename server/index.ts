import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import database from "./lib/database/index.ts";
import Models from "./lib/models/index.ts";
import Services from "./lib/services/index.ts";

import authRoutes from "./lib/routes/auth.routes.ts";
import chatHandlers from './lib/sockets/index.ts';


const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error: No token provided"));

  try {  
    const user = jwt.verify(token, process.env.JWT_SECRET!)
    socket.data.user = user;
    next();
  } catch {
    next(new Error("Authentication error: Invalid token"));
  }
});

app.use(express.json());

const db = database();
const models = Models(db);
const services = Services(models);

app.use('/api/v1/auth', authRoutes(services.authService));

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
server.listen(3000, () => console.log("Server is running on port 3000"));
