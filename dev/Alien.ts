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
        this.width = this.image.width;;
        this.height = this.image.height;
        this.explosionImageURLs = explosionImageURLs;
    }

    public SetXPos(posX: number) {
        this.posX = posX;
        this.image.style.posLeft = this.posX;
    }

    public SetYPos(posY: number) {
        this.posY = posY;
        this.image.style.posTop = this.posY;
    }

    public Move() {
        if (this.active) {
            if (this.posX <= 0) {
                this.currentDirection = Alien.Direction.Right;
                this.SetYPos(this.posY + 10);
            }
            else if (this.posX + this.width >= this.image.parentElement.clientWidth) {
                this.currentDirection = Alien.Direction.Left;
                this.SetYPos(this.posY + 10);
            }

            if (this.currentDirection == Alien.Direction.Right)
                this.SetXPos(this.posX + 1);
            else
                this.SetXPos(this.posX - 1);

            this.image.style.posLeft = this.posX;
        }
    }

    public Start(posX: number, posY: number) {
        this.SetXPos(posX);
        this.SetYPos(posY);

        this.image.style.visibility = 'visible';
        this.active = true;
    }

    public Kill() {
        this.image.style.visibility = 'hidden';
        this.active = false;

        if (this.explosionImageURLs.length > 0) {
            this.explosionIndex = 0;
            for (var index = 0; index < this.explosionImageURLs.length; index++) {
                setTimeout(() => {
                    if (!this.explosionImage) {
                        this.explosionImage = <HTMLImageElement>document.createElement('img');
                        this.viewPort.appendChild(this.explosionImage);
                        this.explosionImage.style.position = 'absolute';
                        this.explosionImage.style.zIndex = '9999';
                        this.explosionImage.style.posLeft = this.posX;
                        this.explosionImage.style.posTop = this.posY;
                    }
                    this.explosionImage.src = this.explosionImageURLs[this.explosionIndex++];
                }, index * 200);
            }

            setTimeout(() => {
                this.viewPort.removeChild(this.explosionImage);
            }, this.explosionImageURLs.length * 200);
        }
    }
}
