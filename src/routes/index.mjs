import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/www", function (req, res, next) {
  res.json({ title: "Express" });
});

module.exports = router;
