import WeaponBehaviour from "./WeaponBehaviour";
import Ship from "./Ship";
import Projectile from "./Projectiles";

export default class Rocket extends Projectile implements WeaponBehaviour {
  public active: boolean = false;
  public ship: Ship;

  constructor(ship: Ship, ...args) {
    super(...args);
    this.ship = ship;
  }

  // Polymorfisme
  public move() {
    if (this.active) {
      this.updatePosition({
        x: this.x,
        y: (this.y -= 7)
      });

      if (this.y <= 0) this.kill();
      else this.updatePosition({ y: this.y });
    }
  }
}
