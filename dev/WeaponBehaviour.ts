import Ship from "./Ship";
import GameObject from "./GameObject";

export default interface WeaponBehaviour extends GameObject {
  ship: Ship;
  move(): void;
}
