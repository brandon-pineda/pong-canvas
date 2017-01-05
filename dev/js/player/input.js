let upPressed = false;
let downPressed = false;

const keyDownHandler = (e) => {
    if (e.keyCode == 38) {
        upPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    }
}

const keyUpHandler = (e) => {
    if (e.keyCode == 38) {
        upPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    }
}

const checkDownPress = (y) => {return downPressed && y < canvas.height- paddleHeight -40;}

const checkUpPress = (y) => {return upPressed && y > 40;}

export {keyUpHandler, keyDownHandler, checkDownPress, checkUpPress};
