import { Router } from "express";
import { UserRoutes } from "../modules/ph-tour/user/user.routes";
import { AuthRoutes } from "../modules/ph-tour/auth/auth.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
