import GameObject from "./GameObject";
export default class Alien extends GameObject {
    constructor(explosionImageURLs, ...args) {
        super(...args);
        this.currentDirection = Alien.Direction.Right;
        this.active = false;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '999';
        this.explosionImageURLs = explosionImageURLs;
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
Alien.Direction = { Left: 1, Right: 2 };
