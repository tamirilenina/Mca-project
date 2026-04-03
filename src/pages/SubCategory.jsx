import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import bgImage from "../assets/subcategory-bg.jpg";

function SubCategory() {
  const navigate = useNavigate();
  const location = useLocation();

  const category = location.state?.category || "General Knowledge";
  const categoryId = location.state?.categoryId || null;

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const cardColors = [
    {
      background: "linear-gradient(135deg, #7c3aed, #2563eb)",
      shadow: "0 14px 28px rgba(124,58,237,0.28)",
    },
    {
      background: "linear-gradient(135deg, #ec4899, #f97316)",
      shadow: "0 14px 28px rgba(236,72,153,0.28)",
    },
    {
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      shadow: "0 14px 28px rgba(34,197,94,0.28)",
    },
    {
      background: "linear-gradient(135deg, #f59e0b, #ef4444)",
      shadow: "0 14px 28px rgba(245,158,11,0.28)",
    },
    {
      background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      shadow: "0 14px 28px rgba(6,182,212,0.28)",
    },
    {
      background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      shadow: "0 14px 28px rgba(139,92,246,0.28)",
    },
    {
      background: "linear-gradient(135deg, #14b8a6, #0ea5e9)",
      shadow: "0 14px 28px rgba(20,184,166,0.28)",
    },
    {
      background: "linear-gradient(135deg, #f43f5e, #8b5cf6)",
      shadow: "0 14px 28px rgba(244,63,94,0.28)",
    },
  ];

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!categoryId) {
        setError("Category ID not found. Please go back and select category again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://127.0.0.1:8000/api/categories/${categoryId}/subcategories/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subcategories");
        }

        const data = await response.json();
        setSubcategories(data);
      } catch (err) {
        setError("Unable to load subcategories from backend.");
        console.error("Error fetching subcategories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  const handleNext = () => {
    if (!selectedSubcategory) {
      alert("Please select a subcategory first");
      return;
    }

    const startIndex = subcategories.findIndex(
      (sub) => sub.id === selectedSubcategory.id
    );

    navigate("/instructions", {
      state: {
        category,
        categoryId,
        subcategory: selectedSubcategory.name,
        subcategoryId: selectedSubcategory.id,
        subcategories,
        startIndex,
      },
    });
  };

  const getCardStyle = (index, isSelected) => {
    const theme = cardColors[index % cardColors.length];

    return {
      background: theme.background,
      boxShadow: isSelected
        ? "0 0 0 3px rgba(255,255,255,0.95), 0 18px 36px rgba(255,255,255,0.18)"
        : theme.shadow,
      borderRadius: "22px",
      minHeight: "110px",
      padding: "18px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#ffffff",
      fontWeight: "800",
      fontSize: "1.05rem",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.18)",
      transition: "all 0.3s ease",
      transform: isSelected ? "scale(1.03)" : "scale(1)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    };
  };

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.88)",
              padding: "28px 36px",
              borderRadius: "20px",
              fontSize: "1.4rem",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Loading subcategories...
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
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.92)",
              padding: "28px 36px",
              borderRadius: "20px",
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#b91c1c",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.28)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                border: "none",
                background: "rgba(255,255,255,0.18)",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              Back
            </button>

            <button
              onClick={handleNext}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                border: "none",
                background: selectedSubcategory
                  ? "linear-gradient(90deg, #7c3aed, #2563eb)"
                  : "rgba(255,255,255,0.18)",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              Next
            </button>
          </div>

          <h1
            style={{
              color: "#ffffff",
              fontSize: "3rem",
              fontWeight: "900",
              marginBottom: "8px",
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            Sub Categories
          </h1>

          <p
            style={{
              color: "#e2e8f0",
              fontSize: "1.05rem",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            Selected Category: <strong>{category}</strong>
          </p>

          {subcategories.length === 0 ? (
            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                textAlign: "center",
                background: "rgba(255,255,255,0.9)",
                padding: "28px",
                borderRadius: "20px",
              }}
            >
              <h2 style={{ marginBottom: "16px" }}>No subcategories found</h2>
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #7c3aed, #2563eb)",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "18px",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {subcategories.map((sub, index) => {
                const isSelected = selectedSubcategory?.id === sub.id;

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub)}
                    style={getCardStyle(index, isSelected)}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform =
                          "translateY(-5px) scale(1.03)";
                        e.currentTarget.style.boxShadow =
                          "0 18px 30px rgba(0,0,0,0.24)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow =
                          cardColors[index % cardColors.length].shadow;
                      }
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "-18px",
                        width: "90px",
                        height: "90px",
                        background: "rgba(255,255,255,0.16)",
                        borderRadius: "50%",
                        filter: "blur(14px)",
                        pointerEvents: "none",
                      }}
                    />

                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.35rem",
                          lineHeight: 1,
                        }}
                      >
                        ✨
                      </span>

                      <span
                        style={{
                          fontSize: "1rem",
                          lineHeight: "1.3",
                          fontWeight: "800",
                        }}
                      >
                        {sub.name}
                      </span>

                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: "500",
                          color: "rgba(255,255,255,0.92)",
                        }}
                      >
                        Select Topic
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SubCategory;