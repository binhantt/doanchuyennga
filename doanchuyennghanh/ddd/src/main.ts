import express from 'express'; 
import path from 'path';
import server from './server';
import router from './interface/http';
import {accessLogger} from './infrastructure/logging/AccessLogger';
import dotenv from "dotenv";
import testDatabaseConnection from "../src/infrastructure/db";
import {corsMiddleware} from "../src/infrastructure/http/cors"
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware)

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 3000;
server(app, PORT);
app.use(accessLogger);  
testDatabaseConnection();
app.use("/api",router);


export default app;