import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bgImage from "../assets/login-bg.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

    if (!formData.username || !formData.password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("rememberMe", rememberMe ? "true" : "false");

        setIsSuccess(true);
        setMessage("Login successful!");
        speakMessage("Login successful");

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
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
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          background: "rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "430px",
            padding: "34px 30px 26px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.16)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.28)",
            boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "800",
              color: "#ffffff",
              margin: "0 0 8px 0",
              lineHeight: "1",
              textShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          >
            Login
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#f3f4f6",
              marginBottom: "24px",
              lineHeight: "1.5",
            }}
          >
            Welcome Back! Please login to your account
          </p>

          {message && (
            <div
              style={{
                marginBottom: "16px",
                padding: "12px 14px",
                borderRadius: "12px",
                fontSize: "14px",
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
            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.45)",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "rgba(255,255,255,0.10)",
                  color: "#ffffff",
                  boxShadow: "inset 0 1px 3px rgba(255,255,255,0.12)",
                }}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.45)",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "rgba(255,255,255,0.10)",
                  color: "#ffffff",
                  boxShadow: "inset 0 1px 3px rgba(255,255,255,0.12)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                Remember Me
              </label>

              <span
                style={{
                  fontSize: "14px",
                  color: "#f5d0fe",
                }}
              >
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                fontSize: "26px",
                fontWeight: "700",
                color: "#ffffff",
                cursor: "pointer",
                background: "linear-gradient(90deg, #ff5a1f, #a21caf)",
                boxShadow: "0 10px 24px rgba(255,90,31,0.30)",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
              fontSize: "16px",
              color: "#f3f4f6",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#fde68a",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Signup
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;