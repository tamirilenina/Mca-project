import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getStoredUser } from "../utils/auth";

function QuizHistory() {
  const navigate = useNavigate();
  const user = getStoredUser();

  const allHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  const userHistory = user
    ? allHistory.filter((item) => item.userEmail === user.email)
    : [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Layout>
      <div className="history-page-wrapper">
        <div className="history-header-card">
          <h1 className="page-title">Quiz History</h1>
          <p className="page-subtitle">
            {user
              ? `Previous quiz attempts of ${user.name}`
              : "Please login to view quiz history"}
          </p>
        </div>

        {!user ? (
          <div className="history-empty-card">
            <h2>Please login first</h2>
            <button
              className="common-btn btn-purple"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        ) : userHistory.length === 0 ? (
          <div className="history-empty-card">
            <h2>No quiz attempts found</h2>
            <p>You have not completed any quiz yet.</p>
            <button
              className="common-btn btn-blue"
              onClick={() => navigate("/dashboard")}
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div className="history-list">
            {userHistory
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={index} className="history-card">
                  <div className="history-top-row">
                    <div>
                      <h3 className="history-category">{item.category}</h3>
                      <p className="history-subcategory">{item.subcategory}</p>
                    </div>

                    <div
                      className={`history-badge ${
                        Number(item.percentage) >= 50 ? "pass" : "fail"
                      }`}
                    >
                      {item.percentage}%
                    </div>
                  </div>

                  <div className="history-details-grid">
                    <div className="history-detail-box">
                      <span className="history-label">Score</span>
                      <span className="history-value">
                        {item.score} / {item.total}
                      </span>
                    </div>

                    <div className="history-detail-box">
                      <span className="history-label">Status</span>
                      <span
                        className={`history-value ${
                          Number(item.percentage) >= 50
                            ? "history-pass-text"
                            : "history-fail-text"
                        }`}
                      >
                        {Number(item.percentage) >= 50 ? "Passed" : "Failed"}
                      </span>
                    </div>

                    <div className="history-detail-box full-width">
                      <span className="history-label">Attempted On</span>
                      <span className="history-value">
                        {formatDate(item.attemptedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="history-buttons">
                    <button
                      className="common-btn btn-blue"
                      onClick={() =>
                        navigate("/questions", {
                          state: {
                            category: item.category,
                            subcategory: item.subcategory,
                          },
                        })
                      }
                    >
                      Retry This Quiz
                    </button>

                    <button
                      className="common-btn btn-purple"
                      onClick={() =>
                        navigate("/subcategory", {
                          state: { category: item.category },
                        })
                      }
                    >
                      Open Category
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default QuizHistory;