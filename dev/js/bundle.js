(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paddleAIMovement = undefined;

var _Ball = require("./map/Ball");

var _Canvas = require("./map/Canvas");

var _Paddle = require("./map/Paddle");

var paddleAIMovement = function paddleAIMovement() {
    if (_Ball.ball.dx < 0) {
        if (_Paddle.paddleAI.y < (_Canvas.canvas.canvas.height - _Paddle.paddleAI.paddleHeight) / 2 - _Paddle.paddleAI.paddleHeight / 2) {
            _Paddle.paddleAI.y += 8;
        } else if (_Paddle.paddleAI.y > (_Canvas.canvas.canvas.height - _Paddle.paddleAI.paddleHeight) / 2 + _Paddle.paddleAI.paddleHeight / 2) {
            _Paddle.paddleAI.y -= 8;
        }
    } else {
        if (!(_Ball.ball.y - _Ball.ball.squareBallLength / 2 > _Canvas.canvas.canvas.height - _Paddle.paddleAI.paddleHeight - 30) && !(_Ball.ball.y + _Ball.ball.squareBallLength / 2 < 30)) {
            if (_Ball.ball.y > _Paddle.paddleAI.y + _Paddle.paddleAI.paddleHeight / 4) {
                _Paddle.paddleAI.y += 3;
            } else if (_Ball.ball.y < _Paddle.paddleAI.y + _Paddle.paddleAI.paddleHeight) {
                _Paddle.paddleAI.y -= 3;
            }
        }
    }
};

exports.paddleAIMovement = paddleAIMovement;

},{"./map/Ball":7,"./map/Canvas":9,"./map/Paddle":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collision = undefined;

var _Ball = require("./map/Ball");

var _Canvas = require("./map/Canvas");

var _Paddle = require("./map/Paddle");

var _RoundStart = require("./RoundStart");

var _Score = require("./map/Score");

var collision = function collision() {
    //top walls
    if (_Ball.ball.y + _Ball.ball.dy > _Canvas.canvas.canvas.height - _Ball.ball.squareBallLength / 2 || _Ball.ball.y + _Ball.ball.dy < _Ball.ball.squareBallLength / 2) {
        _Ball.ball.dy *= -1;
    }

    if (_Score.score.maxScoreReached()) {
        if (_Ball.ball.x + _Ball.ball.dx > _Canvas.canvas.canvas.width - _Ball.ball.squareBallLength / 2 || _Ball.ball.x + _Ball.ball.dx < _Ball.ball.squareBallLength / 2) {
            _Ball.ball.dx *= -1;
        }
    }

    if (!_Score.score.maxScoreReached()) {
        if (_Ball.ball.x + _Ball.ball.dx < _Ball.ball.squareBallLength) {
            if (_Ball.ball.y - _Ball.ball.squareBallLength / 2 > _Paddle.paddle1.y && _Ball.ball.y + _Ball.ball.squareBallLength / 2 < _Paddle.paddle1.y + _Paddle.paddle1.paddleHeight) {
                _Ball.ball.dx *= -1;
            } else {
                _Score.score.points[1] += 1;
                _RoundStart.roundStart.newRound = true;
            }
        }

        if (_Ball.ball.x + _Ball.ball.dx > _Canvas.canvas.canvas.width - _Ball.ball.squareBallLength * 1.5) {
            if (_Ball.ball.y - _Ball.ball.squareBallLength / 2 > _Paddle.paddleAI.y && _Ball.ball.y + _Ball.ball.squareBallLength / 2 < _Paddle.paddleAI.y + _Paddle.paddleAI.paddleHeight) {
                _Ball.ball.dx *= -1;
            } else {
                _Score.score.points[0] += 1;
                _RoundStart.roundStart.newRound = true;
            }
        }
    }

    //move ball after collision checks
    _Ball.ball.x += _Ball.ball.dx;
    _Ball.ball.y += _Ball.ball.dy;
};

exports.collision = collision;

},{"./RoundStart":4,"./map/Ball":7,"./map/Canvas":9,"./map/Paddle":10,"./map/Score":11}],3:[function(require,module,exports){
"use strict";

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.roundStart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ball = require("./map/Ball");

var _Canvas = require("./map/Canvas");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoundStart = function () {
    function RoundStart() {
        _classCallCheck(this, RoundStart);

        this.newRound = true;
    }

    _createClass(RoundStart, [{
        key: "setup",
        value: function setup() {
            if (this.newRound) {
                var min = 1;
                var max = 4;
                _Ball.ball.x = _Canvas.canvas.canvas.width / 2;
                _Ball.ball.y = Math.random() * (_Canvas.canvas.canvas.height + 1);
                var xDirection = Math.random() < 0.5 ? 1 : -1;
                var yDirection = Math.random() < 0.5 ? 1 : -1;
                _Ball.ball.dx = xDirection * (Math.random() * (max - min + 1) + min);
                _Ball.ball.dy *= yDirection;
                this.newRound = false;
            }
        }
    }]);

    return RoundStart;
}();

var roundStart = exports.roundStart = new RoundStart();

},{"./map/Ball":7,"./map/Canvas":9}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkInput = exports.keyDownHandler = exports.keyUpHandler = undefined;

var _Canvas = require("./map/Canvas");

var _Paddle = require("./map/Paddle");

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

var checkInput = function checkInput() {
    if (downPressed && _Paddle.paddle1.y < _Canvas.canvas.canvas.height - _Paddle.paddle1.paddleHeight - 30) {
        _Paddle.paddle1.y += 8;
    } else if (upPressed && _Paddle.paddle1.y > 30) {
        _Paddle.paddle1.y -= 8;
    }
};

exports.keyUpHandler = keyUpHandler;
exports.keyDownHandler = keyDownHandler;
exports.checkInput = checkInput;

},{"./map/Canvas":9,"./map/Paddle":10}],6:[function(require,module,exports){
"use strict";

var _Ball = require("./map/Ball");

var _Bricks = require("./map/Bricks");

var _Canvas = require("./map/Canvas");

var _Paddle = require("./map/Paddle");

var _RoundStart = require("./RoundStart");

var _Score = require("./map/Score");

var _AI = require("./AI");

var ai = _interopRequireWildcard(_AI);

var _Collision = require("./Collision");

var _input = require("./input");

var input = _interopRequireWildcard(_input);

var _Initialize = require("./Initialize");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//
var draw = function draw() {
    //clear screen
    _Canvas.canvas.ctx.clearRect(0, 0, _Canvas.canvas.canvas.width, _Canvas.canvas.canvas.height);
    // //check if new round, if so setup
    _RoundStart.roundStart.setup();
    // //draw all elements
    _Bricks.bricks.draw();
    _Ball.ball.draw();
    _Score.score.draw();

    if (!_Score.score.maxScoreReached()) {
        _Paddle.paddle1.draw();
        _Paddle.paddleAI.draw();
        // //check player inputs
        input.checkInput();
        // //ai movements
        ai.paddleAIMovement();
    }
    // //check for ball collisions
    (0, _Collision.collision)();

    var fps = 60;
    setTimeout(function () {
        requestAnimationFrame(draw);
        // Drawing code goes here
    }, 1000 / fps);
};

document.addEventListener("keydown", input.keyDownHandler, false);
document.addEventListener("keyup", input.keyUpHandler, false);
draw();

},{"./AI":1,"./Collision":2,"./Initialize":3,"./RoundStart":4,"./input":5,"./map/Ball":7,"./map/Bricks":8,"./map/Canvas":9,"./map/Paddle":10,"./map/Score":11}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ball = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require("./Canvas");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
    function Ball() {
        _classCallCheck(this, Ball);

        this.x = _Canvas.canvas.canvas.width / 2;
        this.y = 0;
        this.dx = 1;
        this.dy = 1;
        this.squareBallLength = 8;
    }

    _createClass(Ball, [{
        key: "draw",
        value: function draw() {
            _Canvas.canvas.ctx.beginPath();
            _Canvas.canvas.ctx.rect(this.x, this.y, this.squareBallLength, this.squareBallLength);
            _Canvas.canvas.ctx.fillStyle = "#FFF";
            _Canvas.canvas.ctx.fill();
            _Canvas.canvas.ctx.closePath();
        }
    }, {
        key: "reset",
        value: function reset() {
            this.x = _Canvas.canvas.canvas.width / 2;
            this.y = 0;
            this.dx = 1;
            this.dy = 1;
            this.squareBallLength = 8;
        }
    }]);

    return Ball;
}();

