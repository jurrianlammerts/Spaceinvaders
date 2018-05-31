import applyStyles from "./util/applyStyles"

export default class GameObject {
    public element: HTMLElement;
    public width: number;
    public height: number;
    public style: any;

    constructor(width?: number, height?: number, spriteURL?: string, viewport?: HTMLElement) {
        this.element = document.createElement("div");
        this.width = width;
        this.height = height;
        this.style = {
            position: "absolute",
            display: "block",
            backgroundImage: `url(${spriteURL})`,
            backgroundSize: "cover",
            width: `${width}px`,
            height: `${height}px`,
        };
        applyStyles(this.style, this.element);

        viewport.appendChild(this.element);
    }
}