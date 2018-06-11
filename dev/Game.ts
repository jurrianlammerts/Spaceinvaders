import Alien from "./Alien";
import Ship from "./Ship";
import Rocket from "./Rocket";
import applyStyles from "./util/applyStyles";
import Laser from "./Laser";
import WeaponBehaviour from "./WeaponBehaviour";

export default class Game {
  private static instance: Game;

  private viewPortHeight: number = document.documentElement.clientHeight;
  private viewPortWidth: number = document.documentElement.clientWidth;

  private startButton: HTMLElement;
  private gameControls: HTMLElement;
  private endScreen: HTMLElement;
  public element: HTMLElement;

  public viewPort: HTMLElement = null;
  public running: boolean = false;

  private ship: Ship = null;
  public aliens: Alien[] = [];
  public rocket: Rocket = null;
  public laser: Laser = null;
  public currentWeapon: WeaponBehaviour;

  private scoreboard: HTMLElement;
  private lblScore: HTMLLabelElement = null;
  private score: number = 0;
  private logo: HTMLImageElement;
  private logoDiv: HTMLElement;

  private alienColumns: number = 10;
  private alienRows: number = 1;

  private totalAliensAlive: number = 0;
  private wave: number = 1;

  private observers: Observer[] = [];

  constructor() {
    this.initiateStartScreen();
  }

