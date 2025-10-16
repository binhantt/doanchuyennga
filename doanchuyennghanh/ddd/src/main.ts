import express from 'express'; 
import server from './server';
import router from './interface/http';
import {accessLogger} from './infrastructure/logging/AccessLogger';
import dotenv from "dotenv";
import testDatabaseConnection from "../src/infrastructure/db";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
server(app, PORT);
app.use(accessLogger);  
testDatabaseConnection();
app.use("/api",router);


export default app;