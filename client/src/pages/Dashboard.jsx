import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/exams", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExams(res.data);
    };

    fetchExams();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6">Available Exams</h1>

        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-gray-800 p-4 rounded mb-4 flex justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{exam.title}</h2>
              <p>Duration: {exam.duration} mins</p>
            </div>

            <button
              className="bg-blue-600 px-4 py-2 rounded"
              onClick={() => navigate(`/exam/${exam._id}`)}
            >
              Start / Re-attempt
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
