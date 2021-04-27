//const container = document.getElementById('container');
const newGame = document.getElementById('new-game-btn');
const restartBtn = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');
let boardItems = [];
let xPlaying = false;
let winner = false;
let playerOnePoints = 0;
let playerTwoPoints = 0;

const Board = (mark, id) => {
    const gameBoard = document.getElementById('game-board');
    Array.from(gameBoard.children).forEach(item => {
        if(id === item.dataset.id) {
            boardItems[Number(id)] = mark
            item.textContent = mark
        }
    })
};

const Player = (name) => {
    return name
} 

const playerX = Player('X');
const playerO = Player('O');

const printMark = (e, mark) => {
    if(mark === "X") xPlaying = true;
    if(mark === "O") xPlaying = false;
    Board(mark, e.target.dataset.id)
}

const checkWinner = (mark) => {
    if(boardItems[0] === mark && boardItems[3] === mark && boardItems[6] === mark) {
        winner = true;
        showWinner(mark)
    }
    if(boardItems[1] === mark && boardItems[4] === mark && boardItems[7] === mark) {
        winner = true;
        showWinner(mark)
    }
    if(boardItems[2] === mark && boardItems[5] === mark && boardItems[8] === mark) {
        winner = true;
        showWinner(mark)
    }
    if(boardItems[0] === mark && boardItems[1] === mark && boardItems[2] === mark) {
        winner = true;
        showWinner(mark)
    }
    if(boardItems[3] === mark && boardItems[4] === mark && boardItems[5] === mark) {
        winner = true;
        showWinner(mark)
    }
    if(boardItems[6] === mark && boardItems[7] === mark && boardItems[8] === mark) {
        winner = true;
        showWinner(mark)
    }
    if(boardItems[0] === mark && boardItems[4] === mark && boardItems[8] === mark) {
        winner = true;
        showWinner(mark)
    }
    if(boardItems[2] === mark && boardItems[4] === mark && boardItems[6] === mark) {
        winner = true;
        showWinner(mark)
    }

    let boardFull = boardItems.filter(item => item)
    if(boardFull.length === 9 && !winner) {
    const modalBtn = document.getElementById('modal-btn');
        modalBtn.classList.toggle('active')
    }
}

const showWinner = (mark) => {
    const result = document.getElementById('result');
    const playerOne = document.getElementById('player-one-points');
    const playerTwo = document.getElementById('player-two-points');
    const modalBtn = document.getElementById('modal-btn');
    if(mark === "X") {
        result.textContent = `${mark} is the winner`;
        playerOnePoints++;
        playerOne.textContent = playerOnePoints;
        modalBtn.classList.toggle('active')
    }
    if(mark === "O") {
        result.textContent = `${mark} is the winner`;
        playerTwoPoints++;
        playerTwo.textContent = playerTwoPoints;
        modalBtn.classList.toggle('active')
    }
}

const setNewGame = () => {
    const playerOne = document.getElementById('player-one-name');
    const playerTwo = document.getElementById('player-two-name');
    if(playerOne.value === "") {
        playerOne.value = "Player 1"
    }
    if(playerTwo.value === "") {
        playerTwo.value = "Player 2"
    }
    const playerOneNewName = document.getElementById('player1');
    playerOneNewName.textContent = playerOne.value;
    const playerTwoNewName = document.getElementById('player2');
    playerTwoNewName.textContent = playerTwo.value;
    const modal = document.getElementById('modal');
    modal.classList.add('active');
}
const playAgain = () => {
    const gameBoard = document.getElementById('game-board');
    const modalBtn = document.getElementById('modal-btn');
    Array.from(gameBoard.children).forEach(item => {
            item.textContent = ""
    });
    winner = false;
    xPlaying = false
    boardItems = [];
    modalBtn.classList.toggle('active')
}

const restartGame = () => {
    const gameBoard = document.getElementById('game-board');
    Array.from(gameBoard.children).forEach(item => {
            item.textContent = ""
    });
    winner = false;
    xPlaying = false
    boardItems = [];
    playerOnePoints = 0;
    playerTwoPoints = 0;
    const playerOne = document.getElementById('player-one-points');
    const playerTwo = document.getElementById('player-two-points');
    playerOne.textContent = playerOnePoints;
    playerTwo.textContent = playerTwoPoints;
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

newGame.addEventListener("click", setNewGame);

document.addEventListener('click', (e) => {
    const div = document.querySelectorAll('.box');
        Array.from(div).forEach(item => {
            if(e.target === item && !winner) {
                if(item.textContent !== "") return
                if(item.textContent === "" && !xPlaying) {
                    printMark(e, playerX)
                    checkWinner(playerX)
                } if(item.textContent === "" && xPlaying) {
                    printMark(e, playerO)
                    checkWinner(playerO)
                }
            }
        })
})

playAgainBtn.addEventListener("click", playAgain)
restartBtn.addEventListener('click', restartGame)