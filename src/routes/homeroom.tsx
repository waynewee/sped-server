import express, { NextFunction, Request, Response } from "express";
import { isTeacher } from "../middleware";
import { Homeroom } from "../models/homeroom";

const router = express.Router();

router.get(
  "/:readableId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { readableId } = req.params;

    try {
      const homeroom = await Homeroom.findOne({ readableId });

      if (!homeroom) {
        return res.status(404).json({ error: "Homeroom not found" });
      }

      res.status(200).json({ homeroom });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const homerooms = await Homeroom.find({ userId: req.session!.userId });
    res.status(200).json({ homerooms });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("CREATING");
    const { name, code, description } = req.body;

    const newHomeroom = await Homeroom._new({
      name,
      code,
      description,
      userId: req.session!.userId,
    });
    await newHomeroom.save();

    res.status(200).json({ homeroom: newHomeroom });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
