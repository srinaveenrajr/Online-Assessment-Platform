const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        selectedAnswer: String,
      },
    ],
    score: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
