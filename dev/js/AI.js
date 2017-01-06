import {ball} from "./map/Ball";
import {canvas} from "./map/Canvas";
import {paddleAI} from "./map/Paddle";

let paddleAIMovement = () => {
    if (ball.dx < 0) {
        if (paddleAI.y < (canvas.canvas.height - paddleAI.paddleHeight) / 2 - paddleAI.paddleHeight/2) {
            paddleAI.y += 8;
        } else if (paddleAI.y > (canvas.canvas.height - paddleAI.paddleHeight) / 2 + paddleAI.paddleHeight/2) {
            paddleAI.y -= 8;
        }
    } else {
        if (!(ball.y - (ball.squareBallLength/2) >  canvas.canvas.height - paddleAI.paddleHeight - 30)
        && !( ball.y + (ball.squareBallLength/2) <  30)) {
            if (ball.y  > paddleAI.y + (paddleAI.paddleHeight/4)) {
                paddleAI.y += 3;
            } else if (ball.y < paddleAI.y + paddleAI.paddleHeight ){
                paddleAI.y -= 3;
            }
        }
    }
};

export {paddleAIMovement};
