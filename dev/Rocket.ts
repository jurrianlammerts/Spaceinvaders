import GameObject from "./GameObject";
import WeaponBehaviour from "./WeaponBehaviour";
import Ship from "./Ship";
import Projectile from "./Projectiles";

export default class Rocket extends Projectile implements WeaponBehaviour {
  public active: boolean = false;
  private spriteURL = null;
  public ship:Ship
  public currentWeapon: WeaponBehaviour;

  constructor(...args) {
    super(...args);
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
