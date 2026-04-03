import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bgImage from "../assets/signup-bg.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Signup successful! Redirecting to login...");
        speakMessage("Signup successful");

        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        if (data.username) {
          setMessage(data.username[0]);
        } else if (data.email) {
          setMessage(data.email[0]);
        } else if (data.password) {
          setMessage(data.password[0]);
        } else if (data.detail) {
          setMessage(data.detail);
        } else {
          setMessage("Signup failed");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "40px 70px 40px 20px",
          background: "linear-gradient(90deg, rgba(5,10,25,0.25), rgba(5,10,25,0.55))",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "580px",
            background: "rgba(255, 255, 255, 0.16)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "28px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
            padding: "40px 36px",
            border: "1px solid rgba(255,255,255,0.22)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "56px",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "12px",
              lineHeight: "1.1",
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "#e5e7eb",
              marginBottom: "28px",
            }}
          >
            Signup to continue your quiz journey
          </p>

          {message && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                textAlign: "center",
                backgroundColor: isSuccess ? "#dcfce7" : "#fee2e2",
                color: isSuccess ? "#166534" : "#b91c1c",
                border: `1px solid ${isSuccess ? "#86efac" : "#fca5a5"}`,
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "18px 20px",
                marginBottom: "18px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.28)",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.88)",
                color: "#111827",
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "18px 20px",
                marginBottom: "18px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.28)",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.88)",
                color: "#111827",
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "18px 20px",
                marginBottom: "18px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.28)",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.88)",
                color: "#111827",
              }}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "18px 20px",
                marginBottom: "22px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.28)",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.88)",
                color: "#111827",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "18px",
                border: "none",
                borderRadius: "18px",
                fontSize: "22px",
                fontWeight: "700",
                color: "#ffffff",
                cursor: "pointer",
                background: "linear-gradient(90deg, #7c3aed, #2563eb)",
                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.35)",
              }}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontSize: "18px",
              color: "#f3f4f6",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#c4b5fd",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;