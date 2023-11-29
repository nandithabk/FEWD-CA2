//Making timer functional.
var timer=document.getElementById("time-display")
var time = 20
var timerId

function startTimer() {
   timer.innerHTML = time

  timerId = setInterval(() => {
    time--
    if (time == 0) location.href = "./index.html"
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
    const wordHint = [
        { word: "rainbow", hint: "A colorful meteorological phenomenon" },
        {
            word: "adventure",
            hint: "An exciting or daring experience."
        },
        {
            word: "football",
            hint: "A popular sport played with a spherical ball."
        },
        {
            word: "chocolate",
            hint: "A sweet treat made from cocoa beans."
        },
        {
            word: "butterfly",
            hint: "An insect with colorful wings and a slender body."
        },
        {
            word: "history",
            hint: "The study of past events and human civilization."
        },
        {
            word: "pizza",
            hint: "A savory dish consisting of a round, flattened base with toppings."
        },
        {
            word: "jazz",
            hint: "A genre of music characterized by improvisation and syncopation."
        },
        {
            word: "camera",
            hint: "A device used to capture and record images or videos."
        },
    
        {
            word: "guitar",
            hint: "A musical instrument with strings."
        },
    
        {
            word: "oxygen",
            hint: "A colorless, odorless gas essential for life."
        },
    
        {
            word: "mountain",
            hint: "A large natural elevation of the Earth's surface."
        },
    
        {
            word: "painting",
            hint: "An art form using colors on a surface to create images or expression."
        },
    
        {
            word: "astronomy",
            hint: "The scientific study of celestial objects and phenomena."
        },
    
        {
            word: "diamond",
            hint: "A precious gemstone known for its brilliance and hardness."
        },
    
        {
            word: "adventure",
            hint: "An exciting or daring experience."
        },
    
        {
            word: "science",
            hint: "The systematic study of the structure and behavior of the physical and natural world."
        },
        
        {
            word: "bicycle",
            hint: "A human-powered vehicle with two wheels."
        },
    
        {
            word: "sunset",
            hint: "The daily disappearance of the sun below the horizon."
        },
    
        {
            word: "coffee",
            hint: "A popular caffeinated beverage made from roasted coffee beans."
        },
    
        {
            word: "dance",
            hint: "A rhythmic movement of the body often performed to music."
        },
    
        {
            word: "galaxy",
            hint: "A vast system of stars, gas, and dust held together by gravity."
        },
    
        {
            word: "orchestra",
            hint: "A large ensemble of musicians playing various instruments."
        },
    
        {
            word: "volcano",
            hint: "A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected."
        },
        
        {
            word: "technology",
            hint: "The application of scientific knowledge for practical purposes."
        },
    
        {
            word: "rainbow",
            hint: "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light."
        },
    
        {
            word: "universe",
            hint: "All existing matter, space, and time as a whole."
        },
    
        {
            word: "piano",
            hint: "A musical instrument played by pressing keys that cause hammers to strike strings."
        },
       
        {
            word: "rainforest",
            hint: "A dense forest characterized by high rainfall and biodiversity."
        },
        
        {
            word: "telephone",
            hint: "A device used to transmit sound over long distances."
        },
    
        {
            word: "language",
            hint: "A system of communication consisting of words, gestures, and syntax."
        },
        
        {
            word: "sunflower",
            hint: "A tall plant with a large yellow flower head."
        },
        
        {
            word: "telescope",
            hint: "An optical instrument used to view distant objects in space."
        },
    
        {
            word: "breeze",
            hint: "A gentle wind."
        },
    
        {
            word: "enigma",
            hint: "Something that is mysterious, puzzling, or difficult to understand."
        },
        {
            word: "paradox",
            hint: "A statement or situation that contradicts itself or defies intuition."
        },
        {
            word: "puzzle",
            hint: "A game, toy, or problem designed to test ingenuity or knowledge."
        },
        {
            word: "whisper",
            hint: "To speak very softly or quietly, often in a secretive manner."
        },
        {
            word: "shadow",
            hint: "A dark area or shape produced by an object blocking the light."
        },
        {
            word: "secret",
            hint: "Something kept hidden or unknown to others."
        },
        {
            word: "curiosity",
            hint: "A strong desire to know or learn something."
        },
    
        {
            word: "unpredictable",
            hint: "Not able to be foreseen or known beforehand; uncertain."
        },
        
        {
            word: "unveil",
            hint: "To make known or reveal something previously secret or unknown."
        },
    
        {
            word: "illusion",
            hint: "A false perception or belief; a deceptive appearance or impression."
        },
    
        {
            word: "moonlight",
            hint: "The light from the moon."
        },
    
        {
            word: "vibrant",
            hint: "Full of energy, brightness, and life."
        },
    
        {
            word: "brilliant",
            hint: "Exceptionally clever, talented, or impressive."
        }
    
      ]

    const { word, hint } = wordHint[Math.floor(Math.random() * wordHint.length)]
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