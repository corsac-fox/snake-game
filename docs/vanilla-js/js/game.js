const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gamefield = new Image();
gamefield.src = 'vanilla-js/img/gamefield.png';

const foodImg = new Image(); 
foodImg.src = 'vanilla-js/img/food.png';

let box = 32;

let score = 0;
const food = {
    x: Math.floor(Math.random() * 17 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 3) * box
};


/** update the food position */
function updateFood() {
    do {
        food.x = Math.floor(Math.random() * 17 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 3) * box;
    } while (!checkPosition(food));    
};

/** Check if the snake is covering the updated food.
 * Return true if the food position is correct */
function checkPosition(food) {
    for (let elem of snake) {
        if (elem.x === food.x && elem.y === food.y) {
            return false;
        }
    }
    return true;
}

const snake = [{
    x: 9 * box,
    y: 10 * box,
}];

document.addEventListener('keydown', setDirection);

let direction;

/** Set the direction of the snake by pressing a key */
function setDirection(event) {
    if ((event.keyCode === 37 || event.keyCode === 65) && direction != 'right') {
        direction = 'left';
    } else if ((event.keyCode === 38 || event.keyCode === 87) && direction != 'down') {
        direction = 'up';
    } else if ((event.keyCode === 39 || event.keyCode === 68) && direction != 'left') {
        direction = 'right';
    } else if ((event.keyCode === 40 || event.keyCode === 83) && direction != 'up') {
        direction = 'down';
    }
}

function checkCollision(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(gamefield, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText(score, box * 2.5, box * 1.6);
    }
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            updateFood();
        } else {
            snake.pop();
        }

        if (snakeX < box || snakeX > box * 17
            || snakeY < box * 3 || snakeY > box * 17
        ) clearInterval(game);

        if (direction === 'left') {
            snakeX -= box;
        };
        if (direction === 'right') {
            snakeX += box;
        };
        if (direction === 'up') {
            snakeY -= box;
        };
        if (direction === 'down') {
            snakeY += box;
        };

        let newHead = {
            x: snakeX,
            y: snakeY,
        };

        checkCollision(newHead, snake);

        snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);

let restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', restart);

function restart() {
    clearInterval(game);
    score = 0;
    snake.length = 0;
    snake[0] = {
        x: 9 * box,
        y: 10 * box,
    };
    direction = null;
    game = setInterval(drawGame, 100);    
}