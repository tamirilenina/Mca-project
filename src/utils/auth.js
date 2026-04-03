export const getStoredUser = () => {
  const user = localStorage.getItem("quizUser");
  return user ? JSON.parse(user) : null;
};

export const loginUser = (userData) => {
  localStorage.setItem("quizUser", JSON.stringify(userData));
};

export const logoutUser = () => {
  localStorage.removeItem("quizUser");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("quizUser");
};