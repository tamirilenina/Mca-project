import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import bgImage from "../assets/dashboard-bg.jpg";

function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const colors = [
    "#7c3aed",
    "#2563eb",
    "#db2777",
    "#059669",
    "#ea580c",
    "#dc2626",
    "#0891b2",
    "#9333ea",
  ];

  const getCardStyle = (color) => ({
    border: `1px solid ${color}99`,
    boxShadow: `0 0 20px ${color}55`,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://127.0.0.1:8000/api/categories/");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Unable to load categories from backend.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(20,10,40,0.7), rgba(0,0,0,0.8))",
            }}
          ></div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "500px",
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "24px",
              padding: "40px 30px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "2.2rem",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              Categories
            </h1>

            <p
              style={{
                color: "#d1d5db",
                fontSize: "1.05rem",
                marginBottom: "18px",
              }}
            >
              Loading categories...
            </p>
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
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(20,10,40,0.7), rgba(0,0,0,0.8))",
            }}
          ></div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "500px",
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "24px",
              padding: "40px 30px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "2.2rem",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              Categories
            </h1>

            <p
              style={{
                color: "#fca5a5",
                fontSize: "1.05rem",
                marginBottom: "18px",
              }}
            >
              {error}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          position: "relative",
          padding: "60px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(25,10,50,0.55), rgba(0,0,0,0.8))",
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1100px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              marginBottom: "12px",
              textShadow: "0 0 18px rgba(255, 0, 255, 0.35)",
            }}
          >
            Quiz Categories
          </h1>

          <p
            style={{
              color: "#e5e7eb",
              fontSize: "1.05rem",
              maxWidth: "650px",
              margin: "0 auto 40px auto",
              lineHeight: "1.7",
            }}
          >
            Choose your favorite category and begin your exciting quiz journey
            with a stylish and interactive experience.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 220px))",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() =>
                  navigate("/subcategory", {
                    state: {
                      category: category.name,
                      categoryId: category.id,
                    },
                  })
                }
                style={{
                  ...getCardStyle(colors[index % colors.length]),
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderRadius: "22px",
                  padding: "28px 20px",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  minHeight: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  letterSpacing: "0.4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                  e.currentTarget.style.boxShadow = `0 0 28px ${
                    colors[index % colors.length]
                  }88`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 0 20px ${
                    colors[index % colors.length]
                  }55`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;