import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";

// ✅ ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCreateQuestion from "./pages/admin/AdminCreateQuestion";
import AdminCreateQuestionBank from "./pages/admin/AdminCreateQuestionBank";
import AdminCreateExam from "./pages/admin/AdminCreateExam";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminProctorLogs from "./pages/admin/AdminProctorLogs";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam/:id" element={<ExamPage />} />
        <Route path="/result/:id" element={<ResultPage />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/question" element={<AdminCreateQuestion />} />
        <Route
          path="/admin/question-bank"
          element={<AdminCreateQuestionBank />}
        />
        <Route path="/admin/exam" element={<AdminCreateExam />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/proctor-logs" element={<AdminProctorLogs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
