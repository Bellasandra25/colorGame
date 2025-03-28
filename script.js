// Get elements
let targetColorBox = document.querySelector(".colorBox");
let buttons = document.querySelectorAll(".colorOption");
let scoreDisplay = document.querySelector(".score");
let gameStatus = document.querySelector(".gameStatus");
let resetButton = document.querySelector(".newGameButton");

// Available colors and their shades
let colorShades = {
    red: ["red", "darkred", "firebrick", "indianred", "salmon"],
    blue: ["blue", "darkblue", "deepskyblue", "dodgerblue", "steelblue"],
    green: ["green", "darkgreen", "forestgreen", "seagreen", "lightgreen"],
    yellow: ["yellow", "gold", "darkgoldenrod", "khaki", "lightyellow"],
    purple: ["purple", "indigo", "mediumpurple", "darkorchid", "blueviolet"],
    orange: ["orange", "darkorange", "chocolate", "sandybrown", "peru"]
};

let targetColor = ""; // Correct answer
let correctShade = ""; // Correct shade of the color
let score = 0; // Persistent score
let gameActive = true; // Track if the game is running

// Function to start a new round
function startGame() {
    if (!gameActive) return; // Stop game if player lost

    // Pick a random color category
    let colorKeys = Object.keys(colorShades);
    targetColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    
    // Pick the exact shade for the correct answer
    let shades = [...colorShades[targetColor]];
    correctShade = shades[Math.floor(Math.random() * shades.length)];

    // Set the target box color
    targetColorBox.style.backgroundColor = correctShade;

    // Shuffle the shades and assign them to buttons
    shades = shades.sort(() => Math.random() - 0.5);
    buttons.forEach((button, index) => {
        button.style.backgroundColor = shades[index];
        button.setAttribute("data-color", shades[index]);
    });

    // Reset game status message
    gameStatus.innerText = "Click on the color that matches the big circle.";
}

// Function to check if the clicked color is correct
function checkColor(event) {
    if (!gameActive) return; // Stop if the game is over

    let userColor = event.target.getAttribute("data-color");

    if (userColor === correctShade) {
        gameStatus.innerText = "Correct! Keep going!";
        score++; // Increase score only on correct answer
        scoreDisplay.innerText = `Score: ${score}`;
        setTimeout(startGame, 1000); // Start new round automatically
    } else {
        gameStatus.innerText = "Wrong! Game Over. Click reset to play again.";
        gameActive = false; // Stop the game
    }
}

// Event listeners for buttons
buttons.forEach(button => {
    button.addEventListener("click", checkColor);
});

// Reset button
resetButton.addEventListener("click", () => {
    score = 0; // Reset score
    scoreDisplay.innerText = `Score: ${score}`;
    gameActive = true; // Enable game again
    startGame(); // Restart game
});

// Start the first round
startGame();
