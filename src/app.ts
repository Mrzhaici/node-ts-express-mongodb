import express from 'express';
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import * as homeController from "./controllers/home";
import path from "path";
import passport from 'passport';
import session from "express-session"
import { SESSION_SECRET } from './utils/secrets';
import MongoStore from 'connect-mongo';

dotenv.config();

const app = express();

console.log('process.env.PORT:', process.env.PORT);

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'none');
app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'html');

app.use(
  express.static(path.join(__dirname, "views"), { maxAge: 31557600000 })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    MONGODB_URI,
    mongoOptions: {
        autoReconnect: true
    }
})
}))

app.get("/", homeController.index);
app.get("/login", (req, res, next) => {
  console.log('get1');
});

export default app;
