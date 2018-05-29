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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/Alien.ts":
/*!**********************!*\
  !*** ./dev/Alien.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ "./dev/GameObject.ts"));
class Alien extends GameObject_1.default {
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
Alien.Direction = { Left: 1, Right: 2 };
exports.default = Alien;


/***/ }),

/***/ "./dev/Game.ts":
/*!*********************!*\
  !*** ./dev/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Alien_1 = __importDefault(__webpack_require__(/*! ./Alien */ "./dev/Alien.ts"));
const Ship_1 = __importDefault(__webpack_require__(/*! ./Ship */ "./dev/Ship.ts"));
class Game {
    constructor() {
        this.viewPortHeight = document.documentElement.clientHeight;
        this.viewPortWidth = document.documentElement.clientWidth;
        this.viewPort = null;
        this.ship = null;
        this.rocket = null;
        this.aliens = null;
        this.lblScore = null;
        this.score = 0;
        this.viewPort = document.getElementById("root");
        this.initiateBattlefield();
        this.gameLoop();
        //this.initiateEvents();
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
        this.ship = new Ship_1.default(
        // this.viewPortHeight - shipHeight,
        200, 250, 35, 60, "./assets/images/Ship.png", this.viewPort);
        this.aliens = [];
        for (var indexY = 0; indexY < 2; indexY++) {
            for (var index = 0; index < 10; index++) {
                const alien = new Alien_1.default([
                    './assets/images/Blowup1.png',
                    './assets/images/Blowup2.png',
                    './assets/images/Blowup3.png',
                    './assets/images/Blowup4.png'
                ], 150, 300, 47, 34, "./assets/images/Invader.png", this.viewPort);
                alien.start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));
                alien.currentDirection = Alien_1.default.Direction.Right;
                this.aliens.push(alien);
            }
        }
    }
    // private initiateEvents() {
    //     setInterval(() => {
    //         if (this.rocket.active)
    //             this.rocket.move();
    //         if (this.rocket.active) {
    //             var rocketRect: ClientRect = this.rocket.element.getBoundingClientRect();
    //             for (var index = 0; index < this.aliens.length; index++) {
    //                 if (this.aliens[index].active) {
    //                     var alienRect: ClientRect = this.aliens[index].element.getBoundingClientRect();
    //                     if (!(rocketRect.right < alienRect.left || rocketRect.left > alienRect.right || rocketRect.bottom < alienRect.top || rocketRect.top > alienRect.bottom)) {
    //                         this.aliens[index].kill();
    //                         this.rocket.kill();
    //                         this.score += 1000;
    //                         this.lblScore.textContent = this.score.toString();
    //                     }
    //                 }
    //             }
    //         }
    //     }, 1);
    //     setInterval(() => {
    //         for (var index = 0; index < this.aliens.length; index++)
    //             if (this.aliens[index].active)
    //                 this.aliens[index].move();
    //     }, 1);
    // }
    addEventListener(element, event, listener) {
        if (element.addEventListener)
            element.addEventListener(event, listener);
        else if (element.attachEvent)
            element.attachEvent(event, listener);
    }
    update() {
        this.ship.move();
        this.ship.update();
    }
    gameLoop() {
        this.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
exports.default = Game;


/***/ }),

/***/ "./dev/GameObject.ts":
/*!***************************!*\
  !*** ./dev/GameObject.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applyStyles_1 = __importDefault(__webpack_require__(/*! ./util/applyStyles */ "./dev/util/applyStyles.ts"));
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
        applyStyles_1.default(this.style, this.element);
        viewport.appendChild(this.element);
    }
}
exports.default = GameObject;


/***/ }),

/***/ "./dev/Ship.ts":
/*!*********************!*\
  !*** ./dev/Ship.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ "./dev/GameObject.ts"));
class Ship extends GameObject_1.default {
    constructor(...args) {
        super(...args);
        this.spriteURL = null;
        this.speed = 8;
        this.minWidth = 0;
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
                if (!(this.x - this.width < this.viewPort.getBoundingClientRect().left)) {
                    this.x -= this.width;
                }
                else {
                    this.x -= this.width;
                }
                break;
            case 68:
                if (!(this.x + (0.16 * this.viewPort.getBoundingClientRect().right) > this.viewPort.getBoundingClientRect().right)) {
                    this.x += this.width;
                }
                else {
                    this.x += this.width;
                }
            case 87:
                //this.y -= 30;
                break;
            case 83:
                //this.y += 30;
                break;
            case 32:
                this.shoot();
        }
    }
    shoot() {
    }
    update() {
        this.style.left = this.x;
        this.style.top = this.y;
    }
}
exports.default = Ship;


/***/ }),

