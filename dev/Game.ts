import applyStyles from "./util/applyStyles";
import BattleField from "./BattleField";

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

  public battlefield: BattleField;

  private scoreboard: HTMLElement;
  public lblScore: HTMLLabelElement = null;
  public score: number = 0;
  private logo: HTMLImageElement;
  private logoDiv: HTMLElement;

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
        display: "block",
        top: "15%",
        left: "46%",
        height: "68px"
      },
      this.logo
    );
    document.body.appendChild(this.logoDiv);

    this.gameControls = document.createElement("div");
    this.gameControls.innerText =
      "Use A to move left, D to move right, Spacebar to shoot & switch weapons with Z & X";
    applyStyles(
      {
        border: "2px solid",
        position: "absolute",
        top: "35%",
        left: "20%",
        right: "20%",
        color: "white",
        "font-family": "Work sans, Open sans, sans-serif",
        "text-align": "center",
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
        display: "inline-block"
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
        left: "45%",
        right: "45%",
        color: "white",
        "font-family": "Work sans, Open sans, sans-serif",
        margin: "0.5em",
        padding: "1em 2em"
      },
      this.endScreen
    );
    this.viewPort.appendChild(this.endScreen);

    this.startButton = document.createElement("button");
    this.startButton.innerHTML = "RESTART";
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
      window.location.reload()
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
    this.battlefield = new BattleField();
    this.gameLoop();
  }

  public static getInstance() {
    if (!Game.instance) Game.instance = new Game();
    return Game.instance;
  }

  private gameLoop(): void {
    this.battlefield.updateGame();
    requestAnimationFrame(() => this.gameLoop());
  }
}
