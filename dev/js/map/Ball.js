import {canvas} from "./Canvas";

class Ball {
    constructor(){
        this.x= canvas.canvas.width/2;
        this.y= 0;
        this.dx = 1;
        this.dy = 1;
        this.squareBallLength = 8;
    }

    draw() {
        canvas.ctx.beginPath();
        canvas.ctx.rect(this.x, this.y, this.squareBallLength, this.squareBallLength);
        canvas.ctx.fillStyle = "#FFF";
        canvas.ctx.fill();
        canvas.ctx.closePath();
    }
}

export let ball = new Ball();
