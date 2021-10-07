import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session!.destroy(() => {
      res.sendStatus(200);
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
