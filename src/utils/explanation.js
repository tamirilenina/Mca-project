export function generateExplanation(questionObj) {
  if (!questionObj) return "No explanation available.";

  const { question, answer } = questionObj;

  if (!question || !answer) {
    return "No explanation available.";
  }

  return `The correct answer is "${answer}" because it correctly matches the question: "${question}".`;
}