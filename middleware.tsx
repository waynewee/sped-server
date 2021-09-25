import { NextFunction, Request, Response } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session) {
    return res.status(401);
  }

  const userId = req.session.userId;

  if (!userId) {
    return res.status(401);
  }

  next();
};
