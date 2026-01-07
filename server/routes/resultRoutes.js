const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const Result = require("../models/Result");
const Exam = require("../models/Exam");

// SUBMIT EXAM (create or update result)
router.post("/submit", protect, async (req, res) => {
  try {
    const { examId, answers } = req.body;

    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    let score = 0;

    exam.questions.forEach((q) => {
      const userAnswer = answers.find(
        (a) => a.questionId.toString() === q._id.toString()
      );

      if (userAnswer && userAnswer.selectedAnswer === q.correctAnswer) {
        score += 1;
      }
    });

    // Find existing result for this user & exam
    let result = await Result.findOne({
      user: req.user._id,
      exam: examId,
    });

    if (result) {
      // Update result (re-attempt)
      result.answers = answers;
      result.score = score;
      await result.save();
    } else {
      // Create new result
      result = await Result.create({
        user: req.user._id,
        exam: examId,
        answers,
        score,
      });
    }

    res.json({
      message: "Exam submitted successfully",
      score,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET RESULT BY EXAM (for logged-in user)
router.get("/exam/:examId", protect, async (req, res) => {
  try {
    const result = await Result.findOne({
      user: req.user._id,
      exam: req.params.examId,
    });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
