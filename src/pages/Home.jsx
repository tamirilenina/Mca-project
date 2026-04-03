import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { isAuthenticated } from "../utils/auth";
import bgImage from "../assets/home-bg.jpg";

function Home() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <Layout>
      <div
        className="app-main-center"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.60)",
            minHeight: "100vh",
            width: "100%",
            padding: "40px 20px",
          }}
        >
          {/* Hero Section */}
          <div
            className="page-card"
            style={{
              maxWidth: "900px",
              textAlign: "center",
              margin: "40px auto",
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              padding: "50px 40px",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h1
              className="page-title"
              style={{
                color: "#ffffff",
                fontSize: "3rem",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              Online Quiz Application
            </h1>

            <p
              className="page-subtitle"
              style={{
                color: "#f1f5f9",
                fontSize: "1.15rem",
                marginBottom: "30px",
                lineHeight: "1.7",
              }}
            >
              Test your knowledge, improve your skills, and challenge yourself
              with fun quizzes.
            </p>

            <div
              className="button-group"
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button className="common-btn" onClick={handleStartQuiz}>
                Start Quiz
              </button>

              {!isAuthenticated() && (
                <>
                  <button
                    className="common-btn btn-blue"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>

                  <button
                    className="common-btn btn-green"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto 50px auto",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontSize: "2.2rem",
                marginBottom: "30px",
                fontWeight: "700",
              }}
            >
              Features of Our Quiz App
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {[
                {
                  title: "Multiple Categories",
                  desc: "Explore quizzes in General Knowledge, Science, Technology, Mathematics and more.",
                },
                {
                  title: "Track Scores",
                  desc: "Check your performance instantly and monitor your progress after every quiz.",
                },
                {
                  title: "Fast & Interactive",
                  desc: "Enjoy a smooth and engaging quiz experience with interactive questions.",
                },
                {
                  title: "Leaderboard",
                  desc: "Compete with others and see your ranking on the leaderboard.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "18px",
                    padding: "25px",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      marginBottom: "12px",
                      color: "#ffffff",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "#e2e8f0",
                      lineHeight: "1.7",
                      fontSize: "1rem",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto 50px auto",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontSize: "2.2rem",
                marginBottom: "30px",
                fontWeight: "700",
              }}
            >
              Quiz Highlights
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "20px",
              }}
            >
              {[
                { number: "10+", label: "Quiz Categories" },
                { number: "50+", label: "Sub Categories" },
                { number: "100+", label: "Questions" },
                { number: "24/7", label: "Learning Access" },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "18px",
                    padding: "28px 20px",
                    textAlign: "center",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "2rem",
                      marginBottom: "10px",
                      color: "#ffffff",
                      fontWeight: "800",
                    }}
                  >
                    {item.number}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#e2e8f0",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto 50px auto",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontSize: "2.2rem",
                marginBottom: "30px",
                fontWeight: "700",
              }}
            >
              Why Choose Our Platform?
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {[
                "Easy to use interface for all learners.",
                "Beautiful modern UI with smooth navigation.",
                "Improves knowledge and confidence through practice.",
                "Suitable for students, learners, and quiz enthusiasts.",
              ].map((text, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "18px",
                    padding: "24px",
                    color: "#fff",
                    lineHeight: "1.8",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    fontSize: "1rem",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto 30px auto",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "15px",
                color: "#ffffff",
              }}
            >
              Ready to Start Your Quiz Journey?
            </h2>

            <p
              style={{
                color: "#e2e8f0",
                marginBottom: "25px",
                fontSize: "1.05rem",
                lineHeight: "1.7",
              }}
            >
              Join now and explore exciting quiz categories to test your
              knowledge and improve your skills.
            </p>

            <button className="common-btn" onClick={handleStartQuiz}>
              Start Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;