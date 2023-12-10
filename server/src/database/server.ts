import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const main = () => {
dotenv.config();

const app = express();

app.use(cors({
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    origin: "*"
}));

app.use(express.json());



};

main();