/***/ "./dev/index.ts":
/*!**********************!*\
  !*** ./dev/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./dev/Game.ts"));
window.addEventListener("load", () => {
    Game_1.default.getInstance();
});


/***/ }),

/***/ "./dev/util/applyStyles.ts":
/*!*********************************!*\
  !*** ./dev/util/applyStyles.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = applyStyles;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L0FsaWVuLnRzIiwid2VicGFjazovLy8uL2Rldi9HYW1lLnRzIiwid2VicGFjazovLy8uL2Rldi9HYW1lT2JqZWN0LnRzIiwid2VicGFjazovLy8uL2Rldi9TaGlwLnRzIiwid2VicGFjazovLy8uL2Rldi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9kZXYvdXRpbC9hcHBseVN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkEscUdBQXNDO0FBRXRDLFdBQTJCLFNBQVEsb0JBQVU7SUFVekMsWUFBWSxrQkFBa0IsRUFBRSxHQUFHLElBQUk7UUFDbkMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFOWixxQkFBZ0IsR0FBVyxLQUFLLENBQUMsU0FBUyxDQUFDLEtB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Ozs7Ozs7QUMxREQsbUZBQTBCO0FBRTFCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLGNBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ0ZGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztJQUNmLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHO1FBQzFCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQzNCLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUNuQixRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDckQsT0FBTyxDQUFDLEVBQUU7WUFDTixRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0FBRU4scUJBQW9DLE1BQWMsRUFBRSxFQUFlO0lBQy9ELEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQy9DLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3pCO0FBQ0wsQ0FBQztBQUpELDhCQUlDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGV2L2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4vR2FtZU9iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGllbiBleHRlbmRzIEdhbWVPYmplY3Qge1xuICAgIHB1YmxpYyBleHBsb3Npb25JbWFnZVVSTHM6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgZXhwbG9zaW9uSW5kZXg6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgRGlyZWN0aW9uID0geyBMZWZ0OiAxLCBSaWdodDogMiB9O1xuICAgIHB1YmxpYyBjdXJyZW50RGlyZWN0aW9uOiBudW1iZXIgPSBBbGllbi5EaXJlY3Rpb24uUmlnaHQ7XG4gICAgcHVibGljIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB2aWV3UG9ydDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihleHBsb3Npb25JbWFnZVVSTHMsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS56SW5kZXggPSAnOTk5JztcbiAgICAgICAgdGhpcy5leHBsb3Npb25JbWFnZVVSTHMgPSBleHBsb3Npb25JbWFnZVVSTHM7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMga2lsbCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWxpZW4gZnJvbSBcIi4vQWxpZW5cIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCBSb2NrZXQgZnJvbSBcIi4vUm9ja2V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBHYW1lO1xuXG4gICAgcHJpdmF0ZSB2aWV3UG9ydEhlaWdodDogbnVtYmVyID0gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgcHJpdmF0ZSB2aWV3UG9ydFdpZHRoOiBudW1iZXIgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICBwcml2YXRlIHZpZXdQb3J0OiBIVE1MRWxlbWVudCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHNoaXA6IFNoaXAgPSBudWxsO1xuICAgIHB1YmxpYyByb2NrZXQ6IFJvY2tldCA9IG51bGw7XG4gICAgcHJpdmF0ZSBhbGllbnM6IEFsaWVuW10gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBsYmxTY29yZTogSFRNTExhYmVsRWxlbWVudCA9IG51bGw7XG4gICAgcHJpdmF0ZSBzY29yZTogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZpZXdQb3J0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbiAgICAgICAgdGhpcy5pbml0aWF0ZUJhdHRsZWZpZWxkKCk7XG4gICAgICAgIHRoaXMuZ2FtZUxvb3AoKTtcbiAgICAgICAgLy90aGlzLmluaXRpYXRlRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAoIUdhbWUuaW5zdGFuY2UpXG4gICAgICAgICAgICBHYW1lLmluc3RhbmNlID0gbmV3IEdhbWUoKTtcbiAgICAgICAgcmV0dXJuIEdhbWUuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgIGluaXRpYXRlQmF0dGxlZmllbGQoKSB7XG4gICAgICAgIHRoaXMudmlld1BvcnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB0aGlzLnZpZXdQb3J0LnN0eWxlLndpZHRoID0gdGhpcy52aWV3UG9ydFdpZHRoLnRvU3RyaW5nKCkgKyAncHgnO1xuICAgICAgICB0aGlzLnZpZXdQb3J0LnN0eWxlLmhlaWdodCA9IHRoaXMudmlld1BvcnRIZWlnaHQudG9TdHJpbmcoKSArICdweCc7XG4gICAgICAgIHRoaXMudmlld1BvcnQuc3R5bGUubGVmdCA9ICgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC0gdGhpcy52aWV3UG9ydFdpZHRoKSAvIDIpLnRvU3RyaW5nKCkgKyAncHgnO1xuICAgICAgICB0aGlzLnZpZXdQb3J0LnN0eWxlLnRvcCA9ICgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIHRoaXMudmlld1BvcnRIZWlnaHQpIC8gMikudG9TdHJpbmcoKSArICdweCc7XG4gICAgICAgIHRoaXMudmlld1BvcnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ0JsYWNrJztcblxuICAgICAgICB0aGlzLnNoaXAgPSBuZXcgU2hpcChcbiAgICAgICAgICAgIC8vIHRoaXMudmlld1BvcnRIZWlnaHQgLSBzaGlwSGVpZ2h0LFxuICAgICAgICAgICAgMjAwLFxuICAgICAgICAgICAgMjUwLFxuICAgICAgICAgICAgMzUsXG4gICAgICAgICAgICA2MCxcbiAgICAgICAgICAgIFwiLi9hc3NldHMvaW1hZ2VzL1NoaXAucG5nXCIsXG4gICAgICAgICAgICB0aGlzLnZpZXdQb3J0XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hbGllbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXhZID0gMDsgaW5kZXhZIDwgMjsgaW5kZXhZKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCAxMDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFsaWVuOiBBbGllbiA9IG5ldyBBbGllbihbXG4gICAgICAgICAgICAgICAgICAgICcuL2Fzc2V0cy9pbWFnZXMvQmxvd3VwMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAnLi9hc3NldHMvaW1hZ2VzL0Jsb3d1cDIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgJy4vYXNzZXRzL2ltYWdlcy9CbG93dXAzLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICcuL2Fzc2V0cy9pbWFnZXMvQmxvd3VwNC5wbmcnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMTUwLFxuICAgICAgICAgICAgICAgICAgICAzMDAsXG4gICAgICAgICAgICAgICAgICAgIDQ3LFxuICAgICAgICAgICAgICAgICAgICAzNCxcbiAgICAgICAgICAgICAgICAgICAgXCIuL2Fzc2V0cy9pbWFnZXMvSW52YWRlci5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UG9ydCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGFsaWVuLnN0YXJ0KE1hdGgubWF4KChhbGllbi53aWR0aCArIDIwKSAqIGluZGV4LCAxKSwgTWF0aC5tYXgoKGFsaWVuLmhlaWdodCArIDE1KSAqIGluZGV4WSwgMSkpO1xuICAgICAgICAgICAgICAgIGFsaWVuLmN1cnJlbnREaXJlY3Rpb24gPSBBbGllbi5EaXJlY3Rpb24uUmlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGllbnMucHVzaChhbGllbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIGluaXRpYXRlRXZlbnRzKCkge1xuICAgIC8vICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgLy8gICAgICAgICBpZiAodGhpcy5yb2NrZXQuYWN0aXZlKVxuICAgIC8vICAgICAgICAgICAgIHRoaXMucm9ja2V0Lm1vdmUoKTtcblxuICAgIC8vICAgICAgICAgaWYgKHRoaXMucm9ja2V0LmFjdGl2ZSkge1xuICAgIC8vICAgICAgICAgICAgIHZhciByb2NrZXRSZWN0OiBDbGllbnRSZWN0ID0gdGhpcy5yb2NrZXQuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmFsaWVucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZW5zW2luZGV4XS5hY3RpdmUpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhciBhbGllblJlY3Q6IENsaWVudFJlY3QgPSB0aGlzLmFsaWVuc1tpbmRleF0uZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICghKHJvY2tldFJlY3QucmlnaHQgPCBhbGllblJlY3QubGVmdCB8fCByb2NrZXRSZWN0LmxlZnQgPiBhbGllblJlY3QucmlnaHQgfHwgcm9ja2V0UmVjdC5ib3R0b20gPCBhbGllblJlY3QudG9wIHx8IHJvY2tldFJlY3QudG9wID4gYWxpZW5SZWN0LmJvdHRvbSkpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWVuc1tpbmRleF0ua2lsbCgpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9ja2V0LmtpbGwoKTtcblxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gMTAwMDtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFNjb3JlLnRleHRDb250ZW50ID0gdGhpcy5zY29yZS50b1N0cmluZygpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuXG4gICAgLy8gICAgIH0sIDEpO1xuXG4gICAgLy8gICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAvLyAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmFsaWVucy5sZW5ndGg7IGluZGV4KyspXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuYWxpZW5zW2luZGV4XS5hY3RpdmUpXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuYWxpZW5zW2luZGV4XS5tb3ZlKCk7XG4gICAgLy8gICAgIH0sIDEpO1xuICAgIC8vIH1cblxuICAgIHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBhbnksIGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgZWxzZSBpZiAoZWxlbWVudC5hdHRhY2hFdmVudClcbiAgICAgICAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zaGlwLm1vdmUoKTtcbiAgICAgICAgdGhpcy5zaGlwLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2FtZUxvb3AoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmdhbWVMb29wKCkpO1xuICAgIH1cbn1cblxuXG4iLCJpbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vdXRpbC9hcHBseVN0eWxlc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPYmplY3Qge1xuICAgIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xuICAgIHB1YmxpYyB5OiBudW1iZXI7XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICAgIHB1YmxpYyBzdHlsZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlciwgd2lkdGg/OiBudW1iZXIsIGhlaWdodD86IG51bWJlciwgc3ByaXRlVVJMPzogc3RyaW5nLCB2aWV3cG9ydD86IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7c3ByaXRlVVJMfSlgLFxuICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6IFwiY292ZXJcIixcbiAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGAsXG4gICAgICAgICAgICBsZWZ0OiBgJHt4fXB4YCxcbiAgICAgICAgICAgIHRvcDogYCR7eX1weGAsXG4gICAgICAgIH07XG4gICAgICAgIGFwcGx5U3R5bGVzKHRoaXMuc3R5bGUsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB9XG59IiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi9HYW1lT2JqZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCBleHRlbmRzIEdhbWVPYmplY3Qge1xuXG4gICAgcHVibGljIHNwcml0ZVVSTCA9IG51bGw7XG4gICAgcHVibGljIHNwZWVkID0gODtcbiAgICBwcml2YXRlIG1pbldpZHRoOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyB2aWV3UG9ydDogYW55O1xuXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzLCApO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGU6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMub25LZXlEb3duKGUpKVxuXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIHRoaXMueCArIFwicHgsIFwiICsgdGhpcy55ICsgXCJweClcIjtcbiAgICB9XG5cbiAgICBcblxuICAgIHByaXZhdGUgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLnggLSB0aGlzLndpZHRoIDwgdGhpcy52aWV3UG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy54ICsgKDAuMTYgKiB0aGlzLnZpZXdQb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0KSA+IHRoaXMudmlld1BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgODc6XG4gICAgICAgICAgICAgICAgLy90aGlzLnkgLT0gMzA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDgzOlxuICAgICAgICAgICAgICAgIC8vdGhpcy55ICs9IDMwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICB0aGlzLnNob290KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvb3QoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0eWxlLmxlZnQgPSB0aGlzLnhcbiAgICAgICAgdGhpcy5zdHlsZS50b3AgPSB0aGlzLnlcbiAgICB9XG59XG5cbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgR2FtZS5nZXRJbnN0YW5jZSgpO1xufSkiLCJpbXBvcnQgZW50cmllcyBmcm9tICdvYmplY3QuZW50cmllcyc7XG5cbmlmICghT2JqZWN0LmVudHJpZXMpXG4gICAgT2JqZWN0LmVudHJpZXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBvd25Qcm9wcyA9IE9iamVjdC5rZXlzKG9iaiksXG4gICAgICAgICAgICBpID0gb3duUHJvcHMubGVuZ3RoLFxuICAgICAgICAgICAgcmVzQXJyYXkgPSBuZXcgQXJyYXkoaSk7IC8vIHByZWFsbG9jYXRlIHRoZSBBcnJheVxuICAgICAgICB3aGlsZSAoaS0tKVxuICAgICAgICAgICAgcmVzQXJyYXlbaV0gPSBbb3duUHJvcHNbaV0sIG9ialtvd25Qcm9wc1tpXV1dO1xuXG4gICAgICAgIHJldHVybiByZXNBcnJheTtcbiAgICB9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBseVN0eWxlcyhzdHlsZXM6IG9iamVjdCwgZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xuICAgICAgICBlbC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxufSAiXSwic291cmNlUm9vdCI6IiJ9