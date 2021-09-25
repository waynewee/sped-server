import express, { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../../middleware";
import { User } from "../models/user";

const router = express.Router();

router.get("/", isLoggedIn, async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.session!.userId });

  res.json({ user });
});

router.post(
  "/add-skill-points",
  isLoggedIn,
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
