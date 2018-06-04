import GameObject from './GameObject';
import Rocket from './Rocket';
import Game from './Game';

export default class Ship extends GameObject {
    private spriteURL = null;

    constructor(...args) {
        super(...args);
        this.updatePosition({
            x: document.documentElement.clientWidth / 2,
            y: document.documentElement.clientHeight - this.height * 2
        });
    }
}