import GameObject from "./GameObject";

export default class Alien extends GameObject {
    private x: number = 0;
    private y: number = 0;

    public explosionImageURLs: string[];
    private explosionIndex: number;

    public static Direction = { Left: 1, Right: 2 };
    public currentDirection: number = Alien.Direction.Right;
    public active: boolean = false;

    private viewPort: HTMLElement;

    constructor(explosionImageURLs, ...args) {
        super(...args);
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '999';
        this.explosionImageURLs = explosionImageURLs;
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
        if (this.active) {
            if (this.x <= 0) {
                this.currentDirection = Alien.Direction.Right;
                this.SetYPos(this.y + 10);
            }
            else if (this.x + this.width >= this.element.parentElement.clientWidth) {
                this.currentDirection = Alien.Direction.Left;
                this.SetYPos(this.y + 10);
            }

            if (this.currentDirection == Alien.Direction.Right)
                this.SetXPos(this.x + 1);
            else
                this.SetXPos(this.x - 1);

            let stringX = this.element.style.transform = "translate(" + this.x + "px)";
            this.element.style.left = stringX;
        }
    }

    public start(x: number, y: number) {
        this.SetXPos(x);
        this.SetYPos(y);
        this.element.style.visibility = 'visible';
        this.active = true;
    }

    public kill() {
        this.element.style.visibility = 'hidden';
        this.active = false;
    }
}
