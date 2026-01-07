const express = require("express");
const router = express.Router();

const Exam = require("../models/Exam");
const Result = require("../models/Result");
const { protect } = require("../middleware/authMiddleware");

/**
 * GET ALL EXAMS (for dashboard)
 */
router.get("/", protect, async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * START EXAM (with validation)
 */
router.get("/:id/start", protect, async (req, res) => {
  try {
    const attempted = await Result.findOne({
      user: req.user._id,
      exam: req.params.id,
    });

    if (attempted) {
      return res.status(403).json({
        message: "Exam already attempted",
      });
    }

    const exam = await Exam.findById(req.params.id).populate("questions");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const now = new Date();

    if (exam.startTime && now < exam.startTime) {
      return res.status(403).json({ message: "Exam not started yet" });
    }

    if (exam.endTime && now > exam.endTime) {
      return res.status(403).json({ message: "Exam expired" });
    }

    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
