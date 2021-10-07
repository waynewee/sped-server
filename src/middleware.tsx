import { NextFunction, Request, Response } from "express";
import { User } from "./models/user";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session) {
    res.sendStatus(401);
  }

  const userId = req.session!.userId;

  if (!userId) {
    res.sendStatus(401);
  }

  next();
};

export const isTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.userId) {
    res.sendStatus(401);
  }

  const user = await User.findById({ _id: req.session!.userId });
  if (!user || user.userType === "student") {
    res.sendStatus(401);
  }

  next();
};
