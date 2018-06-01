import Alien from "./Alien";
import Ship from "./Ship";
import Rocket from "./Rocket";

export default class Game {
    private static instance: Game;

    private viewPortHeight: number = document.documentElement.clientHeight;
    private viewPortWidth: number = document.documentElement.clientWidth;

    public viewPort: HTMLElement = null;
    public running: boolean = false;

    private ship: Ship = null;
    public rocket: Rocket = null;
    public aliens: Alien[] = null;

    private lblScore: HTMLLabelElement = null;
    private score: number = 0;

    constructor() {
        this.viewPort = <HTMLElement>document.getElementById("root");
        this.initiateBattlefield();
        this.gameLoop();
        this.initiateEvents();
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }


    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }

    public initiateBattlefield() {
        this.viewPort.style.position = 'relative';
        this.viewPort.style.width = this.viewPortWidth.toString() + 'px';
        this.viewPort.style.height = this.viewPortHeight.toString() + 'px';
        this.viewPort.style.left = ((document.documentElement.clientWidth - this.viewPortWidth) / 2).toString() + 'px';
        this.viewPort.style.top = ((document.documentElement.clientHeight - this.viewPortHeight) / 2).toString() + 'px';
        this.viewPort.style.backgroundColor = 'Black';

        this.running = true;

        this.ship = new Ship(
            35,
            60,
            "./assets/images/Ship.png",
            this.viewPort
        );
        this.rocket = new Rocket(
            10,
            25,
            "./assets/images/Rocket.png",
            this.viewPort
        );
        this.aliens = [];
        for (let indexY = 0; indexY < 2; indexY++) {
            for (let index = 0; index < 10; index++) {
                const alien: Alien = new Alien([
                    './assets/images/Blowup1.png',
                    './assets/images/Blowup2.png',
                    './assets/images/Blowup3.png',
                    './assets/images/Blowup4.png'
                ],
                    47,
                    34,
                    "./assets/images/Invader.png",
                    this.viewPort,
                )
                alien.start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));
                alien.currentDirection = Alien.Direction.Right;
                this.aliens.push(alien);
            }
        }
    }

    private initiateEvents() {
        setInterval(() => {
            if (this.rocket.active)
                this.rocket.move();

            if (this.rocket.active) {
                const rocketRect: ClientRect = this.rocket.element.getBoundingClientRect();

                for (let index = 0; index < 100; index++) {
                    if (this.aliens[index].active) {
                        let alienRect: ClientRect = this.aliens[index].element.getBoundingClientRect();
                        if (!(rocketRect.right < alienRect.left || rocketRect.left > alienRect.right || rocketRect.bottom < alienRect.top || rocketRect.top > alienRect.bottom)) {
                            this.aliens[index].kill();
                            this.rocket.kill();

                            this.score += 1000;
                            //this.lblScore.textContent = this.score.toString();
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
    }

    private addEventListener(element: any, event: string, listener: EventListener) {
        if (element.addEventListener)
            element.addEventListener(event, listener);
        else if (element.attachEvent)
            element.attachEvent(event, listener);
    }

    private onKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case 65:
                if (!(this.ship.x - this.ship.width < document.documentElement.clientLeft)) {
                    this.ship.x -= this.ship.width;
                }
                break;
            case 68:
                console.log("calc = ", this.ship.x + this.ship.width)
                console.log("left ", document.documentElement.clientWidth)
                if (!(this.ship.x + 2 * this.ship.width > document.documentElement.clientWidth)) {
                    this.ship.x += this.ship.width;
                }
                break;
            case 32:
                if (this.rocket.active) {
                    this.rocket.move();
                }
                else {
                    this.rocket.start(this.ship.x + (this.ship.width / 2), this.ship.y);
                    console.log("Boom")
                }
        }
    }

    private update(): void {
        this.ship.move();
    }

    private gameLoop(): void {
        if(this.running){
		    this.update();
		}
		requestAnimationFrame(()=> this.gameLoop())
    }
}


