import {ball} from "./map/Ball";
import {canvas} from "./map/Canvas";
import {paddle1, paddleAI} from "./map/Paddle";
import {roundStart} from "./RoundStart";
import {score} from "./map/Score";

const collision = () => {
    if(ball.y + ball.dy > canvas.canvas.height- (ball.squareBallLength/2) || ball.y + ball.dy <  (ball.squareBallLength/2) ) {
        ball.dy *= -1;
    }

    if(ball.x + ball.dx < ball.squareBallLength) {
        if(ball.y > paddle1.y && ball.y < paddle1.y + paddle1.paddleHeight) {
            ball.dx *= -1;
        } else {
            score.points[1] += 1;
            roundStart.newRound = true;
        }
    }

    if(ball.x + ball.dx > canvas.canvas.width - (ball.squareBallLength * 1.5)) {
        if(ball.y > paddleAI.y && ball.y < paddleAI.y + paddleAI.paddleHeight) {
            ball.dx *= -1;
        } else {
            score.points[0] += 1;
            roundStart.newRound = true;
        }
    }
    //move ball after collision checks
    ball.x += ball.dx;
    ball.y += ball.dy;
};

export {collision};