var ball = exports.ball = new Ball();

},{"./Canvas":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bricks = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require("./Canvas");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bricks = function () {
    function Bricks() {
        _classCallCheck(this, Bricks);

        this.brickHeight = 15;
        this.brickWidth = 2;
        this.brickPadding = 10;
    }

    _createClass(Bricks, [{
        key: "draw",
        value: function draw() {
            var i = 0;
            for (i; i < 32; i++) {
                var brickY = i * (this.brickHeight + this.brickPadding) + 5;
                _Canvas.canvas.ctx.beginPath();
                _Canvas.canvas.ctx.rect(_Canvas.canvas.canvas.width / 2, brickY, this.brickWidth, this.brickHeight);
                _Canvas.canvas.ctx.fillStyle = "#FFF";
                _Canvas.canvas.ctx.fill();
                _Canvas.canvas.ctx.closePath();
            }
        }
    }]);

    return Bricks;
}();

var bricks = exports.bricks = new Bricks();

},{"./Canvas":9}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paddleAI = exports.paddle1 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require("./Canvas");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paddle = function () {
    function Paddle(x) {
        _classCallCheck(this, Paddle);

        this.paddleHeight = 50;
        this.paddleWidth = 10;
        this.x = x;
        this.y = (_Canvas.canvas.canvas.height - this.paddleHeight) / 2;
    }

    _createClass(Paddle, [{
        key: "draw",
        value: function draw() {
            _Canvas.canvas.ctx.beginPath();
            _Canvas.canvas.ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
            _Canvas.canvas.ctx.fillStyle = "#FFF";
            _Canvas.canvas.ctx.fill();
            _Canvas.canvas.ctx.closePath();
        }
    }, {
        key: "reset",
        value: function reset(x) {
            this.paddleHeight = 50;
            this.paddleWidth = 10;
            this.x = x;
            this.y = (_Canvas.canvas.canvas.height - this.paddleHeight) / 2;
        }
    }]);

    return Paddle;
}();

