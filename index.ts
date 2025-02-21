import cookieParser from "cookie-parser";
import cors, { CorsOptions } from 'cors';
import express, { Application } from "express";

export const server: Application = express()

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
};

server.use(cookieParser())
server.use(cors(corsOptions))
server.use(express.json())

