// VARIABLE: Store selected avatar name
let selectedAvatar = "";

// HTML ELEMENTS: Select buttons and feedback text
const avatarButtons = document.querySelectorAll(".avatar-btn");
const currentBlookDisplay = document.getElementById("current-blook");

// FUNCTION: Select an avatar and highlight the active button
function selectAvatar(event) {
  const clickedButton = event.target;
  
  // Remove 'selected' styling from all buttons
  avatarButtons.forEach(btn => btn.classList.remove("selected"));
  
  // Highlight clicked button
  clickedButton.classList.add("selected");
  
  // Update variable and display text
  selectedAvatar = clickedButton.dataset.avatar;
  currentBlookDisplay.textContent = selectedAvatar;
}

// EVENT LISTENERS: Connect click event to every avatar button
avatarButtons.forEach(button => {
  button.addEventListener("click", selectAvatar);
});
// VARIABLES: Track player stats and correct answer
let score = 0;
let placement = 4;
const correctAnswer = "Paris";

// HTML ELEMENTS: Stat displays and answer buttons
const scoreDisplay = document.getElementById("score-display");
const placementDisplay = document.getElementById("placement-display");
const gameStatus = document.getElementById("game-status");
const answerButtons = document.querySelectorAll(".answer-btn");

// FUNCTION: Handle answer clicks
function handleAnswer(event) {
  const selectedBtn = event.target;
  const chosenAnswer = selectedBtn.textContent;

  // Disable all buttons after an answer is chosen
  answerButtons.forEach(btn => btn.disabled = true);

  // CONDITION: Check if answer is correct
  if (chosenAnswer === correctAnswer) {
    score += 100;
    placement = 1; // Move up in rank
    selectedBtn.classList.add("correct");
    gameStatus.textContent = "Correct! +100 Points!";
  } else {
    score -= 100;
    // Score should not go below zero
    if (score < 0) score = 0;
    selectedBtn.classList.add("incorrect");
    gameStatus.textContent = "Incorrect! -100 Points!";
  }

  // Update screen displays
  scoreDisplay.textContent = score;
  placementDisplay.textContent = `#${placement}`;
}

// EVENT LISTENERS: Connect click event to every answer button
answerButtons.forEach(button => {
  button.addEventListener("click", handleAnswer);
});
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

// VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let placement = 4;
let selectedAvatar = "Player";

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
  const selectedBtn = event.target;
  const chosenAnswer = selectedBtn.textContent.trim();
  const correctAnswer = quizQuestions[currentQuestionIndex].answer;

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

  // Show Next Button or End Button
  if (currentQuestionIndex < quizQuestions.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    nextBtn.textContent = "See Final Results 🏆";
    nextBtn.classList.remove("hidden");
  }
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
  
  const blookName = document.getElementById("current-blook").textContent;
  const displayName = blookName !== "None" ? blookName : "You";
  
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
  
  nextBtn.textContent = "Next Question ➔";
  loadQuestion();
}

// EVENT LISTENERS
answerButtons.forEach(button => {
  button.addEventListener("click", handleAnswer);
});

nextBtn.addEventListener("click", handleNextQuestion);
restartBtn.addEventListener("click", restartGame);

// INITIAL LOAD
loadQuestion();