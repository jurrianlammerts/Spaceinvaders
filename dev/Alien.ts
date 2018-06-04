import GameObject from "./GameObject";
import applyStyles from "./util/applyStyles";

export default class Alien extends GameObject {
    public static Direction = { Left: 1, Right: 2 };
    public currentDirection: number = Alien.Direction.Right;
    public active: boolean = false;

    private movementSpeed: number = 2;

    private viewPort: HTMLElement;

    constructor(...args) {
        super(...args);
    }

    public move() {
        if (this.active) {
            if (this.x <= 3) {
                this.currentDirection = Alien.Direction.Right;
                this.updatePosition({ y: this.y + this.height });
            }
            else if (this.x + this.width >= this.element.parentElement.clientWidth) {
                this.currentDirection = Alien.Direction.Left;
                this.updatePosition({ y: this.y + this.height });
            }

            if (this.currentDirection == Alien.Direction.Right)
                this.updatePosition({ x: this.x + this.movementSpeed });
            else
                this.updatePosition({ x: this.x - this.movementSpeed });

            this.updatePosition({ x: this.x });
        }
    }
}
