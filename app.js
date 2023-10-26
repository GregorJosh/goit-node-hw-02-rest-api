const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/contacts");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

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

module.exports = app;
