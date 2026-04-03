import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function ReviewAnswers() {
  const location = useLocation();
  const navigate = useNavigate();

  const answersReview = location.state?.answersReview || [];
  const category = location.state?.category || "";
  const subcategory = location.state?.subcategory || "";

  if (answersReview.length === 0) {
    return (
      <Layout>
        <div className="app-main-center">
          <div
            className="page-card"
            style={{ maxWidth: "800px", textAlign: "center" }}
          >
            <h1 className="page-title">No Review Data</h1>
            <p className="page-subtitle">
              Please complete a quiz first to review your answers.
            </p>
            <button className="common-btn btn-purple" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-section">
        <h1 className="page-title">Review Answers</h1>
        <p className="page-subtitle">
          {category} → <strong>{subcategory}</strong>
        </p>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gap: "20px",
          }}
        >
          {answersReview.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "18px",
                boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
                textAlign: "left",
                borderLeft: item.isCorrect
                  ? "8px solid #16a34a"
                  : "8px solid #dc2626",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  marginBottom: "14px",
                  color: "#111827",
                }}
              >
                Q{index + 1}. {item.question}
              </h2>

              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "8px",
                  color: "#374151",
                }}
              >
                <strong>Your Answer:</strong>{" "}
                <span style={{ color: item.isCorrect ? "#16a34a" : "#dc2626" }}>
                  {item.selectedAnswer}
                </span>
              </p>

              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "8px",
                  color: "#374151",
                }}
              >
                <strong>Correct Answer:</strong>{" "}
                <span style={{ color: "#16a34a" }}>{item.correctAnswer}</span>
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: item.isCorrect ? "#16a34a" : "#dc2626",
                }}
              >
                {item.isCorrect ? "Correct ✅" : "Wrong ❌"}
              </p>
            </div>
          ))}
        </div>

        <div className="button-group">
          <button className="common-btn btn-purple" onClick={() => navigate("/")}>
            Back Home
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ReviewAnswers;