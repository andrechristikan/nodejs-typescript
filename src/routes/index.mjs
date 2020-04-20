import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("aa");
  res.json({ title: "Express" });
  console.log("bb");
});

export default router;
