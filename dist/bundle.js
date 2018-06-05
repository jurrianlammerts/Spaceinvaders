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
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./dev/GameObject.ts\"));\nclass Alien extends GameObject_1.default {\n    constructor(movementSpeed, ...args) {\n        super(...args);\n        this.currentDirection = Alien.Direction.Right;\n        this.active = false;\n        this.movementSpeed = 1;\n        this.movementSpeed = movementSpeed;\n    }\n    move() {\n        if (this.active) {\n            if (this.x <= 10) {\n                this.currentDirection = Alien.Direction.Right;\n                this.updatePosition({ y: this.y + this.height });\n            }\n            else if (this.x + this.width >=\n                this.element.parentElement.clientWidth) {\n                this.currentDirection = Alien.Direction.Left;\n                this.updatePosition({ y: this.y + this.height });\n            }\n            if (this.currentDirection == Alien.Direction.Right)\n                this.updatePosition({ x: this.x + this.movementSpeed });\n            else\n                this.updatePosition({ x: this.x - this.movementSpeed });\n            this.updatePosition({ x: this.x });\n        }\n    }\n}\nAlien.Direction = { Left: 1, Right: 2 };\nexports.default = Alien;\n\n\n//# sourceURL=webpack:///./dev/Alien.ts?");

/***/ }),

