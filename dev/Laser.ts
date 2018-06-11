import GameObject from "./GameObject";
import WeaponBehaviour from "./WeaponBehaviour";
import Ship from "./Ship";

export default class Laser extends GameObject implements WeaponBehaviour {
  public active: boolean = false;
  private spriteURL = null;
  public ship: Ship;

  constructor( ...args) {
    super(...args);

  }

  private getRandomSpeed(min, max) {
    return Math.random() * (max - min) + min;
  }

  public move() {
    if (this.active) {
      this.updatePosition({
        x: this.x,
        y: (this.y -= this.getRandomSpeed(5, 25))
      });

      if (this.y <= 0) this.kill();
      else this.updatePosition({ y: this.y });
    }
  }
}
