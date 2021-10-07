import express, { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../middleware";
import { HighScore } from "../models/highscore";
import { Score } from "../models/score";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session!.userId;

    const { score, subject, gameId } = req.body;

    const newScore = await Score._new({
      userId,
      value: score,
      subject,
      gameId,
    });

    await newScore.save();

    const highScore = await HighScore._new({
      userId,
      value: score,
      subject,
      gameId,
    });

    if (highScore) {
      await highScore.save();
    }

    res.status(200).json({ score: newScore });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
