import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#ecfeff" : "rgba(255,255,255,0.88)",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "700",
    padding: "11px 17px",
    borderRadius: "14px",
    letterSpacing: "0.3px",
    background: isActive
      ? "linear-gradient(135deg, rgba(16,185,129,0.22), rgba(6,182,212,0.18))"
      : "transparent",
    border: isActive
      ? "1px solid rgba(125,211,252,0.22)"
      : "1px solid transparent",
    boxShadow: isActive
      ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 18px rgba(0,0,0,0.18)"
      : "none",
    transition: "all 0.35s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const actionButton = {
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "800",
    borderRadius: "14px",
    padding: "11px 18px",
    transition: "all 0.35s ease",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "16px 24px",
        background:
          "linear-gradient(180deg, rgba(3,8,20,0.92), rgba(3,10,18,0.72))",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "22px",
          flexWrap: "wrap",
          padding: "12px 18px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(7,15,25,0.88), rgba(10,25,35,0.84), rgba(7,40,48,0.72))",
          border: "1px solid rgba(52,211,153,0.12)",
          boxShadow:
            "0 16px 40px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.03)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow Effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(16,185,129,0.16), transparent 28%), radial-gradient(circle at top right, rgba(6,182,212,0.14), transparent 30%)",
            pointerEvents: "none",
          }}
        />

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #34d399 0%, #22c55e 35%, #06b6d4 100%)",
              boxShadow:
                "0 10px 24px rgba(6,182,212,0.22), inset 0 2px 8px rgba(255,255,255,0.22), 0 0 18px rgba(16,185,129,0.20)",
              transform: "perspective(220px) rotateX(10deg) rotateY(-8deg)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10%",
                left: "-35%",
                width: "80%",
                height: "80%",
                background: "rgba(255,255,255,0.24)",
                filter: "blur(10px)",
                transform: "rotate(26deg)",
              }}
            />
            <span
              style={{
                fontSize: "28px",
                zIndex: 2,
              }}
            >
              📊
            </span>
          </div>

          {/* TEXT */}
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "34px",
                fontWeight: "900",
                background:
                  "linear-gradient(90deg, #ffffff 0%, #d1fae5 45%, #cffafe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              KnowledgeHub
            </h1>

            <p
              style={{
                margin: "5px 0 0 2px",
                fontSize: "12px",
                fontWeight: "800",
                color: "rgba(220,252,231,0.76)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Learn • Test • Improve
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
            border: "1px solid rgba(255,255,255,0.06)",
            zIndex: 2,
          }}
        >
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
          <NavLink to="/leaderboard" style={navLinkStyle}>Leaderboard</NavLink>

          {isLoggedIn ? (
            <>
              <div style={{ color: "#ecfeff", fontWeight: "800" }}>
                Hi, {user?.username}
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  ...actionButton,
                  background:
                    "linear-gradient(135deg, #d1fae5, #99f6e4)",
                }}
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                style={{
                  ...actionButton,
                  background:
                    "linear-gradient(135deg, #f97316, #ef4444)",
                  color: "#fff",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={navLinkStyle}>Login</NavLink>
              <Link
                to="/signup"
                style={{
                  padding: "11px 18px",
                  borderRadius: "14px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #67e8f9, #34d399)",
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