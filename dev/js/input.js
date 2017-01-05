import {canvas, paddle1} from "./variables";

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

const checkDownPress = () => {return downPressed && paddle1.y < canvas.canvas.height- paddle1.paddleHeight - 40;};

const checkUpPress = () => {return upPressed && paddle1.y > 40;};

export {keyUpHandler, keyDownHandler, checkDownPress, checkUpPress};
