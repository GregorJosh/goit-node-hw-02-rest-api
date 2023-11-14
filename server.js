import express from "express";
import logger from "morgan";
import cors from "cors";
import passport from "passport";
import ansi from "ansi-colors-es6";
import { serve, setup } from "swagger-ui-express";

import openApiDoc from "./openapi.json" assert { type: "json" };

import { APIRouter } from "./api/index.js";
import { connectToDB } from "./drivers/index.js";
import { authStrategy } from "./auth/index.js";
import { notFound, internalError } from "#controllers/index.js";

const start = async () => {
  const PORT = process.env.PORT || 3000;

  await connectToDB();

  app.listen(PORT, () => {
    console.log(ansi.bold.cyan("Database connection successful"));
    console.log(
      ansi.bold.cyan(`Server running. Use our API on port: ${PORT}.`)
    );
  });
};

const app = express();
const logFormat = app.get("env") === "development" ? "dev" : "tiny";

passport.use(authStrategy);

app.use(logger(logFormat));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", APIRouter);
app.use("/doc", serve, setup(openApiDoc));
app.use(notFound);
app.use(internalError);

start();
