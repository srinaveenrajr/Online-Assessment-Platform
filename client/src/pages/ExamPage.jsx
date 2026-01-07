import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setAnswers({}); // clear old answers on re-attempt

        const token = localStorage.getItem("token");

        // ✅ IMPORTANT: CALL /start ROUTE
        const res = await axios.get(
          `http://localhost:5000/api/exams/${id}/start`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExam(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load exam");
      }
    };

    fetchExam();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formattedAnswers = Object.keys(answers).map((qId) => ({
        questionId: qId,
        selectedAnswer: answers[qId],
      }));

      const res = await axios.post(
        "http://localhost:5000/api/results/submit",
        {
          examId: id,
          answers: formattedAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/result/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  if (!exam) {
    return <div className="p-8 text-white">Loading exam...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-900 min-h-screen text-white">
        <h2 className="text-3xl font-bold mb-6">{exam.title}</h2>

        <form onSubmit={handleSubmit}>
          {exam.questions.map((q, index) => (
            <div key={q._id} className="mb-6">
              <p className="mb-2 font-semibold">
                {index + 1}. {q.questionText}
              </p>

              <input
                type="text"
                className="w-full p-2 rounded text-black"
                placeholder="Enter your answer"
                onChange={(e) =>
                  setAnswers({ ...answers, [q._id]: e.target.value })
                }
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-green-600 px-6 py-2 rounded font-bold"
          >
            Submit Exam
          </button>
        </form>
      </div>
    </>
  );
}
