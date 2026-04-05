import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef(null);

  const score = location.state?.score || 0;
  const total = location.state?.total || location.state?.totalQuestions || 0;
  const category = location.state?.category || "General Knowledge";
  const subcategory = location.state?.subcategory || "World Geography";
  const subcategoryId = location.state?.subcategoryId || null;
  const reviewAnswers = location.state?.reviewAnswers || [];

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const username = user?.username || "Student";

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 50;
  const wrongAnswers = total - score;

  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = 297;
      const pdfHeight = 210;

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, "JPEG", x, y, finalWidth, finalHeight);
      pdf.save(`${username}_certificate.pdf`);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Certificate download failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at top, rgba(124,58,237,0.18), transparent 28%), linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)",
      }}
    >
      <style>
        {`
          @keyframes badgeGlow {
            0% {
              box-shadow: 0 0 10px rgba(250,204,21,0.35), 0 0 20px rgba(245,158,11,0.18);
              transform: translateY(0px) scale(1);
            }
            50% {
              box-shadow: 0 0 22px rgba(250,204,21,0.55), 0 0 38px rgba(245,158,11,0.28);
              transform: translateY(-2px) scale(1.02);
            }
            100% {
              box-shadow: 0 0 10px rgba(250,204,21,0.35), 0 0 20px rgba(245,158,11,0.18);
              transform: translateY(0px) scale(1);
            }
          }

          @keyframes shineMove {
            0% { left: -40%; }
            100% { left: 120%; }
          }

          .shine-pass-badge {
            position: relative;
            overflow: hidden;
            animation: badgeGlow 1.8s ease-in-out infinite;
          }

          .shine-pass-badge::before {
            content: "";
            position: absolute;
            top: -20%;
            left: -40%;
            width: 28%;
            height: 150%;
            background: linear-gradient(
              120deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.18) 40%,
              rgba(255,255,255,0.80) 50%,
              rgba(255,255,255,0.18) 60%,
              rgba(255,255,255,0) 100%
            );
            transform: rotate(20deg);
            animation: shineMove 2.5s linear infinite;
            pointer-events: none;
          }

          .certificate-shine {
            position: relative;
            overflow: hidden;
          }

          .certificate-shine::after {
            content: "";
            position: absolute;
            top: -30%;
            left: -45%;
            width: 26%;
            height: 170%;
            background: linear-gradient(
              120deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.18) 45%,
              rgba(255,255,255,0.75) 50%,
              rgba(255,255,255,0.18) 55%,
              rgba(255,255,255,0) 100%
            );
            transform: rotate(18deg);
            animation: shineMove 3.2s linear infinite;
            pointer-events: none;
          }
        `}
      </style>

      <Header />

      <main
        style={{
          flex: 1,
          padding: "36px 16px 50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1180px",
            display: "grid",
            gap: "24px",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "30px",
              padding: "30px 26px",
              boxShadow: "0 18px 45px rgba(0,0,0,0.28)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.9fr",
                gap: "22px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    marginBottom: "18px",
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "14px",
                    letterSpacing: "1px",
                  }}
                >
                  <span>📘</span>
                  <span>QUIZ PERFORMANCE</span>
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: "48px",
                    lineHeight: "1.1",
                    fontWeight: "900",
                    color: "#ffffff",
                  }}
                >
                  {passed ? "Excellent Work!" : "Keep Practicing!"}
                </h1>

                <p
                  style={{
                    marginTop: "14px",
                    marginBottom: "18px",
                    color: "rgba(255,255,255,0.82)",
                    fontSize: "18px",
                    fontWeight: "500",
                    lineHeight: "1.7",
                    maxWidth: "700px",
                  }}
                >
                  {category} → {subcategory}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 20px",
                      borderRadius: "999px",
                      background: passed
                        ? "linear-gradient(90deg, #16a34a, #22c55e)"
                        : "linear-gradient(90deg, #dc2626, #ef4444)",
                      color: "#ffffff",
                      fontSize: "17px",
                      fontWeight: "800",
                      boxShadow: "0 10px 22px rgba(0,0,0,0.20)",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>
                      {passed ? "✅" : "❌"}
                    </span>
                    <span>{passed ? "PASSED" : "FAILED"}</span>
                  </div>

                  {passed && (
                    <div
                      className="shine-pass-badge"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 20px",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(90deg, #facc15, #f59e0b, #facc15)",
                        color: "#ffffff",
                        fontSize: "17px",
                        fontWeight: "900",
                        border: "2px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      <span style={{ fontSize: "22px" }}>🏆</span>
                      <span>Congratulations! You Passed</span>
                      <span style={{ fontSize: "22px" }}>🎉</span>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "28px",
                  padding: "26px 22px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    background: passed
                      ? `conic-gradient(#22c55e 0% ${percentage}%, #334155 ${percentage}% 100%)`
                      : `conic-gradient(#ef4444 0% ${percentage}%, #334155 ${percentage}% 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
                  }}
                >
                  <div
                    style={{
                      width: "102px",
                      height: "102px",
                      borderRadius: "50%",
                      background: "#0f172a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontSize: "28px",
                      fontWeight: "900",
                    }}
                  >
                    {percentage}%
                  </div>
                </div>

                <div
                  style={{
                    color: "#e2e8f0",
                    fontSize: "15px",
                    fontWeight: "700",
                    letterSpacing: "0.8px",
                  }}
                >
                  FINAL PERCENTAGE
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.20), rgba(37,99,235,0.10))",
                border: "1px solid rgba(96,165,250,0.22)",
                borderRadius: "24px",
                padding: "24px",
                color: "#ffffff",
                boxShadow: "0 12px 30px rgba(0,0,0,0.20)",
              }}
            >
              <div style={{ fontSize: "15px", color: "#bfdbfe", fontWeight: "800" }}>
                SCORE
              </div>
              <div style={{ fontSize: "42px", fontWeight: "900", marginTop: "8px" }}>
                {score}
              </div>
              <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.78)" }}>
                Correct answers
              </div>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.20), rgba(22,163,74,0.10))",
                border: "1px solid rgba(74,222,128,0.22)",
                borderRadius: "24px",
                padding: "24px",
                color: "#ffffff",
                boxShadow: "0 12px 30px rgba(0,0,0,0.20)",
              }}
            >
              <div style={{ fontSize: "15px", color: "#bbf7d0", fontWeight: "800" }}>
                TOTAL QUESTIONS
              </div>
              <div style={{ fontSize: "42px", fontWeight: "900", marginTop: "8px" }}>
                {total}
              </div>
              <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.78)" }}>
                Attempted quiz count
              </div>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(239,68,68,0.20), rgba(220,38,38,0.10))",
                border: "1px solid rgba(252,165,165,0.22)",
                borderRadius: "24px",
                padding: "24px",
                color: "#ffffff",
                boxShadow: "0 12px 30px rgba(0,0,0,0.20)",
              }}
            >
              <div style={{ fontSize: "15px", color: "#fecaca", fontWeight: "800" }}>
                WRONG ANSWERS
              </div>
              <div style={{ fontSize: "42px", fontWeight: "900", marginTop: "8px" }}>
                {wrongAnswers}
              </div>
              <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.78)" }}>
                Need more practice
              </div>
            </div>
          </div>

          {passed && (
            <>
              <div
                ref={certificateRef}
                className="certificate-shine"
                style={{
                  background:
                    "linear-gradient(135deg, #fffdf3 0%, #fff7d6 35%, #fffdf3 100%)",
                  border: "8px solid #f59e0b",
                  borderRadius: "30px",
                  padding: "34px 28px",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.24)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "18px",
                    left: "20px",
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "rgba(245,158,11,0.10)",
                  }}
                ></div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "18px",
                    right: "20px",
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    background: "rgba(124,58,237,0.08)",
                  }}
                ></div>

                <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: "62px", marginBottom: "8px" }}>🏆</div>

                  <div
                    style={{
                      fontSize: "42px",
                      fontWeight: "900",
                      color: "#7c2d12",
                      marginBottom: "12px",
                    }}
                  >
                    Congratulations Certificate
                  </div>

                  <div
                    style={{
                      fontSize: "20px",
                      color: "#57534e",
                      fontWeight: "600",
                      marginBottom: "20px",
                    }}
                  >
                    This certificate is proudly presented to
                  </div>

                  <div
                    style={{
                      fontSize: "40px",
                      color: "#6d28d9",
                      fontWeight: "900",
                      marginBottom: "22px",
                    }}
                  >
                    {username}
                  </div>

                  <div
                    style={{
                      fontSize: "22px",
                      color: "#3f3f46",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    for successfully passing the quiz in
                  </div>

                  <div
                    style={{
                      fontSize: "30px",
                      color: "#b45309",
                      fontWeight: "900",
                      marginBottom: "18px",
                    }}
                  >
                    {category}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                      marginTop: "18px",
                      marginBottom: "28px",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(245,158,11,0.10)",
                        border: "1px solid rgba(245,158,11,0.24)",
                        borderRadius: "16px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "14px", color: "#92400e", fontWeight: "800" }}>
                        NAME
                      </div>
                      <div style={{ fontSize: "20px", color: "#7c2d12", fontWeight: "900", marginTop: "6px" }}>
                        {username}
                      </div>
                    </div>

                    <div
                      style={{
                        background: "rgba(124,58,237,0.08)",
                        border: "1px solid rgba(124,58,237,0.18)",
                        borderRadius: "16px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "14px", color: "#6d28d9", fontWeight: "800" }}>
                        CATEGORY
                      </div>
                      <div style={{ fontSize: "20px", color: "#4c1d95", fontWeight: "900", marginTop: "6px" }}>
                        {category}
                      </div>
                    </div>

                    <div
                      style={{
                        background: "rgba(34,197,94,0.10)",
                        border: "1px solid rgba(34,197,94,0.18)",
                        borderRadius: "16px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "14px", color: "#166534", fontWeight: "800" }}>
                        SCORE
                      </div>
                      <div style={{ fontSize: "20px", color: "#166534", fontWeight: "900", marginTop: "6px" }}>
                        {score} / {total}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      color: "#44403c",
                      fontWeight: "700",
                      marginBottom: "10px",
                    }}
                  >
                    Subcategory: {subcategory}
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      color: "#44403c",
                      fontWeight: "700",
                      marginBottom: "30px",
                    }}
                  >
                    Date: {new Date().toLocaleDateString()}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      gap: "20px",
                      marginTop: "26px",
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div
                        style={{
                          width: "200px",
                          borderTop: "2px solid #444",
                          marginBottom: "8px",
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#44403c",
                        }}
                      >
                        Authorized Signature
                      </div>
                    </div>

                    <div style={{ fontSize: "52px" }}>⭐</div>

                    <div style={{ flex: 1, textAlign: "right" }}>
                      <div
                        style={{
                          width: "200px",
                          borderTop: "2px solid #444",
                          marginBottom: "8px",
                          marginLeft: "auto",
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#44403c",
                        }}
                      >
                        Verified Achievement
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "-6px",
                }}
              >
                <button
                  onClick={handleDownloadCertificate}
                  style={{
                    padding: "14px 24px",
                    border: "none",
                    borderRadius: "14px",
                    fontSize: "17px",
                    fontWeight: "800",
                    color: "#ffffff",
                    cursor: "pointer",
                    background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                    boxShadow: "0 10px 24px rgba(239,68,68,0.22)",
                  }}
                >
                  Download Certificate PDF
                </button>
              </div>
            </>
          )}

          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "28px",
              padding: "26px",
              boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "800",
                marginBottom: "14px",
              }}
            >
              Performance Overview
            </div>

            <div
              style={{
                width: "100%",
                height: "18px",
                background: "rgba(255,255,255,0.12)",
                borderRadius: "999px",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  borderRadius: "999px",
                  background: passed
                    ? "linear-gradient(90deg, #22c55e, #84cc16)"
                    : "linear-gradient(90deg, #ef4444, #f97316)",
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "15px",
                fontWeight: "700",
                marginBottom: "24px",
              }}
            >
              You scored {percentage}% in this quiz.
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                justifyContent: "center",
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
                  padding: "14px 24px",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "17px",
                  fontWeight: "800",
                  color: "#ffffff",
                  cursor: "pointer",
                  background: "linear-gradient(90deg, #7c3aed, #2563eb)",
                  boxShadow: "0 10px 24px rgba(37,99,235,0.22)",
                }}
              >
                Retry Quiz
              </button>

              <button
                onClick={() => navigate("/leaderboard")}
                style={{
                  padding: "14px 24px",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "17px",
                  fontWeight: "800",
                  color: "#ffffff",
                  cursor: "pointer",
                  background: "linear-gradient(90deg, #059669, #0ea5e9)",
                  boxShadow: "0 10px 24px rgba(14,165,233,0.22)",
                }}
              >
                Leaderboard
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  padding: "14px 24px",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "17px",
                  fontWeight: "800",
                  color: "#ffffff",
                  cursor: "pointer",
                  background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                  boxShadow: "0 10px 24px rgba(239,68,68,0.22)",
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {reviewAnswers.length > 0 && (
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "28px",
                padding: "26px",
                boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
              }}
            >
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "900",
                  color: "#ffffff",
                  marginTop: 0,
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
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "20px",
                      padding: "20px",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "7px 12px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.08)",
                        color: "#c4b5fd",
                        fontWeight: "800",
                        fontSize: "13px",
                        marginBottom: "14px",
                      }}
                    >
                      <span>Q{index + 1}</span>
                    </div>

                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        color: "#ffffff",
                        marginBottom: "14px",
                        marginTop: 0,
                        lineHeight: "1.5",
                      }}
                    >
                      {item.question}
                    </h3>

                    <div style={{ display: "grid", gap: "10px", marginBottom: "14px" }}>
                      {item.options.map((option, optionIndex) => {
                        let bg = "rgba(255,255,255,0.04)";
                        let border = "rgba(255,255,255,0.10)";
                        let color = "#ffffff";

                        if (option === item.correctAnswer) {
                          bg = "rgba(34,197,94,0.18)";
                          border = "rgba(74,222,128,0.45)";
                          color = "#bbf7d0";
                        }

                        if (option === item.selectedAnswer && option !== item.correctAnswer) {
                          bg = "rgba(239,68,68,0.18)";
                          border = "rgba(252,165,165,0.45)";
                          color = "#fecaca";
                        }

                        return (
                          <div
                            key={optionIndex}
                            style={{
                              padding: "13px 15px",
                              borderRadius: "14px",
                              border: `1px solid ${border}`,
                              background: bg,
                              color: color,
                              fontWeight: "700",
                              fontSize: "15px",
                            }}
                          >
                            {option}
                          </div>
                        );
                      })}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gap: "8px",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div style={{ color: "#fef3c7" }}>
                        Your Answer: {item.selectedAnswer}
                      </div>
                      <div style={{ color: "#bbf7d0" }}>
                        Correct Answer: {item.correctAnswer}
                      </div>
                      <div style={{ color: "#e5e7eb", lineHeight: "1.6" }}>
                        Explanation: {item.explanation}
                      </div>
                      <div
                        style={{
                          color: item.isCorrect ? "#4ade80" : "#f87171",
                          marginTop: "4px",
                        }}
                      >
                        {item.isCorrect ? "Correct ✅" : "Wrong ❌"}
                      </div>
                    </div>
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