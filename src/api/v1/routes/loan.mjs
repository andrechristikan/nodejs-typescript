import { Router } from "express";
import outstandingController from "../controllers/OutstandingController";

const router = Router();

// Loan

// Outstanding Product
router.get("/report/outstanding/grasewa", outstandingController.graSewa);
router.get("/report/outstanding/gradp", outstandingController.graDP);
router.get("/report/outstanding/grakarya", outstandingController.graKarya);
router.get("/report/outstanding/grastrata", outstandingController.graStrata);
// router.post("/report/outstanding/all", outstandingController.outstandingAllWithSendEmail);
router.get("/report/outstanding/all", outstandingController.all);

// Outstanding Uniq Borrower
router.get(
  "/report/outstanding/unique-borrower",
  outstandingController.uniqueBorrower
);
router.get(
  "/report/outstanding/unique-borrower/:month/:year",
  outstandingController.uniqueBorrowerWithMonthAndYear
);

// Province
router.get("/report/outstanding/province", outstandingController.province);
router.get(
  "/report/outstanding/province/:month/:year",
  outstandingController.provinceWithMonthAndYear
);

// Age
router.get("/report/outstanding/age", outstandingController.age);
router.get(
  "/report/outstanding/age/:month/:year",
  outstandingController.ageWithMonthAndYear
);
export default router;
