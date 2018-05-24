

export default class Rocket implements GameObject {

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
