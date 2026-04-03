import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import bgImage from "../assets/instructions-bg.jpg";

function Instructions() {
  const navigate = useNavigate();
  const location = useLocation();

  const category = location.state?.category || "General Knowledge";
  const categoryId = location.state?.categoryId || null;
  const subcategory = location.state?.subcategory || "World Geography";
  const subcategoryId = location.state?.subcategoryId || null;

  // very important for next subcategory flow
  const subcategories = location.state?.subcategories || [];
  const startIndex = location.state?.startIndex || 0;

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  const timerPerQuestion = 60;

  useEffect(() => {
    const fetchQuestionsCount = async () => {
      if (!subcategoryId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/subcategories/${subcategoryId}/questions/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions count");
        }

        const data = await response.json();
        setTotalQuestions(data.length);
      } catch (error) {
        console.error("Error fetching questions count:", error);
        setTotalQuestions(0);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsCount();
  }, [subcategoryId]);

  const totalMarks = totalQuestions;

  const handleBack = () => {
    navigate("/subcategory", {
      state: {
        category,
        categoryId,
      },
    });
  };

  const handleStartQuiz = () => {
    navigate("/questions", {
      state: {
        category,
        categoryId,
        subcategory,
        subcategoryId,
        subcategories,
        startIndex,
      },
    });
  };

  return (
    <Layout>
      <div
        className="instructions-page"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          padding: "28px 22px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.02) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <div
            className="instructions-card"
            style={{
              width: "100%",
              maxWidth: "620px",
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "28px",
              padding: "26px 24px 24px",
              boxShadow: "0 20px 50px rgba(15,23,42,0.18)",
              border: "1px solid rgba(255,255,255,0.55)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(99,102,241,0.10)",
                border: "1px solid rgba(99,102,241,0.14)",
                marginBottom: "14px",
              }}
            >
              <span style={{ fontSize: "14px" }}>✨</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#4f46e5",
                  letterSpacing: "0.3px",
                }}
              >
                Ready for your quiz?
              </span>
            </div>

            <p
              style={{
                textAlign: "left",
                color: "#64748b",
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {category} → {subcategory}
            </p>

            <h1
              style={{
                textAlign: "left",
                fontSize: "2.7rem",
                fontWeight: "900",
                color: "#0f172a",
                marginBottom: "10px",
                lineHeight: "1.08",
                letterSpacing: "-0.5px",
              }}
            >
              Quiz Instructions
            </h1>

            <p
              style={{
                textAlign: "left",
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "20px",
                lineHeight: "1.7",
                maxWidth: "500px",
              }}
            >
              Please read all instructions carefully before starting the quiz.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "14px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed, #a855f7)",
                  borderRadius: "20px",
                  padding: "18px 18px",
                  color: "#ffffff",
                  boxShadow: "0 12px 26px rgba(124,58,237,0.22)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-18px",
                    right: "-18px",
                    width: "90px",
                    height: "90px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    filter: "blur(10px)",
                  }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    marginBottom: "8px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  ⏱ Timer Rule
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.8",
                    margin: 0,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  Each question has <strong>{timerPerQuestion} seconds</strong>.
                  When time is over, the quiz will automatically move to the next question.
                </p>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)",
                  borderRadius: "20px",
                  padding: "18px 18px",
                  color: "#ffffff",
                  boxShadow: "0 12px 26px rgba(37,99,235,0.22)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-18px",
                    right: "-18px",
                    width: "90px",
                    height: "90px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    filter: "blur(10px)",
                  }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    marginBottom: "8px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  ❓ Number of Questions
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.8",
                    margin: 0,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  This quiz contains{" "}
                  <strong>{loading ? "Loading..." : totalQuestions} questions</strong>{" "}
                  in the selected subcategory.
                </p>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
                  borderRadius: "20px",
                  padding: "18px 18px",
                  color: "#ffffff",
                  boxShadow: "0 12px 26px rgba(34,197,94,0.22)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-18px",
                    right: "-18px",
                    width: "90px",
                    height: "90px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    filter: "blur(10px)",
                  }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    marginBottom: "8px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  ✅ Scoring Rule
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.8",
                    margin: 0,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  Every correct answer gives <strong>1 mark</strong>. Wrong answers do not reduce marks.
                </p>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #ea580c, #d97706)",
                  borderRadius: "20px",
                  padding: "18px 18px",
                  color: "#ffffff",
                  boxShadow: "0 12px 26px rgba(234,88,12,0.22)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-18px",
                    right: "-18px",
                    width: "90px",
                    height: "90px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    filter: "blur(10px)",
                  }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    marginBottom: "8px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  📘 Result Review
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.8",
                    margin: 0,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  After finishing the quiz, you can see correct answers, wrong answers, and explanations.
                </p>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #ec4899, #db2777, #be185d)",
                  borderRadius: "20px",
                  padding: "18px 18px",
                  color: "#ffffff",
                  boxShadow: "0 12px 26px rgba(219,39,119,0.22)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-18px",
                    right: "-18px",
                    width: "90px",
                    height: "90px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    filter: "blur(10px)",
                  }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    marginBottom: "8px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  ➡ Next Subcategory Flow
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.8",
                    margin: 0,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  After one subcategory is completed, a{" "}
                  <strong>Next Subcategory</strong> button will appear. Click it to continue to the next subcategory. Final result will be shown only after all subcategories are completed.
                </p>
              </div>
            </div>

            <div
              style={{
                background: "rgba(248,250,252,0.92)",
                border: "1px solid #e2e8f0",
                borderRadius: "18px",
                padding: "15px 16px",
                marginBottom: "18px",
                boxShadow: "0 6px 16px rgba(15,23,42,0.04)",
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#334155" }}>
                <strong>Category:</strong> {category}
              </p>
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#334155" }}>
                <strong>SubCategory:</strong> {subcategory}
              </p>
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#334155" }}>
                <strong>Total Questions:</strong> {loading ? "Loading..." : totalQuestions}
              </p>
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#334155" }}>
                <strong>Total Marks:</strong> {loading ? "Loading..." : totalMarks}
              </p>
              <p style={{ margin: 0, fontSize: "14px", color: "#334155" }}>
                <strong>Pass Mark:</strong> 50%
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleBack}
                style={{
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#ffffff",
                  cursor: "pointer",
                  background: "linear-gradient(90deg, #7c3aed, #6d28d9)",
                  boxShadow: "0 8px 18px rgba(124,58,237,0.24)",
                }}
              >
                Back
              </button>

              <button
                onClick={handleStartQuiz}
                disabled={!subcategoryId || loading || totalQuestions === 0}
                style={{
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#ffffff",
                  cursor:
                    !subcategoryId || loading || totalQuestions === 0
                      ? "not-allowed"
                      : "pointer",
                  background:
                    !subcategoryId || loading || totalQuestions === 0
                      ? "#94a3b8"
                      : "linear-gradient(90deg, #2563eb, #1d4ed8)",
                  boxShadow:
                    !subcategoryId || loading || totalQuestions === 0
                      ? "none"
                      : "0 8px 18px rgba(37,99,235,0.24)",
                  opacity:
                    !subcategoryId || loading || totalQuestions === 0 ? 0.7 : 1,
                }}
              >
                Start Quiz Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Instructions;