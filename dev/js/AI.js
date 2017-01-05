import {ball} from "./map/Ball";
import {canvas} from "./map/Canvas";
import {paddleAI} from "./map/Paddle";

let paddleAIMovement = () => {
    if (ball.dx < 0) {
        if (paddleAI.y < (canvas.canvas.height - paddleAI.paddleHeight) / 2) {
            paddleAI.y += 15;
        } else if (paddleAI.y > (canvas.canvas.height - paddleAI.paddleHeight) / 2) {
            paddleAI.y -= 15;
        }
    } else {
        paddleAI.y = ball.y * .8 - (paddleAI.paddleHeight/2);
    }
};

export {paddleAIMovement};
