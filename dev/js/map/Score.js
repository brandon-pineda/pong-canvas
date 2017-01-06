import {canvas} from "./Canvas";

class Score {
    constructor(){
        this.points = [0,0];
    }

    draw(){
        canvas.ctx.font = "100px Arial";
        canvas.ctx.fillStyle = "#FFF";
        let textWidth1 = canvas.ctx.measureText(this.points[0]).width;
        let textWidth2 = canvas.ctx.measureText(this.points[1]).width;
        canvas.ctx.fillText(this.points[0], (canvas.canvas.width/4) - (textWidth1 / 2) , 100);
        canvas.ctx.fillText(this.points[1], (canvas.canvas.width/4)*3 - (textWidth2 / 2) , 100);
    }

    maxScoreReached(){
        return this.points[0] === 11 || this.points[1] === 11;
    }

    reset(){
        this.points = [0,0];
    }
}

export let score = new Score();
