import express, { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../middleware";
import { User } from "../models/user";

const router = express.Router();

router.get(
  "/query",
  async (req: Request, res: Response, next: NextFunction) => {
    const homeroomId = req.query.homeroomId as string;

    try {
      if (!homeroomId) {
        return res.status(500).json({ error: "No query parameters provided" });
      }

      const users = await User.find({ homeroomId });

      res.status(200).json({ users });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ _id: req.session!.userId });

    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/add-skill-points",
  async (req: Request, res: Response, next: NextFunction) => {
    const { subject, skillPoints } = req.body;

    try {
      let user = await User.findOne({ _id: req.session!.userId });

      user!.addSkillPoints({
        subject,
        skillPoints: parseInt(skillPoints),
      });
      await user!.save();
      res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
