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
    x: randomPositionX(),
    y: randomPositionY(),
}
let jellyfish = [];
function makeJellyfish() {
    for (let i = 0; i < 4; i++) {
        jellyfish[i] = {
            x: randomPositionX(),
            y: randomPositionY(),
        }
    }
}
makeJellyfish();
let snake = [];
snake[0] = {
    x: 8 * box,
    y: (9 * box),
}
let gameOver = 'GAME OVER';
let win = 'WIN!';
let restart = 'Restart - press ENTER';
let dir;
function randomPositionX() {
    return (Math.floor((Math.random() * 15) + 0) * box)
}
function randomPositionY() {
    return (Math.floor((Math.random() * 15) + 1) * box)
}
function GameOverMessage() {
    stx.fillStyle = "Black";
    stx.font = "80px Arial";
    stx.fillText(gameOver, box * 2.5, box * 7);
}
function WinMessage() {
    stx.fillStyle = "Black";
    stx.font = "80px Arial";
    stx.fillText(win, box * 5, box * 7);
}
function restartGameMessage() {
    stx.fillStyle = "White";
    stx.font = "35px Arial";
    stx.fillText(restart, box * 4, box * 4);
}
function scoreMessage() {
    stx.fillStyle = "white";
    stx.font = "42px Arial";
    stx.fillText(score, box * 14, box * 0.7);
}
function end() {
    clearInterval(game);
    restartGameMessage();
}
document.addEventListener('keydown', direction);
function direction(event) {
    switch (event.keyCode) {
        case 13:
            window.location.reload();
        case 37:
            if (dir != 'right') {
                return dir = 'left';
            }
        case 38:
            if (dir != 'down') {
                return dir = 'up';
            }
        case 39:
            if (dir != 'left') {
                return dir = 'right';
            }
        case 40:
            if (dir != 'up') {
                return dir = 'down';
            }
        default:
            return dir;
    }
}
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            end();
            GameOverMessage();
        }
    }
}
function drawGame() {
    stx.drawImage(ground, 0, 0);
    stx.drawImage(foodImg, food.x, food.y);
    for (let i = 0; i < jellyfish.length; i++) {
        stx.drawImage(jellyfishImg, jellyfish[i].x, jellyfish[i].y);
    }
    for (let i = 0; i < snake.length; i++) {
        stx.drawImage(snakeImg, snake[i].x, snake[i].y);
    }
    scoreMessage();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (snakeX == food.x && snakeY == food.y
        || snakeX == (food.x + box / 2) && snakeY == (food.y + box / 2)
        || snakeX == (food.x - box / 2) && snakeY == (food.y - box / 2)) {
        score++;
        food = {
            x: randomPositionX(),
            y: randomPositionY(),
        }
        makeJellyfish();
    } else { snake.pop(); }
    for (let i = 0; i < jellyfish.length; i++) {
        if (snakeX == jellyfish[i].x && snakeY == jellyfish[i].y
            || snakeX == (jellyfish[i].x + box / 2) && snakeY == (jellyfish[i].y + box / 2)
            || snakeX == (jellyfish[i].x - box / 2) && snakeY == (jellyfish[i].y - box / 2)) {
            score--;
            jellyfish[i] = {
                x: randomPositionX(),
                y: randomPositionY(),
            }
            snake.pop();
        }
    }
    if (snakeX < 0 || snakeX > box * 14
        || snakeY < box || snakeY > box * 15) {
        end();
        GameOverMessage();
    }
    if (dir == 'left') snakeX -= box / 2;
    if (dir == 'right') snakeX += box / 2;
    if (dir == 'up') snakeY -= box / 2;
    if (dir == 'down') snakeY += box / 2;
    let snakeHead = {
        x: snakeX,
        y: snakeY,
    }
    eatTail(snakeHead, snake);
    snake.unshift(snakeHead);
    if (score > 19) {
        end();
        WinMessage();
    }
    if (score < 0) {
        end();
        GameOverMessage();
    }
}
let game = setInterval(drawGame, 150);