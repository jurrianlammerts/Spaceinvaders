import GameObject from "./GameObject";
import Game from "./Game";
import Alien from "./Alien";

export default class Ship extends GameObject {
  private spriteURL = null;
  public aliens: Alien;

  constructor(...args) {
    super(...args);
    this.updatePosition({
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight - this.height * 2
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
  }

  private onKeyDown(event: KeyboardEvent): void {
    const game = Game.getInstance();
    switch (event.keyCode) {
      case 65:
        if (!(this.x - this.width < document.documentElement.clientLeft)) {
          this.updatePosition({
            x: this.x - this.width
          });
        }
        break;
      case 68:
        if (!(this.x + 2 * this.width > document.documentElement.clientWidth)) {
          this.updatePosition({ x: this.x + this.width });
        }
        break;
      case 32:
        if (!game.rocket.active) {
          game.rocket.start(this.x + this.width / 2, this.y);
          game.rocket.move();
        }
        break;
    }
  }
}
