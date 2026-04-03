export function getBadgeByPercentage(percentage) {
  const value = Number(percentage);

  if (value >= 90) {
    return {
      title: "Quiz Master",
      icon: "🏆",
      colorClass: "badge-gold",
      message: "Excellent performance!",
    };
  }

  if (value >= 75) {
    return {
      title: "Star Performer",
      icon: "⭐",
      colorClass: "badge-silver",
      message: "Very good score!",
    };
  }

  if (value >= 50) {
    return {
      title: "Good Attempt",
      icon: "🎖️",
      colorClass: "badge-bronze",
      message: "You passed the quiz!",
    };
  }

  return {
    title: "Keep Practicing",
    icon: "📘",
    colorClass: "badge-practice",
    message: "Try again and improve!",
  };
}