import express from "express";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import ansi from "ansi-colors-es6";

import { APIRouter } from "./api/index.js";

config();

const PORT = process.env.PORT || 3000;

const app = express();
const logFormat = app.get("env") === "development" ? "dev" : "tiny";

const dbHostUrl = process.env.DB_HOST;
const dbConnection = mongoose.connect(dbHostUrl, { useUnifiedTopology: true });

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

dbConnection
  .then(() => {
    app.listen(PORT, () => {
      console.log(ansi.green("Database connection successful"));
      console.log(ansi.green(`Server running. Use our API on port: ${PORT}.`));
    });
  })
  .catch((error) =>
    console.log(ansi.red(`Server not running. Error message: ${error.message}`))
  );
