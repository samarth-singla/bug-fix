const BASE_URL = "http://localhost:8000"; // Ensure this matches your backend URL

let score = 0;
let highScore = 0;
let currentQuestion = null;
let gameOver = false;
let attemptHistory = [];

// DOM Elements
const scoreDisplay = document.getElementById("scoreDisplay");
const questionDiv = document.getElementById("question");
const form = document.getElementById("answerForm");
const feedback = document.getElementById("feedback");
const resetBtn = document.getElementById("resetBtn");
const attemptList = document.getElementById("attemptList");
const attemptCount = document.getElementById("attemptCount");
const searchInput = document.getElementById("search");

// Initialize the quiz
async function initQuiz() {
  await loadHighScore();
  await loadQuestion();
  updateScoreDisplay();
  updateAttempts();
}

// Load high score from backend
async function loadHighScore() {
  try {
    const response = await fetch(`${BASE_URL}/highscore`);
    if (!response.ok) throw new Error('Failed to load high score');
    const data = await response.json();
    highScore = data.high_score;
  } catch (error) {
    console.error("High score error:", error);
    feedback.textContent = "Failed to load high score";
  }
}

// Load a new question from backend
async function loadQuestion() {
  if (gameOver) return;

  try {
    const response = await fetch(`${BASE_URL}/question`);
    if (!response.ok) throw new Error('Failed to load question');
    
    const data = await response.json();
    currentQuestion = data;

    // Update question display
    questionDiv.textContent = data.text;
    feedback.textContent = "";

    // Create answer options
    form.innerHTML = data.options.map(option => `
      <label>
        <input type="radio" name="answer" value="${option}" required>
        ${option}
      </label><br/>
    `).join("") + `<button type="submit">Submit</button>`;

    form.dataset.id = data.id;
  } catch (error) {
    console.error("Question error:", error);
    questionDiv.textContent = "Failed to load question";
    feedback.textContent = error.message;
  }
}

// Handle answer submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (gameOver) return;

  const selected = form.querySelector("input[name=answer]:checked");
  if (!selected) {

::contentReference[oaicite:3]{index=3}
 
