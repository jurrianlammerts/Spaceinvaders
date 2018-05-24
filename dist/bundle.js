/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __importDefault(__webpack_require__(1));
window.addEventListener("load", function () {
    new Game_1.default("root");
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Alien_1 = __importDefault(__webpack_require__(2));
var Ship_1 = __importDefault(__webpack_require__(3));
var Rocket_1 = __importDefault(__webpack_require__(4));
var Game = /** @class */ (function () {
    function Game(viewPortElementId) {
        this.viewPortHeight = 600;
        this.viewPortWidth = 800;
        this.viewPort = null;
        this.ship = null;
        this.rocket = null;
        this.aliens = null;
        this.lblScore = null;
        this.score = 0;
        this.viewPort = document.getElementById(viewPortElementId);
        this.InitiateBattlefield();
        this.InitiateEvents();
    }
    Game.prototype.InitiateBattlefield = function () {
        this.viewPort.style.position = 'absolute';
        this.viewPort.style.width = this.viewPortWidth.toString() + 'px';
        this.viewPort.style.height = this.viewPortHeight.toString() + 'px';
        this.viewPort.style.left = ((document.documentElement.clientWidth - this.viewPortWidth) / 2).toString() + 'px';
        this.viewPort.style.top = ((document.documentElement.clientHeight - this.viewPortHeight) / 2).toString() + 'px';
        this.viewPort.style.backgroundColor = 'Black';
        this.ship = new Ship_1.default('Images/Alien.png', this.viewPort);
        this.ship.SetXPos(this.viewPortWidth / 2);
        this.ship.SetYPos(this.viewPortHeight - this.ship.image.height);
        this.rocket = new Rocket_1.default('Images/Rocket.png', this.viewPort);
        this.aliens = new Array();
        for (var indexY = 0; indexY < 2; indexY++) {
            for (var index = 0; index < 10; index++) {
                var alien = new Alien_1.default('Images/Invader.png', this.viewPort, ['Images/Blowup1.png', 'Images/Blowup2.png', 'Images/Blowup3.png', 'Images/Blowup4.png']);
                alien.Start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));
                alien.currentDirection = Alien_1.default.Direction.Right;
                this.aliens.push(alien);
            }
        }
    };
    Game.prototype.InitiateEvents = function () {
        var _this = this;
        setInterval(function () {
            if (_this.rocket.active)
                _this.rocket.Move();
            if (_this.rocket.active) {
                var rocketRect = _this.rocket.image.getBoundingClientRect();
                for (var index = 0; index < _this.aliens.length; index++) {
                    if (_this.aliens[index].active) {
                        var alienRect = _this.aliens[index].image.getBoundingClientRect();
                        if (!(rocketRect.right < alienRect.left || rocketRect.left > alienRect.right || rocketRect.bottom < alienRect.top || rocketRect.top > alienRect.bottom)) {
                            _this.aliens[index].Kill();
                            _this.rocket.Kill();
                            _this.score += 1000;
                            _this.lblScore.textContent = _this.score.toString();
                        }
                    }
                }
            }
        }, 1);
        setInterval(function () {
            for (var index = 0; index < _this.aliens.length; index++)
                if (_this.aliens[index].active)
                    _this.aliens[index].Move();
        }, 1);
        this.addEventListener(document, 'keydown', function (event) {
            var keyEvent = event;
            var keyCode = 0;
            if (keyEvent && keyEvent.keyCode)
                keyCode = keyEvent.keyCode;
            else if (window.event && window.event)
                //keyCode = window.event.keyCode;
                if (keyCode) {
                    switch (keyCode) {
                        case Game.KeyCodes.LeftArrow:
                        case Game.KeyCodes.RightArrow:
                            _this.ship.Move(keyCode);
                            break;
                        case Game.KeyCodes.SpaceBar:
                            if (_this.rocket.active)
                                _this.rocket.Move();
                            else
                                _this.rocket.Start(_this.ship.posX + (_this.ship.width / 2), _this.ship.posY);
                            break;
                    }
                }
        });
    };
    Game.prototype.addEventListener = function (element, event, listener) {
        if (element.addEventListener)
            element.addEventListener(event, listener);
        else if (element.attachEvent)
            element.attachEvent(event, listener);
    };
    Game.KeyCodes = { LeftArrow: 37, RightArrow: 39, SpaceBar: 32 };
    return Game;
}());
exports.default = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Alien = /** @class */ (function () {
    function Alien(imageURL, viewPort, explosionImageURLs) {
        this.image = null;
        this.posX = 0;
        this.posY = 0;
        this.width = 0;
        this.height = 0;
        this.currentDirection = Alien.Direction.Right;
        this.active = false;
        this.viewPort = viewPort;
        this.image = document.createElement('img');
        this.viewPort.appendChild(this.image);
        this.image.src = imageURL;
        this.image.style.position = 'absolute';
        this.image.style.zIndex = '999';
        this.width = this.image.width;
        this.height = this.image.height;
        this.explosionImageURLs = explosionImageURLs;
    }
    Alien.prototype.SetXPos = function (posX) {
    };
    Alien.prototype.SetYPos = function (posY) {
    };
    Alien.prototype.Move = function () {
    };
    Alien.prototype.Start = function (posX, posY) {
        // this.SetXPos(posX);
        // this.SetYPos(posY);
        this.image.style.visibility = 'visible';
        this.active = true;
    };
    Alien.prototype.Kill = function () {
        this.image.style.visibility = 'hidden';
        this.active = false;
    };
    Alien.Direction = { Left: 1, Right: 2 };
    return Alien;
}());
exports.default = Alien;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ship = /** @class */ (function () {
    function Ship(imageURL, parentElement) {
        this.image = null;
        this.posX = 0;
        this.posY = 0;
        this.width = 0;
        this.height = 0;
        this.image = document.createElement('img');
        parentElement.appendChild(this.image);
        this.image.src = imageURL;
        this.image.style.position = 'absolute';
        this.image.style.zIndex = '1000';
        this.width = this.image.clientWidth;
        this.height = this.image.clientHeight;
    }
    Ship.prototype.SetXPos = function (posX) {
    };
    Ship.prototype.SetYPos = function (posY) {
    };
    Ship.prototype.Move = function (direction) {
    };
    return Ship;
}());
exports.default = Ship;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rocket = /** @class */ (function () {
    function Rocket(imageURL, parentElement) {
        this.image = null;
        this.posX = 0;
        this.posY = 0;
        this.width = 0;
        this.height = 0;
        this.active = false;
        this.image = document.createElement('img');
        parentElement.appendChild(this.image);
        this.image.src = imageURL;
        this.image.style.position = 'absolute';
        this.image.style.zIndex = '999';
        this.width = this.image.clientWidth;
        this.height = this.image.clientHeight;
        this.image.style.visibility = 'hidden';
    }
    Rocket.prototype.SetXPos = function (posX) {
    };
    Rocket.prototype.SetYPos = function (posY) {
    };
    Rocket.prototype.Move = function () {
    };
    Rocket.prototype.Start = function (posX, posY) {
        // this.SetXPos(posX);
        // this.SetYPos(posY);
        this.image.style.visibility = 'visible';
        this.active = true;
    };
    Rocket.prototype.Kill = function () {
        this.image.style.visibility = 'hidden';
        this.active = false;
    };
    return Rocket;
}());
exports.default = Rocket;


/***/ })
/******/ ]);