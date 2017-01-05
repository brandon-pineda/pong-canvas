import {ball} from "./map/Ball";
import {canvas} from "./map/Canvas";

class RoundStart {
    constructor(){
        this.newRound = true;
    }

    setup() {
        if (this.newRound){
            let min = 1;
            let max = 4;
            ball.x = canvas.canvas.width/2;
            ball.y = (Math.random() * (canvas.canvas.height + 1));
            let xDirection = Math.random() < 0.5 ? 1 : -1;
            let yDirection = Math.random() < 0.5 ? 1 : -1;
            ball.dx = xDirection * ((Math.random() * (max - min + 1)) + min);
            ball.dy *= yDirection;
            this.newRound = false;
        }
    }
}

export let roundStart = new RoundStart();
