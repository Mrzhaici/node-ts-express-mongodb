import { Request, Response, NextFunction } from "express";

export class User {
  constructor() {

  }

  static getLogin(req: Request, res: Response): void {
    if(req.user) {
      return res.redirect('/')
    };
    res.render('account/login', {
      title: "Login",
    })
  }
}