import GameObject from "./GameObject";
import Game from "./Game";
import Alien from "./Alien";
import WeaponBehaviour from "./WeaponBehaviour";
import Rocket from "./Rocket";

export default class Ship extends GameObject {
  private spriteURL = null;
  public aliens: Alien;
  public weaponbehaviour: WeaponBehaviour;

  constructor(...args) {
    super(...args);
    this.updatePosition({
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight - this.height * 2
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
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
        if (!game.rocket.active) {
          game.rocket.start(this.x + this.width / 2, this.y);
          game.rocket.move();
        } else if (!game.laser.active) {
          game.laser.start(this.x + this.width / 2, this.y);
          game.laser.move();
        }
        break;
      case 83:
        console.log("spray");
        if (!game.laser.active) {
          game.laser.start(this.x + this.width / 2, this.y);
          game.laser.move();
        }
        break;
    }
  }
}
