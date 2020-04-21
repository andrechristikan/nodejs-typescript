import { Router } from "express";
import dashboard from "./dashboard";
import loan from "./loan";

const router = Router();

router.use("/", dashboard);
router.use("/loan", loan);

export default router;
