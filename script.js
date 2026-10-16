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