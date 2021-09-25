import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.sendStatus(404);
    } else {
      const valid = user.validatePassword(password);

      if (!valid) {
        res.sendStatus(401);
      } else {
        req.session!.userId = user._id.toString();
        res.status(200).json({ user });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
