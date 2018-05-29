import applyStyles from "./util/applyStyles"

export default class GameObject {
    public element: HTMLElement;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public style: any;

    constructor(x?: number, y?: number, width?: number, height?: number, spriteURL?: string, viewport?: HTMLElement) {
        this.element = document.createElement("div");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.style = {
            position: "absolute",
            display: "block",
            backgroundImage: `url(${spriteURL})`,
            backgroundSize: "cover",
            width: `${width}px`,
            height: `${height}px`,
            left: `${x}px`,
            top: `${y}px`,
        };
        applyStyles(this.style, this.element);

        viewport.appendChild(this.element);
    }
}