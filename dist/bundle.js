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
/******/ 	__webpack_require__.p = "/dist/";
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
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./dev/GameObject.ts\"));\nclass Alien extends GameObject_1.default {\n    constructor(explosionImageURLs, ...args) {\n        super(...args);\n        this.x = 0;\n        this.y = 0;\n        this.currentDirection = Alien.Direction.Right;\n        this.active = false;\n        this.element.style.position = 'absolute';\n        this.element.style.zIndex = '999';\n        this.explosionImageURLs = explosionImageURLs;\n    }\n    SetXPos(posX) {\n        this.x = posX;\n        let stringX = this.element.style.transform = \"translate(\" + this.x + \"px)\";\n        this.element.style.left = stringX;\n    }\n    SetYPos(posY) {\n        this.y = posY;\n        let stringY = this.element.style.transform = \"translate(\" + this.y + \"px)\";\n        this.element.style.top = stringY;\n    }\n    move() {\n        if (this.active) {\n            if (this.x <= 0) {\n                this.currentDirection = Alien.Direction.Right;\n                this.SetYPos(this.y + 10);\n            }\n            else if (this.x + this.width >= this.element.parentElement.clientWidth) {\n                this.currentDirection = Alien.Direction.Left;\n                this.SetYPos(this.y + 10);\n            }\n            if (this.currentDirection == Alien.Direction.Right)\n                this.SetXPos(this.x + 1);\n            else\n                this.SetXPos(this.x - 1);\n            let stringX = this.element.style.transform = \"translate(\" + this.x + \"px)\";\n            this.element.style.left = stringX;\n        }\n    }\n    start(x, y) {\n        this.SetXPos(x);\n        this.SetYPos(y);\n        this.element.style.visibility = 'visible';\n        this.active = true;\n    }\n    kill() {\n        this.element.style.visibility = 'hidden';\n        this.active = false;\n    }\n}\nAlien.Direction = { Left: 1, Right: 2 };\nexports.default = Alien;\n\n\n//# sourceURL=webpack:///./dev/Alien.ts?");

/***/ }),

