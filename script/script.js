const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCounter;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCounter = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCounter}.svg`;
    guessesText.innerText = `${wrongGuessCounter}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b> ${currentWord} </b>`;
        gameModal.classList.add("show");
    }, 300);
};

const initGame = (button, clickedLetter) => {
    let correctGuess = false;

    // Check all positions for the clicked letter
    [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter && !correctLetters.includes(clickedLetter)) {
            correctLetters.push(clickedLetter); // Track the letter as guessed
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            correctGuess = true;
        }
    });

    // If the guessed letter is incorrect
    if (!correctGuess) {
        wrongGuessCounter++;
        hangmanImage.src = `images/hangman-${wrongGuessCounter}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCounter}/${maxGuesses}`;

    if (wrongGuessCounter === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Create keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);
