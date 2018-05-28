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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(1);

window.addEventListener("load", () => {
    __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */].getInstance();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Alien__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ship__ = __webpack_require__(2);


class Game {
    constructor() {
        this.viewPortHeight = 600;
        this.viewPortWidth = 800;
        this.viewPort = null;
        this.ship = null;
        this.rocket = null;
        this.aliens = null;
        this.lblScore = null;
        this.score = 0;
        this.viewPort = document.getElementById("root");
        this.initiateBattlefield();
        this.gameLoop();
        // this.initiateEvents();
    }
    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }
    initiateBattlefield() {
        this.viewPort.style.position = 'relative';
        this.viewPort.style.width = this.viewPortWidth.toString() + 'px';
        this.viewPort.style.height = this.viewPortHeight.toString() + 'px';
        this.viewPort.style.left = ((document.documentElement.clientWidth - this.viewPortWidth) / 2).toString() + 'px';
        this.viewPort.style.top = ((document.documentElement.clientHeight - this.viewPortHeight) / 2).toString() + 'px';
        this.viewPort.style.backgroundColor = 'Black';
        const shipHeight = 60;
        this.ship = new __WEBPACK_IMPORTED_MODULE_1__Ship__["a" /* default */](
        // this.viewPortWidth / 2,
        // this.viewPortHeight - shipHeight,
        200, 250, 35, shipHeight, "./assets/images/Ship.png", this.viewPort);
        this.aliens = [];
        for (var indexY = 0; indexY < 2; indexY++) {
            for (var index = 0; index < 10; index++) {
                const alien = new __WEBPACK_IMPORTED_MODULE_0__Alien__["a" /* default */]([
                    './assets/images/Blowup1.png',
                    './assets/images/Blowup2.png',
                    './assets/images/Blowup3.png',
                    './assets/images/Blowup4.png'
                ], 150, 300, 47, 34, "./assets/images/Invader.png", this.viewPort);
                alien.start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));
                alien.currentDirection = __WEBPACK_IMPORTED_MODULE_0__Alien__["a" /* default */].Direction.Right;
                this.aliens.push(alien);
            }
        }
    }
    initiateEvents() {
        setInterval(() => {
            if (this.rocket.active)
                this.rocket.move();
            if (this.rocket.active) {
                var rocketRect = this.rocket.element.getBoundingClientRect();
                for (var index = 0; index < this.aliens.length; index++) {
                    if (this.aliens[index].active) {
                        var alienRect = this.aliens[index].element.getBoundingClientRect();
                        if (!(rocketRect.right < alienRect.left || rocketRect.left > alienRect.right || rocketRect.bottom < alienRect.top || rocketRect.top > alienRect.bottom)) {
                            this.aliens[index].kill();
                            this.rocket.kill();
                            this.score += 1000;
                            this.lblScore.textContent = this.score.toString();
                        }
                    }
                }
            }
        }, 1);
        setInterval(() => {
            for (var index = 0; index < this.aliens.length; index++)
                if (this.aliens[index].active)
                    this.aliens[index].move();
        }, 1);
        document.addEventListener('keydown', (event) => {
            var keyEvent = event;
            var keyCode = 0;
            if (keyEvent && keyEvent.keyCode)
                keyCode = keyEvent.keyCode;
            else if (window.event && window.event)
                keyCode = event.keyCode;
            if (keyCode) {
                switch (keyCode) {
                    case Game.KeyCodes.LeftArrow:
                    case Game.KeyCodes.RightArrow:
                        this.ship.update();
                        break;
                    case Game.KeyCodes.SpaceBar:
                        if (this.rocket.active)
                            this.rocket.move();
                        else
                            this.rocket.start(this.ship.x + (this.ship.width / 2), this.ship.y);
                        break;
                }
            }
        });
    }
    addEventListener(element, event, listener) {
        if (element.addEventListener)
            element.addEventListener(event, listener);
        else if (element.attachEvent)
            element.attachEvent(event, listener);
    }
    update() {
        this.ship.move();
    }
    gameLoop() {
        this.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;

Game.KeyCodes = { LeftArrow: 37, RightArrow: 39, SpaceBar: 32 };


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(3);

class Ship extends __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */] {
    constructor(...args) {
        super(...args);
        this.spriteURL = null;
        this.speed = 8;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
    }
    start(x, y) {
    }
    move() {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 65:
                this.x -= this.width;
                break;
            case 68:
                this.x += this.width;
                break;
            case 87:
                //this.y -= 30;
                break;
            case 83:
                //this.y += 30;
                break;
            case 32:
            //this.shoot();
        }
    }
    update() {
        this.style.left = this.x;
        this.style.top = this.y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ship;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_applyStyles__ = __webpack_require__(4);

class GameObject {
    constructor(x, y, width, height, spriteURL, viewport) {
        this.element = document.createElement("div");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.style = {
            position: "absolute",
            display: "block",
            backgroundImage: `url(${spriteURL})`,
            backgroundSize: "cover",
            width: `${width}px`,
            height: `${height}px`,
            left: `${x}px`,
            top: `${y}px`,
        };
        Object(__WEBPACK_IMPORTED_MODULE_0__util_applyStyles__["a" /* default */])(this.style, this.element);
        viewport.appendChild(this.element);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameObject;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyStyles;
// import entries from 'object.entries';
if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
function applyStyles(styles, el) {
    for (const [key, value] of Object.entries(styles)) {
        el.style[key] = value;
    }
}


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(3);

class Alien extends __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */] {
    constructor(explosionImageURLs, ...args) {
        super(...args);
        this.currentDirection = Alien.Direction.Right;
        this.active = false;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '999';
        this.explosionImageURLs = explosionImageURLs;
    }
    move() {
    }
    start(x, y) {
        this.element.style.visibility = 'visible';
        this.active = true;
    }
    kill() {
        this.element.style.visibility = 'hidden';
        this.active = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Alien;

Alien.Direction = { Left: 1, Right: 2 };


/***/ })
/******/ ]);