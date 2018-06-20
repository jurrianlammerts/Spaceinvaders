import WeaponBehaviour from "./interfaces/WeaponBehaviour";
import Ship from "./Ship";
import Projectile from "./Projectiles";

export default class Laser extends Projectile implements WeaponBehaviour {
  public ship: Ship;

  constructor(ship: Ship, ...args) {
    super(...args);
    this.ship = ship;
  }

  private getRandomSpeed(min, max): number {
    return Math.random() * (max - min) + min;
  }

  public move(): void {
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
