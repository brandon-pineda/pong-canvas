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
        if (_Paddle.paddleAI.y < (_Canvas.canvas.canvas.height - _Paddle.paddleAI.paddleHeight) / 2) {
            _Paddle.paddleAI.y += 15;
        } else if (_Paddle.paddleAI.y > (_Canvas.canvas.canvas.height - _Paddle.paddleAI.paddleHeight) / 2) {
            _Paddle.paddleAI.y -= 15;
        }
    } else {
        _Paddle.paddleAI.y = _Ball.ball.y * .8 - _Paddle.paddleAI.paddleHeight / 2;
    }
};

exports.paddleAIMovement = paddleAIMovement;

},{"./map/Ball":6,"./map/Canvas":8,"./map/Paddle":9}],2:[function(require,module,exports){
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
    if (_Ball.ball.y + _Ball.ball.dy > _Canvas.canvas.canvas.height - _Ball.ball.squareBallLength / 2 || _Ball.ball.y + _Ball.ball.dy < _Ball.ball.squareBallLength / 2) {
        _Ball.ball.dy *= -1;
    }

    if (_Ball.ball.x + _Ball.ball.dx < _Ball.ball.squareBallLength) {
        if (_Ball.ball.y > _Paddle.paddle1.y && _Ball.ball.y < _Paddle.paddle1.y + _Paddle.paddle1.paddleHeight) {
            _Ball.ball.dx *= -1;
        } else {
            _Score.score.points[1] += 1;
            _RoundStart.roundStart.newRound = true;
        }
    }

    if (_Ball.ball.x + _Ball.ball.dx > _Canvas.canvas.canvas.width - _Ball.ball.squareBallLength * 1.5) {
        if (_Ball.ball.y > _Paddle.paddleAI.y && _Ball.ball.y < _Paddle.paddleAI.y + _Paddle.paddleAI.paddleHeight) {
            _Ball.ball.dx *= -1;
        } else {
            _Score.score.points[0] += 1;
            _RoundStart.roundStart.newRound = true;
        }
    }
    //move ball after collision checks
    _Ball.ball.x += _Ball.ball.dx;
    _Ball.ball.y += _Ball.ball.dy;
};

exports.collision = collision;

},{"./RoundStart":3,"./map/Ball":6,"./map/Canvas":8,"./map/Paddle":9,"./map/Score":10}],3:[function(require,module,exports){
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

},{"./map/Ball":6,"./map/Canvas":8}],4:[function(require,module,exports){
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
    if (downPressed && _Paddle.paddle1.y < _Canvas.canvas.canvas.height - _Paddle.paddle1.paddleHeight - 40) {
        _Paddle.paddle1.y += 15;
    } else if (upPressed && _Paddle.paddle1.y > 40) {
        _Paddle.paddle1.y -= 15;
    }
};

exports.keyUpHandler = keyUpHandler;
exports.keyDownHandler = keyDownHandler;
exports.checkInput = checkInput;

},{"./map/Canvas":8,"./map/Paddle":9}],5:[function(require,module,exports){
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var draw = function draw() {
    //clear screen
    _Canvas.canvas.ctx.clearRect(0, 0, _Canvas.canvas.canvas.width, _Canvas.canvas.canvas.height);
    // //check if new round, if so setup
    _RoundStart.roundStart.setup();
    // //draw all elements
    _Paddle.paddle1.draw();
    _Paddle.paddleAI.draw();
    _Bricks.bricks.draw();
    _Ball.ball.draw();
    _Score.score.draw();
    // //check player inputs
    input.checkInput();
    // //ai movements
    ai.paddleAIMovement();
    // //check for ball collisions
    (0, _Collision.collision)();

    var fps = 60;
    setTimeout(function () {
        requestAnimationFrame(draw);
        // Drawing code goes here
    }, 1000 / fps);
    // requestAnimationFrame(draw);
};
//


document.addEventListener("keydown", input.keyDownHandler, false);
document.addEventListener("keyup", input.keyUpHandler, false);
draw();

},{"./AI":1,"./Collision":2,"./RoundStart":3,"./input":4,"./map/Ball":6,"./map/Bricks":7,"./map/Canvas":8,"./map/Paddle":9,"./map/Score":10}],6:[function(require,module,exports){
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
    }]);

    return Ball;
}();

