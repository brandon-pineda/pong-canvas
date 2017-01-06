import {canvas} from "./map/Canvas";
import {paddle1} from "./map/Paddle";

let upPressed = false;
let downPressed = false;

const keyDownHandler = (e) => {
    if (e.keyCode == 38) {
        upPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    }
};

const keyUpHandler = (e) => {
    if (e.keyCode == 38) {
        upPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    }
};

const checkInput = () => {
    if (downPressed && paddle1.y < canvas.canvas.height- paddle1.paddleHeight - 30) {
        paddle1.y += 8;
    } else if (upPressed && paddle1.y > 30) {
        paddle1.y -= 8;
    }
};

export {keyUpHandler, keyDownHandler, checkInput};
