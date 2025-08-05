import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../../middlewares/validateRequest";

const router = Router();

router.get("/all-users", UserControllers.getAllUsers);
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
