import GameObject from "./GameObject";

export default class Rocket extends GameObject {
    public active: boolean = false;
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    private spriteURL = null;

    constructor(...args) {
        super(...args);
        this.element.style.visibility = "hidden";
        this.element.style.zIndex = '999';
        this.width = 5;
        this.height = 10;
    }

    public SetXPos(posX: number) {
        this.x = posX;
        let stringX = this.element.style.transform = "translate(" + this.x + "px)";
        this.element.style.left = stringX;
    }

    public SetYPos(posY: number) {
        this.y = posY;
        let stringY = this.element.style.transform = "translate(" + this.y + "px)";
        this.element.style.top = stringY;
    }

    public move() {
        let stringY = this.element.style.transform = "translate(" + this.y + "px)";
        if (this.active) {
            this.y -= 5;
            this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";

            if (this.y <= 0) {
                this.element.style.visibility = 'hidden';
                this.active = false;
            }
            else
                this.element.style.top = stringY;
        }
    }

    public start(x: number, y: number) {
        this.SetXPos(x);
        this.SetYPos(y);
        this.active = true;
        this.element.style.visibility = 'visible';
    }

    public kill() {
        this.active = false;
        this.element.style.visibility = 'hidden';
    }
}
