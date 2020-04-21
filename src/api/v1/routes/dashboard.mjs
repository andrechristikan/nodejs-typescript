import { Router } from "express";
import controller from "../controllers/DashboardController";

const router = Router();
router.get("/", controller.index);

export default router;