var paddle1 = exports.paddle1 = new Paddle(10);
var paddleAI = exports.paddleAI = new Paddle(_Canvas.canvas.canvas.width - 10 - 10);

},{"./Canvas":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.score = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require("./Canvas");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Score = function () {
    function Score() {
        _classCallCheck(this, Score);

        this.points = [0, 0];
    }

    _createClass(Score, [{
        key: "draw",
        value: function draw() {
            _Canvas.canvas.ctx.font = "100px Arial";
            _Canvas.canvas.ctx.fillStyle = "#FFF";
            var textWidth1 = _Canvas.canvas.ctx.measureText(this.points[0]).width;
            var textWidth2 = _Canvas.canvas.ctx.measureText(this.points[1]).width;
            _Canvas.canvas.ctx.fillText(this.points[0], _Canvas.canvas.canvas.width / 4 - textWidth1 / 2, 100);
            _Canvas.canvas.ctx.fillText(this.points[1], _Canvas.canvas.canvas.width / 4 * 3 - textWidth2 / 2, 100);
        }
    }, {
        key: "maxScoreReached",
        value: function maxScoreReached() {
            return this.points[0] === 11 || this.points[1] === 11;
        }
    }, {
        key: "reset",
        value: function reset() {
            this.points = [0, 0];
        }
    }]);

    return Score;
}();

var score = exports.score = new Score();

},{"./Canvas":9}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvQUkuanMiLCJkZXYvanMvQ29sbGlzaW9uLmpzIiwiZGV2L2pzL0luaXRpYWxpemUuanMiLCJkZXYvanMvUm91bmRTdGFydC5qcyIsImRldi9qcy9pbnB1dC5qcyIsImRldi9qcy9tYWluLmpzIiwiZGV2L2pzL21hcC9CYWxsLmpzIiwiZGV2L2pzL21hcC9Ccmlja3MuanMiLCJkZXYvanMvbWFwL0NhbnZhcy5qcyIsImRldi9qcy9tYXAvUGFkZGxlLmpzIiwiZGV2L2pzL21hcC9TY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFJLG1CQUFtQixTQUFuQixnQkFBbUIsR0FBTTtBQUN6QixRQUFJLFdBQUssRUFBTCxHQUFVLENBQWQsRUFBaUI7QUFDYixZQUFJLGlCQUFTLENBQVQsR0FBYSxDQUFDLGVBQU8sTUFBUCxDQUFjLE1BQWQsR0FBdUIsaUJBQVMsWUFBakMsSUFBaUQsQ0FBakQsR0FBcUQsaUJBQVMsWUFBVCxHQUFzQixDQUE1RixFQUErRjtBQUMzRiw2QkFBUyxDQUFULElBQWMsQ0FBZDtBQUNILFNBRkQsTUFFTyxJQUFJLGlCQUFTLENBQVQsR0FBYSxDQUFDLGVBQU8sTUFBUCxDQUFjLE1BQWQsR0FBdUIsaUJBQVMsWUFBakMsSUFBaUQsQ0FBakQsR0FBcUQsaUJBQVMsWUFBVCxHQUFzQixDQUE1RixFQUErRjtBQUNsRyw2QkFBUyxDQUFULElBQWMsQ0FBZDtBQUNIO0FBQ0osS0FORCxNQU1PO0FBQ0gsWUFBSSxFQUFFLFdBQUssQ0FBTCxHQUFVLFdBQUssZ0JBQUwsR0FBc0IsQ0FBaEMsR0FBc0MsZUFBTyxNQUFQLENBQWMsTUFBZCxHQUF1QixpQkFBUyxZQUFoQyxHQUErQyxFQUF2RixLQUNELEVBQUcsV0FBSyxDQUFMLEdBQVUsV0FBSyxnQkFBTCxHQUFzQixDQUFoQyxHQUFzQyxF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WSxDQUFaLE1BQW1CLEVBQW5CLElBQXlCLEtBQUssTUFBTCxDQUFZLENBQVosTUFBbUIsRUFBbkQ7QUFDSDs7O2dDQUVNO0FBQ0gsaUJBQUssTUFBTCxHQUFjLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBZDtBQUNIOzs7Ozs7QUFHRSxJQUFJLHdCQUFRLElBQUksS0FBSixFQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7YmFsbH0gZnJvbSBcIi4vbWFwL0JhbGxcIjtcbmltcG9ydCB7Y2FudmFzfSBmcm9tIFwiLi9tYXAvQ2FudmFzXCI7XG5pbXBvcnQge3BhZGRsZUFJfSBmcm9tIFwiLi9tYXAvUGFkZGxlXCI7XG5cbmxldCBwYWRkbGVBSU1vdmVtZW50ID0gKCkgPT4ge1xuICAgIGlmIChiYWxsLmR4IDwgMCkge1xuICAgICAgICBpZiAocGFkZGxlQUkueSA8IChjYW52YXMuY2FudmFzLmhlaWdodCAtIHBhZGRsZUFJLnBhZGRsZUhlaWdodCkgLyAyIC0gcGFkZGxlQUkucGFkZGxlSGVpZ2h0LzIpIHtcbiAgICAgICAgICAgIHBhZGRsZUFJLnkgKz0gODtcbiAgICAgICAgfSBlbHNlIGlmIChwYWRkbGVBSS55ID4gKGNhbnZhcy5jYW52YXMuaGVpZ2h0IC0gcGFkZGxlQUkucGFkZGxlSGVpZ2h0KSAvIDIgKyBwYWRkbGVBSS5wYWRkbGVIZWlnaHQvMikge1xuICAgICAgICAgICAgcGFkZGxlQUkueSAtPSA4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCEoYmFsbC55IC0gKGJhbGwuc3F1YXJlQmFsbExlbmd0aC8yKSA+ICBjYW52YXMuY2FudmFzLmhlaWdodCAtIHBhZGRsZUFJLnBhZGRsZUhlaWdodCAtIDMwKVxuICAgICAgICAmJiAhKCBiYWxsLnkgKyAoYmFsbC5zcXVhcmVCYWxsTGVuZ3RoLzIpIDwgIDMwKSkge1xuICAgICAgICAgICAgaWYgKGJhbGwueSAgPiBwYWRkbGVBSS55ICsgKHBhZGRsZUFJLnBhZGRsZUhlaWdodC80KSkge1xuICAgICAgICAgICAgICAgIHBhZGRsZUFJLnkgKz0gMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFsbC55IDwgcGFkZGxlQUkueSArIHBhZGRsZUFJLnBhZGRsZUhlaWdodCApe1xuICAgICAgICAgICAgICAgIHBhZGRsZUFJLnkgLT0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCB7cGFkZGxlQUlNb3ZlbWVudH07XG4iLCJpbXBvcnQge2JhbGx9IGZyb20gXCIuL21hcC9CYWxsXCI7XG5pbXBvcnQge2NhbnZhc30gZnJvbSBcIi4vbWFwL0NhbnZhc1wiO1xuaW1wb3J0IHtwYWRkbGUxLCBwYWRkbGVBSX0gZnJvbSBcIi4vbWFwL1BhZGRsZVwiO1xuaW1wb3J0IHtyb3VuZFN0YXJ0fSBmcm9tIFwiLi9Sb3VuZFN0YXJ0XCI7XG5pbXBvcnQge3Njb3JlfSBmcm9tIFwiLi9tYXAvU2NvcmVcIjtcblxuY29uc3QgY29sbGlzaW9uID0gKCkgPT4ge1xuICAgIC8vdG9wIHdhbGxzXG4gICAgaWYoYmFsbC55ICsgYmFsbC5keSA+IGNhbnZhcy5jYW52YXMuaGVpZ2h0LSAoYmFsbC5zcXVhcmVCYWxsTGVuZ3RoLzIpIHx8IGJhbGwueSArIGJhbGwuZHkgPCAgKGJhbGwuc3F1YXJlQmFsbExlbmd0aC8yKSApIHtcbiAgICAgICAgYmFsbC5keSAqPSAtMTtcbiAgICB9XG5cbiAgICBpZiAoc2NvcmUubWF4U2NvcmVSZWFjaGVkKCkpIHtcbiAgICAgICAgaWYoYmFsbC54ICsgYmFsbC5keCA+IGNhbnZhcy5jYW52YXMud2lkdGggLSAoYmFsbC5zcXVhcmVCYWxsTGVuZ3RoLzIpIHx8IGJhbGwueCArIGJhbGwuZHggPCAgKGJhbGwuc3F1YXJlQmFsbExlbmd0aC8yKSApIHtcbiAgICAgICAgICAgIGJhbGwuZHggKj0gLTE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNjb3JlLm1heFNjb3JlUmVhY2hlZCgpKSB7XG4gICAgICAgIGlmKGJhbGwueCArIGJhbGwuZHggPCBiYWxsLnNxdWFyZUJhbGxMZW5ndGgpIHtcbiAgICAgICAgICAgIGlmKGJhbGwueSAgLSBiYWxsLnNxdWFyZUJhbGxMZW5ndGgvMiA+IHBhZGRsZTEueSAmJiBiYWxsLnkgKyBiYWxsLnNxdWFyZUJhbGxMZW5ndGgvMiA8IHBhZGRsZTEueSArIHBhZGRsZTEucGFkZGxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgYmFsbC5keCAqPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcmUucG9pbnRzWzFdICs9IDE7XG4gICAgICAgICAgICAgICAgcm91bmRTdGFydC5uZXdSb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihiYWxsLnggKyBiYWxsLmR4ID4gY2FudmFzLmNhbnZhcy53aWR0aCAtIChiYWxsLnNxdWFyZUJhbGxMZW5ndGggKiAxLjUpKSB7XG4gICAgICAgICAgICBpZihiYWxsLnkgLSBiYWxsLnNxdWFyZUJhbGxMZW5ndGgvMiA+IHBhZGRsZUFJLnkgJiYgYmFsbC55ICsgYmFsbC5zcXVhcmVCYWxsTGVuZ3RoLzIgPCBwYWRkbGVBSS55ICsgcGFkZGxlQUkucGFkZGxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgYmFsbC5keCAqPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcmUucG9pbnRzWzBdICs9IDE7XG4gICAgICAgICAgICAgICAgcm91bmRTdGFydC5uZXdSb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL21vdmUgYmFsbCBhZnRlciBjb2xsaXNpb24gY2hlY2tzXG4gICAgYmFsbC54ICs9IGJhbGwuZHg7XG4gICAgYmFsbC55ICs9IGJhbGwuZHk7XG59O1xuXG5leHBvcnQge2NvbGxpc2lvbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSkpibWwwYVdGc2FYcGxMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZGZRPT0iLCJpbXBvcnQge2JhbGx9IGZyb20gXCIuL21hcC9CYWxsXCI7XG5pbXBvcnQge2NhbnZhc30gZnJvbSBcIi4vbWFwL0NhbnZhc1wiO1xuXG5jbGFzcyBSb3VuZFN0YXJ0IHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLm5ld1JvdW5kID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXR1cCgpIHtcbiAgICAgICAgaWYgKHRoaXMubmV3Um91bmQpe1xuICAgICAgICAgICAgbGV0IG1pbiA9IDE7XG4gICAgICAgICAgICBsZXQgbWF4ID0gNDtcbiAgICAgICAgICAgIGJhbGwueCA9IGNhbnZhcy5jYW52YXMud2lkdGgvMjtcbiAgICAgICAgICAgIGJhbGwueSA9IChNYXRoLnJhbmRvbSgpICogKGNhbnZhcy5jYW52YXMuaGVpZ2h0ICsgMSkpO1xuICAgICAgICAgICAgbGV0IHhEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gMSA6IC0xO1xuICAgICAgICAgICAgbGV0IHlEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gMSA6IC0xO1xuICAgICAgICAgICAgYmFsbC5keCA9IHhEaXJlY3Rpb24gKiAoKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluKTtcbiAgICAgICAgICAgIGJhbGwuZHkgKj0geURpcmVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMubmV3Um91bmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGxldCByb3VuZFN0YXJ0ID0gbmV3IFJvdW5kU3RhcnQoKTtcbiIsImltcG9ydCB7Y2FudmFzfSBmcm9tIFwiLi9tYXAvQ2FudmFzXCI7XG5pbXBvcnQge3BhZGRsZTF9IGZyb20gXCIuL21hcC9QYWRkbGVcIjtcblxubGV0IHVwUHJlc3NlZCA9IGZhbHNlO1xubGV0IGRvd25QcmVzc2VkID0gZmFsc2U7XG5cbmNvbnN0IGtleURvd25IYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDM4KSB7XG4gICAgICAgIHVwUHJlc3NlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gNDApIHtcbiAgICAgICAgZG93blByZXNzZWQgPSB0cnVlO1xuICAgIH1cbn07XG5cbmNvbnN0IGtleVVwSGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAzOCkge1xuICAgICAgICB1cFByZXNzZWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSA0MCkge1xuICAgICAgICBkb3duUHJlc3NlZCA9IGZhbHNlO1xuICAgIH1cbn07XG5cbmNvbnN0IGNoZWNrSW5wdXQgPSAoKSA9PiB7XG4gICAgaWYgKGRvd25QcmVzc2VkICYmIHBhZGRsZTEueSA8IGNhbnZhcy5jYW52YXMuaGVpZ2h0LSBwYWRkbGUxLnBhZGRsZUhlaWdodCAtIDMwKSB7XG4gICAgICAgIHBhZGRsZTEueSArPSA4O1xuICAgIH0gZWxzZSBpZiAodXBQcmVzc2VkICYmIHBhZGRsZTEueSA+IDMwKSB7XG4gICAgICAgIHBhZGRsZTEueSAtPSA4O1xuICAgIH1cbn07XG5cbmV4cG9ydCB7a2V5VXBIYW5kbGVyLCBrZXlEb3duSGFuZGxlciwgY2hlY2tJbnB1dH07XG4iLCJpbXBvcnQge2JhbGx9IGZyb20gXCIuL21hcC9CYWxsXCI7XG5pbXBvcnQge2JyaWNrc30gZnJvbSBcIi4vbWFwL0JyaWNrc1wiO1xuaW1wb3J0IHtjYW52YXN9IGZyb20gXCIuL21hcC9DYW52YXNcIjtcbmltcG9ydCB7cGFkZGxlMSwgcGFkZGxlQUl9IGZyb20gXCIuL21hcC9QYWRkbGVcIjtcbmltcG9ydCB7cm91bmRTdGFydH0gZnJvbSBcIi4vUm91bmRTdGFydFwiO1xuaW1wb3J0IHtzY29yZX0gZnJvbSBcIi4vbWFwL1Njb3JlXCI7XG4vL1xuaW1wb3J0ICogYXMgYWkgZnJvbSBcIi4vQUlcIjtcbmltcG9ydCB7Y29sbGlzaW9ufSBmcm9tIFwiLi9Db2xsaXNpb25cIjtcbmltcG9ydCAqIGFzIGlucHV0IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQge2luaXRpYWxpemV9IGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAvL2NsZWFyIHNjcmVlblxuICAgIGNhbnZhcy5jdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy5jYW52YXMud2lkdGgsIGNhbnZhcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAvLyAvL2NoZWNrIGlmIG5ldyByb3VuZCwgaWYgc28gc2V0dXBcbiAgICByb3VuZFN0YXJ0LnNldHVwKCk7XG4gICAgLy8gLy9kcmF3IGFsbCBlbGVtZW50c1xuICAgIGJyaWNrcy5kcmF3KCk7XG4gICAgYmFsbC5kcmF3KCk7XG4gICAgc2NvcmUuZHJhdygpO1xuXG4gICAgaWYgKCFzY29yZS5tYXhTY29yZVJlYWNoZWQoKSkge1xuICAgICAgICBwYWRkbGUxLmRyYXcoKTtcbiAgICAgICAgcGFkZGxlQUkuZHJhdygpO1xuICAgICAgICAvLyAvL2NoZWNrIHBsYXllciBpbnB1dHNcbiAgICAgICAgaW5wdXQuY2hlY2tJbnB1dCgpO1xuICAgICAgICAvLyAvL2FpIG1vdmVtZW50c1xuICAgICAgICBhaS5wYWRkbGVBSU1vdmVtZW50KCk7XG5cbiAgICB9XG4gICAgLy8gLy9jaGVjayBmb3IgYmFsbCBjb2xsaXNpb25zXG4gICAgY29sbGlzaW9uKCk7XG5cbiAgICBsZXQgZnBzID0gNjA7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgICAgICAvLyBEcmF3aW5nIGNvZGUgZ29lcyBoZXJlXG4gICAgfSwgMTAwMCAvIGZwcyk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBpbnB1dC5rZXlEb3duSGFuZGxlciwgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGlucHV0LmtleVVwSGFuZGxlciwgZmFsc2UpO1xuZHJhdygpO1xuIiwiaW1wb3J0IHtjYW52YXN9IGZyb20gXCIuL0NhbnZhc1wiO1xuXG5jbGFzcyBCYWxsIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLng9IGNhbnZhcy5jYW52YXMud2lkdGgvMjtcbiAgICAgICAgdGhpcy55PSAwO1xuICAgICAgICB0aGlzLmR4ID0gMTtcbiAgICAgICAgdGhpcy5keSA9IDE7XG4gICAgICAgIHRoaXMuc3F1YXJlQmFsbExlbmd0aCA9IDg7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgY2FudmFzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FudmFzLmN0eC5yZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLnNxdWFyZUJhbGxMZW5ndGgsIHRoaXMuc3F1YXJlQmFsbExlbmd0aCk7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbCgpO1xuICAgICAgICBjYW52YXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLng9IGNhbnZhcy5jYW52YXMud2lkdGgvMjtcbiAgICAgICAgdGhpcy55PSAwO1xuICAgICAgICB0aGlzLmR4ID0gMTtcbiAgICAgICAgdGhpcy5keSA9IDE7XG4gICAgICAgIHRoaXMuc3F1YXJlQmFsbExlbmd0aCA9IDg7XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IGJhbGwgPSBuZXcgQmFsbCgpO1xuIiwiaW1wb3J0IHtjYW52YXN9IGZyb20gXCIuL0NhbnZhc1wiO1xuXG5jbGFzcyBCcmlja3Mge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuYnJpY2tIZWlnaHQgPSAxNTtcbiAgICAgICAgdGhpcy5icmlja1dpZHRoID0gMjtcbiAgICAgICAgdGhpcy5icmlja1BhZGRpbmcgPSAxMDtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvcihpOyBpPDMyOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBicmlja1kgPSAoaSAqICh0aGlzLmJyaWNrSGVpZ2h0ICsgdGhpcy5icmlja1BhZGRpbmcpKSArIDU7XG4gICAgICAgICAgICBjYW52YXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY2FudmFzLmN0eC5yZWN0KGNhbnZhcy5jYW52YXMud2lkdGggLyAyLCBicmlja1ksIHRoaXMuYnJpY2tXaWR0aCwgdGhpcy5icmlja0hlaWdodCk7XG4gICAgICAgICAgICBjYW52YXMuY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY2FudmFzLmN0eC5maWxsKCk7XG4gICAgICAgICAgICBjYW52YXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IGJyaWNrcyA9IG5ldyBCcmlja3MoKTtcbiIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgY2FudmFzID0gbmV3IENhbnZhcygpO1xuIiwiaW1wb3J0IHtjYW52YXN9IGZyb20gXCIuL0NhbnZhc1wiO1xuXG5jbGFzcyBQYWRkbGUge1xuICAgIGNvbnN0cnVjdG9yKHgpe1xuICAgICAgICB0aGlzLnBhZGRsZUhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLnBhZGRsZVdpZHRoID0gMTA7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IChjYW52YXMuY2FudmFzLmhlaWdodCAtIHRoaXMucGFkZGxlSGVpZ2h0KSAvIDI7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgY2FudmFzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FudmFzLmN0eC5yZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLnBhZGRsZVdpZHRoLCB0aGlzLnBhZGRsZUhlaWdodCk7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbCgpO1xuICAgICAgICBjYW52YXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIHJlc2V0KHgpIHtcbiAgICAgICAgdGhpcy5wYWRkbGVIZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy5wYWRkbGVXaWR0aCA9IDEwO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSAoY2FudmFzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLnBhZGRsZUhlaWdodCkgLyAyO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCBwYWRkbGUxID0gbmV3IFBhZGRsZSgxMCk7XG5leHBvcnQgbGV0IHBhZGRsZUFJID0gbmV3IFBhZGRsZShjYW52YXMuY2FudmFzLndpZHRoIC0gMTAgLSAxMCk7XG4iLCJpbXBvcnQge2NhbnZhc30gZnJvbSBcIi4vQ2FudmFzXCI7XG5cbmNsYXNzIFNjb3JlIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnBvaW50cyA9IFswLDBdO1xuICAgIH1cblxuICAgIGRyYXcoKXtcbiAgICAgICAgY2FudmFzLmN0eC5mb250ID0gXCIxMDBweCBBcmlhbFwiO1xuICAgICAgICBjYW52YXMuY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICBsZXQgdGV4dFdpZHRoMSA9IGNhbnZhcy5jdHgubWVhc3VyZVRleHQodGhpcy5wb2ludHNbMF0pLndpZHRoO1xuICAgICAgICBsZXQgdGV4dFdpZHRoMiA9IGNhbnZhcy5jdHgubWVhc3VyZVRleHQodGhpcy5wb2ludHNbMV0pLndpZHRoO1xuICAgICAgICBjYW52YXMuY3R4LmZpbGxUZXh0KHRoaXMucG9pbnRzWzBdLCAoY2FudmFzLmNhbnZhcy53aWR0aC80KSAtICh0ZXh0V2lkdGgxIC8gMikgLCAxMDApO1xuICAgICAgICBjYW52YXMuY3R4LmZpbGxUZXh0KHRoaXMucG9pbnRzWzFdLCAoY2FudmFzLmNhbnZhcy53aWR0aC80KSozIC0gKHRleHRXaWR0aDIgLyAyKSAsIDEwMCk7XG4gICAgfVxuXG4gICAgbWF4U2NvcmVSZWFjaGVkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50c1swXSA9PT0gMTEgfHwgdGhpcy5wb2ludHNbMV0gPT09IDExO1xuICAgIH1cblxuICAgIHJlc2V0KCl7XG4gICAgICAgIHRoaXMucG9pbnRzID0gWzAsMF07XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IHNjb3JlID0gbmV3IFNjb3JlKCk7XG4iXX0=
