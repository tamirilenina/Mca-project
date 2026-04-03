export const getStoredLeaderboard = () => {
  const saved = localStorage.getItem("quizLeaderboard");
  return saved ? JSON.parse(saved) : [];
};

export const saveStoredLeaderboard = (data) => {
  localStorage.setItem("quizLeaderboard", JSON.stringify(data));
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem("quizUser");
  return user ? JSON.parse(user) : null;
};

export const upsertLeaderboardScore = ({ name, category, subcategory, score, total }) => {
  if (!name) return;

  const saved = getStoredLeaderboard();

  const newEntry = {
    id: `${name}-${subcategory}-${Date.now()}`,
    name,
    category,
    subcategory,
    score,
    total,
    percentage: total > 0 ? Number(((score / total) * 100).toFixed(2)) : 0,
    createdAt: new Date().toISOString(),
  };

  const updated = [newEntry, ...saved];
  saveStoredLeaderboard(updated);
};

export const getMergedLeaderboard = () => {
  const saved = getStoredLeaderboard();

  const staticEntries = [
    {
      id: "static-1",
      name: "Ravi",
      category: "Technology",
      subcategory: "Programming",
      score: 5,
      total: 5,
      percentage: 100,
      createdAt: "2026-01-01T10:00:00.000Z",
    },
    {
      id: "static-2",
      name: "Sita",
      category: "General Knowledge",
      subcategory: "History",
      score: 4,
      total: 5,
      percentage: 80,
      createdAt: "2026-01-02T10:00:00.000Z",
    },
    {
      id: "static-3",
      name: "Arjun",
      category: "Mathematics",
      subcategory: "Algebra",
      score: 4,
      total: 5,
      percentage: 80,
      createdAt: "2026-01-03T10:00:00.000Z",
    },
    {
      id: "static-4",
      name: "Priya",
      category: "Science",
      subcategory: "Space Science",
      score: 3,
      total: 5,
      percentage: 60,
      createdAt: "2026-01-04T10:00:00.000Z",
    },
  ];

  return [...saved, ...staticEntries].sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};