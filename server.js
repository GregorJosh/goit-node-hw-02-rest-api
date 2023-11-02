import express from "express";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import ansi from "./node_modules/ansi-colors-es6/index.js";

import { APIRouter } from "./api/index.js";

const app = express();
const logFormat = app.get("env") === "development" ? "dev" : "tiny";

const start = async () => {
  try {
    const dbHostUrl = process.env.DB_HOST;

    await mongoose.connect(dbHostUrl);
  } catch (error) {
    console.log(
      ansi.red(`Server not running. Error message: ${error.message}`)
    );
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(ansi.green("Database connection successful"));
    console.log(ansi.green(`Server running. Use our API on port: ${PORT}.`));
  });
};

app.use(logger(logFormat));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", APIRouter);
app.use((request, response) => {
  response.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});
app.use((error, request, response, next) => {
  console.log(error.stack);

  response.status(500).json({
    status: "fail",
    code: 500,
    message: error.message,
    data: "Internal Server Error",
  });
});

config();
start();
