import applyStyles from "./util/applyStyles";

export default class GameObject {
  private game: Subject;
  public element: HTMLElement;
  public width: number;
  public height: number;
  public x: number = 0;
  public y: number = 0;
  public active: boolean = false;

  constructor(
    width?: number,
    height?: number,
    spriteURL?: string,
    viewport?: HTMLElement,
    startHidden?: boolean
  ) {
    this.element = document.createElement("div");
    this.width = width;
    this.height = height;

    applyStyles(
      {
        position: "absolute",
        display: "block",
        backgroundImage: `url(${spriteURL})`,
        backgroundSize: "cover",
        width: `${width}px`,
        height: `${height}px`
      },
      this.element
    );

    // Nog meer polymorfisme
    if (startHidden) applyStyles({ visibility: "hidden" }, this.element);

    viewport.appendChild(this.element);
  }

  public updatePosition(pos: any) {
    if (pos.x) this.x = pos.x;
    if (pos.y) this.y = pos.y;
    applyStyles(
      {
        transform: `translate3D(${this.x}px, ${this.y}px, 0px)`
      },
      this.element
    );
  }

  public getRectangle() {
    return this.element.getBoundingClientRect();
  }

  public start(x: number, y: number) {
    this.updatePosition({ x, y });
    applyStyles(
      {
        visibility: "visible",
        display: "block",
        left: "0"
      },
      this.element
    );
    this.active = true;
  }

  public kill() {
    this.active = false;
    applyStyles(
      {
        visibility: "hidden",
        display: "none",
        left: "-999em"
      },
      this.element
    );
  }

  public move() {}
}
