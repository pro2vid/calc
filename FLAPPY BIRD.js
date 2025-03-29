const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const obstacles = document.querySelectorAll('.obstacle');
let birdTop = 250;
let gravity = 2;
let isGameOver = false;

document.addEventListener('keydown', () => {
    if (!isGameOver) {
        birdTop -= 40;
        bird.style.top = birdTop + 'px';
    }
});

function startGame() {
    setInterval(() => {
        if (!isGameOver) {
            birdTop += gravity;
            bird.style.top = birdTop + 'px';
            checkCollision();
        }
    }, 20);
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const birdRect = bird.getBoundingClientRect();
        if (
            birdRect.right > obstacleRect.left &&
            birdRect.left < obstacleRect.right &&
            (birdRect.top < obstacleRect.bottom || birdRect.bottom > obstacleRect.top)
        ) {
            gameOver();
        }
    });

    if (birdTop >= gameContainer.clientHeight - bird.clientHeight || birdTop <= 0) {
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    alert('Game Over!');
    window.location.reload();
}

startGame();
