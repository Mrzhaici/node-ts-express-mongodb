import { Request, Response, NextFunction } from "express";

export class User {
  constructor() {

  }

  static getLogin(req: Request, res: Response) {
    if(req.user) {
      return res.redirect('/')
    }
  }
}