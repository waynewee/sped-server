import express, { NextFunction, Request, Response } from "express";
import { Homeroom } from "../models/homeroom";
import { User } from "../models/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, userType, homeroomReadableId } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(303).json({ error: "Username is already taken" });
    }

    let homeroom = null;

    if (userType === "student") {
      homeroom = await Homeroom.findOne({
        readableId: homeroomReadableId,
      });

      if (homeroom === null) {
        return res.status(404).json({ error: "Homeroom not found" });
      }
    }

    const newUser = await User._new({
      username,
      password,
      userType,
      homeroomId: homeroom?._id,
    });

    await newUser.save();

    req.session!.userId = newUser._id.toString();

    res.status(200).json({ user: newUser });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
