//shared constant variables
global.canvas = document.getElementById("myCanvas");
global.ctx = canvas.getContext("2d");
global.paddleHeight = 50;
global.paddleWidth = 10;

import * as input from "./player/input";

//ball coordinates and velocity
let x= canvas.width/2;
let y= 0;
let dx = 2;
let dy = 2;
//paddle position
let paddleY = (canvas.height - paddleHeight) / 2;

const brickHeight = 15;
const brickWidth = 2;
const brickPadding = 10;

let roundStart = true;
let score = [0, 0];


function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(10, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function drawPaddleAI() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth - 10, (canvas.height - paddleHeight) / 2, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function drawCenterLine() {
    let i = 0;
    for(i; i<32; i++) {
        let brickY = (i * (brickHeight + brickPadding)) + 5;
        ctx.beginPath();
        ctx.rect(canvas.width / 2, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.closePath();
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.rect(x, y, 8, 8);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function setupStartRound() {
    y = (Math.random() * (canvas.height + 1));
    roundStart = false;
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (roundStart) setupStartRound();
    drawPaddle1();
    drawPaddleAI();
    drawCenterLine();
    drawBall();
    if (input.checkDownPress(paddleY)) {
        paddleY += 12;
    }
    else if(input.checkUpPress(paddleY)) {
        paddleY -= 12;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", input.keyDownHandler, false);
document.addEventListener("keyup", input.keyUpHandler, false);
draw();
