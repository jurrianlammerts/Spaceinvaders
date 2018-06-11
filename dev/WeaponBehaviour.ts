import Ship from "./Ship";

export default interface WeaponBehaviour {
  ship:Ship
  move(): void;
}
