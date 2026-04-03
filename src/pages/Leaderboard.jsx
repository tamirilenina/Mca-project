import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/leaderboard/");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  const getWinRate = (score, totalQuestions) => {
    if (!totalQuestions || totalQuestions === 0) return "0%";
    return `${Math.round((score / totalQuestions) * 100)}%`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at top, rgba(168,85,247,0.22), transparent 30%), linear-gradient(135deg, #240046 0%, #3c096c 35%, #5a189a 70%, #240046 100%)",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          padding: "34px 16px 48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1180px",
            borderRadius: "30px",
            padding: "18px",
            background: "linear-gradient(135deg, #facc15, #f59e0b)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.35), 0 0 30px rgba(250,204,21,0.20)",
          }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: "24px",
              padding: "26px 24px 28px",
              background:
                "linear-gradient(135deg, rgba(48,8,84,0.96), rgba(109,40,217,0.90), rgba(76,29,149,0.96))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: "26px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 22px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  marginBottom: "14px",
                }}
              >
                <span style={{ fontSize: "26px" }}>🏆</span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "800",
                    letterSpacing: "2px",
                  }}
                >
                  TOP PLAYERS
                </span>
                <span style={{ fontSize: "26px" }}>🏆</span>
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "52px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  color: "#ffffff",
                  textShadow: "0 4px 20px rgba(255,255,255,0.18)",
                }}
              >
                LEADERBOARD
              </h1>

              <p
                style={{
                  marginTop: "10px",
                  marginBottom: 0,
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.80)",
                  fontWeight: "600",
                }}
              >
                Category wise top quiz performances
              </p>
            </div>

            {/* Loading / Empty / Table */}
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: "700",
                  padding: "40px 20px",
                }}
              >
                Loading leaderboard...
              </div>
            ) : results.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: "700",
                  padding: "40px 20px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                No leaderboard data found
              </div>
            ) : (
              <div
                style={{
                  borderRadius: "22px",
                  overflowX: "auto",
                  background: "rgba(0,0,0,0.14)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    minWidth: "980px",
                    display: "grid",
                    gridTemplateColumns: "110px 190px 240px 130px 170px 150px 200px",
                    alignItems: "center",
                    gap: "10px",
                    padding: "18px 20px",
                    background:
                      "linear-gradient(90deg, rgba(91,33,182,0.95), rgba(124,58,237,0.88), rgba(79,70,229,0.95))",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "800",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  <div>Rank</div>
                  <div>Name</div>
                  <div>Category</div>
                  <div>Score</div>
                  <div>Total Questions</div>
                  <div>Win Rate</div>
                  <div>Taken At</div>
                </div>

                {/* Body Rows */}
                <div style={{ minWidth: "980px", padding: "10px 10px 12px" }}>
                  {results.map((item, index) => {
                    const rank = index + 1;
                    const winRate = getWinRate(item.score, item.total_questions);

                    return (
                      <div
                        key={item.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "110px 190px 240px 130px 170px 150px 200px",
                          alignItems: "center",
                          gap: "10px",
                          padding: "14px 16px",
                          marginBottom: "10px",
                          borderRadius: "16px",
                          background:
                            rank <= 3
                              ? "linear-gradient(90deg, rgba(126,34,206,0.38), rgba(91,33,182,0.24))"
                              : "linear-gradient(90deg, rgba(255,255,255,0.07), rgba(255,255,255,0.04))",
                          border:
                            rank <= 3
                              ? "1px solid rgba(250,204,21,0.35)"
                              : "1px solid rgba(255,255,255,0.08)",
                          boxShadow:
                            rank <= 3
                              ? "0 8px 20px rgba(0,0,0,0.18)"
                              : "0 6px 16px rgba(0,0,0,0.10)",
                        }}
                      >
                        {/* Rank */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "#fff",
                            fontWeight: "800",
                            fontSize: "18px",
                          }}
                        >
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "14px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                rank === 1
                                  ? "linear-gradient(135deg, #facc15, #f59e0b)"
                                  : rank === 2
                                  ? "linear-gradient(135deg, #e5e7eb, #94a3b8)"
                                  : rank === 3
                                  ? "linear-gradient(135deg, #fb923c, #ea580c)"
                                  : "linear-gradient(135deg, #8b5cf6, #6366f1)",
                              boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
                              fontSize: "20px",
                            }}
                          >
                            {getRankBadge(rank)}
                          </div>
                          <span>#{rank}</span>
                        </div>

                        {/* Username */}
                        <div
                          style={{
                            color: "#ffffff",
                            fontSize: "17px",
                            fontWeight: "800",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.username}
                        </div>

                        {/* Category */}
                        <div
                          style={{
                            color: "rgba(255,255,255,0.92)",
                            fontSize: "16px",
                            fontWeight: "700",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.category_name || item.subcategory_name || "Quiz Category"}
                        </div>

                        {/* Score */}
                        <div
                          style={{
                            color: "#facc15",
                            fontSize: "18px",
                            fontWeight: "900",
                          }}
                        >
                          {item.score}
                        </div>

                        {/* Total Questions */}
                        <div
                          style={{
                            color: "#ffffff",
                            fontSize: "16px",
                            fontWeight: "700",
                          }}
                        >
                          {item.total_questions}
                        </div>

                        {/* Win rate */}
                        <div
                          style={{
                            color: "#86efac",
                            fontSize: "16px",
                            fontWeight: "800",
                          }}
                        >
                          {winRate}
                        </div>

                        {/* Taken At */}
                        <div
                          style={{
                            color: "rgba(255,255,255,0.85)",
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "1.5",
                          }}
                        >
                          {new Date(item.taken_at).toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Button */}
            <div style={{ textAlign: "center", marginTop: "26px" }}>
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;