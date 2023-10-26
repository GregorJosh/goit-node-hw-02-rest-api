import express from "express";

import {
  indexContacts,
  getContact,
  createContact,
  updateContact,
  removeContact,
} from "../controllers/contacts/index.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", indexContacts);
contactsRouter.get("/:contactId", getContact);
contactsRouter.post("/", createContact);
contactsRouter.delete("/:contactId", removeContact);
contactsRouter.put("/:contactId", updateContact);