/***/ "./dev/Game.ts":
/*!*********************!*\
  !*** ./dev/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Alien_1 = __importDefault(__webpack_require__(/*! ./Alien */ \"./dev/Alien.ts\"));\nconst Ship_1 = __importDefault(__webpack_require__(/*! ./Ship */ \"./dev/Ship.ts\"));\nconst Rocket_1 = __importDefault(__webpack_require__(/*! ./Rocket */ \"./dev/Rocket.ts\"));\nconst applyStyles_1 = __importDefault(__webpack_require__(/*! ./util/applyStyles */ \"./dev/util/applyStyles.ts\"));\nclass Game {\n    constructor() {\n        this.viewPortHeight = document.documentElement.clientHeight;\n        this.viewPortWidth = document.documentElement.clientWidth;\n        this.viewPort = null;\n        this.running = false;\n        this.ship = null;\n        this.aliens = [];\n        this.rocket = null;\n        this.lblScore = null;\n        this.score = 0;\n        this.alienColumns = 10;\n        this.alienRows = 1;\n        this.totalAliensAlive = 0;\n        this.wave = 1;\n        this.initiateStartScreen();\n    }\n    initiateStartScreen() {\n        this.viewPort = document.getElementById(\"root\");\n        applyStyles_1.default({\n            position: \"relative\",\n            width: `${this.viewPortWidth}px`,\n            height: `${this.viewPortHeight}px`,\n            left: \"0px\",\n            top: \"0px\",\n            backgroundColor: \"black\"\n        }, this.viewPort);\n        document.body.appendChild(this.viewPort);\n        this.gameControls = document.createElement(\"div\");\n        this.gameControls.innerHTML =\n            \"Use 'A' to move left, 'D' to move right & spacebar to shoot \";\n        applyStyles_1.default({\n            background: \"none\",\n            border: \"2px solid\",\n            position: \"absolute\",\n            top: \"35%\",\n            left: \"28%\",\n            color: \"white\",\n            \"font-family\": \"Work sans, Open sans, sans-serif\",\n            margin: \"0.5em\",\n            padding: \"1em 2em\"\n        }, this.gameControls);\n        this.viewPort.appendChild(this.gameControls);\n        this.startButton = document.createElement(\"button\");\n        this.startButton.innerHTML = \"START\";\n        applyStyles_1.default({\n            background: \"none\",\n            border: \"2px solid\",\n            position: \"absolute\",\n            top: \"50%\",\n            left: \"43%\",\n            color: \"white\",\n            \"font-family\": \"Open sans, sans-serif\",\n            \"font-size\": \"15px\",\n            margin: \"0.5em\",\n            padding: \"1em 2em\",\n            display: \"inline-block\",\n            transition: \"all 0.4s cubic-bezier(0.25, 0.1, 0.2, 1)\"\n        }, this.startButton);\n        this.viewPort.appendChild(this.startButton);\n        this.startButton.addEventListener(\"click\", (e) => this.startGame());\n    }\n    initiateScoreboard() {\n        this.scoreboard = document.createElement(\"div\");\n        this.scoreboard.innerHTML = \"Score: \";\n        applyStyles_1.default({\n            padding: \"20px\",\n            \"text-align\": \"center\",\n            visibility: \"visible\",\n            background: \"black\",\n            color: \"white\",\n            \"font-family\": \"Work sans, Open sans, sans-serif\"\n        }, this.scoreboard);\n        this.lblScore = document.createElement(\"label\");\n        this.lblScore.setAttribute(\"id\", \"score\");\n        this.scoreboard.appendChild(this.lblScore);\n        this.viewPort.appendChild(this.scoreboard);\n    }\n    deleteStartButton() {\n        applyStyles_1.default({\n            display: \"none\"\n        }, this.startButton);\n        applyStyles_1.default({\n            display: \"none\"\n        }, this.gameControls);\n    }\n    startGame() {\n        this.deleteStartButton();\n        this.initiateScoreboard();\n        this.viewPort = document.getElementById(\"root\");\n        this.lblScore = document.getElementById(\"score\");\n        this.initiateBattlefield();\n        this.gameLoop();\n    }\n    static getInstance() {\n        if (!Game.instance)\n            Game.instance = new Game();\n        return Game.instance;\n    }\n    initiateBattlefield() {\n        this.running = true;\n        this.ship = new Ship_1.default(35, 60, \"./assets/images/Ship.png\", this.viewPort);\n        this.rocket = new Rocket_1.default(10, 25, \"./assets/images/Rocket.png\", this.viewPort, true);\n        // this.currentWeapon = this.rocket;\n        this.generateAliens(this.wave);\n    }\n    generateAliens(wave) {\n        const offset = 20;\n        for (let y = 0; y < this.alienRows * this.wave; y++) {\n            for (let x = 0; x < this.alienColumns; x++) {\n                const alien = new Alien_1.default(wave * 2, 47, 34, \"./assets/images/Invader.png\", this.viewPort, true);\n                alien.start((alien.width + offset) * x + alien.width, (alien.height + offset) * y + alien.width);\n                alien.currentDirection = Alien_1.default.Direction.Right;\n                this.aliens.push(alien);\n                this.totalAliensAlive++;\n            }\n        }\n    }\n    updateGame() {\n        if (this.totalAliensAlive === 0) {\n            const nextWave = this.wave++;\n            this.generateAliens(nextWave);\n        }\n        if (this.rocket.active)\n            this.rocket.move();\n        if (this.rocket.active) {\n            const rocketRect = this.rocket.element.getBoundingClientRect();\n            const totalAliens = this.alienColumns * this.alienRows;\n            for (let i = 0; i < this.totalAliensAlive; i++) {\n                if (this.aliens[i].active) {\n                    let alienRect = this.aliens[i].element.getBoundingClientRect();\n                    if (!(rocketRect.right < alienRect.left ||\n                        rocketRect.left > alienRect.right ||\n                        rocketRect.bottom < alienRect.top ||\n                        rocketRect.top > alienRect.bottom)) {\n                        this.aliens[i].kill();\n                        this.aliens.splice(i, 1);\n                        this.totalAliensAlive--;\n                        this.rocket.kill();\n                        this.score += 50;\n                        this.lblScore.textContent = this.score.toString();\n                    }\n                }\n            }\n        }\n        // TODO: collision detection voor player en dan game over\n        for (var index = 0; index < this.aliens.length; index++)\n            if (this.aliens[index].active)\n                this.aliens[index].move();\n    }\n    gameLoop() {\n        this.updateGame();\n        requestAnimationFrame(() => this.gameLoop());\n    }\n}\nexports.default = Game;\n\n\n//# sourceURL=webpack:///./dev/Game.ts?");

