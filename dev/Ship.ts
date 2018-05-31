import GameObject from './GameObject';
import Rocket from './Rocket';
import Game from './Game';

export default class Ship extends GameObject {

    public x: number = 0;
    public y: number = 0;

    private spriteURL = null;

    constructor(...args) {
        super(...args);
        this.x = document.documentElement.clientWidth / 2;
        this.y = document.documentElement.clientHeight - this.height * 2;
        console.log(document.documentElement.clientHeight)
    }

    public move(): void {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    public update(): void {
        this.style.left = this.x
        this.style.top = this.y
    }
}