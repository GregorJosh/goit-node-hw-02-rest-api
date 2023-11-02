import express from "express";
import logger from "morgan";
import cors from "cors";
import ansi from "ansi-colors-es6";

import { APIRouter } from "./api/index.js";
import { connectToDB } from "./drivers/mongo.js";
import { notFound, internalError } from "./controllers/errors/index.js";

const start = async () => {
  const PORT = process.env.PORT || 3000;

  await connectToDB();

  app.listen(PORT, () => {
    console.log(ansi.green("Database connection successful"));
    console.log(ansi.green(`Server running. Use our API on port: ${PORT}.`));
  });
};

const app = express();
const logFormat = app.get("env") === "development" ? "dev" : "tiny";

app.use(logger(logFormat));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", APIRouter);
app.use(notFound);
app.use(internalError);

start();
