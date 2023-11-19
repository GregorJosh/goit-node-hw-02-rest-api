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
  logoutUser,
  currentUser,
  updateUser,
  updateUserAvatar,
} from "#controllers/index.js";

import { authMW } from "#auth/index.js";
import { uploadMW } from "#config/storage.js";

export const APIRouter = Router();

APIRouter.get("/contacts", authMW, indexContacts);
APIRouter.get("/contacts/:id", authMW, getContact);
APIRouter.post("/contacts", authMW, createContact);
APIRouter.delete("/contacts/:id", authMW, removeContact);
APIRouter.put("/contacts/:id", authMW, updateContact);
APIRouter.patch("/contacts/:id/favorite", authMW, updateContactStatus);
APIRouter.post("/users/signup", signupUser);
APIRouter.post("/users/login", loginUser);
APIRouter.get("/users/logout", authMW, logoutUser);
APIRouter.get("/users/current", authMW, currentUser);
APIRouter.patch("/users", authMW, updateUser);
APIRouter.patch(
  "/users/avatars",
  authMW, uploadMW.single("avatar"),
  updateUserAvatar
);
