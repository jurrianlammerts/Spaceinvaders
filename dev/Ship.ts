import GameObject from './GameObject';

export default class Ship extends GameObject {

    public spriteURL = null;
    public speed = 8;


    constructor(...args) {
        super(...args, );
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    public start(x: number, y: number) {
    }

    public move(): void {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    private onKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case 65:
                if (!(this.x + 4 * this.width < document.documentElement.clientLeft)) {
                    this.x -= this.width;
                }
                break;
            case 68:
                if (!(this.x + 16 * this.width > document.documentElement.clientWidth)){
                    this.x += this.width;
                }
                break;
            case 87:
                //this.y -= 30;
                break;
            case 83:
                //this.y += 30;
                break;
            case 32:
                this.shoot();
        }
    }

    public shoot(): void {

    }

    public update(): void {
        this.style.left = this.x
        this.style.top = this.y
    }
}