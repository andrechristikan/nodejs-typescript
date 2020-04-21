import { Router } from "express";
import loanController from "../controllers/LoanController";

const router = Router();
router.get("/report/outstanding/grasewa", loanController.outstandingGraSewa);

export default router;
