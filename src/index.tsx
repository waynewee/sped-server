import { NextFunction, Request, Response } from "express";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

const production = process.env.NODE_ENV === "production";

const PORT = 8080;

const app = express();
// app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

let origins = [`http://localhost:3000`, `http://localhost:3001`];

if (production) {
  origins = [];
}

let corsOptions = {
  origin: origins,
  credentials: true,
};

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", function (err: string) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err: string) {
  console.log("Connected to redis successfully");
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "d9q0*&*2nd",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 60 * 24 * 7, // session max age in miliseconds
    },
  })
);

app.use(cors(corsOptions));

require("./routes")(app);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

mongoose.connect(`mongodb://127.0.0.1/sped-games`);
