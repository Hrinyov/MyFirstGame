let canvas = document.getElementById("game");
const stx = canvas.getContext("2d");

const ground = new Image();
ground.src = "/img/bgd.bmp";

const foodImg = new Image();
foodImg.src = "/img/food.png";

const snakeImg = new Image();
snakeImg.src = "/img/snake.png";

const jellyfishImg = new Image();
jellyfishImg.src = "/img/jellyfish.png";

let box = 48;
let score = 0;

let food = {
    x: Math.floor((Math.random() * 15) + 0) * box,
    y: Math.floor((Math.random() * 15) + 1) * box,
}
let jellyfish = {
    x: randomPositionX(),
    y: randomPositionY(),
}
let snake = [];
snake[0] = {
    x: 8 * box,
    y: (9 * box),

}
let gameOver = 'GAME OVER';
let win = 'WIN!';
let dir;
function randomPositionX() {
    return (Math.floor((Math.random() * 15) + 0) * box)
}
function randomPositionY() {
    return (Math.floor((Math.random() * 15) + 1) * box)
}
function GameOver() {
    stx.fillStyle = "Black";
    stx.font = "80px Arial";
    stx.fillText(gameOver, box * 2.5, box * 7);
}
function Win() {
    stx.fillStyle = "Black";
    stx.font = "80px Arial";
    stx.fillText(win, box * 5, box * 7);
}
document.addEventListener('keydown', direction);
function direction(event) {
    if (event.keyCode == 37 && dir != 'right')
        dir = 'left';
    else if (event.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if (event.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if (event.keyCode == 40 && dir != 'up')
        dir = 'down';
}
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            GameOver();
        }

    }
}
function drawGame() {
    stx.drawImage(ground, 0, 0);
    stx.drawImage(foodImg, food.x, food.y);
    stx.drawImage(jellyfishImg, jellyfish.x, jellyfish.y);
    for (let i = 0; i < snake.length; i++) {
        stx.drawImage(snakeImg, snake[i].x, snake[i].y);
    }
    stx.fillStyle = "white";
    stx.font = "42px Arial";
    stx.fillText(score, box * 14, box * 0.7);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: randomPositionX(),
            y: randomPositionY(),

        }
    } else {
        if (snakeX == jellyfish.x && snakeY == jellyfish.y) {
            score--;
            jellyfish = {
                x: randomPositionX(),
                y: randomPositionY(),
            }
            snake.pop();
            snake.pop();
        }
        else { snake.pop(); }
    }
    if (snakeX < 0 || snakeX > box * 14
        || snakeY < box || snakeY > box * 15) {
        clearInterval(game);
        GameOver();
    }
    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;
    let snakeHead = {
        x: snakeX,
        y: snakeY,
    }
    eatTail(snakeHead, snake);
    snake.unshift(snakeHead);
    if (score > 19) {
        clearInterval(game);
        Win();
    }
    if (score < 0) {
        clearInterval(game);
        GameOver();
    }
}
let game = setInterval(drawGame, 350);