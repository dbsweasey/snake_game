// To begin, press CTRL + ALT + 8
// To end, press CTRL + ALT + Q


import { update as updateSnake, draw as drawSnake, SNAKE_SPEED,
getSnakeHead, snakeIntersection, updateScore as totalScore } from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
let score = 0
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. You had ' + totalScore() +' points. Press ok to restart.')) {
            window.location = './'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
