

export default class Ship implements GameObject {

    public image: HTMLImageElement = null;
    public posX: number = 0;
    public posY: number = 0;
    public width: number = 0;
    public height: number = 0;


    constructor(imageURL: string, parentElement: HTMLElement) {
        this.image = <HTMLImageElement>document.createElement('img');
        parentElement.appendChild(this.image);
        this.image.src = imageURL;
        this.image.style.position = 'absolute';
        this.image.style.zIndex = '1000';
        this.width = this.image.clientWidth;
        this.height = this.image.clientHeight;
    }

    public SetXPos(posX: number) {

    }

    public SetYPos(posY: number) {

    }

    public Move(direction: number) {

    }
}

