import GameObject from "./GameObject";
import applyStyles from "./util/applyStyles"

export default class Rocket extends GameObject {
    public active: boolean = false;
    private spriteURL = null;

    constructor(...args) {
        super(...args);
    }

    public move() {
        if (this.active) {
            this.updatePosition({
                x: this.x, y: this.y -= 7
            });

            if (this.y <= 0)
                this.kill()
            else
                this.updatePosition({ y: this.y });
        }
    }
}
