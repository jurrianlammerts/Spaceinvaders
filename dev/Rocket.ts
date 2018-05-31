import GameObject from "./GameObject";

export default class Rocket extends GameObject {
    public active: boolean = false;

    constructor(...args) {
        super(...args);
        this.element.style.visibility = "hidden";
        this.element.style.zIndex = '999';
    }

    public move() {
        if (this.active)
        {
            this.y-=5;

            if (this.y <= 0)
            {
                this.element.style.visibility = 'hidden';
                this.active = false;
            }
            else
                this.element.style.top = this.y.toString();
        }			
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
