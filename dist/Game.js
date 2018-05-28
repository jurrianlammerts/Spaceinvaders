import Alien from "./Alien";
import Ship from "./Ship";
export default class Game {
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
        this.ship = new Ship(
        // this.viewPortWidth / 2,
        // this.viewPortHeight - shipHeight,
        200, 250, 35, shipHeight, "./assets/images/Ship.png", this.viewPort);
        this.aliens = [];
        for (var indexY = 0; indexY < 2; indexY++) {
            for (var index = 0; index < 10; index++) {
                const alien = new Alien([
                    './assets/images/Blowup1.png',
                    './assets/images/Blowup2.png',
                    './assets/images/Blowup3.png',
                    './assets/images/Blowup4.png'
                ], 150, 300, 47, 34, "./assets/images/Invader.png", this.viewPort);
                alien.start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));
                alien.currentDirection = Alien.Direction.Right;
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
Game.KeyCodes = { LeftArrow: 37, RightArrow: 39, SpaceBar: 32 };
