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
    form.innerHTML = data.options.map(option =>
      `<label>
        <input type="radio" name="answer" value="${option}" required>
        ${option}
      </label><br/>`
    ).join("") + `<button type="submit">Submit</button>`;

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
  if (!selected) return;

  const answer = selected.value;
  const questionId = parseInt(form.dataset.id);

  try {
    const response = await fetch(`${BASE_URL}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: questionId, answer, score }),
    });

    const result = await response.json();

    if (result.is_correct) {
      score = result.score;
      feedback.textContent = "✅ Correct!";
    } else {
      feedback.textContent = `❌ Wrong! Correct answer: ${result.correct_answer}`;
      gameOver = true;
      resetBtn.classList.remove("hidden");
    }

    highScore = result.high_score;
    updateScoreDisplay();

    attemptHistory.push({
      question: currentQuestion.text,
      selected: answer,
      correct: result.correct_answer,
      is_correct: result.is_correct,
    });

    updateAttempts();

    if (!gameOver) {
      await loadQuestion();
    }
  } catch (error) {
    console.error("Submit error:", error);
    feedback.textContent = "Failed to submit answer";
  }
});

// Reset quiz
resetBtn.addEventListener("click", () => {
  score = 0;
  gameOver = false;
  resetBtn.classList.add("hidden");
  initQuiz();
});

// Update score display
function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
}

// Update attempt history
function updateAttempts() {
  attemptCount.textContent = `Total attempts: ${attemptHistory.length}`;
  renderAttempts(searchInput.value);
}

// Search bar filtering
searchInput.addEventListener("input", (e) => {
  renderAttempts(e.target.value);
});

// Render attempts list
function renderAttempts(query = "") {
  attemptList.innerHTML = "";
  attemptHistory
    .filter(attempt =>
      attempt.question.toLowerCase().includes(query.toLowerCase()) ||
      attempt.selected.toLowerCase().includes(query.toLowerCase())
    )
    .forEach(attempt => {
      const div = document.createElement("div");
      div.textContent = `${attempt.question} → You: ${attempt.selected}, Correct: ${attempt.correct}`;
      div.className = attempt.is_correct ? "correct" : "incorrect";
      attemptList.appendChild(div);
    });
}

// Start the quiz
initQuiz();
