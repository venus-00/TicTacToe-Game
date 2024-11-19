const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status-text");
const restartBtn = document.querySelector(".restart-btn");

const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = Array(9).fill("");
let currentPlayer = "X";
let running = false;

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => cellClicked(index));
    });
    restartBtn.addEventListener("click", restartGame);
    updateStatus(`${currentPlayer}'s turn`);
    running = true;
}

function cellClicked(index) {
    if (options[index] !== "" || !running) return;

    updateCell(index);
    checkWinner();
}

function updateCell(index) {
    options[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`${currentPlayer}'s turn`);
}

function checkWinner() {
    const roundWon = winningPossibilities.some(combination =>
        combination.every(index => options[index] === currentPlayer)
    );

    if (roundWon) {
        updateStatus(`${currentPlayer} wins!`);
        running = false;
    } else if (!options.includes("")) {
        updateStatus("Draw!");
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    options.fill("");
    currentPlayer = "X";
    cells.forEach(cell => (cell.textContent = ""));
    updateStatus(`${currentPlayer}'s turn`);
    running = true;
}

function updateStatus(message) {
    statusText.textContent = message;
}

// Initialize the game
initializeGame();
