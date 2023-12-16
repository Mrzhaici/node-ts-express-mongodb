import express from 'express';
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

const app = express();

console.log('process.env.PORT:', process.env.PORT);

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'node');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('process.env.', process.env.NODE_ENV, process.env.PORT);
  res.send('hello world!');
})

export default app;
