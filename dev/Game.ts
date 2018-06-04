import Alien from "./Alien";
import Ship from "./Ship";
import Rocket from "./Rocket";
import applyStyles from "./util/applyStyles";

export default class Game {
    private static instance: Game;

    private viewPortHeight: number = document.documentElement.clientHeight;
    private viewPortWidth: number = document.documentElement.clientWidth;

    public viewPort: HTMLElement = null;
    public running: boolean = false;

    private ship: Ship = null;
    public rocket: Rocket = null;
    public aliens: Alien[] = [];

    private lblScore: HTMLLabelElement = null;
    private score: number = 0;

    private alienColumns: number = 10;
    private alienRows: number = 2;


    constructor() {
        this.viewPort = <HTMLElement>document.getElementById("root");
        this.lblScore = <HTMLLabelElement>document.getElementById('score');
        this.initiateBattlefield();
        this.gameLoop();
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }

    public initiateBattlefield() {
        applyStyles({
            position: "relative",
            width: `${this.viewPortWidth}px`,
            height: `${this.viewPortHeight}px`,
            left: "0px",
            top: "0px",
            backgroundColor: "black"
        }, this.viewPort);
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

        this.generateAliens();
    }

    private generateAliens(): void {
        for (let y = 0; y < this.alienRows; y++) {
            for (let x = 0; x < this.alienColumns; x++) {
                const alien = new Alien(
                    47,
                    34,
                    "./assets/images/Invader.png",
                    this.viewPort,
                )
                alien.start(
                    (alien.width + 20) * x,
                    (alien.height + 15) * y
                );
                alien.currentDirection = Alien.Direction.Right;
                this.aliens.push(alien);
            }
        }
    }

    private updateGame() {
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

                        this.score += 50;
                        this.lblScore.textContent = this.score.toString();
                    }
                }
            }
        }

        for (var index = 0; index < this.aliens.length; index++)
            if (this.aliens[index].active)
                this.aliens[index].move();

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
                console.log(this.ship.x, this.ship.y)
                if (!(this.ship.x - this.ship.width < document.documentElement.clientLeft)) {
                    this.ship.updatePosition({
                        x: this.ship.x - this.ship.width
                    });
                }
                break;
            case 68:
                if (!(this.ship.x + 2 * this.ship.width > document.documentElement.clientWidth)) {
                    this.ship.updatePosition({ x: this.ship.x + this.ship.width });
                }
                break;
            case 32:
                if (!this.rocket.active) {
                    this.rocket.start(this.ship.x + (this.ship.width / 2), this.ship.y);
                    this.rocket.move();
                }

                break;
        }
    }

    private gameLoop(): void {
        this.updateGame();
        requestAnimationFrame(() => this.gameLoop())
    }
}


