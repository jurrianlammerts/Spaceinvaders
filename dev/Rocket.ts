import GameObject from "./GameObject";
import applyStyles from "./util/applyStyles"

export default class Rocket extends GameObject {
    public active: boolean = false;
    private spriteURL = null;

    constructor(...args) {
        super(...args);
        applyStyles({
            visibility: "hidden",
            zIndex: "999"
        }, this.element);
    }

    public move() {
        if (this.active) {
            this.updatePosition({
                x: this.x, y: this.y -= 5
            });

            if (this.y <= 0)
                this.kill()
            else
                this.updatePosition({ y: this.y });
        }
    }
}
