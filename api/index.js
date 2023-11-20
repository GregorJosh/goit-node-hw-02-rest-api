import { Router } from "express";

import * as controller from "#controllers/index.js";
import { authMW } from "#auth/index.js";
import { uploadMW } from "#config/storage.js";

export const APIRouter = Router();

APIRouter.get("/contacts", authMW, controller.indexContacts);
APIRouter.get("/contacts/:id", authMW, controller.getContact);
APIRouter.post("/contacts", authMW, controller.createContact);
APIRouter.delete("/contacts/:id", authMW, controller.removeContact);
APIRouter.put("/contacts/:id", authMW, controller.updateContact);
APIRouter.patch(
  "/contacts/:id/favorite",
  authMW,
  controller.updateContactStatus
);

APIRouter.post("/users/signup", controller.signupUser);
APIRouter.post("/users/login", controller.loginUser);
APIRouter.get("/users/logout", authMW, controller.logoutUser);
APIRouter.get("/users/current", authMW, controller.currentUser);
APIRouter.patch("/users", authMW, controller.updateUser);
APIRouter.patch(
  "/users/avatars",
  authMW,
  uploadMW.single("avatar"),
  controller.updateUserAvatar
);
APIRouter.get("/users/verify/:verificationToken", controller.verifyUser);
APIRouter.post("/users/verify", controller.reVerifyUser);
