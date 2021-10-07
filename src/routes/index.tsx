import express from "express";
const userRouter = require("../routes/user");
const registerRouter = require("../routes/register");
const scoreRouter = require("../routes/score");
const loginRouter = require("../routes/login");
const homeroomRouter = require("../routes/homeroom");
const logoutRouter = require("../routes/logout");

module.exports = function (app: any) {
  app.use(express.json());

  app.use("/user", userRouter);
  app.use("/register", registerRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);
  app.use("/score", scoreRouter);
  app.use("/homeroom", homeroomRouter);
};
