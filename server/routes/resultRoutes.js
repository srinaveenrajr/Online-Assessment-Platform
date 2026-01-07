const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// Submit exam (already exists)
const { submitExam } = require("../controllers/resultController");
router.post("/submit", submitExam);

// NEW: Get result by exam ID
router.get("/exam/:examId", async (req, res) => {
  try {
    const result = await Result.findOne({ exam: req.params.examId });
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
