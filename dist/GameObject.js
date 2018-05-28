import applyStyles from "./util/applyStyles";
export default class GameObject {
    constructor(x, y, width, height, spriteURL, viewport) {
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
