import {canvas} from "./variables";

let drawScore = (score) => {
    canvas.ctx.font = "100px Arial";
    canvas.ctx.fillStyle = "#FFF";
    let textWidth1 = canvas.ctx.measureText(score[0]).width;
    let textWidth2 = canvas.ctx.measureText(score[1]).width;
    canvas.ctx.fillText(score[0], (canvas.canvas.width/4) - (textWidth1 / 2) , 200);
    canvas.ctx.fillText(score[1], (canvas.canvas.width/4)*3 - (textWidth2 / 2) , 200);
};

export {drawScore};
