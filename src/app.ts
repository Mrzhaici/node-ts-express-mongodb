import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import * as homeController from "./controllers/home";
import path from "path";
import passport from 'passport';
import session from "express-session"
import { SESSION_SECRET } from './utils/secrets';
import MongoStore from 'connect-mongo';
import { User } from './controllers/user';
import lusca from "lusca";
import { Request, Response, NextFunction } from "express";


dotenv.config();

const app = express();
const MONGODB_URI: string = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;

console.log('MONGODB_URI:', MONGODB_URI);

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'none');
app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'html');

app.use(
  express.static(path.join(__dirname, "views"), { maxAge: 31557600000 })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "keyboard cat" || SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: MONGODB_URI,
    dbName: 'nodeBlog',
    mongoOptions: {
    },
  })
}));
app.use(passport.initialize());
app.use(passport.session());
// xframe必须具有相同源。
app.use(lusca.xframe("SAMEORIGIN"));
// 防止旧版 IE 浏览器 (IE8) 中的跨站脚本 (XSS) 攻击
app.use(lusca.xssProtection(true));
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("use_locals:", res.locals, req.user);
  res.locals.user = req.user;
  next();
});

app.get("/", homeController.index);
app.get("/login", User.getLogin);

export default app;
