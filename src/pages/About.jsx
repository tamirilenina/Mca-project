import React from "react";
import Layout from "../components/Layout";

function About() {
  return (
    <Layout>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            padding: "45px 35px",
          }}
        >
          <h1
            style={{
              fontSize: "46px",
              color: "#111827",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            About Our Quiz App
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#4b5563",
              lineHeight: "1.8",
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            This Online Quiz Application is designed to help users test their knowledge
            in different categories like General Knowledge, Technology, Science,
            and Mathematics in an easy and interactive way.
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "#f3e8ff",
                padding: "24px",
                borderRadius: "18px",
              }}
            >
              <h2 style={{ color: "#7e22ce", marginBottom: "12px" }}>Project Description</h2>
              <p style={{ fontSize: "18px", color: "#374151", lineHeight: "1.6" }}>
                This project allows users to select categories, answer multiple-choice
                questions, view results, and check leaderboard rankings.
              </p>
            </div>

            <div
              style={{
                background: "#dbeafe",
                padding: "24px",
                borderRadius: "18px",
              }}
            >
              <h2 style={{ color: "#2563eb", marginBottom: "12px" }}>Features</h2>
              <p style={{ fontSize: "18px", color: "#374151", lineHeight: "1.6" }}>
                Category selection, subcategory selection, quiz questions, score
                calculation, result analysis, retry option, and leaderboard display.
              </p>
            </div>

            <div
              style={{
                background: "#dcfce7",
                padding: "24px",
                borderRadius: "18px",
              }}
            >
              <h2 style={{ color: "#16a34a", marginBottom: "12px" }}>Learning Purpose</h2>
              <p style={{ fontSize: "18px", color: "#374151", lineHeight: "1.6" }}>
                This application is useful for improving knowledge, practicing quiz-based
                learning, and understanding frontend project development using React.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;