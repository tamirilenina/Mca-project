import React, { useState } from "react";
import Layout from "../components/Layout";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Layout>
      <div
        style={{
          maxWidth: "900px",
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
              marginBottom: "18px",
              textAlign: "center",
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#4b5563",
              textAlign: "center",
              marginBottom: "30px",
              lineHeight: "1.7",
            }}
          >
            If you want to know more about this project, you can contact the developer
            using the information below or submit your message through the form.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "#f3e8ff",
                padding: "22px",
                borderRadius: "18px",
              }}
            >
              <h2 style={{ color: "#7e22ce", marginBottom: "10px" }}>Project Name</h2>
              <p style={{ fontSize: "18px", color: "#374151" }}>Online Quiz Application</p>
            </div>

            <div
              style={{
                background: "#dbeafe",
                padding: "22px",
                borderRadius: "18px",
              }}
            >
              <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>Developer Name</h2>
              <p style={{ fontSize: "18px", color: "#374151" }}>Your Name Here</p>
            </div>

            <div
              style={{
                background: "#dcfce7",
                padding: "22px",
                borderRadius: "18px",
              }}
            >
              <h2 style={{ color: "#16a34a", marginBottom: "10px" }}>Email</h2>
              <p style={{ fontSize: "18px", color: "#374151" }}>yourmail@example.com</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: "16px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: "16px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />

            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={{
                padding: "16px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                outline: "none",
                resize: "none",
              }}
            />

            <button
              type="submit"
              style={{
                background: "linear-gradient(90deg, #7e22ce, #2563eb)",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;