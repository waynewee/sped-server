import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, userType } = req.body;

  try {
    const user = await User._new({
      username,
      password,
      userType,
    });

    await user.save();

    req.session!.userId = user._id.toString();

    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
