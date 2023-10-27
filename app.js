import express from "express";
import logger from "morgan";
import cors from "cors";
import { config } from "dotenv";

import { contactsRouter } from "./routes/contacts.js";

export const app = express();

config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const env = process.env;

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/contacts", contactsRouter);
app.use((request, response) => {
  response.status(404).json({ message: "Page not found" });
});
app.use((error, request, response, next) => {
  response.status(500).json({ message: error.message });
});
