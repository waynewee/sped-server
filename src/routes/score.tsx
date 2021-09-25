import express, { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../../middleware";
import { Score } from "../models/score";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session!.userId;

      const { score, subject } = req.body;

      const newScore = await Score._new({ userId, value: score, subject });
      await newScore.save();

      res.status(200).json({ score: newScore });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
