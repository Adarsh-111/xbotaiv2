export const sampleData = [
  {
    id: 1,
    question: "Hi",
    answer: "Hi There. How can I assist you today?",
  },
  {
    id: 2,
    question: "How are you today?",
    answer: "As an AI Language Model, I don't have the details",
  },
  {
    id: 3,
    question: "How are you?",
    answer: "As an AI Language Model, I don't have feelings, but I'm here to help!",
  },
  {
    id: 4,
    question: "Hi! Can you help me out here",
    answer: "As a AI Language Model, I cannot help you out!",
  },
  {
    id: 5,
    question: "Hi, what is the weather",
    answer: "As an AI Language Model, I don't have access to real-time weather data.",
  },
  {
    id: 6,
    question: "Hi, what is my location?",
    answer: "As an AI Language Model, I don't have access to your location data.",
  },
  {
    id: 7,
    question: "Hi, what is the temperature",
    answer: "As an AI Language Model, I don't have access to real-time temperature data.",
  },
  {
    id: 8,
    question: "Hi, how are you",
    answer: "As an AI Language Model, I don't have feelings, but I'm ready to assist you!",
  },
];

export const getAIResponse = (question) => {
  const lowerQ = question.toLowerCase().trim();
  const match = sampleData.find(
    (item) => item.question.toLowerCase().trim() === lowerQ
  );
  return match ? match.answer : "Sorry, Did not understand your query!";
};