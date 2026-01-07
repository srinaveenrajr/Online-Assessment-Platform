const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);

app.use("/api/auth", authRoutes);

const examRoutes = require("./routes/examRoutes");
app.use("/api/exams", examRoutes);

const resultRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