/***/ "./dev/Game.ts":
/*!*********************!*\
  !*** ./dev/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Alien_1 = __importDefault(__webpack_require__(/*! ./Alien */ \"./dev/Alien.ts\"));\nconst Ship_1 = __importDefault(__webpack_require__(/*! ./Ship */ \"./dev/Ship.ts\"));\nconst Rocket_1 = __importDefault(__webpack_require__(/*! ./Rocket */ \"./dev/Rocket.ts\"));\nclass Game {\n    constructor() {\n        this.viewPortHeight = document.documentElement.clientHeight;\n        this.viewPortWidth = document.documentElement.clientWidth;\n        this.viewPort = null;\n        this.running = false;\n        this.ship = null;\n        this.rocket = null;\n        this.aliens = null;\n        this.lblScore = null;\n        this.score = 0;\n        this.viewPort = document.getElementById(\"root\");\n        this.initiateBattlefield();\n        this.gameLoop();\n        this.initiateEvents();\n        window.addEventListener(\"keydown\", (e) => this.onKeyDown(e));\n    }\n    static getInstance() {\n        if (!Game.instance)\n            Game.instance = new Game();\n        return Game.instance;\n    }\n    initiateBattlefield() {\n        this.viewPort.style.position = 'relative';\n        this.viewPort.style.width = this.viewPortWidth.toString() + 'px';\n        this.viewPort.style.height = this.viewPortHeight.toString() + 'px';\n        this.viewPort.style.left = ((document.documentElement.clientWidth - this.viewPortWidth) / 2).toString() + 'px';\n        this.viewPort.style.top = ((document.documentElement.clientHeight - this.viewPortHeight) / 2).toString() + 'px';\n        this.viewPort.style.backgroundColor = 'Black';\n        this.running = true;\n        this.ship = new Ship_1.default(35, 60, \"./assets/images/Ship.png\", this.viewPort);\n        this.rocket = new Rocket_1.default(10, 25, \"./assets/images/Rocket.png\", this.viewPort);\n        this.aliens = [];\n        for (let indexY = 0; indexY < 2; indexY++) {\n            for (let index = 0; index < 10; index++) {\n                const alien = new Alien_1.default([\n                    './assets/images/Blowup1.png',\n                    './assets/images/Blowup2.png',\n                    './assets/images/Blowup3.png',\n                    './assets/images/Blowup4.png'\n                ], 47, 34, \"./assets/images/Invader.png\", this.viewPort);\n                alien.start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));\n                alien.currentDirection = Alien_1.default.Direction.Right;\n                this.aliens.push(alien);\n            }\n        }\n    }\n    initiateEvents() {\n        setInterval(() => {\n            if (this.rocket.active)\n                this.rocket.move();\n            if (this.rocket.active) {\n                const rocketRect = this.rocket.element.getBoundingClientRect();\n                for (let index = 0; index < 100; index++) {\n                    if (this.aliens[index].active) {\n                        let alienRect = this.aliens[index].element.getBoundingClientRect();\n                        if (!(rocketRect.right < alienRect.left || rocketRect.left > alienRect.right || rocketRect.bottom < alienRect.top || rocketRect.top > alienRect.bottom)) {\n                            this.aliens[index].kill();\n                            this.rocket.kill();\n                            this.score += 1000;\n                            //this.lblScore.textContent = this.score.toString();\n                        }\n                    }\n                }\n            }\n        }, 1);\n        setInterval(() => {\n            for (var index = 0; index < this.aliens.length; index++)\n                if (this.aliens[index].active)\n                    this.aliens[index].move();\n        }, 1);\n    }\n    addEventListener(element, event, listener) {\n        if (element.addEventListener)\n            element.addEventListener(event, listener);\n        else if (element.attachEvent)\n            element.attachEvent(event, listener);\n    }\n    onKeyDown(event) {\n        switch (event.keyCode) {\n            case 65:\n                if (!(this.ship.x - this.ship.width < document.documentElement.clientLeft)) {\n                    this.ship.x -= this.ship.width;\n                }\n                break;\n            case 68:\n                console.log(\"calc = \", this.ship.x + this.ship.width);\n                console.log(\"left \", document.documentElement.clientWidth);\n                if (!(this.ship.x + 2 * this.ship.width > document.documentElement.clientWidth)) {\n                    this.ship.x += this.ship.width;\n                }\n                break;\n            case 32:\n                if (this.rocket.active) {\n                    this.rocket.move();\n                }\n                else {\n                    this.rocket.start(this.ship.x + (this.ship.width / 2), this.ship.y);\n                    console.log(\"Boom\");\n                }\n        }\n    }\n    update() {\n        this.ship.move();\n    }\n    gameLoop() {\n        if (this.running) {\n            this.update();\n        }\n        requestAnimationFrame(() => this.gameLoop());\n    }\n}\nexports.default = Game;\n\n\n//# sourceURL=webpack:///./dev/Game.ts?");

/***/ }),

/***/ "./dev/GameObject.ts":
/*!***************************!*\
  !*** ./dev/GameObject.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst applyStyles_1 = __importDefault(__webpack_require__(/*! ./util/applyStyles */ \"./dev/util/applyStyles.ts\"));\nclass GameObject {\n    constructor(width, height, spriteURL, viewport) {\n        this.element = document.createElement(\"div\");\n        this.width = width;\n        this.height = height;\n        this.style = {\n            position: \"absolute\",\n            display: \"block\",\n            backgroundImage: `url(${spriteURL})`,\n            backgroundSize: \"cover\",\n            width: `${width}px`,\n            height: `${height}px`,\n        };\n        applyStyles_1.default(this.style, this.element);\n        viewport.appendChild(this.element);\n    }\n}\nexports.default = GameObject;\n\n\n//# sourceURL=webpack:///./dev/GameObject.ts?");

