import GameObject from "./GameObject";
import Game from "./Game";
import Alien from "./Alien";
import WeaponBehaviour from "./WeaponBehaviour";
import BattleField from "./BattleField";
import Laser from "./Laser";
import Rocket from "./Rocket";
import Projectile from "./Projectiles";

export default class Ship extends GameObject implements Subject {
  public aliens: Alien[];
  public battlefield: BattleField;
  public ship: Ship;
  public laser: Laser;
  public rocket: Rocket;
  public currentWeapon: WeaponBehaviour;
  public observers: Observer[] = [];
  public projectiles: Projectile[] = [];
  public wave: number;

  constructor(...args) {
    super(...args);
    this.updatePosition({
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight - this.height * 2
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    this.setWeapons();
  }

  public subscribe(o: Observer) {
    this.observers.push(o);
  }

  public unsubscribe(o: Observer) {
    let index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }

  public sendMessage() {
    for (let c of this.observers) {
      c.notify(2);
    }
  }

  public setWeapons() {
    this.rocket = new Rocket(
      this,
      20,
      72,
      "./assets/images/Rocket.png",
      Game.getInstance().viewPort,
      true
    );

    this.laser = new Laser(
      this,
      5,
      35,
      "./assets/images/Laser.png",
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
