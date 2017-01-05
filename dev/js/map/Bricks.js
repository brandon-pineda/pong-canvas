import {canvas} from "./Canvas";

class Bricks {
    constructor(){
        this.brickHeight = 15;
        this.brickWidth = 2;
        this.brickPadding = 10;
    }

    draw() {
        let i = 0;
        for(i; i<32; i++) {
            let brickY = (i * (this.brickHeight + this.brickPadding)) + 5;
            canvas.ctx.beginPath();
            canvas.ctx.rect(canvas.canvas.width / 2, brickY, this.brickWidth, this.brickHeight);
            canvas.ctx.fillStyle = "#FFF";
            canvas.ctx.fill();
            canvas.ctx.closePath();
        }
    }
}

export let bricks = new Bricks();
