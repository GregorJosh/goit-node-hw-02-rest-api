import { Router } from "express";

import {
  indexContacts,
  getContact,
  createContact,
  updateContact,
  removeContact,
  updateContactStatus,
} from "../controllers/contacts/index.js";

export const APIRouter = Router();

APIRouter.get("/contacts", indexContacts);
APIRouter.get("/contacts/:id", getContact);
APIRouter.post("/contacts", createContact);
APIRouter.delete("/contacts/:id", removeContact);
APIRouter.put("/contacts/:id", updateContact);
APIRouter.patch("/contacts/:id/favorite", updateContactStatus);
