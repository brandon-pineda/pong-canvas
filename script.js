const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let paddleHeight = 50;
let paddleWidth = 10;
let paddleY = (canvas.height - paddleHeight) / 2;
let upPressed = false;
let downPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 38) {
        upPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 38) {
        upPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    }
}

function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(10, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth - 10, (canvas.height - paddleHeight) / 2, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle1();
    drawPaddle2();
    if(downPressed && paddleY < canvas.height- paddleHeight) {
        paddleY += 7;
    }
    else if(upPressed && paddleY > 0) {
        paddleY -= 7;
    }
    requestAnimationFrame(draw);
}

draw();
