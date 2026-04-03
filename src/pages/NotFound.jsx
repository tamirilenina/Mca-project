import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div
        style={{
          minHeight: "calc(100vh - 160px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "50px 35px",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            maxWidth: "700px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              color: "#dc2626",
              marginBottom: "10px",
            }}
          >
            404
          </h1>

          <h2
            style={{
              fontSize: "36px",
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Page Not Found
          </h2>

          <p
            style={{
              fontSize: "22px",
              color: "#6b7280",
              marginBottom: "30px",
              lineHeight: "1.6",
            }}
          >
            Sorry, the page you are looking for does not exist or may have been moved.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              background: "linear-gradient(90deg, #7e22ce, #2563eb)",
              color: "white",
              border: "none",
              padding: "16px 30px",
              borderRadius: "12px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;