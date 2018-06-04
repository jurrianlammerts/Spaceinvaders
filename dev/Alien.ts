import GameObject from "./GameObject";
import applyStyles from "./util/applyStyles";

export default class Alien extends GameObject {
    public static Direction = { Left: 1, Right: 2 };
    public currentDirection: number = Alien.Direction.Right;
    public active: boolean = false;

    private viewPort: HTMLElement;

    constructor(...args) {
        super(...args);
        applyStyles({
            position: "absolute",
            zIndex: "999"
        }, this.element);
    }

    public move() {
        if (this.active) {
            if (this.x <= 0) {
                this.currentDirection = Alien.Direction.Right;
                this.updatePosition({ y: this.y + 10 });
            }
            else if (this.x + this.width >= this.element.parentElement.clientWidth) {
                this.currentDirection = Alien.Direction.Left;
                this.updatePosition({ y: this.y + 10 });
            }

            if (this.currentDirection == Alien.Direction.Right)
                this.updatePosition({ x: this.x + 1 });
            else
                this.updatePosition({ x: this.x - 1 });

            // let stringX = this.element.style.transform = "translate(" + this.x + "px)";

            // this.element.style.left = stringX;
            this.updatePosition({ x: this.x });
        }
    }
}
