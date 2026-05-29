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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  
  next();
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

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  chatHandlers(socket, io, models);
});

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set");
server.listen(3000, () => console.log("Server is running on port 3000"));
