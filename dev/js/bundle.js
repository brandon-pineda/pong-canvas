(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _input = require("./player/input");

var input = _interopRequireWildcard(_input);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//shared constant variables
global.canvas = document.getElementById("myCanvas");
global.ctx = canvas.getContext("2d");
global.paddleHeight = 50;
global.paddleWidth = 10;

//ball coordinates and velocity
var x = canvas.width / 2;
var y = 0;
var dx = 2;
var dy = 2;
//paddle position
var paddleY = (canvas.height - paddleHeight) / 2;

var brickHeight = 15;
var brickWidth = 2;
var brickPadding = 10;

var roundStart = true;
var score = [0, 0];

function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(10, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function drawPaddleAI() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth - 10, (canvas.height - paddleHeight) / 2, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function drawCenterLine() {
    var i = 0;
    for (i; i < 32; i++) {
        var brickY = i * (brickHeight + brickPadding) + 5;
        ctx.beginPath();
        ctx.rect(canvas.width / 2, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.closePath();
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.rect(x, y, 8, 8);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function setupStartRound() {
    y = Math.random() * (canvas.height + 1);
    roundStart = false;
}

var draw = function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (roundStart) setupStartRound();
    drawPaddle1();
    drawPaddleAI();
    drawCenterLine();
    drawBall();
    if (input.checkDownPress(paddleY)) {
        paddleY += 12;
    } else if (input.checkUpPress(paddleY)) {
        paddleY -= 12;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
};

document.addEventListener("keydown", input.keyDownHandler, false);
document.addEventListener("keyup", input.keyUpHandler, false);
draw();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./player/input":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var upPressed = false;
var downPressed = false;

var keyDownHandler = function keyDownHandler(e) {
    if (e.keyCode == 38) {
        upPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    }
};

var keyUpHandler = function keyUpHandler(e) {
    if (e.keyCode == 38) {
        upPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    }
};

var checkDownPress = function checkDownPress(y) {
    return downPressed && y < canvas.height - paddleHeight - 40;
};

var checkUpPress = function checkUpPress(y) {
    return upPressed && y > 40;
};

exports.keyUpHandler = keyUpHandler;
exports.keyDownHandler = keyDownHandler;
exports.checkDownPress = checkDownPress;
exports.checkUpPress = checkUpPress;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvbWFpbi5qcyIsImRldi9qcy9wbGF5ZXIvaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNNQTs7SUFBWSxLOzs7O0FBTlo7QUFDQSxPQUFPLE1BQVAsR0FBZ0IsU0FBUyxjQUFULENBQXdCLFVBQXhCLENBQWhCO0FBQ0EsT0FBTyxHQUFQLEdBQWEsT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQWI7QUFDQSxPQUFPLFlBQVAsR0FBc0IsRUFBdEI7QUFDQSxPQUFPLFdBQVAsR0FBcUIsRUFBckI7O0FBSUE7QUFDQSxJQUFJLElBQUcsT0FBTyxLQUFQLEdBQWEsQ0FBcEI7QUFDQSxJQUFJLElBQUcsQ0FBUDtBQUNBLElBQUksS0FBSyxDQUFUO0FBQ0EsSUFBSSxLQUFLLENBQVQ7QUFDQTtBQUNBLElBQUksVUFBVSxDQUFDLE9BQU8sTUFBUCxHQUFnQixZQUFqQixJQUFpQyxDQUEvQzs7QUFFQSxJQUFNLGNBQWMsRUFBcEI7QUFDQSxJQUFNLGFBQWEsQ0FBbkI7QUFDQSxJQUFNLGVBQWUsRUFBckI7O0FBRUEsSUFBSSxhQUFhLElBQWpCO0FBQ0EsSUFBSSxRQUFRLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBWjs7QUFHQSxTQUFTLFdBQVQsR0FBdUI7QUFDbkIsUUFBSSxTQUFKO0FBQ0EsUUFBSSxJQUFKLENBQVMsRUFBVCxFQUFhLE9BQWIsRUFBc0IsV0FBdEIsRUFBbUMsWUFBbkM7QUFDQSxRQUFJLFNBQUosR0FBZ0IsTUFBaEI7QUFDQSxRQUFJLElBQUo7QUFDQSxRQUFJLFNBQUo7QUFDSDs7QUFFRCxTQUFTLFlBQVQsR0FBd0I7QUFDcEIsUUFBSSxTQUFKO0FBQ0EsUUFBSSxJQUFKLENBQVMsT0FBTyxLQUFQLEdBQWUsV0FBZixHQUE2QixFQUF0QyxFQUEwQyxDQUFDLE9BQU8sTUFBUCxHQUFnQixZQUFqQixJQUFpQyxDQUEzRSxFQUE4RSxXQUE5RSxFQUEyRixZQUEzRjtBQUNBLFFBQUksU0FBSixHQUFnQixNQUFoQjtBQUNBLFFBQUksSUFBSjtBQUNBLFFBQUksU0FBSjtBQUNIOztBQUVELFNBQVMsY0FBVCxHQUEwQjtBQUN0QixRQUFJLElBQUksQ0FBUjtBQUNBLFNBQUksQ0FBSixFQUFPLElBQUUsRUFBVCxFQUFhLEdBQWIsRUFBa0I7QUFDZCxZQUFJLFNBQVUsS0FBSyxjQUFjLFlBQW5CLENBQUQsR0FBcUMsQ0FBbEQ7QUFDQSxZQUFJLFNBQUo7QUFDQSxZQUFJLElBQUosQ0FBUyxPQUFPLEtBQVAsR0FBZSxDQUF4QixFQUEyQixNQUEzQixFQUFtQyxVQUFuQyxFQUErQyxXQUEvQztBQUNBLFlBQUksU0FBSixHQUFnQixNQUFoQjtBQUNBLFlBQUksSUFBSjtBQUNBLFlBQUksU0FBSjtBQUNIO0FBQ0o7O0FBRUQsU0FBUyxRQUFULEdBQW9CO0FBQ2hCLFFBQUksU0FBSjtBQUNBLFFBQUksSUFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixDQUFsQjtBQUNBLFFBQUksU0FBSixHQUFnQixNQUFoQjtBQUNBLFFBQUksSUFBSjtBQUNBLFFBQUksU0FBSjtBQUNIOztBQUVELFNBQVMsZUFBVCxHQUEyQjtBQUN2QixRQUFLLEtBQUssTUFBTCxNQUFpQixPQUFPLE1BQVAsR0FBZ0IsQ0FBakMsQ0FBTDtBQUNBLGlCQUFhLEtBQWI7QUFDSDs7QUFFRCxJQUFNLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDZixRQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLE9BQU8sS0FBM0IsRUFBa0MsT0FBTyxNQUF6QztBQUNBLFFBQUksVUFBSixFQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUksTUFBTSxjQUFOLENBQXFCLE9BQXJCLENBQUosRUFBbUM7QUFDL0IsbUJBQVcsRUFBWDtBQUNILEtBRkQsTUFHSyxJQUFHLE1BQU0sWUFBTixDQUFtQixPQUFuQixDQUFILEVBQWdDO0FBQ2pDLG1CQUFXLEVBQVg7QUFDSDs7QUFFRCxTQUFLLEVBQUw7QUFDQSxTQUFLLEVBQUw7QUFDQSwwQkFBc0IsSUFBdEI7QUFDSCxDQWpCRDs7QUFtQkEsU0FBUyxnQkFBVCxDQUEwQixTQUExQixFQUFxQyxNQUFNLGNBQTNDLEVBQTJELEtBQTNEO0FBQ0EsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxNQUFNLFlBQXpDLEVBQXVELEtBQXZEO0FBQ0E7Ozs7Ozs7Ozs7QUN0RkEsSUFBSSxZQUFZLEtBQWhCO0FBQ0EsSUFBSSxjQUFjLEtBQWxCOztBQUVBLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLENBQUMsQ0FBRCxFQUFPO0FBQzFCLFFBQUksRUFBRSxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDakIsb0JBQVksSUFBWjtBQUNILEtBRkQsTUFFTyxJQUFJLEVBQUUsT0FBRixJQUFhLEVBQWpCLEVBQXFCO0FBQ3hCLHNCQUFjLElBQWQ7QUFDSDtBQUNKLENBTkQ7O0FBUUEsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLENBQUQsRUFBTztBQUN4QixRQUFJLEVBQUUsT0FBRixJQUFhLEVBQWpCLEVBQXFCO0FBQ2pCLG9CQUFZLEtBQVo7QUFDSCxLQUZELE1BRU8sSUFBSSxFQUFFLE9BQUYsSUFBYSxFQUFqQixFQUFxQjtBQUN4QixzQkFBYyxLQUFkO0FBQ0g7QUFDSixDQU5EOztBQVFBLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLENBQUMsQ0FBRCxFQUFPO0FBQUMsV0FBTyxlQUFlLElBQUksT0FBTyxNQUFQLEdBQWUsWUFBZixHQUE2QixFQUF2RDtBQUEyRCxDQUExRjs7QUFFQSxJQUFNLGVBQWUsU0FBZixZQUFlLENBQUMsQ0FBRCxFQUFPO0FBQUMsV0FBTyxhQUFhLElBQUksRUFBeEI7QUFBNEIsQ0FBekQ7O1FBRVEsWSxHQUFBLFk7UUFBYyxjLEdBQUEsYztRQUFnQixjLEdBQUEsYztRQUFnQixZLEdBQUEsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL3NoYXJlZCBjb25zdGFudCB2YXJpYWJsZXNcbmdsb2JhbC5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpO1xuZ2xvYmFsLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5nbG9iYWwucGFkZGxlSGVpZ2h0ID0gNTA7XG5nbG9iYWwucGFkZGxlV2lkdGggPSAxMDtcblxuaW1wb3J0ICogYXMgaW5wdXQgZnJvbSBcIi4vcGxheWVyL2lucHV0XCI7XG5cbi8vYmFsbCBjb29yZGluYXRlcyBhbmQgdmVsb2NpdHlcbmxldCB4PSBjYW52YXMud2lkdGgvMjtcbmxldCB5PSAwO1xubGV0IGR4ID0gMjtcbmxldCBkeSA9IDI7XG4vL3BhZGRsZSBwb3NpdGlvblxubGV0IHBhZGRsZVkgPSAoY2FudmFzLmhlaWdodCAtIHBhZGRsZUhlaWdodCkgLyAyO1xuXG5jb25zdCBicmlja0hlaWdodCA9IDE1O1xuY29uc3QgYnJpY2tXaWR0aCA9IDI7XG5jb25zdCBicmlja1BhZGRpbmcgPSAxMDtcblxubGV0IHJvdW5kU3RhcnQgPSB0cnVlO1xubGV0IHNjb3JlID0gWzAsIDBdO1xuXG5cbmZ1bmN0aW9uIGRyYXdQYWRkbGUxKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdCgxMCwgcGFkZGxlWSwgcGFkZGxlV2lkdGgsIHBhZGRsZUhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3UGFkZGxlQUkoKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KGNhbnZhcy53aWR0aCAtIHBhZGRsZVdpZHRoIC0gMTAsIChjYW52YXMuaGVpZ2h0IC0gcGFkZGxlSGVpZ2h0KSAvIDIsIHBhZGRsZVdpZHRoLCBwYWRkbGVIZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZnVuY3Rpb24gZHJhd0NlbnRlckxpbmUoKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvcihpOyBpPDMyOyBpKyspIHtcbiAgICAgICAgbGV0IGJyaWNrWSA9IChpICogKGJyaWNrSGVpZ2h0ICsgYnJpY2tQYWRkaW5nKSkgKyA1O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KGNhbnZhcy53aWR0aCAvIDIsIGJyaWNrWSwgYnJpY2tXaWR0aCwgYnJpY2tIZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdCYWxsKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdCh4LCB5LCA4LCA4KTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIHNldHVwU3RhcnRSb3VuZCgpIHtcbiAgICB5ID0gKE1hdGgucmFuZG9tKCkgKiAoY2FudmFzLmhlaWdodCArIDEpKTtcbiAgICByb3VuZFN0YXJ0ID0gZmFsc2U7XG59XG5cbmNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGlmIChyb3VuZFN0YXJ0KSBzZXR1cFN0YXJ0Um91bmQoKTtcbiAgICBkcmF3UGFkZGxlMSgpO1xuICAgIGRyYXdQYWRkbGVBSSgpO1xuICAgIGRyYXdDZW50ZXJMaW5lKCk7XG4gICAgZHJhd0JhbGwoKTtcbiAgICBpZiAoaW5wdXQuY2hlY2tEb3duUHJlc3MocGFkZGxlWSkpIHtcbiAgICAgICAgcGFkZGxlWSArPSAxMjtcbiAgICB9XG4gICAgZWxzZSBpZihpbnB1dC5jaGVja1VwUHJlc3MocGFkZGxlWSkpIHtcbiAgICAgICAgcGFkZGxlWSAtPSAxMjtcbiAgICB9XG5cbiAgICB4ICs9IGR4O1xuICAgIHkgKz0gZHk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBpbnB1dC5rZXlEb3duSGFuZGxlciwgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGlucHV0LmtleVVwSGFuZGxlciwgZmFsc2UpO1xuZHJhdygpO1xuIiwibGV0IHVwUHJlc3NlZCA9IGZhbHNlO1xubGV0IGRvd25QcmVzc2VkID0gZmFsc2U7XG5cbmNvbnN0IGtleURvd25IYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDM4KSB7XG4gICAgICAgIHVwUHJlc3NlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gNDApIHtcbiAgICAgICAgZG93blByZXNzZWQgPSB0cnVlO1xuICAgIH1cbn1cblxuY29uc3Qga2V5VXBIYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDM4KSB7XG4gICAgICAgIHVwUHJlc3NlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDQwKSB7XG4gICAgICAgIGRvd25QcmVzc2VkID0gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBjaGVja0Rvd25QcmVzcyA9ICh5KSA9PiB7cmV0dXJuIGRvd25QcmVzc2VkICYmIHkgPCBjYW52YXMuaGVpZ2h0LSBwYWRkbGVIZWlnaHQgLTQwO31cblxuY29uc3QgY2hlY2tVcFByZXNzID0gKHkpID0+IHtyZXR1cm4gdXBQcmVzc2VkICYmIHkgPiA0MDt9XG5cbmV4cG9ydCB7a2V5VXBIYW5kbGVyLCBrZXlEb3duSGFuZGxlciwgY2hlY2tEb3duUHJlc3MsIGNoZWNrVXBQcmVzc307XG4iXX0=
