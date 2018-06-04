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
    public aliens: Alien[] = [];

    public rocket: Rocket = null;
    // public currentWeapon: WeaponBehaviour;

    private lblScore: HTMLLabelElement = null;
    private score: number = 0;

    private alienColumns: number = 10;
    private alienRows: number = 2;

    constructor() {
        this.viewPort = <HTMLElement>document.getElementById("root");
        this.lblScore = <HTMLLabelElement>document.getElementById('score');
        this.initiateBattlefield();
        this.gameLoop();

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
            this.viewPort,
            true
        );
        // this.currentWeapon = this.rocket;

        this.generateAliens();
    }

    private generateAliens(): void {
        const offset = 20;
        for (let y = 0; y < this.alienRows; y++) {
            for (let x = 0; x < this.alienColumns; x++) {
                const alien = new Alien(
                    47,
                    34,
                    "./assets/images/Invader.png",
                    this.viewPort,
                    true
                )
                alien.start(
                    (alien.width + offset) * x,
                    (alien.height + offset) * y
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
            const totalAliens = this.alienColumns * this.alienRows;
            for (let i = 0; i < totalAliens; i++) {
                if (this.aliens[i].active) {
                    let alienRect: ClientRect = this.aliens[i].element.getBoundingClientRect();
                    if (!(
                        rocketRect.right < alienRect.left ||
                        rocketRect.left > alienRect.right ||
                        rocketRect.bottom < alienRect.top ||
                        rocketRect.top > alienRect.bottom)
                    ) {
                        this.aliens[i].kill();
                        this.rocket.kill();

                        this.score += 50;
                        this.lblScore.textContent = this.score.toString();
                    }
                }
            }
        }

        // TODO: collision detection voor player en dan game over

        for (var index = 0; index < this.aliens.length; index++)
            if (this.aliens[index].active)
                this.aliens[index].move();
    }

    private gameLoop(): void {
        this.updateGame();
        requestAnimationFrame(() => this.gameLoop())
    }
}


