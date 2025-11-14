import express from "express";
import {userRoutes} from "./routers/Users.routers";
import { AdminRouter } from "./routers/Admin.router";
// import { appRoutes } from "./routers/App.router";

const router = express.Router();
router.use("/users", userRoutes);
router.use("/v1/admin", AdminRouter);
// router.use("/app", appRoutes);

export default router;