const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: String,
    duration: Number,
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
