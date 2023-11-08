import { Router } from "express";

import {
  indexContacts,
  getContact,
  createContact,
  updateContact,
  removeContact,
  updateContactStatus,
  signupUser,
  loginUser,
} from "../controllers/index.js";

import { authMW } from "../auth/index.js";

export const APIRouter = Router();

APIRouter.get("/contacts", authMW, indexContacts);
APIRouter.get("/contacts/:id", authMW, getContact);
APIRouter.post("/contacts", authMW, createContact);
APIRouter.delete("/contacts/:id", authMW, removeContact);
APIRouter.put("/contacts/:id", authMW, updateContact);
APIRouter.patch("/contacts/:id/favorite", authMW, updateContactStatus);
APIRouter.post("/users/signup", signupUser);
APIRouter.post("/users/login", loginUser);
