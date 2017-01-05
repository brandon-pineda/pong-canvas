class Canvas {
    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
    }
}

export let canvas = new Canvas();


class Ball {
    constructor(){
        this.x= canvas.canvas.width/2;
        this.y= 0;
        this.dx = 3;
        this.dy = 3;
        this.squareBallLength = 8;
    }
}

class Paddle1 {
    constructor(){
        this.paddleHeight = 50;
        this.paddleWidth = 10;
        this.y = (canvas.canvas.height - this.paddleHeight) / 2;
        this.paddleLeftOffset = 10;
    }
}

class PaddleAI {
    constructor(){
        this.paddleHeight = 50;
        this.paddleWidth = 10;
        this.paddleRightOffset = canvas.canvas.width - this.paddleWidth - 10;
        this.y = (canvas.canvas.height - this.paddleHeight) / 2;
    }
}

class Bricks {
    constructor(){
        this.brickHeight = 15;
        this.brickWidth = 2;
        this.brickPadding = 10;
    }
}

export let ball = new Ball();
export let bricks = new Bricks();
export let paddle1 = new Paddle1();
export let paddleAI = new PaddleAI();
