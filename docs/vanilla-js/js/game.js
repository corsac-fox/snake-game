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
    direction: null,
}];

document.addEventListener('keydown', setDirection);

/** Set the direction of the snake by pressing a key */
function setDirection(event) {
    if ((event.keyCode === 37 || event.keyCode === 65) && snake[0].direction != 'right') {
        snake[0].direction = 'left';
    } else if ((event.keyCode === 38 || event.keyCode === 87) && snake[0].direction != 'down') {
        snake[0].direction = 'up';
    } else if ((event.keyCode === 39 || event.keyCode === 68) && snake[0].direction != 'left') {
        snake[0].direction = 'right';
    } else if ((event.keyCode === 40 || event.keyCode === 83) && snake[0].direction != 'up') {
        snake[0].direction = 'down';
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

        if (snakeX < box || snakeX > box * 17
            || snakeY < box * 3 || snakeY > box * 17
        ) clearInterval(game);

        if (snake[0].direction === 'left') {
            snakeX -= box;
        };
        if (snake[0].direction === 'right') {
            snakeX += box;
        };
        if (snake[0].direction === 'up') {
            snakeY -= box;
        };
        if (snake[0].direction === 'down') {
            snakeY += box;
        };

        let newHead = {
            x: snakeX,
            y: snakeY,
            direction: snake[0].direction,
        };

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            updateFood();
        } else {
            snake.pop();
        }

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
        direction: null,
    };
    game = setInterval(drawGame, 100);    
}