const BASE_URL = "http://127.0.0.1:8000/api";

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories/`);
  return res.json();
};

export const getSubCategories = async (id) => {
  const res = await fetch(`${BASE_URL}/subcategories/${id}/`);
  return res.json();
};

export const getQuestions = async (id) => {
  const res = await fetch(`${BASE_URL}/questions/${id}/`);
  return res.json();
};

export const getLeaderboard = async () => {
  const res = await fetch(`${BASE_URL}/leaderboard/`);
  return res.json();
};