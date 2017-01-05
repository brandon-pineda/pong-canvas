(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paddleAIMovement = undefined;

var _variables = require("./variables");

var paddleAIMovement = function paddleAIMovement() {
    if (_variables.ball.dx < 0) {
        if (_variables.paddleAI.y < (_variables.canvas.canvas.height - _variables.paddleAI.paddleHeight) / 2) {
            _variables.paddleAI.y += 15;
        } else if (_variables.paddleAI.y > (_variables.canvas.canvas.height - _variables.paddleAI.paddleHeight) / 2) {
            _variables.paddleAI.y -= 15;
        }
    }
};

exports.paddleAIMovement = paddleAIMovement;

},{"./variables":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkUpPress = exports.checkDownPress = exports.keyDownHandler = exports.keyUpHandler = undefined;

var _variables = require("./variables");

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

var checkDownPress = function checkDownPress() {
    return downPressed && _variables.paddle1.y < _variables.canvas.canvas.height - _variables.paddle1.paddleHeight - 40;
};

var checkUpPress = function checkUpPress() {
    return upPressed && _variables.paddle1.y > 40;
};

exports.keyUpHandler = keyUpHandler;
exports.keyDownHandler = keyDownHandler;
exports.checkDownPress = checkDownPress;
exports.checkUpPress = checkUpPress;

},{"./variables":5}],3:[function(require,module,exports){
"use strict";

var _variables = require("./variables");

var _input = require("./input");

var input = _interopRequireWildcard(_input);

var _score = require("./score");

var score = _interopRequireWildcard(_score);

var _AI = require("./AI");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var scoreTracker = [0, 0];
var roundStart = true;

function drawPaddle1() {
    _variables.canvas.ctx.beginPath();
    _variables.canvas.ctx.rect(_variables.paddle1.paddleLeftOffset, _variables.paddle1.y, _variables.paddle1.paddleWidth, _variables.paddle1.paddleHeight);
    _variables.canvas.ctx.fillStyle = "#FFF";
    _variables.canvas.ctx.fill();
    _variables.canvas.ctx.closePath();
}

function drawPaddleAI() {
    _variables.canvas.ctx.beginPath();
    _variables.canvas.ctx.rect(_variables.paddleAI.paddleRightOffset, _variables.paddleAI.y, _variables.paddleAI.paddleWidth, _variables.paddleAI.paddleHeight);
    _variables.canvas.ctx.fillStyle = "#FFF";
    _variables.canvas.ctx.fill();
    _variables.canvas.ctx.closePath();
}

function drawCenterLine() {
    var i = 0;
    for (i; i < 32; i++) {
        var brickY = i * (_variables.bricks.brickHeight + _variables.bricks.brickPadding) + 5;
        _variables.canvas.ctx.beginPath();
        _variables.canvas.ctx.rect(_variables.canvas.canvas.width / 2, brickY, _variables.bricks.brickWidth, _variables.bricks.brickHeight);
        _variables.canvas.ctx.fillStyle = "#FFF";
        _variables.canvas.ctx.fill();
        _variables.canvas.ctx.closePath();
    }
}

function drawBall() {
    _variables.canvas.ctx.beginPath();
    _variables.canvas.ctx.rect(_variables.ball.x, _variables.ball.y, _variables.ball.squareBallLength, _variables.ball.squareBallLength);
    _variables.canvas.ctx.fillStyle = "#FFF";
    _variables.canvas.ctx.fill();
    _variables.canvas.ctx.closePath();
}

function setupStartRound() {
    _variables.ball.x = _variables.canvas.canvas.width / 2;
    _variables.ball.y = Math.random() * (_variables.canvas.canvas.height + 1);
    var xDirection = Math.random() < 0.5 ? 1 : -1;
    var yDirection = Math.random() < 0.5 ? 1 : -1;
    _variables.ball.dx *= xDirection;
    _variables.ball.dy *= yDirection;
    roundStart = false;
}

var draw = function draw() {
    _variables.canvas.ctx.clearRect(0, 0, _variables.canvas.canvas.width, _variables.canvas.canvas.height);
    if (roundStart) setupStartRound();
    drawPaddle1();
    drawPaddleAI();
    drawCenterLine();
    drawBall();
    score.drawScore(scoreTracker);

    if (input.checkDownPress()) {
        _variables.paddle1.y += 15;
    } else if (input.checkUpPress()) {
        _variables.paddle1.y -= 15;
    }

    (0, _AI.paddleAIMovement)();

    //top wall
    if (_variables.ball.y + _variables.ball.dy > _variables.canvas.canvas.height - _variables.ball.squareBallLength / 2 || _variables.ball.y + _variables.ball.dy < _variables.ball.squareBallLength / 2) {
        _variables.ball.dy *= -1;
    }

    if (_variables.ball.x + _variables.ball.dx < _variables.ball.squareBallLength) {
        if (_variables.ball.y > _variables.paddle1.y && _variables.ball.y < _variables.paddle1.y + _variables.paddle1.paddleHeight) {
            _variables.ball.dx *= -1;
        } else {
            scoreTracker[1] += 1;
            roundStart = true;
        }
    }

    if (_variables.ball.x + _variables.ball.dx > _variables.canvas.canvas.width - _variables.ball.squareBallLength) {
        if (_variables.ball.y > _variables.paddleAI.y && _variables.ball.y < _variables.paddleAI.y + _variables.paddleAI.paddleHeight) {
            _variables.ball.dx *= -1;
        } else {
            scoreTracker[0] += 1;
            roundStart = true;
        }
    }

    _variables.ball.x += _variables.ball.dx;
    _variables.ball.y += _variables.ball.dy;
    requestAnimationFrame(draw);
};

document.addEventListener("keydown", input.keyDownHandler, false);
document.addEventListener("keyup", input.keyUpHandler, false);
draw();

},{"./AI":1,"./input":2,"./score":4,"./variables":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawScore = undefined;

var _variables = require("./variables");

var drawScore = function drawScore(score) {
    _variables.canvas.ctx.font = "100px Arial";
    _variables.canvas.ctx.fillStyle = "#FFF";
    var textWidth1 = _variables.canvas.ctx.measureText(score[0]).width;
    var textWidth2 = _variables.canvas.ctx.measureText(score[1]).width;
    _variables.canvas.ctx.fillText(score[0], _variables.canvas.canvas.width / 4 - textWidth1 / 2, 200);
    _variables.canvas.ctx.fillText(score[1], _variables.canvas.canvas.width / 4 * 3 - textWidth2 / 2, 200);
};

exports.drawScore = drawScore;

},{"./variables":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function Canvas() {
    _classCallCheck(this, Canvas);

    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
};

var canvas = exports.canvas = new Canvas();

var Ball = function Ball() {
    _classCallCheck(this, Ball);

    this.x = canvas.canvas.width / 2;
    this.y = 0;
    this.dx = 3;
    this.dy = 3;
    this.squareBallLength = 8;
};

var Paddle1 = function Paddle1() {
    _classCallCheck(this, Paddle1);

    this.paddleHeight = 50;
    this.paddleWidth = 10;
    this.y = (canvas.canvas.height - this.paddleHeight) / 2;
    this.paddleLeftOffset = 10;
};

var PaddleAI = function PaddleAI() {
    _classCallCheck(this, PaddleAI);

    this.paddleHeight = 50;
    this.paddleWidth = 10;
    this.paddleRightOffset = canvas.canvas.width - this.paddleWidth - 10;
    this.y = (canvas.canvas.height - this.paddleHeight) / 2;
};

var Bricks = function Bricks() {
    _classCallCheck(this, Bricks);

    this.brickHeight = 15;
    this.brickWidth = 2;
    this.brickPadding = 10;
};

var ball = exports.ball = new Ball();
var bricks = exports.bricks = new Bricks();
var paddle1 = exports.paddle1 = new Paddle1();
var paddleAI = exports.paddleAI = new PaddleAI();

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvQUkuanMiLCJkZXYvanMvaW5wdXQuanMiLCJkZXYvanMvbWFpbi5qcyIsImRldi9qcy9zY29yZS5qcyIsImRldi9qcy92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7O0FBRUEsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLEdBQU07QUFDekIsUUFBSSxnQkFBSyxFQUFMLEdBQVUsQ0FBZCxFQUFpQjtBQUNiLFlBQUksb0JBQVMsQ0FBVCxHQUFhLENBQUMsa0JBQU8sTUFBUCxDQUFjLE1BQWQsR0FBdUIsb0JBQVMsWUFBakMsSUFBaUQsQ0FBbEUsRUFBcUU7QUFDakUsZ0NBQVMsQ0FBVCxJQUFjLEVBQWQ7QUFDSCxTQUZELE1BRU8sSUFBSSxvQkFBUyxDQUFULEdBQWEsQ0FBQyxrQkFBTyxNQUFQLENBQWMsTUFBZCxHQUF1QixvQkFBUyxZQUFqQyxJQUFpRCxDQUFsRSxFQUFxRTtBQUN4RSxnQ0FBUyxDQUFULElBQWMsRUFBZDtBQUNIO0FBQ0o7QUFDSixDQVJEOztRQVVRLGdCLEdBQUEsZ0I7Ozs7Ozs7Ozs7QUNaUjs7QUFFQSxJQUFJLFlBQVksS0FBaEI7QUFDQSxJQUFJLGNBQWMsS0FBbEI7O0FBRUEsSUFBTSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBQyxDQUFELEVBQU87QUFDMUIsUUFBSSxFQUFFLE9BQUYsSUFBYSxFQUFqQixFQUFxQjtBQUNqQixvQkFBWSxJQUFaO0FBQ0gsS0FGRCxNQUVPLElBQUksRUFBRSxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDeEIsc0JBQWMsSUFBZDtBQUNIO0FBQ0osQ0FORDs7QUFRQSxJQUFNLGVBQWUsU0FBZixZQUFlLENBQUMsQ0FBRCxFQUFPO0FBQ3hCLFFBQUksRUFBRSxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDakIsb0JBQVksS0FBWjtBQUNILEtBRkQsTUFFTyxJQUFJLEVB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TUFBUCxDQUFjLE1BQWQsR0FBdUIsS0FBSyxZQUE3QixJQUE2QyxDQUF0RDtBQUNILEM7O0lBR0MsTSxHQUNGLGtCQUFhO0FBQUE7O0FBQ1QsU0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0gsQzs7QUFHRSxJQUFJLHNCQUFPLElBQUksSUFBSixFQUFYO0FBQ0EsSUFBSSwwQkFBUyxJQUFJLE1BQUosRUFBYjtBQUNBLElBQUksNEJBQVUsSUFBSSxPQUFKLEVBQWQ7QUFDQSxJQUFJLDhCQUFXLElBQUksUUFBSixFQUFmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7YmFsbCwgY2FudmFzLCBwYWRkbGVBSX0gZnJvbSBcIi4vdmFyaWFibGVzXCI7XG5cbmxldCBwYWRkbGVBSU1vdmVtZW50ID0gKCkgPT4ge1xuICAgIGlmIChiYWxsLmR4IDwgMCkge1xuICAgICAgICBpZiAocGFkZGxlQUkueSA8IChjYW52YXMuY2FudmFzLmhlaWdodCAtIHBhZGRsZUFJLnBhZGRsZUhlaWdodCkgLyAyKSB7XG4gICAgICAgICAgICBwYWRkbGVBSS55ICs9IDE1O1xuICAgICAgICB9IGVsc2UgaWYgKHBhZGRsZUFJLnkgPiAoY2FudmFzLmNhbnZhcy5oZWlnaHQgLSBwYWRkbGVBSS5wYWRkbGVIZWlnaHQpIC8gMikge1xuICAgICAgICAgICAgcGFkZGxlQUkueSAtPSAxNTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCB7cGFkZGxlQUlNb3ZlbWVudH07XG4iLCJpbXBvcnQge2NhbnZhcywgcGFkZGxlMX0gZnJvbSBcIi4vdmFyaWFibGVzXCI7XG5cbmxldCB1cFByZXNzZWQgPSBmYWxzZTtcbmxldCBkb3duUHJlc3NlZCA9IGZhbHNlO1xuXG5jb25zdCBrZXlEb3duSGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAzOCkge1xuICAgICAgICB1cFByZXNzZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDQwKSB7XG4gICAgICAgIGRvd25QcmVzc2VkID0gdHJ1ZTtcbiAgICB9XG59O1xuXG5jb25zdCBrZXlVcEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT0gMzgpIHtcbiAgICAgICAgdXBQcmVzc2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gNDApIHtcbiAgICAgICAgZG93blByZXNzZWQgPSBmYWxzZTtcbiAgICB9XG59O1xuXG5jb25zdCBjaGVja0Rvd25QcmVzcyA9ICgpID0+IHtyZXR1cm4gZG93blByZXNzZWQgJiYgcGFkZGxlMS55IDwgY2FudmFzLmNhbnZhcy5oZWlnaHQtIHBhZGRsZTEucGFkZGxlSGVpZ2h0IC0gNDA7fTtcblxuY29uc3QgY2hlY2tVcFByZXNzID0gKCkgPT4ge3JldHVybiB1cFByZXNzZWQgJiYgcGFkZGxlMS55ID4gNDA7fTtcblxuZXhwb3J0IHtrZXlVcEhhbmRsZXIsIGtleURvd25IYW5kbGVyLCBjaGVja0Rvd25QcmVzcywgY2hlY2tVcFByZXNzfTtcbiIsImltcG9ydCB7Y2FudmFzLCBiYWxsLCBwYWRkbGUxLCBwYWRkbGVBSSwgYnJpY2tzfSBmcm9tIFwiLi92YXJpYWJsZXNcIjtcbmltcG9ydCAqIGFzIGlucHV0IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQgKiBhcyBzY29yZSBmcm9tIFwiLi9zY29yZVwiO1xuaW1wb3J0IHtwYWRkbGVBSU1vdmVtZW50fSBmcm9tIFwiLi9BSVwiO1xuXG5sZXQgc2NvcmVUcmFja2VyID0gWzAsIDBdO1xubGV0IHJvdW5kU3RhcnQgPSB0cnVlO1xuXG5mdW5jdGlvbiBkcmF3UGFkZGxlMSgpIHtcbiAgICBjYW52YXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGNhbnZhcy5jdHgucmVjdChwYWRkbGUxLnBhZGRsZUxlZnRPZmZzZXQsIHBhZGRsZTEueSwgcGFkZGxlMS5wYWRkbGVXaWR0aCwgcGFkZGxlMS5wYWRkbGVIZWlnaHQpO1xuICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgY2FudmFzLmN0eC5maWxsKCk7XG4gICAgY2FudmFzLmN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZnVuY3Rpb24gZHJhd1BhZGRsZUFJKCkge1xuICAgIGNhbnZhcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgY2FudmFzLmN0eC5yZWN0KHBhZGRsZUFJLnBhZGRsZVJpZ2h0T2Zmc2V0LCBwYWRkbGVBSS55LCBwYWRkbGVBSS5wYWRkbGVXaWR0aCwgcGFkZGxlQUkucGFkZGxlSGVpZ2h0KTtcbiAgICBjYW52YXMuY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNhbnZhcy5jdHguZmlsbCgpO1xuICAgIGNhbnZhcy5jdHguY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdDZW50ZXJMaW5lKCkge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IoaTsgaTwzMjsgaSsrKSB7XG4gICAgICAgIGxldCBicmlja1kgPSAoaSAqIChicmlja3MuYnJpY2tIZWlnaHQgKyBicmlja3MuYnJpY2tQYWRkaW5nKSkgKyA1O1xuICAgICAgICBjYW52YXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW52YXMuY3R4LnJlY3QoY2FudmFzLmNhbnZhcy53aWR0aCAvIDIsIGJyaWNrWSwgYnJpY2tzLmJyaWNrV2lkdGgsIGJyaWNrcy5icmlja0hlaWdodCk7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbCgpO1xuICAgICAgICBjYW52YXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhd0JhbGwoKSB7XG4gICAgY2FudmFzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBjYW52YXMuY3R4LnJlY3QoYmFsbC54LCBiYWxsLnksIGJhbGwuc3F1YXJlQmFsbExlbmd0aCwgYmFsbC5zcXVhcmVCYWxsTGVuZ3RoKTtcbiAgICBjYW52YXMuY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgIGNhbnZhcy5jdHguZmlsbCgpO1xuICAgIGNhbnZhcy5jdHguY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIHNldHVwU3RhcnRSb3VuZCgpIHtcbiAgICBiYWxsLnggPSBjYW52YXMuY2FudmFzLndpZHRoLzI7XG4gICAgYmFsbC55ID0gKE1hdGgucmFuZG9tKCkgKiAoY2FudmFzLmNhbnZhcy5oZWlnaHQgKyAxKSk7XG4gICAgbGV0IHhEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gMSA6IC0xO1xuICAgIGxldCB5RGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IDEgOiAtMTtcbiAgICBiYWxsLmR4ICo9IHhEaXJlY3Rpb247XG4gICAgYmFsbC5keSAqPSB5RGlyZWN0aW9uO1xuICAgIHJvdW5kU3RhcnQgPSBmYWxzZTtcbn1cblxuY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICBjYW52YXMuY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMuY2FudmFzLndpZHRoLCBjYW52YXMuY2FudmFzLmhlaWdodCk7XG4gICAgaWYgKHJvdW5kU3RhcnQpIHNldHVwU3RhcnRSb3VuZCgpO1xuICAgIGRyYXdQYWRkbGUxKCk7XG4gICAgZHJhd1BhZGRsZUFJKCk7XG4gICAgZHJhd0NlbnRlckxpbmUoKTtcbiAgICBkcmF3QmFsbCgpO1xuICAgIHNjb3JlLmRyYXdTY29yZShzY29yZVRyYWNrZXIpO1xuXG4gICAgaWYgKGlucHV0LmNoZWNrRG93blByZXNzKCkpIHtcbiAgICAgICAgcGFkZGxlMS55ICs9IDE1O1xuICAgIH1cbiAgICBlbHNlIGlmKGlucHV0LmNoZWNrVXBQcmVzcygpKSB7XG4gICAgICAgIHBhZGRsZTEueSAtPSAxNTtcbiAgICB9XG5cbiAgICBwYWRkbGVBSU1vdmVtZW50KCk7XG5cbiAgICAvL3RvcCB3YWxsXG4gICAgaWYoYmFsbC55ICsgYmFsbC5keSA+IGNhbnZhcy5jYW52YXMuaGVpZ2h0LSAoYmFsbC5zcXVhcmVCYWxsTGVuZ3RoLzIpIHx8IGJhbGwueSArIGJhbGwuZHkgPCAgKGJhbGwuc3F1YXJlQmFsbExlbmd0aC8yKSApIHtcbiAgICAgICAgYmFsbC5keSAqPSAtMTtcbiAgICB9XG5cbiAgICBpZihiYWxsLnggKyBiYWxsLmR4IDwgYmFsbC5zcXVhcmVCYWxsTGVuZ3RoKSB7XG4gICAgICAgIGlmKGJhbGwueSA+IHBhZGRsZTEueSAmJiBiYWxsLnkgPCBwYWRkbGUxLnkgKyBwYWRkbGUxLnBhZGRsZUhlaWdodCkge1xuICAgICAgICAgICAgYmFsbC5keCAqPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjb3JlVHJhY2tlclsxXSArPSAxO1xuICAgICAgICAgICAgcm91bmRTdGFydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihiYWxsLnggKyBiYWxsLmR4ID4gY2FudmFzLmNhbnZhcy53aWR0aCAtIGJhbGwuc3F1YXJlQmFsbExlbmd0aCkge1xuICAgICAgICBpZihiYWxsLnkgPiBwYWRkbGVBSS55ICYmIGJhbGwueSA8IHBhZGRsZUFJLnkgKyBwYWRkbGVBSS5wYWRkbGVIZWlnaHQpIHtcbiAgICAgICAgICAgIGJhbGwuZHggKj0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY29yZVRyYWNrZXJbMF0gKz0gMTtcbiAgICAgICAgICAgIHJvdW5kU3RhcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBiYWxsLnggKz0gYmFsbC5keDtcbiAgICBiYWxsLnkgKz0gYmFsbC5keTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBpbnB1dC5rZXlEb3duSGFuZGxlciwgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGlucHV0LmtleVVwSGFuZGxlciwgZmFsc2UpO1xuZHJhdygpO1xuIiwiaW1wb3J0IHtjYW52YXN9IGZyb20gXCIuL3ZhcmlhYmxlc1wiO1xuXG5sZXQgZHJhd1Njb3JlID0gKHNjb3JlKSA9PiB7XG4gICAgY2FudmFzLmN0eC5mb250ID0gXCIxMDBweCBBcmlhbFwiO1xuICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgbGV0IHRleHRXaWR0aDEgPSBjYW52YXMuY3R4Lm1lYXN1cmVUZXh0KHNjb3JlWzBdKS53aWR0aDtcbiAgICBsZXQgdGV4dFdpZHRoMiA9IGNhbnZhcy5jdHgubWVhc3VyZVRleHQoc2NvcmVbMV0pLndpZHRoO1xuICAgIGNhbnZhcy5jdHguZmlsbFRleHQoc2NvcmVbMF0sIChjYW52YXMuY2FudmFzLndpZHRoLzQpIC0gKHRleHRXaWR0aDEgLyAyKSAsIDIwMCk7XG4gICAgY2FudmFzLmN0eC5maWxsVGV4dChzY29yZVsxXSwgKGNhbnZhcy5jYW52YXMud2lkdGgvNCkqMyAtICh0ZXh0V2lkdGgyIC8gMikgLCAyMDApO1xufTtcblxuZXhwb3J0IHtkcmF3U2NvcmV9O1xuIiwiY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG5cblxuY2xhc3MgQmFsbCB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy54PSBjYW52YXMuY2FudmFzLndpZHRoLzI7XG4gICAgICAgIHRoaXMueT0gMDtcbiAgICAgICAgdGhpcy5keCA9IDM7XG4gICAgICAgIHRoaXMuZHkgPSAzO1xuICAgICAgICB0aGlzLnNxdWFyZUJhbGxMZW5ndGggPSA4O1xuICAgIH1cbn1cblxuY2xhc3MgUGFkZGxlMSB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5wYWRkbGVIZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy5wYWRkbGVXaWR0aCA9IDEwO1xuICAgICAgICB0aGlzLnkgPSAoY2FudmFzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLnBhZGRsZUhlaWdodCkgLyAyO1xuICAgICAgICB0aGlzLnBhZGRsZUxlZnRPZmZzZXQgPSAxMDtcbiAgICB9XG59XG5cbmNsYXNzIFBhZGRsZUFJIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnBhZGRsZUhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLnBhZGRsZVdpZHRoID0gMTA7XG4gICAgICAgIHRoaXMucGFkZGxlUmlnaHRPZmZzZXQgPSBjYW52YXMuY2FudmFzLndpZHRoIC0gdGhpcy5wYWRkbGVXaWR0aCAtIDEwO1xuICAgICAgICB0aGlzLnkgPSAoY2FudmFzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLnBhZGRsZUhlaWdodCkgLyAyO1xuICAgIH1cbn1cblxuY2xhc3MgQnJpY2tzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmJyaWNrSGVpZ2h0ID0gMTU7XG4gICAgICAgIHRoaXMuYnJpY2tXaWR0aCA9IDI7XG4gICAgICAgIHRoaXMuYnJpY2tQYWRkaW5nID0gMTA7XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IGJhbGwgPSBuZXcgQmFsbCgpO1xuZXhwb3J0IGxldCBicmlja3MgPSBuZXcgQnJpY2tzKCk7XG5leHBvcnQgbGV0IHBhZGRsZTEgPSBuZXcgUGFkZGxlMSgpO1xuZXhwb3J0IGxldCBwYWRkbGVBSSA9IG5ldyBQYWRkbGVBSSgpO1xuIl19
