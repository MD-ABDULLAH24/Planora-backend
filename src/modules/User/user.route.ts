import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.utils";

const router = express.Router();

// ================= CREATE USER (ADMIN ONLY) =================
router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);

// ================= GET ALL USERS (ADMIN ONLY) =================
router.get("/", auth(USER_ROLE.ADMIN), UserController.getAllUsers);

// ================= GET SINGLE USER =================
// admin → any user
// user/driver → own data (later logic handle  controller/service )
router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserController.findUserById,
);

// ================= UPDATE USER (ADMIN ONLY) =================
router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById,
);

// ================= DELETE USER (ADMIN ONLY) =================
router.delete("/:id", auth(USER_ROLE.ADMIN), UserController.deleteUserById);

export const UserRoutes = router;
