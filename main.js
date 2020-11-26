const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [2, 4, 6],
    [1, 4, 7],
    [2, 4, 6],
    [0, 4, 8]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('.board')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.querySelector('#winningMessage')
const restartButton = document.querySelector('#restartButton')
const X_SCORE = document.querySelector('[data-x-score-update]')
const CIRCLE_SCORE = document.querySelector('[data-circle-score-update]')
let X_COUNT = 0
let CIRCLE_COUNT = 0
let circleTurn
const win_sound = document.querySelector('#win-sound')
const placemark_sound = document.querySelector('#placemark-sound')
const draw_sound = document.querySelector('#draw-sound')
    // const back_music = document.querySelector('#back-music')

window.addEventListener('load', (event) => {
    // draw_sound.currentTime = 0
    // back_music.play()
    startGame()
})


restartButton.addEventListener('click', startGame)



function startGame() {
    let circleTurn = false
    win_sound.currentTime = 0
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');
    X_SCORE.textContent = X_COUNT
    CIRCLE_SCORE.textContent = CIRCLE_COUNT;
    draw_sound.pause()
    win_sound.pause()
}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        // Place mark
    placeMark(cell, currentClass)
        // Check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        // Switch turns
        swapTurns()
        setBoardHoverClass()
    }

}

function setScoreBoard() {
    if (circleTurn) {
        CIRCLE_SCORE.textContent = CIRCLE_COUNT++;
        return circleTurn = false
    } else if (!circleTurn) {
        X_SCORE.textContent = X_COUNT++;
    }
}

// Check for draw
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'draw!'
        draw_sound.currentTime = 0
        draw_sound.play()
    } else {
        winningMessageTextElement.innerHTML =
            `${ circleTurn ? "O" : "X" }
            Wins!`
        setScoreBoard();

        win_sound.currentTime = 0
        win_sound.play()
    }
    winningMessageElement.classList.add('show')
}



function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)

    placemark_sound.currentTime = 0
    placemark_sound.play()
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}



function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}