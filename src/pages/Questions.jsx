import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { shuffleArray } from "../utils/shuffle";
import { generateExplanation } from "../utils/explanation";
import { playBeep } from "../utils/sound";
import bgImage from "../assets/questions-bg.jpg";

function Questions() {
  const navigate = useNavigate();
  const location = useLocation();

  const category = location.state?.category || "General Knowledge";
  const allSubcategories = location.state?.subcategories || [];
  const startIndex = location.state?.startIndex || 0;

  const [currentSubIndex, setCurrentSubIndex] = useState(startIndex);
  const [showNextScreen, setShowNextScreen] = useState(false);

  const currentSub = allSubcategories[currentSubIndex] || {};
  const subcategory =
    currentSub?.name || location.state?.subcategory || "World Geography";
  const subcategoryId =
    currentSub?.id || location.state?.subcategoryId || null;

  const QUIZ_TIME = 60;

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [reviewAnswers, setReviewAnswers] = useState([]);
  const [allReviewAnswers, setAllReviewAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!subcategoryId) {
        setError(
          "Subcategory ID not found. Please go back and select a subcategory again."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://127.0.0.1:8000/api/subcategories/${subcategoryId}/questions/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();

        const formattedQuestions = data.map((item) => ({
          question: item.question_text,
          options: [item.option1, item.option2, item.option3, item.option4],
          answer: item.correct_answer,
          explanation: item.explanation || "",
        }));

        const shuffledQuestions = shuffleArray(formattedQuestions).map(
          (question) => ({
            ...question,
            options: shuffleArray(question.options),
          })
        );

        setQuizQuestions(shuffledQuestions);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption("");
        setIsAnswered(false);
        setTimeLeft(QUIZ_TIME);
        setReviewAnswers([]);
        setShowNextScreen(false);
      } catch (err) {
        setError("Unable to load questions from backend.");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subcategoryId]);

  const current = useMemo(() => {
    return quizQuestions[currentQuestion];
  }, [quizQuestions, currentQuestion]);

  useEffect(() => {
    if (!quizQuestions.length || !current) return;
    if (isAnswered) return;
    if (showNextScreen) return;

    if (timeLeft === 0) {
      handleTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, quizQuestions, current, showNextScreen]);

  useEffect(() => {
    if (!quizQuestions.length) return;
    setTimeLeft(QUIZ_TIME);
    setSelectedOption("");
    setIsAnswered(false);
  }, [currentQuestion, quizQuestions.length]);

  const saveQuizResult = async (finalScore, finalTotal) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const userId = user?.id || user?.user_id;

      if (!userId) {
        console.log("User ID not found");
        return false;
      }

      if (!subcategoryId) {
        console.log("Subcategory ID not found");
        return false;
      }

      const response = await fetch("http://127.0.0.1:8000/api/result/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
          subcategory: subcategoryId,
          score: finalScore,
          total_questions: finalTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Result save failed:", data);
        return false;
      }

      console.log("Result saved successfully:", data);
      return true;
    } catch (error) {
      console.error("Error saving result:", error);
      return false;
    }
  };

  const finishCurrentSubcategory = async (updatedScore, updatedReviewAnswers) => {
    const taggedAnswers = updatedReviewAnswers.map((item) => ({
      ...item,
      subcategory,
    }));

    const newAllReviewAnswers = [...allReviewAnswers, ...taggedAnswers];
    const newTotalScore = totalScore + updatedScore;
    const newTotalQuestions = totalQuestionsCount + quizQuestions.length;

    setAllReviewAnswers(newAllReviewAnswers);
    setTotalScore(newTotalScore);
    setTotalQuestionsCount(newTotalQuestions);

    await saveQuizResult(updatedScore, quizQuestions.length);

    if (currentSubIndex < allSubcategories.length - 1) {
      setShowNextScreen(true);
    } else {
      navigate("/result", {
        state: {
          score: newTotalScore,
          total: newTotalQuestions,
          totalQuestions: newTotalQuestions,
          category,
          subcategory,
          subcategoryId,
          reviewAnswers: newAllReviewAnswers,
        },
      });
    }
  };

  const moveToNextQuestion = (updatedScore, updatedReviewAnswers) => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishCurrentSubcategory(updatedScore, updatedReviewAnswers);
    }
  };

  const handleAnswer = (option) => {
    if (isAnswered || !current) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === current.answer;
    let updatedScore = score;

    if (isCorrect) {
      updatedScore = score + 1;
      setScore(updatedScore);
      playBeep("correct");
    } else {
      playBeep("wrong");
    }

    const answerReviewItem = {
      question: current.question,
      options: current.options,
      selectedAnswer: option,
      correctAnswer: current.answer,
      explanation: current.explanation || generateExplanation(current),
      isCorrect,
    };

    const updatedReviewAnswers = [...reviewAnswers, answerReviewItem];
    setReviewAnswers(updatedReviewAnswers);

    setTimeout(() => {
      moveToNextQuestion(updatedScore, updatedReviewAnswers);
    }, 1200);
  };

  const handleTimeUp = () => {
    if (isAnswered || !current) return;

    setIsAnswered(true);
    setSelectedOption("");
    playBeep("timeout");

    const answerReviewItem = {
      question: current.question,
      options: current.options,
      selectedAnswer: "Not Answered",
      correctAnswer: current.answer,
      explanation: current.explanation || generateExplanation(current),
      isCorrect: false,
    };

    const updatedReviewAnswers = [...reviewAnswers, answerReviewItem];
    setReviewAnswers(updatedReviewAnswers);

    setTimeout(() => {
      moveToNextQuestion(score, updatedReviewAnswers);
    }, 1200);
  };

  const handleNextSubcategory = () => {
    const nextIndex = currentSubIndex + 1;
    setCurrentSubIndex(nextIndex);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setIsAnswered(false);
    setTimeLeft(QUIZ_TIME);
    setReviewAnswers([]);
    setShowNextScreen(false);
  };

  const getOptionStyle = (option) => {
    let background = "#ffffff";
    let border = "2px solid #cbd5e1";
    let color = "#1e293b";

    if (isAnswered) {
      if (option === current.answer) {
        background = "#dcfce7";
        border = "2px solid #16a34a";
        color = "#166534";
      } else if (option === selectedOption && option !== current.answer) {
        background = "#fee2e2";
        border = "2px solid #dc2626";
        color = "#991b1b";
      }
    } else if (selectedOption === option) {
      background = "#dbeafe";
      border = "2px solid #2563eb";
      color = "#1d4ed8";
    }

    return {
      background,
      border,
      color,
    };
  };

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: "800",
            }}
          >
            Loading Questions...
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  if (showNextScreen) {
    return (
      <Layout>
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "700px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "40px 30px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              {subcategory} Completed!
            </h1>

            <p
              style={{
                color: "#f8fafc",
                fontSize: "22px",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              This Subcategory Score:{" "}
              <span style={{ color: "#facc15", fontWeight: "800" }}>
                {score}
              </span>
            </p>

            <p
              style={{
                color: "#f8fafc",
                fontSize: "20px",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              Total Score So Far:{" "}
              <span style={{ color: "#facc15", fontWeight: "800" }}>
                {totalScore + score}
              </span>
            </p>

            <p
              style={{
                color: "#e2e8f0",
                fontSize: "18px",
                marginBottom: "28px",
                fontWeight: "600",
              }}
            >
              Next Subcategory:{" "}
              <span style={{ color: "#ffffff", fontWeight: "800" }}>
                {allSubcategories[currentSubIndex + 1]?.name}
              </span>
            </p>

            <button
              onClick={handleNextSubcategory}
              style={{
                padding: "14px 28px",
                fontSize: "18px",
                fontWeight: "800",
                borderRadius: "10px",
                border: "none",
                background: "#16a34a",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Next Subcategory
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!quizQuestions.length || !current) {
    return (
      <Layout>
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            No Questions Found
          </div>
        </div>
      </Layout>
    );
  }

  const progressPercent = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const timerPercent = (timeLeft / QUIZ_TIME) * 100;

  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "30px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "25px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {category} → {subcategory}
              </div>

              <div
                style={{
                  background: timeLeft <= 10 ? "#dc2626" : "#2563eb",
                  color: "#ffffff",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                ⏱ {timeLeft}s
              </div>
            </div>

            <div
              style={{
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>

            <div
              style={{
                width: "100%",
                height: "10px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.20)",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background: "#8b5cf6",
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            <div
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.20)",
                overflow: "hidden",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  width: `${timerPercent}%`,
                  height: "100%",
                  background: timeLeft <= 10 ? "#ef4444" : "#22c55e",
                  transition: "width 1s linear",
                }}
              />
            </div>

            <div
              style={{
                background: "#ffffff",
                color: "#0f172a",
                borderRadius: "16px",
                padding: "22px",
                fontSize: "28px",
                fontWeight: "800",
                textAlign: "center",
                marginBottom: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.20)",
              }}
            >
              {current.question}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "15px",
              }}
            >
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  style={{
                    ...getOptionStyle(option),
                    padding: "16px 18px",
                    borderRadius: "12px",
                    fontSize: "18px",
                    fontWeight: "700",
                    cursor: isAnswered ? "not-allowed" : "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "0.3s ease",
                  }}
                >
                  <span
                    style={{
                      minWidth: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#1e293b",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "14px",
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {isAnswered && (
              <p
                style={{
                  marginTop: "22px",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "800",
                  color: selectedOption === current.answer ? "#22c55e" : "#ef4444",
                }}
              >
                {selectedOption
                  ? selectedOption === current.answer
                    ? "Correct Answer ✅"
                    : "Wrong Answer ❌"
                  : "Time Up ⏰ Moving to next question..."}
              </p>
            )}

            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "800",
                color: "#ffffff",
              }}
            >
              Current Score: <span style={{ color: "#facc15" }}>{score}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Questions;