import GameObject from "./GameObject";
import Game from "./Game";
import Alien from "./Alien";
import Ship from "./Ship";

export default class BattleField implements Observer {
  private ship: Ship = null;
  private aliens: Alien[] = [];
  private viewPort: HTMLElement = null;
  public running: boolean = false;

  private alienColumns: number = 10;
  private alienRows: number = 1;
  private totalAliensAlive: number = 0;
  public wave: number = 1;
  public gameObjects: GameObject[] = [];

  constructor() {
    this.viewPort = <HTMLElement>document.getElementById("root");
    this.initiateBattlefield();
    this.ship.subscribe(this);
  }

  public notify(wave: number): void {
    Game.getInstance().score *= wave;
    Game.getInstance().lblScore.textContent = Game.getInstance().score.toString();
    this.wave *= wave;
  }

  private initiateBattlefield(): void {
    this.running = true;
    this.ship = new Ship(35, 60, "./assets/image/ship.png", this.viewPort);

    this.ship.projectiles.push(this.ship.rocket, this.ship.laser);

    this.generateAliens(this.wave);
  }

  public updateGame(): void {
    if (this.totalAliensAlive === 0) {
      this.ship.sendMessage();
      this.generateAliens(this.wave);
    }

    // Polymorfisme
    for (const p of this.ship.projectiles) {
      p.move();
    }

    const rocketRect: ClientRect = this.ship.rocket.element.getBoundingClientRect();
    const laserRect: ClientRect = this.ship.laser.element.getBoundingClientRect();
    const shipRect: ClientRect = this.ship.element.getBoundingClientRect();

    for (let i = 0; i < this.totalAliensAlive; i++) {
      if (this.aliens[i].active) {
        let alienRect: ClientRect = this.aliens[
          i
        ].element.getBoundingClientRect();

        this.gameObjects.push(this.ship, this.aliens[i]);

        if(this.checkCollision(shipRect, alienRect)){
          Game.getInstance().initiateEndScreen();
        }

        if (
          this.ship.currentWeapon.active &&
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
          this.ship.rocket.kill();

          Game.getInstance().score += 100;
          Game.getInstance().lblScore.textContent = Game.getInstance().score.toString();
        } else if (
          this.ship.currentWeapon.active &&
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
          this.ship.laser.kill();

          Game.getInstance().score += 50;
          Game.getInstance().lblScore.textContent = Game.getInstance().score.toString();
        }
      }
    }
    for (let index = 0; index < this.aliens.length; index++)
      if (this.aliens[index].active) this.aliens[index].move();
  }

  private checkCollision(a: ClientRect, b: ClientRect): boolean {
    return (
      a.left <= b.right &&
      b.left <= a.right &&
      a.top <= b.bottom &&
      b.top <= a.bottom
    );
  }

  private generateAliens(wave: number): void {
    const offset = 17;
    for (let y = 0; y < this.alienRows * this.wave; y++) {
      for (let x = 0; x < this.alienColumns; x++) {
        const alien = new Alien(
          this.ship,
          wave * 2,
          47,
          34,
          "./assets/image/invader.png",
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
    }
  }
}
