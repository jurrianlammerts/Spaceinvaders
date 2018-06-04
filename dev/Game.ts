import Alien from "./Alien";
import Ship from "./Ship";
import Rocket from "./Rocket";
import applyStyles from "./util/applyStyles";

export default class Game {
    private static instance: Game;

    private viewPortHeight: number = document.documentElement.clientHeight;
    private viewPortWidth: number = document.documentElement.clientWidth;

    private startButton: HTMLElement

    public viewPort: HTMLElement = null;
    public running: boolean = false;

    private ship: Ship = null;
    public aliens: Alien[] = [];

    public rocket: Rocket = null;
    // public currentWeapon: WeaponBehaviour;

    private scoreboard: HTMLElement;
    private lblScore: HTMLLabelElement = null;
    private score: number = 0;

    private alienColumns: number = 10;
    private alienRows: number = 2;

    private totalAliensAlive: number = 0;
    private wave: number = 1;

    constructor() {
        this.initiateStartScreen();
    }

    private initiateStartScreen() {
        this.viewPort = <HTMLElement>document.getElementById("root");
        applyStyles({
            position: "relative",
            width: `${this.viewPortWidth}px`,
            height: `${this.viewPortHeight}px`,
            left: "0px",
            top: "0px",
            backgroundColor: "black"
        }, this.viewPort);
        document.body.appendChild(this.viewPort)

        this.startButton = document.createElement("button")
        this.startButton.innerHTML = 'START'
        applyStyles({
            background: "none",
            border: "2px solid",
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "white",
            font: "Verdana, Geneva, Tahoma, sans-serif",
            margin: "0.5em",
            padding: "1em 2em"
        }, this.startButton)
        this.viewPort.appendChild(this.startButton)
        this.startButton.addEventListener('click', (e: MouseEvent) => this.startGame());
    }

    private initiateScoreboard() {
        this.scoreboard = document.createElement("div")
        this.scoreboard.innerHTML = 'Score: '
        applyStyles({
            padding: "20px",
            align: "center",
            visibility: "visible",
            background: "black",
            color: "white",
            font: "Verdana, Geneva, Tahoma, sans-serif"
        }, this.scoreboard)

        this.lblScore = document.createElement("label")
        this.lblScore.setAttribute("id", "score");

        this.scoreboard.appendChild(this.lblScore)
        this.viewPort.appendChild(this.scoreboard)
    }

    private deleteStartButton() {
        applyStyles({
            display: "none"
        }, this.startButton)
    }

    private startGame() {
        this.deleteStartButton()
        this.initiateScoreboard()
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

        this.generateAliens(this.wave);
    }

    private generateAliens(wave: number): void {
        const offset = 20;
        for (let y = 0; y < this.alienRows; y++) {
            for (let x = 0; x < this.alienColumns; x++) {
                const alien = new Alien(
                    wave * 2,
                    47,
                    34,
                    "./assets/images/Invader.png",
                    this.viewPort,
                    true
                )
                alien.start(
                    (alien.width + offset) * x + alien.width,
                    (alien.height + offset) * y + alien.width
                );
                alien.currentDirection = Alien.Direction.Right;
                this.aliens.push(alien);

                this.totalAliensAlive++;
            }
        }
    }

    private updateGame() {
        if (this.totalAliensAlive === 0) {
            const nextWave = this.wave++;
            this.generateAliens(nextWave)
        }
        if (this.rocket.active)
            this.rocket.move();

        if (this.rocket.active) {
            const rocketRect: ClientRect = this.rocket.element.getBoundingClientRect();
            const totalAliens = this.alienColumns * this.alienRows;
            for (let i = 0; i < this.totalAliensAlive; i++) {
                if (this.aliens[i].active) {
                    let alienRect: ClientRect = this.aliens[i].element.getBoundingClientRect();
                    if (!(
                        rocketRect.right < alienRect.left ||
                        rocketRect.left > alienRect.right ||
                        rocketRect.bottom < alienRect.top ||
                        rocketRect.top > alienRect.bottom)
                    ) {
                        this.aliens[i].kill();
                        this.aliens.splice(i, 1);
                        this.totalAliensAlive--;
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


