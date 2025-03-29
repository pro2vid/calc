const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -15,
    velocity: 0,
    jump() {
        this.velocity = this.lift;
    },
    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Prevent bird from going out of bounds
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    draw() {
        ctx.fillStyle = "#ff0";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

const pipes = [];
const pipeWidth = 40;
const pipeGap = 150;
let score = 0;
let gameOver = false;

function generatePipe() {
    const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: canvas.height - pipeHeight - pipeGap
    });
}

function updatePipes() {
    pipes.forEach((pipe, index) => {
        pipe.x -= 2;

        // Collision detection
        if (pipe.x < bird.x + bird.width && pipe.x + pipeWidth > bird.x) {
            if (bird.y < pipe.top || bird.y + bird.height > pipe.top + pipeGap) {
                gameOver = true;
            }
        }

        // Remove pipes that have passed off-screen
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(index, 1);
            score++;
        }
    });
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = "#228B22";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, pipe.bottom);
    });
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 100, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.update();
    bird.draw();
    updatePipes();
    drawPipes();
    drawScore();

    if (Math.random() < 0.02) {
        generatePipe();
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", () => {
    if (!gameOver) {
        bird.jump();
    }
});

gameLoop();
