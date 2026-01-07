const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
} = require("../controllers/questionController");

router.post("/", createQuestion);
router.get("/", getAllQuestions);

module.exports = router;
