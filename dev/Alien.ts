import GameObject from "./GameObject";
import applyStyles from "./util/applyStyles";

export default class Alien extends GameObject {
  public static Direction = { Left: 1, Right: 2 };
  public currentDirection: number = Alien.Direction.Right;
  public active: boolean = false;

  private movementSpeed: number = 1;

  private viewPort: HTMLElement;

  constructor(movementSpeed: number, ...args) {
    super(...args);
    this.movementSpeed = movementSpeed;
  }

  public move() {
    if (this.active) {
      if (this.x <= 10) {
        this.currentDirection = Alien.Direction.Right;
        this.updatePosition({ y: this.y + this.height });
      } else if (
        this.x + this.width >=
        this.element.parentElement.clientWidth
      ) {
        this.currentDirection = Alien.Direction.Left;
        this.updatePosition({ y: this.y + this.height });
      }

      if (this.currentDirection == Alien.Direction.Right)
        this.updatePosition({ x: this.x + this.movementSpeed });
      else this.updatePosition({ x: this.x - this.movementSpeed });

      this.updatePosition({ x: this.x });
    }
  }
}
