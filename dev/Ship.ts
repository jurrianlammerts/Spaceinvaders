import GameObject from "./GameObject";
import Game from "./Game";
import WeaponBehaviour from "./interfaces/WeaponBehaviour";
import Laser from "./Laser";
import Rocket from "./Rocket";
import Projectile from "./Projectiles";

export default class Ship extends GameObject implements Subject {
  public laser: Laser;
  public rocket: Rocket;
  public currentWeapon: WeaponBehaviour;
  public observers: Observer[] = [];
  public projectiles: Projectile[] = [];

  constructor(...args) {
    super(...args);
    this.updatePosition({
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight - this.height * 2
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    this.setWeapons();
  }

  public subscribe(o: Observer): void {
    this.observers.push(o);
  }

  public unsubscribe(o: Observer): void {
    let index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }

  public sendMessage(): void {
    for (let c of this.observers) {
      c.notify(2);
    }
  }

  private setWeapons(): void {
    this.rocket = new Rocket(
      this,
      20,
      72,
      "./assets/image/rocket.png",
      Game.getInstance().viewPort,
      true
    );

    this.laser = new Laser(
      this,
      5,
      35,
      "./assets/image/laser.png",
      Game.getInstance().viewPort,
      true
    );
    this.currentWeapon = this.laser;
  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 65:
        if (!(this.x - this.width < document.documentElement.clientLeft)) {
          this.updatePosition({
            x: this.x - this.width
          });
        }
        break;
      case 68:
        if (!(this.x + 2 * this.width > document.documentElement.clientWidth)) {
          this.updatePosition({ x: this.x + this.width });
        }
        break;
      case 32:
        if (!this.currentWeapon.active) {
          this.currentWeapon.start(this.x + this.width / 2, this.y);
          this.currentWeapon.move();
        }
        break;
      case 90:
        this.currentWeapon = this.rocket;
        break;
      case 88:
        this.currentWeapon = this.laser;
        break;
    }
  }
}
