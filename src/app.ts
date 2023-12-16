import express from 'express';
import { Request, Response, NextFunction } from "express";

const app = express();

app.set('port', process.env.PORT || 3001);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world!');
})

app.listen(app.get('port'), () => {
  console.log('启动成功...');
})
