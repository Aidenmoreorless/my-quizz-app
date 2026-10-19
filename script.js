// QUESTIONS DATA ARRAY
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    answer: "Oxygen"
  },
  {
    question: "What is 8 x 7?",
    options: ["54", "56", "64", "49"],
    answer: "56"
  }
];

// VARIABLES: Track current state
let currentQuestionIndex = 0;
let score = 0;
let placement = 4;

// HTML ELEMENTS
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-btn");
const scoreDisplay = document.getElementById("score-display");
const placementDisplay = document.getElementById("placement-display");
const gameStatus = document.getElementById("game-status");
const nextBtn = document.getElementById("next-btn");
const endScreen = document.getElementById("end-screen");
const questionSection = document.querySelector(".question-section");
const avatarSection = document.querySelector(".avatar-section");
const bannerSection = document.querySelector(".banner-section");
const finalStats = document.getElementById("final-stats");
const podiumWinnerName = document.getElementById("podium-winner-name");
const restartBtn = document.getElementById("restart-btn");
const currentBlook = document.getElementById("current-blook");
const avatarButtons = document.querySelectorAll(".avatar-btn");

// FUNCTION: Avatar Selection (Feature 2)
function selectAvatar(event) {
  const clickedButton = event.currentTarget;
  
  avatarButtons.forEach(btn => btn.classList.remove("selected"));
  clickedButton.classList.add("selected");
  
  currentBlook.textContent = clickedButton.dataset.avatar;
}

// FUNCTION: Load current question into UI
function loadQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  
  answerButtons.forEach((btn, index) => {
    btn.textContent = q.options[index];
    btn.disabled = false;
    btn.classList.remove("correct", "incorrect");
  });

  nextBtn.classList.add("hidden");
  gameStatus.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
}

// FUNCTION: Handle Answer Selection
function handleAnswer(event) {
  const selectedBtn = event.currentTarget;
  const chosenAnswer = selectedBtn.textContent.trim();
  const correctAnswer = quizQuestions[currentQuestionIndex].answer;

  // Disable answer buttons after selection
  answerButtons.forEach(btn => btn.disabled = true);

  if (chosenAnswer === correctAnswer) {
    score += 100;
    if (placement > 1) placement -= 1; // Move up rank
    selectedBtn.classList.add("correct");
    gameStatus.textContent = "Correct! +100 Points!";
  } else {
    score -= 100;
    if (score < 0) score = 0;
    selectedBtn.classList.add("incorrect");
    gameStatus.textContent = "Incorrect! -100 Points!";
  }

  scoreDisplay.textContent = score;
  placementDisplay.textContent = `#${placement}`;

  // Show Next Button or End Button text
  if (currentQuestionIndex < quizQuestions.length - 1) {
    nextBtn.textContent = "Next Question ➔";
  } else {
    nextBtn.textContent = "See Final Results 🏆";
  }
  nextBtn.classList.remove("hidden");
}

// FUNCTION: Move to Next Question or Show Podium
function handleNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showEndScreen();
  }
}

// FUNCTION: Display Final Podium Screen
function showEndScreen() {
  questionSection.classList.add("hidden");
  avatarSection.classList.add("hidden");
  bannerSection.classList.add("hidden");
  
  endScreen.classList.remove("hidden");
  
  const blookName = currentBlook.textContent;
  const displayName = (blookName !== "None") ? blookName : "You";
  
  podiumWinnerName.textContent = displayName;
  finalStats.textContent = `You finished in #${placement} place with ${score} points!`;
  gameStatus.textContent = "Game Complete!";
}

// FUNCTION: Restart Game
function restartGame() {
  currentQuestionIndex = 0;
  score = 0;
  placement = 4;
  
  scoreDisplay.textContent = score;
  placementDisplay.textContent = `#${placement}`;
  
  endScreen.classList.add("hidden");
  questionSection.classList.remove("hidden");
  avatarSection.classList.remove("hidden");
  bannerSection.classList.remove("hidden");
  
  loadQuestion();
}

// EVENT LISTENERS
avatarButtons.forEach(button => {
  button.addEventListener("click", selectAvatar);
});

answerButtons.forEach(button => {
  button.addEventListener("click", handleAnswer);
});

nextBtn.addEventListener("click", handleNextQuestion);
restartBtn.addEventListener("click", restartGame);

// INITIAL LOAD
loadQuestion();