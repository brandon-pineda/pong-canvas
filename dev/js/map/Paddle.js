import {canvas} from "./Canvas";

class Paddle {
    constructor(x){
        this.paddleHeight = 50;
        this.paddleWidth = 10;
        this.x = x;
        this.y = (canvas.canvas.height - this.paddleHeight) / 2;
    }

    draw() {
        canvas.ctx.beginPath();
        canvas.ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
        canvas.ctx.fillStyle = "#FFF";
        canvas.ctx.fill();
        canvas.ctx.closePath();
    }

    reset(x) {
        this.paddleHeight = 50;
        this.paddleWidth = 10;
        this.x = x;
        this.y = (canvas.canvas.height - this.paddleHeight) / 2;
    }
}

export let paddle1 = new Paddle(10);
export let paddleAI = new Paddle(canvas.canvas.width - 10 - 10);
