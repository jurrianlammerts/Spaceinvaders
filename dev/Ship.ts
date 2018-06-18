import GameObject from "./GameObject";
import Game from "./Game";
import Alien from "./Alien";
import WeaponBehaviour from "./WeaponBehaviour";
import BattleField from "./BattleField";
import Laser from "./Laser";
import Rocket from "./Rocket";

export default class Ship extends GameObject implements Subject {
  public aliens: Alien[];
  public battlefield: BattleField;
  public laser: Laser;
  public rocket: Rocket;
  public currentWeapon: WeaponBehaviour;
  public observers: Observer[] = [];
  public wave: number;

  constructor(...args) {
    super(...args);
    this.updatePosition({
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight - this.height * 2
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
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

  private onKeyDown(event: KeyboardEvent): void {
    const game = Game.getInstance();
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
      case 87:
        if (!game.battlefield.laser.active && !game.battlefield.rocket.active) {
          game.battlefield.rocket.start(this.x + this.width / 2, this.y);
          game.battlefield.rocket.move();
        }
        break;
      case 83:
        if (!game.battlefield.laser.active && !game.battlefield.rocket.active) {
          game.battlefield.laser.start(this.x + this.width / 2, this.y);
          game.battlefield.laser.move();
        }
        break;
      case 32:
        if (!game.battlefield.laser.active) {
          this.currentWeapon = game.battlefield.laser;
        } else if (!game.battlefield.rocket.active == true) {
          this.currentWeapon = this.rocket;
        }
        break;
    }
  }
}
