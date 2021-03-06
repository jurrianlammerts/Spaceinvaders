import GameObject from "./GameObject";

export default class Alien extends GameObject implements Observer {
  public static Direction = { Left: 1, Right: 2 };
  public currentDirection: number = Alien.Direction.Right;
  private subject: Subject;
  private movementSpeed: number = 25;

  constructor(s: Subject, movementSpeed: number, ...args) {
    super(...args);
    this.movementSpeed = movementSpeed;
    this.subject = s;
    this.subject.subscribe(this);
  }

  public notify(wave: number): void {
    this.movementSpeed *= 0,5 * wave;
  }

  public move(): void {
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