  private initiateStartScreen() {
    this.viewPort = <HTMLElement>document.getElementById("root");
    applyStyles(
      {
        position: "relative",
        width: `${this.viewPortWidth}px`,
        height: `${this.viewPortHeight}px`,
        left: "0px",
        top: "0px",
        backgroundColor: "black"
      },
      this.viewPort
    );
    document.body.appendChild(this.viewPort);

    this.logoDiv = document.createElement("div");
    this.logo = document.createElement("img");
    this.logo.src = "./assets/images/logo.jpg";
    this.logoDiv.appendChild(this.logo);

    applyStyles(
      {
        position: "absolute",
        top: "15%",
        left: "46%",
        height: "68px"
      },
      this.logo
    );
    document.body.appendChild(this.logoDiv);

    this.gameControls = document.createElement("div");
    this.gameControls.innerText =
      "Use A to move left, D to move right, W to launch a slow rocket & S to shoot a fast laser";
    applyStyles(
      {
        border: "2px solid",
        position: "absolute",
        top: "35%",
        left: "25%",
        color: "white",
        "font-family": "Work sans, Open sans, sans-serif",
        padding: "1em 2em"
      },
      this.gameControls
    );
    this.viewPort.appendChild(this.gameControls);

    this.startButton = document.createElement("button");
    this.startButton.innerHTML = "START";
    applyStyles(
      {
        background: "none",
        border: "2px solid",
        position: "absolute",
        top: "50%",
        left: "45%",
        color: "white",
        "font-family": "Open sans, sans-serif",
        "font-size": "15px",
        margin: "0.5em",
        padding: "1em 2em",
        display: "inline-block",
        transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.2, 1)"
      },
      this.startButton
    );
    this.viewPort.appendChild(this.startButton);
    this.startButton.addEventListener("click", (e: MouseEvent) =>
      this.startGame()
    );
  }

  public initiateEndScreen() {
    this.endScreen = document.createElement("div");
    this.endScreen.innerHTML = "R.I.P.";
    applyStyles(
      {
        background: "none",
        border: "2px solid",
        position: "absolute",
        top: "35%",
        left: "30%",
        color: "white",
        "font-family": "Work sans, Open sans, sans-serif",
        margin: "0.5em",
        padding: "1em 2em"
      },
      this.endScreen
    );
    this.viewPort.appendChild(this.endScreen);

    this.startButton = document.createElement("button");
    this.startButton.innerHTML = "START";
    applyStyles(
      {
        background: "none",
        border: "2px solid",
        position: "absolute",
        top: "50%",
        left: "45%",
        color: "white",
        "font-family": "Open sans, sans-serif",
        "font-size": "15px",
        margin: "0.5em",
        padding: "1em 2em",
        display: "inline-block",
        transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.2, 1)"
      },
      this.startButton
    );
    this.viewPort.appendChild(this.startButton);
    this.startButton.addEventListener("click", (e: MouseEvent) =>
      this.startGame()
    );
  }

  private initiateScoreboard() {
    this.scoreboard = document.createElement("div");
    this.scoreboard.innerHTML = "Score: ";
    applyStyles(
      {
        padding: "20px",
        "text-align": "center",
        visibility: "visible",
        background: "black",
        color: "white",
        "font-family": "Work sans, Open sans, sans-serif"
      },
      this.scoreboard
    );

    this.lblScore = document.createElement("label");
    this.lblScore.setAttribute("id", "score");

    this.scoreboard.appendChild(this.lblScore);
    this.viewPort.appendChild(this.scoreboard);
  }

  private deleteStartButton() {
    applyStyles(
      {
        display: "none"
      },
      this.startButton
    );
    applyStyles(
      {
        display: "none"
      },
      this.gameControls
    );
    applyStyles(
      {
        display: "none"
      },
      this.logoDiv
    );
  }

  private startGame() {
    this.deleteStartButton();
    this.initiateScoreboard();
    this.viewPort = <HTMLElement>document.getElementById("root");
    this.lblScore = <HTMLLabelElement>document.getElementById("score");
    this.initiateBattlefield();
    this.gameLoop();
  }

  public checkCollision(a: ClientRect, b: ClientRect) {
    return (
      a.left <= b.right &&
      b.left <= a.right &&
      a.top <= b.bottom &&
      b.top <= a.bottom
    );
  }

  static getInstance() {
    if (!Game.instance) Game.instance = new Game();
    return Game.instance;
  }

  public initiateBattlefield() {
    this.running = true;

    this.ship = new Ship(35, 60, "./assets/images/Ship.png", this.viewPort);
    this.rocket = new Rocket(
      10,
      25,
      "./assets/images/Rocket.png",
      this.viewPort,
      true
    );

    this.laser = new Laser(
      10,
      25,
      "./assets/images/Laser.png",
      this.viewPort,
      true
    );

    this.generateAliens(this.wave);
  }

  private generateAliens(wave: number): void {
    const offset = 20;
    for (let y = 0; y < this.alienRows * this.wave; y++) {
      for (let x = 0; x < this.alienColumns; x++) {
        const alien = new Alien(
          wave * 2,
          47,
          34,
          "./assets/images/Invader.png",
          this.viewPort,
          true
        );
        alien.start(
          (alien.width + offset) * x + alien.width,
          (alien.height + offset) * y + alien.width
        );
        alien.currentDirection = Alien.Direction.Right;
        this.aliens.push(alien);

        this.totalAliensAlive++;
      }
      // if(this.totalAliensAlive >= 20) {
      //   this.currentWeapon = this.laser;
      // }
    }
  }

  private updateGame() {
    if (this.totalAliensAlive === 0) {
      const nextWave = this.wave++;
      this.generateAliens(nextWave);
    }

    if (this.rocket.active) this.rocket.move();
    if (this.laser.active) this.laser.move();

    if (this.rocket.active || this.laser.active) {
      const rocketRect: ClientRect = this.rocket.element.getBoundingClientRect();
      const laserRect: ClientRect = this.laser.element.getBoundingClientRect();
      const totalAliens = this.alienColumns * this.alienRows;
      for (let i = 0; i < this.totalAliensAlive; i++) {
        if (this.aliens[i].active) {
          let alienRect: ClientRect = this.aliens[
            i
          ].element.getBoundingClientRect();
          if (
            !(
              rocketRect.right < alienRect.left ||
              rocketRect.left > alienRect.right ||
              rocketRect.bottom < alienRect.top ||
              rocketRect.top > alienRect.bottom
            )
          ) {
            this.aliens[i].kill();
            this.aliens.splice(i, 1);
            this.totalAliensAlive--;
            this.rocket.kill();

            this.score += 100;
            this.lblScore.textContent = this.score.toString();
          } else if (
            !(
              laserRect.right < alienRect.left ||
              laserRect.left > alienRect.right ||
              laserRect.bottom < alienRect.top ||
              laserRect.top > alienRect.bottom
            )
          ) {
            this.aliens[i].kill();
            this.aliens.splice(i, 1);
            this.totalAliensAlive--;
            this.laser.kill();

            this.score += 50;
            this.lblScore.textContent = this.score.toString();
          }
        }
      }
    }
    for (var index = 0; index < this.aliens.length; index++)
      if (this.aliens[index].active) this.aliens[index].move();
  }

  private gameLoop(): void {
    this.updateGame();
    requestAnimationFrame(() => this.gameLoop());
  }

  public reset() {
    this.observers.forEach(element => {
      element.reset();
    });
  }
}
