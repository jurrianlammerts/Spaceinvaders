import GameObject from "./GameObject";
export default class Rocket extends GameObject {
    constructor(...args) {
        super(...args);
        this.active = false;
        this.element.style.visibility = "hidden";
        this.element.style.zIndex = '999';
    }
    move() {
    }
    start(x, y) {
        this.element.style.visibility = 'visible';
        this.active = true;
    }
    kill() {
        this.element.style.visibility = 'hidden';
        this.active = false;
    }
}
