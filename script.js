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