import {ball} from "./map/Ball";
import {bricks} from "./map/Bricks";
import {canvas} from "./map/Canvas";
import {paddle1, paddleAI} from "./map/Paddle";
import {roundStart} from "./RoundStart";
import {score} from "./map/Score";
//
import * as ai from "./AI";
import {collision} from "./Collision";
import * as input from "./input";

const draw = () => {
    //clear screen
    canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    // //check if new round, if so setup
    roundStart.setup();
    // //draw all elements
    paddle1.draw();
    paddleAI.draw();
    bricks.draw();
    ball.draw();
    score.draw();
    // //check player inputs
    input.checkInput();
    // //ai movements
    ai.paddleAIMovement();
    // //check for ball collisions
    collision();

    let fps = 60;
    setTimeout(function() {
        requestAnimationFrame(draw);
        // Drawing code goes here
    }, 1000 / fps);
    // requestAnimationFrame(draw);
};

document.addEventListener("keydown", input.keyDownHandler, false);
document.addEventListener("keyup", input.keyUpHandler, false);
draw();
