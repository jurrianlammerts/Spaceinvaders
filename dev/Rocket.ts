import { Game } from './Game'

export class Rocket implements GameObject {

    public image: HTMLImageElement = null;
    public posX: number = 0;
    public posY: number = 0;
    public width: number = 0;
    public height: number = 0;

    public active: boolean = false;

    constructor(imageURL: string, parentElement: HTMLElement) {
        this.image = <HTMLImageElement>document.createElement('img');
        parentElement.appendChild(this.image);
        this.image.src = imageURL;
        this.image.style.position = 'absolute';
        this.image.style.zIndex = '999';
        this.width = this.image.clientWidth;
        this.height = this.image.clientHeight;
        this.image.style.visibility = 'hidden';
    }
    public SetXPos(posX: number) {
        this.posX = posX;
        //this.image.style.posLeft = this.posX;
    }

    public SetYPos(posY: number) {
        this.posY = posY;
        //this.image.style.posTop = this.posY;
    }

    public Move() {
        if (this.active) {
            this.posY -= 5;

            if (this.posY <= 0) {
                this.image.style.visibility = 'hidden';
                this.active = false;
            }
            else
                //this.image.style.posTop = this.posY
                ;
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
    }
}
