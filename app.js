//Making timer functional.
var timer=document.getElementById("time-display")
var time = 20
var timerId

function startTimer() {
   timer.innerHTML = time

  timerId = setInterval(() => {
    time--
    if (time == 0) location.href = "index.html"
    timer.innerHTML = time
  }, 1000)

}

function resetTime(intervalId) {
  clearInterval(intervalId)
  startTimer()
}

startTimer()

const wordDisplay = document.querySelector(".word-letters")
const guessesText = document.querySelector(".incorrect-guesses b")
const keyboardDiv = document.querySelector(".keyboard-layout")
const hangmanImage = document.querySelector(".hangman-stage img")
const gameOverlay = document.querySelector(".game-overlay")
const playAgainBtn = document.querySelector(".restart-btn")

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount
const maxGuesses = 6

const resetGame = () => {
    // Resetting game variables and UI elements
    correctLetters = []
    wrongGuessCount = 0
    hangmanImage.src = "#"; // Set the initial hangman image source
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("")
    keyboardDiv.querySelectorAll("button").forEach((btn) => (btn.disabled = false))
    gameOverlay.classList.remove("show")
};

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList (assuming it's defined somewhere)
    const wordList = [
        { word: "rainbow", hint: "A colorful meteorological phenomenon" },
      ]

    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    document.querySelector(".hint-description b").innerText = hint
    resetGame()
};

const gameOver = (isVictory) => {
    // Clear the timer interval
    clearInterval(timerId);

    // After the game is complete, show modal with relevant details
    const modalText = isVictory ? "You found the word:" : "The correct word was:"
    gameOverlay.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`
    gameOverlay.querySelector("h4").innerText = isVictory ? "Congrats!" : "Game Over!"
    gameOverlay.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
    gameOverlay.classList.add("show");
};


const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is in the currentWord
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
        wrongGuessCount++
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`

    if (wrongGuessCount === maxGuesses) return gameOver(false)
    if (correctLetters.length === currentWord.length) return gameOver(true)
};

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)