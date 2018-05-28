import GameObject from './GameObject';
export default class Ship extends GameObject {
    constructor(...args) {
        super(...args);
        this.spriteURL = null;
        this.speed = 8;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
    }
    start(x, y) {
    }
    move() {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 65:
                this.x -= this.width;
                break;
            case 68:
                this.x += this.width;
                break;
            case 87:
                //this.y -= 30;
                break;
            case 83:
                //this.y += 30;
                break;
            case 32:
            //this.shoot();
        }
    }
    update() {
        this.style.left = this.x;
        this.style.top = this.y;
    }
}
