import { Game } from './Game'

export class Alien implements GameObject {

    public image: HTMLImageElement = null;
    public explosionImageURLs: string[];

    public posX: number = 0;
    public posY: number = 0;
    public width: number = 0;
    public height: number = 0;

    public static Direction = { Left: 1, Right: 2 };

    public currentDirection: number = Alien.Direction.Right;

    public active: boolean = false;
    private explosionImage: HTMLImageElement;
    private explosionIndex: number;

    private viewPort: HTMLElement;

    constructor(imageURL: string, viewPort: HTMLElement, explosionImageURLs: string[]) {
        this.viewPort = viewPort;
        this.image = <HTMLImageElement>document.createElement('img');
        this.viewPort.appendChild(this.image);
        this.image.src = imageURL;
        this.image.style.position = 'absolute';
        this.image.style.zIndex = '999';
        this.width = this.image.width;
        this.height = this.image.height;
        this.explosionImageURLs = explosionImageURLs;
    }

    public SetXPos(posX: number) {

    }

    public SetYPos(posY: number) {

    }

    public Move() {

    }

    public Start(posX: number, posY: number) {
        // this.SetXPos(posX);
        // this.SetYPos(posY);

        this.image.style.visibility = 'visible';
        this.active = true;
    }

    public Kill() {
        this.image.style.visibility = 'hidden';
        this.active = false;


    }
}