/***/ }),

/***/ "./dev/GameObject.ts":
/*!***************************!*\
  !*** ./dev/GameObject.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst applyStyles_1 = __importDefault(__webpack_require__(/*! ./util/applyStyles */ \"./dev/util/applyStyles.ts\"));\nclass GameObject {\n    constructor(width, height, spriteURL, viewport, startHidden) {\n        this.x = 0;\n        this.y = 0;\n        this.active = false;\n        this.element = document.createElement(\"div\");\n        this.width = width;\n        this.height = height;\n        applyStyles_1.default({\n            position: \"absolute\",\n            display: \"block\",\n            backgroundImage: `url(${spriteURL})`,\n            backgroundSize: \"cover\",\n            width: `${width}px`,\n            height: `${height}px`\n        }, this.element);\n        // Nog meer polymorfisme\n        if (startHidden)\n            applyStyles_1.default({ visibility: \"hidden\" }, this.element);\n        viewport.appendChild(this.element);\n    }\n    updatePosition(pos) {\n        if (pos.x)\n            this.x = pos.x;\n        if (pos.y)\n            this.y = pos.y;\n        applyStyles_1.default({\n            transform: `translate3D(${this.x}px, ${this.y}px, 0px)`\n        }, this.element);\n    }\n    start(x, y) {\n        this.updatePosition({ x, y });\n        applyStyles_1.default({\n            visibility: 'visible'\n        }, this.element);\n        this.active = true;\n    }\n    kill() {\n        this.active = false;\n        applyStyles_1.default({\n            visibility: 'hidden'\n        }, this.element);\n    }\n    move() { }\n    ;\n}\nexports.default = GameObject;\n\n\n//# sourceURL=webpack:///./dev/GameObject.ts?");

/***/ }),

/***/ "./dev/Rocket.ts":
/*!***********************!*\
  !*** ./dev/Rocket.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./dev/GameObject.ts\"));\nclass Rocket extends GameObject_1.default {\n    constructor(...args) {\n        super(...args);\n        this.active = false;\n        this.spriteURL = null;\n    }\n    move() {\n        if (this.active) {\n            this.updatePosition({\n                x: this.x,\n                y: (this.y -= 7)\n            });\n            if (this.y <= 0)\n                this.kill();\n            else\n                this.updatePosition({ y: this.y });\n        }\n    }\n}\nexports.default = Rocket;\n\n\n//# sourceURL=webpack:///./dev/Rocket.ts?");

/***/ }),

/***/ "./dev/Ship.ts":
/*!*********************!*\
  !*** ./dev/Ship.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./dev/GameObject.ts\"));\nconst Game_1 = __importDefault(__webpack_require__(/*! ./Game */ \"./dev/Game.ts\"));\nclass Ship extends GameObject_1.default {\n    constructor(...args) {\n        super(...args);\n        this.spriteURL = null;\n        this.updatePosition({\n            x: document.documentElement.clientWidth / 2,\n            y: document.documentElement.clientHeight - this.height * 2\n        });\n        window.addEventListener(\"keydown\", (e) => this.onKeyDown(e));\n    }\n    onKeyDown(event) {\n        const game = Game_1.default.getInstance();\n        switch (event.keyCode) {\n            case 65:\n                if (!(this.x - this.width < document.documentElement.clientLeft)) {\n                    this.updatePosition({\n                        x: this.x - this.width\n                    });\n                }\n                break;\n            case 68:\n                if (!(this.x + 2 * this.width > document.documentElement.clientWidth)) {\n                    this.updatePosition({ x: this.x + this.width });\n                }\n                break;\n            case 32:\n                if (!game.rocket.active) {\n                    game.rocket.start(this.x + this.width / 2, this.y);\n                    game.rocket.move();\n                }\n                break;\n        }\n    }\n}\nexports.default = Ship;\n\n\n//# sourceURL=webpack:///./dev/Ship.ts?");

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