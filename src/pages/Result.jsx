import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasSaved = useRef(false);

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const category = location.state?.category || "General Knowledge";
  const subcategory = location.state?.subcategory || "World Geography";
  const subcategoryId = location.state?.subcategoryId || null;
  const reviewAnswers = location.state?.reviewAnswers || [];

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 50;

  useEffect(() => {
    const saveResult = async () => {
      if (hasSaved.current) return;
      hasSaved.current = true;

      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !subcategoryId) {
          console.log("User or subcategoryId not found, result not saved");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/results/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.user_id,
            subcategory: subcategoryId,
            score: score,
            total_questions: total,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Result save failed:", errorData);
        } else {
          console.log("Result saved successfully");
        }
      } catch (error) {
        console.error("Error saving result:", error);
      }
    };

    saveResult();
  }, [score, total, subcategoryId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#eef1f7",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#ffffff",
            borderRadius: "28px",
            boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
            padding: "40px 36px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "48px",
              fontWeight: "800",
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Quiz Result
          </h1>

          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "#6b7280",
              marginBottom: "30px",
            }}
          >
            {category} → {subcategory}
          </p>

          <div
            style={{
              backgroundColor: passed ? "#dcfce7" : "#fee2e2",
              border: `1px solid ${passed ? "#86efac" : "#fca5a5"}`,
              color: passed ? "#166534" : "#b91c1c",
              borderRadius: "18px",
              padding: "24px",
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>
              {passed ? "Passed ✅" : "Failed ❌"}
            </h2>
            <p style={{ fontSize: "22px", margin: "8px 0" }}>
              Score: <strong>{score}</strong> / {total}
            </p>
            <p style={{ fontSize: "20px", margin: "8px 0" }}>
              Percentage: <strong>{percentage}%</strong>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={() =>
                navigate("/questions", {
                  state: {
                    category,
                    subcategory,
                    subcategoryId,
                  },
                })
              }
              style={{
                padding: "14px 22px",
                border: "none",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#ffffff",
                cursor: "pointer",
                background: "linear-gradient(90deg, #7c3aed, #2563eb)",
              }}
            >
              Retry Quiz
            </button>

            <button
              onClick={() => navigate("/leaderboard")}
              style={{
                padding: "14px 22px",
                border: "none",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#ffffff",
                cursor: "pointer",
                background: "linear-gradient(90deg, #059669, #0ea5e9)",
              }}
            >
              Leaderboard
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "14px 22px",
                border: "none",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#ffffff",
                cursor: "pointer",
                background: "linear-gradient(90deg, #f59e0b, #ef4444)",
              }}
            >
              Back to Dashboard
            </button>
          </div>

          {reviewAnswers.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "800",
                  color: "#111827",
                  marginBottom: "20px",
                }}
              >
                Answer Review
              </h2>

              <div style={{ display: "grid", gap: "18px" }}>
                {reviewAnswers.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "18px",
                      padding: "20px",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#111827",
                        marginBottom: "12px",
                      }}
                    >
                      Q{index + 1}. {item.question}
                    </h3>

                    <div style={{ display: "grid", gap: "10px", marginBottom: "14px" }}>
                      {item.options.map((option, optionIndex) => {
                        let bg = "#ffffff";
                        let border = "#d1d5db";
                        let color = "#111827";

                        if (option === item.correctAnswer) {
                          bg = "#dcfce7";
                          border = "#86efac";
                          color = "#166534";
                        }

                        if (option === item.selectedAnswer && option !== item.correctAnswer) {
                          bg = "#fee2e2";
                          border = "#fca5a5";
                          color = "#b91c1c";
                        }

                        return (
                          <div
                            key={optionIndex}
                            style={{
                              padding: "12px 14px",
                              borderRadius: "12px",
                              border: `1px solid ${border}`,
                              backgroundColor: bg,
                              color: color,
                              fontWeight: "600",
                            }}
                          >
                            {option}
                          </div>
                        );
                      })}
                    </div>

                    <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                      <strong>Your Answer:</strong> {item.selectedAnswer}
                    </p>
                    <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                      <strong>Correct Answer:</strong> {item.correctAnswer}
                    </p>
                    <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                      <strong>Explanation:</strong> {item.explanation}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: item.isCorrect ? "#166534" : "#b91c1c",
                      }}
                    >
                      {item.isCorrect ? "Correct ✅" : "Wrong ❌"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Result;