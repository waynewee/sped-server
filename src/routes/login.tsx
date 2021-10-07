import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user === null) {
      return res.status(404).json({ error: "User does not exist" });
    } else {
      const valid = user.validatePassword(password);

      if (!valid) {
        return res.status(401).json({ error: "Incorrect password!" });
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
