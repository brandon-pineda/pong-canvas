import {canvas, ball, paddle1, paddleAI, bricks} from "./variables";
import * as input from "./input";
import * as score from "./score";
import {paddleAIMovement} from "./AI";

let scoreTracker = [0, 0];
let roundStart = true;

function drawPaddle1() {
    canvas.ctx.beginPath();
    canvas.ctx.rect(paddle1.paddleLeftOffset, paddle1.y, paddle1.paddleWidth, paddle1.paddleHeight);
    canvas.ctx.fillStyle = "#FFF";
    canvas.ctx.fill();
    canvas.ctx.closePath();
}

function drawPaddleAI() {
    canvas.ctx.beginPath();
    canvas.ctx.rect(paddleAI.paddleRightOffset, paddleAI.y, paddleAI.paddleWidth, paddleAI.paddleHeight);
    canvas.ctx.fillStyle = "#FFF";
    canvas.ctx.fill();
    canvas.ctx.closePath();
}

function drawCenterLine() {
    let i = 0;
    for(i; i<32; i++) {
        let brickY = (i * (bricks.brickHeight + bricks.brickPadding)) + 5;
        canvas.ctx.beginPath();
        canvas.ctx.rect(canvas.canvas.width / 2, brickY, bricks.brickWidth, bricks.brickHeight);
        canvas.ctx.fillStyle = "#FFF";
        canvas.ctx.fill();
        canvas.ctx.closePath();
    }
}

function drawBall() {
    canvas.ctx.beginPath();
    canvas.ctx.rect(ball.x, ball.y, ball.squareBallLength, ball.squareBallLength);
    canvas.ctx.fillStyle = "#FFF";
    canvas.ctx.fill();
    canvas.ctx.closePath();
}

function setupStartRound() {
    ball.x = canvas.canvas.width/2;
    ball.y = (Math.random() * (canvas.canvas.height + 1));
    let xDirection = Math.random() < 0.5 ? 1 : -1;
    let yDirection = Math.random() < 0.5 ? 1 : -1;
    ball.dx *= xDirection;
    ball.dy *= yDirection;
    roundStart = false;
}

const draw = () => {
    canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    if (roundStart) setupStartRound();
    drawPaddle1();
    drawPaddleAI();
    drawCenterLine();
    drawBall();
    score.drawScore(scoreTracker);

    if (input.checkDownPress()) {
        paddle1.y += 15;
    }
    else if(input.checkUpPress()) {
        paddle1.y -= 15;
    }

    paddleAIMovement();

    //top wall
    if(ball.y + ball.dy > canvas.canvas.height- (ball.squareBallLength/2) || ball.y + ball.dy <  (ball.squareBallLength/2) ) {
        ball.dy *= -1;
    }

    if(ball.x + ball.dx < ball.squareBallLength) {
        if(ball.y > paddle1.y && ball.y < paddle1.y + paddle1.paddleHeight) {
            ball.dx *= -1;
        } else {
            scoreTracker[1] += 1;
            roundStart = true;
        }
    }

    if(ball.x + ball.dx > canvas.canvas.width - (ball.squareBallLength * 1.5)) {
        if(ball.y > paddleAI.y && ball.y < paddleAI.y + paddleAI.paddleHeight) {
            ball.dx *= -1;
        } else {
            scoreTracker[0] += 1;
            roundStart = true;
        }
    }


    ball.x += ball.dx;
    ball.y += ball.dy;
    requestAnimationFrame(draw);
};

document.addEventListener("keydown", input.keyDownHandler, false);
document.addEventListener("keyup", input.keyUpHandler, false);
draw();
