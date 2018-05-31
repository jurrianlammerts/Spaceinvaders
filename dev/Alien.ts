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

    public move() {

    }

    public start(x: number, y: number) {
        this.element.style.visibility = 'visible';
        this.active = true;
    }

    public kill() {
        this.element.style.visibility = 'hidden';
        this.active = false;
    }
}
