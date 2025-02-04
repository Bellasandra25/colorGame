alert("Welcome to the Color Guessing Game! Click on the color that matches the big circle above. Good luck!");

// Get elements
let targetColorBox = document.querySelector(".colorBox");
let buttons = document.querySelectorAll(".colorOption");
let scoreDisplay = document.querySelector(".score");
let gameStatus = document.querySelector(".gameStatus");
let resetButton = document.querySelector(".newGameButton");

// Available colors
let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = ""; // The correct answer
let score = 0;

// Function to start the game
function startGame() {
    // Pick a random color for the target box
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetColorBox.style.backgroundColor = targetColor;

    // Shuffle colors and assign them to buttons
    let shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    buttons.forEach((button, index) => {
        button.style.backgroundColor = shuffledColors[index];
        button.setAttribute("data-color", shuffledColors[index]); 
    });

    // Reset game status message
    gameStatus.innerText = "Click on the color that matches the big circle.";
}

// Function to check if the clicked color is correct
function checkColor(event) {
    let userColor = event.target.getAttribute("data-color");
    if (userColor === targetColor) {
        gameStatus.innerText = " Correct! Well done!";
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
    } else {
        gameStatus.innerText = "Wrong! Try again.";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", checkColor);
});

resetButton.addEventListener("click", startGame);

startGame();