var ball = exports.ball = new Ball();

},{"./Canvas":8}],7:[function(require,module,exports){
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

},{"./Canvas":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
    }]);

    return Paddle;
}();

var paddle1 = exports.paddle1 = new Paddle(10);
var paddleAI = exports.paddleAI = new Paddle(_Canvas.canvas.canvas.width - 10 - 10);

},{"./Canvas":8}],10:[function(require,module,exports){
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
    }]);

    return Score;
}();

var score = exports.score = new Score();

},{"./Canvas":8}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvQUkuanMiLCJkZXYvanMvQ29sbGlzaW9uLmpzIiwiZGV2L2pzL1JvdW5kU3RhcnQuanMiLCJkZXYvanMvaW5wdXQuanMiLCJkZXYvanMvbWFpbi5qcyIsImRldi9qcy9tYXAvQmFsbC5qcyIsImRldi9qcy9tYXAvQnJpY2tzLmpzIiwiZGV2L2pzL21hcC9DYW52YXMuanMiLCJkZXYvanMvbWFwL1BhZGRsZS5qcyIsImRldi9qcy9tYXAvU2NvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLEdBQU07QUFDekIsUUFBSSxXQUFLLEVBQUwsR0FBVSxDQUFkLEVBQWlCO0FBQ2IsWUFBSSxpQkFBUyxDQUFULEdBQWEsQ0FBQyxlQUFPLE1BQVAsQ0FBYyxNQUFkLEdBQXVCLGlCQUFTLFlBQWpDLElBQWlELENBQWxFLEVBQXFFO0FBQ2pFLDZCQUFTLENBQVQsSUFBYyxFQUFkO0FBQ0gsU0FGRCxNQUVPLElBQUksaUJBQVMsQ0FBVCxHQUFhLENBQUMsZUFBTyxNQUFQLENBQWMsTUFBZCxHQUF1QixpQkFBUyxZQUFqQyxJQUFpRCxDQUFsRSxFQUFxRTtBQUN4RSw2QkFBUyxDQUFULElBQWMsRUFBZDtBQUNIO0FBQ0osS0FORCxNQU1PO0FBQ0gseUJBQVMsQ0FBVCxHQUFhLFdBQUssQ0FBTCxHQUFTLEVBQVQsR0FBZSxpQkFBUyxZQUFULEdBQXNCLENBQWxEO0FBQ0g7QUFDSixDQVZEOztRQVlRLGdCLEdBQUEsZ0I7Ozs7Ozs7Ozs7QUNoQlI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTSxZQUFZLFNBQVosU0FBWSxHQUFNO0FBQ3BCLFFBQUcsV0FBSyxDQUFMLEdBQVMsV0FBSyxFQUFkLEdBQW1CLGVBQU8sTUFBUCxDQUFjLE1BQWQsR0FBdUIsV0FBSyxn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QUFBOztBQUNULGFBQUssTUFBTCxHQUFjLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBZDtBQUNIOzs7OytCQUVLO0FBQ0YsMkJBQU8sR0FBUCxDQUFXLElBQVgsR0FBa0IsYUFBbEI7QUFDQSwyQkFBTyxHQUFQLENBQVcsU0FBWCxHQUF1QixNQUF2QjtBQUNBLGdCQUFJLGFBQWEsZUFBTyxHQUFQLENBQVcsV0FBWCxDQUF1QixLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQXZCLEVBQXVDLEtBQXhEO0FBQ0EsZ0JBQUksYUFBYSxlQUFPLEdBQVAsQ0FBVyxXQUFYLENBQXVCLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBdkIsRUFBdUMsS0FBeEQ7QUFDQSwyQkFBTyxHQUFQLENBQVcsUUFBWCxDQUFvQixLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQXBCLEVBQXFDLGVBQU8sTUFBUCxDQUFjLEtBQWQsR0FBb0IsQ0FBckIsR0FBMkIsYUFBYSxDQUE1RSxFQUFpRixHQUFqRjtBQUNBLDJCQUFPLEdBQVAsQ0FBVyxRQUFYLENBQW9CLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBcEIsRUFBcUMsZUFBTyxNQUFQLENBQWMsS0FBZCxHQUFvQixDQUFyQixHQUF3QixDQUF4QixHQUE2QixhQUFhLENBQTlFLEVBQW1GLEdBQW5GO0FBQ0g7Ozs7OztBQUdFLElBQUksd0JBQVEsSUFBSSxLQUFKLEVBQVoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtiYWxsfSBmcm9tIFwiLi9tYXAvQmFsbFwiO1xuaW1wb3J0IHtjYW52YXN9IGZyb20gXCIuL21hcC9DYW52YXNcIjtcbmltcG9ydCB7cGFkZGxlQUl9IGZyb20gXCIuL21hcC9QYWRkbGVcIjtcblxubGV0IHBhZGRsZUFJTW92ZW1lbnQgPSAoKSA9PiB7XG4gICAgaWYgKGJhbGwuZHggPCAwKSB7XG4gICAgICAgIGlmIChwYWRkbGVBSS55IDwgKGNhbnZhcy5jYW52YXMuaGVpZ2h0IC0gcGFkZGxlQUkucGFkZGxlSGVpZ2h0KSAvIDIpIHtcbiAgICAgICAgICAgIHBhZGRsZUFJLnkgKz0gMTU7XG4gICAgICAgIH0gZWxzZSBpZiAocGFkZGxlQUkueSA+IChjYW52YXMuY2FudmFzLmhlaWdodCAtIHBhZGRsZUFJLnBhZGRsZUhlaWdodCkgLyAyKSB7XG4gICAgICAgICAgICBwYWRkbGVBSS55IC09IDE1O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGFkZGxlQUkueSA9IGJhbGwueSAqIC44IC0gKHBhZGRsZUFJLnBhZGRsZUhlaWdodC8yKTtcbiAgICB9XG59O1xuXG5leHBvcnQge3BhZGRsZUFJTW92ZW1lbnR9O1xuIiwiaW1wb3J0IHtiYWxsfSBmcm9tIFwiLi9tYXAvQmFsbFwiO1xuaW1wb3J0IHtjYW52YXN9IGZyb20gXCIuL21hcC9DYW52YXNcIjtcbmltcG9ydCB7cGFkZGxlMSwgcGFkZGxlQUl9IGZyb20gXCIuL21hcC9QYWRkbGVcIjtcbmltcG9ydCB7cm91bmRTdGFydH0gZnJvbSBcIi4vUm91bmRTdGFydFwiO1xuaW1wb3J0IHtzY29yZX0gZnJvbSBcIi4vbWFwL1Njb3JlXCI7XG5cbmNvbnN0IGNvbGxpc2lvbiA9ICgpID0+IHtcbiAgICBpZihiYWxsLnkgKyBiYWxsLmR5ID4gY2FudmFzLmNhbnZhcy5oZWlnaHQtIChiYWxsLnNxdWFyZUJhbGxMZW5ndGgvMikgfHwgYmFsbC55ICsgYmFsbC5keSA8ICAoYmFsbC5zcXVhcmVCYWxsTGVuZ3RoLzIpICkge1xuICAgICAgICBiYWxsLmR5ICo9IC0xO1xuICAgIH1cblxuICAgIGlmKGJhbGwueCArIGJhbGwuZHggPCBiYWxsLnNxdWFyZUJhbGxMZW5ndGgpIHtcbiAgICAgICAgaWYoYmFsbC55ID4gcGFkZGxlMS55ICYmIGJhbGwueSA8IHBhZGRsZTEueSArIHBhZGRsZTEucGFkZGxlSGVpZ2h0KSB7XG4gICAgICAgICAgICBiYWxsLmR4ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcmUucG9pbnRzWzFdICs9IDE7XG4gICAgICAgICAgICByb3VuZFN0YXJ0Lm5ld1JvdW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGJhbGwueCArIGJhbGwuZHggPiBjYW52YXMuY2FudmFzLndpZHRoIC0gKGJhbGwuc3F1YXJlQmFsbExlbmd0aCAqIDEuNSkpIHtcbiAgICAgICAgaWYoYmFsbC55ID4gcGFkZGxlQUkueSAmJiBiYWxsLnkgPCBwYWRkbGVBSS55ICsgcGFkZGxlQUkucGFkZGxlSGVpZ2h0KSB7XG4gICAgICAgICAgICBiYWxsLmR4ICo9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcmUucG9pbnRzWzBdICs9IDE7XG4gICAgICAgICAgICByb3VuZFN0YXJ0Lm5ld1JvdW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL21vdmUgYmFsbCBhZnRlciBjb2xsaXNpb24gY2hlY2tzXG4gICAgYmFsbC54ICs9IGJhbGwuZHg7XG4gICAgYmFsbC55ICs9IGJhbGwuZHk7XG59O1xuXG5leHBvcnQge2NvbGxpc2lvbn07XG4iLCJpbXBvcnQge2JhbGx9IGZyb20gXCIuL21hcC9CYWxsXCI7XG5pbXBvcnQge2NhbnZhc30gZnJvbSBcIi4vbWFwL0NhbnZhc1wiO1xuXG5jbGFzcyBSb3VuZFN0YXJ0IHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLm5ld1JvdW5kID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXR1cCgpIHtcbiAgICAgICAgaWYgKHRoaXMubmV3Um91bmQpe1xuICAgICAgICAgICAgbGV0IG1pbiA9IDE7XG4gICAgICAgICAgICBsZXQgbWF4ID0gNDtcbiAgICAgICAgICAgIGJhbGwueCA9IGNhbnZhcy5jYW52YXMud2lkdGgvMjtcbiAgICAgICAgICAgIGJhbGwueSA9IChNYXRoLnJhbmRvbSgpICogKGNhbnZhcy5jYW52YXMuaGVpZ2h0ICsgMSkpO1xuICAgICAgICAgICAgbGV0IHhEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gMSA6IC0xO1xuICAgICAgICAgICAgbGV0IHlEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gMSA6IC0xO1xuICAgICAgICAgICAgYmFsbC5keCA9IHhEaXJlY3Rpb24gKiAoKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluKTtcbiAgICAgICAgICAgIGJhbGwuZHkgKj0geURpcmVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMubmV3Um91bmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGxldCByb3VuZFN0YXJ0ID0gbmV3IFJvdW5kU3RhcnQoKTtcbiIsImltcG9ydCB7Y2FudmFzfSBmcm9tIFwiLi9tYXAvQ2FudmFzXCI7XG5pbXBvcnQge3BhZGRsZTF9IGZyb20gXCIuL21hcC9QYWRkbGVcIjtcblxubGV0IHVwUHJlc3NlZCA9IGZhbHNlO1xubGV0IGRvd25QcmVzc2VkID0gZmFsc2U7XG5cbmNvbnN0IGtleURvd25IYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDM4KSB7XG4gICAgICAgIHVwUHJlc3NlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gNDApIHtcbiAgICAgICAgZG93blByZXNzZWQgPSB0cnVlO1xuICAgIH1cbn07XG5cbmNvbnN0IGtleVVwSGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAzOCkge1xuICAgICAgICB1cFByZXNzZWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSA0MCkge1xuICAgICAgICBkb3duUHJlc3NlZCA9IGZhbHNlO1xuICAgIH1cbn07XG5cbmNvbnN0IGNoZWNrSW5wdXQgPSAoKSA9PiB7XG4gICAgaWYgKGRvd25QcmVzc2VkICYmIHBhZGRsZTEueSA8IGNhbnZhcy5jYW52YXMuaGVpZ2h0LSBwYWRkbGUxLnBhZGRsZUhlaWdodCAtIDQwKSB7XG4gICAgICAgIHBhZGRsZTEueSArPSAxNTtcbiAgICB9IGVsc2UgaWYgKHVwUHJlc3NlZCAmJiBwYWRkbGUxLnkgPiA0MCkge1xuICAgICAgICBwYWRkbGUxLnkgLT0gMTU7XG4gICAgfVxufTtcblxuZXhwb3J0IHtrZXlVcEhhbmRsZXIsIGtleURvd25IYW5kbGVyLCBjaGVja0lucHV0fTtcbiIsImltcG9ydCB7YmFsbH0gZnJvbSBcIi4vbWFwL0JhbGxcIjtcbmltcG9ydCB7YnJpY2tzfSBmcm9tIFwiLi9tYXAvQnJpY2tzXCI7XG5pbXBvcnQge2NhbnZhc30gZnJvbSBcIi4vbWFwL0NhbnZhc1wiO1xuaW1wb3J0IHtwYWRkbGUxLCBwYWRkbGVBSX0gZnJvbSBcIi4vbWFwL1BhZGRsZVwiO1xuaW1wb3J0IHtyb3VuZFN0YXJ0fSBmcm9tIFwiLi9Sb3VuZFN0YXJ0XCI7XG5pbXBvcnQge3Njb3JlfSBmcm9tIFwiLi9tYXAvU2NvcmVcIjtcbi8vXG5pbXBvcnQgKiBhcyBhaSBmcm9tIFwiLi9BSVwiO1xuaW1wb3J0IHtjb2xsaXNpb259IGZyb20gXCIuL0NvbGxpc2lvblwiO1xuaW1wb3J0ICogYXMgaW5wdXQgZnJvbSBcIi4vaW5wdXRcIjtcblxuY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAvL2NsZWFyIHNjcmVlblxuICAgIGNhbnZhcy5jdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy5jYW52YXMud2lkdGgsIGNhbnZhcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAvLyAvL2NoZWNrIGlmIG5ldyByb3VuZCwgaWYgc28gc2V0dXBcbiAgICByb3VuZFN0YXJ0LnNldHVwKCk7XG4gICAgLy8gLy9kcmF3IGFsbCBlbGVtZW50c1xuICAgIHBhZGRsZTEuZHJhdygpO1xuICAgIHBhZGRsZUFJLmRyYXcoKTtcbiAgICBicmlja3MuZHJhdygpO1xuICAgIGJhbGwuZHJhdygpO1xuICAgIHNjb3JlLmRyYXcoKTtcbiAgICAvLyAvL2NoZWNrIHBsYXllciBpbnB1dHNcbiAgICBpbnB1dC5jaGVja0lucHV0KCk7XG4gICAgLy8gLy9haSBtb3ZlbWVudHNcbiAgICBhaS5wYWRkbGVBSU1vdmVtZW50KCk7XG4gICAgLy8gLy9jaGVjayBmb3IgYmFsbCBjb2xsaXNpb25zXG4gICAgY29sbGlzaW9uKCk7XG5cbiAgICBsZXQgZnBzID0gNjA7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgICAgICAvLyBEcmF3aW5nIGNvZGUgZ29lcyBoZXJlXG4gICAgfSwgMTAwMCAvIGZwcyk7XG4gICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaW5wdXQua2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBpbnB1dC5rZXlVcEhhbmRsZXIsIGZhbHNlKTtcbmRyYXcoKTtcbiIsImltcG9ydCB7Y2FudmFzfSBmcm9tIFwiLi9DYW52YXNcIjtcblxuY2xhc3MgQmFsbCB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy54PSBjYW52YXMuY2FudmFzLndpZHRoLzI7XG4gICAgICAgIHRoaXMueT0gMDtcbiAgICAgICAgdGhpcy5keCA9IDE7XG4gICAgICAgIHRoaXMuZHkgPSAxO1xuICAgICAgICB0aGlzLnNxdWFyZUJhbGxMZW5ndGggPSA4O1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIGNhbnZhcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbnZhcy5jdHgucmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zcXVhcmVCYWxsTGVuZ3RoLCB0aGlzLnNxdWFyZUJhbGxMZW5ndGgpO1xuICAgICAgICBjYW52YXMuY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICBjYW52YXMuY3R4LmZpbGwoKTtcbiAgICAgICAgY2FudmFzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgYmFsbCA9IG5ldyBCYWxsKCk7XG4iLCJpbXBvcnQge2NhbnZhc30gZnJvbSBcIi4vQ2FudmFzXCI7XG5cbmNsYXNzIEJyaWNrcyB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5icmlja0hlaWdodCA9IDE1O1xuICAgICAgICB0aGlzLmJyaWNrV2lkdGggPSAyO1xuICAgICAgICB0aGlzLmJyaWNrUGFkZGluZyA9IDEwO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yKGk7IGk8MzI7IGkrKykge1xuICAgICAgICAgICAgbGV0IGJyaWNrWSA9IChpICogKHRoaXMuYnJpY2tIZWlnaHQgKyB0aGlzLmJyaWNrUGFkZGluZykpICsgNTtcbiAgICAgICAgICAgIGNhbnZhcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjYW52YXMuY3R4LnJlY3QoY2FudmFzLmNhbnZhcy53aWR0aCAvIDIsIGJyaWNrWSwgdGhpcy5icmlja1dpZHRoLCB0aGlzLmJyaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgICAgICBjYW52YXMuY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGNhbnZhcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgYnJpY2tzID0gbmV3IEJyaWNrcygpO1xuIiwiY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG4iLCJpbXBvcnQge2NhbnZhc30gZnJvbSBcIi4vQ2FudmFzXCI7XG5cbmNsYXNzIFBhZGRsZSB7XG4gICAgY29uc3RydWN0b3IoeCl7XG4gICAgICAgIHRoaXMucGFkZGxlSGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMucGFkZGxlV2lkdGggPSAxMDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0gKGNhbnZhcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5wYWRkbGVIZWlnaHQpIC8gMjtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBjYW52YXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW52YXMuY3R4LnJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMucGFkZGxlV2lkdGgsIHRoaXMucGFkZGxlSGVpZ2h0KTtcbiAgICAgICAgY2FudmFzLmN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgY2FudmFzLmN0eC5maWxsKCk7XG4gICAgICAgIGNhbnZhcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IHBhZGRsZTEgPSBuZXcgUGFkZGxlKDEwKTtcbmV4cG9ydCBsZXQgcGFkZGxlQUkgPSBuZXcgUGFkZGxlKGNhbnZhcy5jYW52YXMud2lkdGggLSAxMCAtIDEwKTtcbiIsImltcG9ydCB7Y2FudmFzfSBmcm9tIFwiLi9DYW52YXNcIjtcblxuY2xhc3MgU2NvcmUge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMucG9pbnRzID0gWzAsMF07XG4gICAgfVxuXG4gICAgZHJhdygpe1xuICAgICAgICBjYW52YXMuY3R4LmZvbnQgPSBcIjEwMHB4IEFyaWFsXCI7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgIGxldCB0ZXh0V2lkdGgxID0gY2FudmFzLmN0eC5tZWFzdXJlVGV4dCh0aGlzLnBvaW50c1swXSkud2lkdGg7XG4gICAgICAgIGxldCB0ZXh0V2lkdGgyID0gY2FudmFzLmN0eC5tZWFzdXJlVGV4dCh0aGlzLnBvaW50c1sxXSkud2lkdGg7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbFRleHQodGhpcy5wb2ludHNbMF0sIChjYW52YXMuY2FudmFzLndpZHRoLzQpIC0gKHRleHRXaWR0aDEgLyAyKSAsIDEwMCk7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbFRleHQodGhpcy5wb2ludHNbMV0sIChjYW52YXMuY2FudmFzLndpZHRoLzQpKjMgLSAodGV4dFdpZHRoMiAvIDIpICwgMTAwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgc2NvcmUgPSBuZXcgU2NvcmUoKTtcbiJdfQ==
