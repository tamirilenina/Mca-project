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

  const finishCurrentSubcategory = (updatedScore, updatedReviewAnswers) => {
    const taggedAnswers = updatedReviewAnswers.map((item) => ({
      ...item,
      subcategory,
    }));

    setAllReviewAnswers((prev) => [...prev, ...taggedAnswers]);
    setTotalScore((prev) => prev + updatedScore);
    setTotalQuestionsCount((prev) => prev + quizQuestions.length);

    if (currentSubIndex < allSubcategories.length - 1) {
      setShowNextScreen(true);
    } else {
      navigate("/result", {
        state: {
          score: totalScore + updatedScore,
          total: totalQuestionsCount + quizQuestions.length,
          category,
          reviewAnswers: [...allReviewAnswers, ...taggedAnswers],
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
    let background = "linear-gradient(180deg, #163d9a 0%, #0e2f7f 100%)";
    let border = "2px solid #d4a017";
    let color = "#ffffff";
    let boxShadow =
      "0 6px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)";

    if (isAnswered) {
      if (option === current.answer) {
        background = "linear-gradient(180deg, #16a34a 0%, #15803d 100%)";
        border = "2px solid #facc15";
      } else if (option === selectedOption && option !== current.answer) {
        background = "linear-gradient(180deg, #dc2626 0%, #b91c1c 100%)";
        border = "2px solid #facc15";
      } else {
        background = "linear-gradient(180deg, #163d9a 0%, #0e2f7f 100%)";
      }
    } else if (selectedOption === option) {
      background = "linear-gradient(180deg, #f59e0b 0%, #d97706 100%)";
      border = "2px solid #facc15";
    }

    return {
      background,
      border,
      color,
      boxShadow,
    };
  };

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
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
              color: "#fff",
              fontSize: "32px",
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
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
              color: "#fff",
              fontSize: "28px",
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
            backgroundImage: `linear-gradient(rgba(4,10,40,0.72), rgba(4,10,40,0.72)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "28px",
              padding: "50px 30px",
              textAlign: "center",
              boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                marginBottom: "18px",
              }}
            >
              ✅
            </div>

            <h1
              style={{
                color: "#fff",
                fontSize: "38px",
                fontWeight: "900",
                marginBottom: "14px",
              }}
            >
              {subcategory} Completed!
            </h1>

            <p
              style={{
                color: "#e2e8f0",
                fontSize: "22px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              This Subcategory Score:{" "}
              <span style={{ color: "#facc15" }}>{score}</span>
            </p>

            <p
              style={{
                color: "#e2e8f0",
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Total Score So Far:{" "}
              <span style={{ color: "#facc15" }}>{totalScore + score}</span>
            </p>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "34px",
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
                padding: "16px 34px",
                fontSize: "20px",
                fontWeight: "800",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(90deg, #22c55e, #16a34a)",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 12px 28px rgba(34,197,94,0.35)",
              }}
            >
              Next Subcategory →
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
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
              color: "#fff",
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
          backgroundImage: `linear-gradient(rgba(4,10,40,0.55), rgba(4,10,40,0.55)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "hidden",
          padding: "30px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                color: "#f8fafc",
                fontSize: "22px",
                fontWeight: "700",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {category} → {subcategory}
            </div>

            <div
              style={{
                minWidth: "130px",
                textAlign: "center",
                padding: "14px 22px",
                borderRadius: "18px",
                color: "#fff",
                fontWeight: "800",
                fontSize: "30px",
                background:
                  timeLeft <= 10
                    ? "linear-gradient(180deg, #dc2626 0%, #991b1b 100%)"
                    : "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)",
                border: "2px solid #d4a017",
                boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
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
              marginBottom: "10px",
            }}
          >
            Subcategory {currentSubIndex + 1} of {allSubcategories.length || 1}
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: "34px",
              fontWeight: "800",
              marginBottom: "8px",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>

          <div
            style={{
              color: "#e2e8f0",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "14px",
            }}
          >
            Progress: {currentQuestion + 1}/{quizQuestions.length}
          </div>

          <div
            style={{
              width: "100%",
              height: "14px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.25)",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #7c3aed, #2563eb)",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              height: "12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.25)",
              overflow: "hidden",
              marginBottom: "34px",
            }}
          >
            <div
              style={{
                width: `${timerPercent}%`,
                height: "100%",
                background:
                  timeLeft <= 10
                    ? "linear-gradient(90deg, #ef4444, #dc2626)"
                    : "linear-gradient(90deg, #22c55e, #16a34a)",
                transition: "width 1s linear",
              }}
            />
          </div>

          <div
            style={{
              maxWidth: "920px",
              margin: "0 auto 26px auto",
              background: "linear-gradient(180deg, #163d9a 0%, #0e2f7f 100%)",
              border: "3px solid #d4a017",
              color: "#fff",
              padding: "18px 34px",
              borderRadius: "999px",
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "800",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
              position: "relative",
            }}
          >
            {current.question}
          </div>

          <div
            style={{
              maxWidth: "1050px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px 26px",
            }}
          >
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                style={{
                  ...getOptionStyle(option),
                  padding: "16px 24px",
                  borderRadius: "999px",
                  fontSize: "22px",
                  fontWeight: "800",
                  cursor: isAnswered ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "12px",
                  minHeight: "74px",
                }}
              >
                <span
                  style={{
                    color: "#facc15",
                    fontWeight: "900",
                    minWidth: "42px",
                    textAlign: "left",
                  }}
                >
                  {String.fromCharCode(65 + index)}:
                </span>
                <span>{option}</span>
              </button>
            ))}
          </div>

          {isAnswered && (
            <p
              style={{
                marginTop: "24px",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "800",
                color: selectedOption === current.answer ? "#22c55e" : "#ef4444",
                textShadow: "0 2px 8px rgba(0,0,0,0.45)",
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
              marginTop: "22px",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "800",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.45)",
            }}
          >
            Current Score: <span style={{ color: "#facc15" }}>{score}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Questions;