/***/ }),

/***/ "./dev/Rocket.ts":
/*!***********************!*\
  !*** ./dev/Rocket.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./dev/GameObject.ts\"));\nclass Rocket extends GameObject_1.default {\n    constructor(...args) {\n        super(...args);\n        this.active = false;\n        this.x = 0;\n        this.y = 0;\n        this.width = 0;\n        this.height = 0;\n        this.spriteURL = null;\n        this.element.style.visibility = \"hidden\";\n        this.element.style.zIndex = '999';\n        this.width = 5;\n        this.height = 10;\n    }\n    SetXPos(posX) {\n        this.x = posX;\n        let stringX = this.element.style.transform = \"translate(\" + this.x + \"px)\";\n        this.element.style.left = stringX;\n    }\n    SetYPos(posY) {\n        this.y = posY;\n        let stringY = this.element.style.transform = \"translate(\" + this.y + \"px)\";\n        this.element.style.top = stringY;\n    }\n    move() {\n        let stringY = this.element.style.transform = \"translate(\" + this.y + \"px)\";\n        if (this.active) {\n            this.y -= 5;\n            this.element.style.transform = \"translate(\" + this.x + \"px, \" + this.y + \"px)\";\n            if (this.y <= 0) {\n                this.element.style.visibility = 'hidden';\n                this.active = false;\n            }\n            else\n                this.element.style.top = stringY;\n        }\n    }\n    start(x, y) {\n        this.SetXPos(x);\n        this.SetYPos(y);\n        this.element.style.visibility = 'visible';\n        this.active = true;\n    }\n    kill() {\n        this.element.style.visibility = 'hidden';\n        this.active = false;\n    }\n}\nexports.default = Rocket;\n\n\n//# sourceURL=webpack:///./dev/Rocket.ts?");

/***/ }),

/***/ "./dev/Ship.ts":
/*!*********************!*\
  !*** ./dev/Ship.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./dev/GameObject.ts\"));\nclass Ship extends GameObject_1.default {\n    constructor(...args) {\n        super(...args);\n        this.x = 0;\n        this.y = 0;\n        this.spriteURL = null;\n        this.x = document.documentElement.clientWidth / 2;\n        this.y = document.documentElement.clientHeight - this.height * 2;\n        console.log(document.documentElement.clientHeight);\n    }\n    move() {\n        this.element.style.transform = \"translate(\" + this.x + \"px, \" + this.y + \"px)\";\n    }\n    update() {\n        this.style.left = this.x;\n        this.style.top = this.y;\n    }\n}\nexports.default = Ship;\n\n\n//# sourceURL=webpack:///./dev/Ship.ts?");

/***/ }),

/***/ "./dev/index.ts":
/*!**********************!*\
  !*** ./dev/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Game_1 = __importDefault(__webpack_require__(/*! ./Game */ \"./dev/Game.ts\"));\nwindow.addEventListener(\"load\", () => {\n    Game_1.default.getInstance();\n});\n\n\n//# sourceURL=webpack:///./dev/index.ts?");

/***/ }),

/***/ "./dev/util/applyStyles.ts":
/*!*********************************!*\
  !*** ./dev/util/applyStyles.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nif (!Object.entries)\n    Object.entries = function (obj) {\n        var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i); // preallocate the Array\n        while (i--)\n            resArray[i] = [ownProps[i], obj[ownProps[i]]];\n        return resArray;\n    };\nfunction applyStyles(styles, el) {\n    for (const [key, value] of Object.entries(styles)) {\n        el.style[key] = value;\n    }\n}\nexports.default = applyStyles;\n\n\n//# sourceURL=webpack:///./dev/util/applyStyles.ts?");

/***/ })

/******/ });