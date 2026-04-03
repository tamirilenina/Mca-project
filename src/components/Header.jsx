import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // 🔥 localStorage nundi data theeskuntam
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 🔥 Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px 14px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  };

  const buttonBase = {
    border: "none",
    padding: "10px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    transition: "all 0.3s ease",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background:
          "linear-gradient(135deg, rgba(76,29,149,0.95), rgba(37,99,235,0.95), rgba(124,58,237,0.95))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18)",
        padding: "14px 28px",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #f472b6, #facc15, #60a5fa, #8b5cf6)",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.28), inset 0 2px 6px rgba(255,255,255,0.35)",
              transform: "perspective(120px) rotateX(8deg)",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
              }}
            >
              🧠
            </span>
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "900",
                lineHeight: "1",
                letterSpacing: "0.5px",
                background: "linear-gradient(90deg, #ffffff, #e0e7ff, #ffffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 14px rgba(255,255,255,0.18)",
              }}
            >
              Quiz App
            </h2>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "12px",
                color: "rgba(255,255,255,0.78)",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Learn • Play • Win
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
            background: "rgba(255,255,255,0.08)",
            padding: "10px 14px",
            borderRadius: "18px",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 22px rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/leaderboard" style={linkStyle}>Leaderboard</Link>

          {isLoggedIn ? (
            <>
              {/* Username */}
              <span
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.12))",
                  color: "#ffffff",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  fontWeight: "800",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 14px rgba(0,0,0,0.16)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                Hi, {user?.username}
              </span>

              {/* Dashboard */}
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  ...buttonBase,
                  background: "linear-gradient(135deg, #ffffff, #e0e7ff)",
                  color: "#2563eb",
                  boxShadow:
                    "0 8px 18px rgba(255,255,255,0.2), inset 0 1px 0 #ffffff",
                }}
              >
                Dashboard
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  ...buttonBase,
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 18px rgba(239,68,68,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>

              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #ffffff, #e0e7ff)",
                  color: "#2563eb",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: "800",
                  boxShadow:
                    "0 8px 18px rgba(255,255,255,0.2), inset 0 1px 0 #ffffff",
                }}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;