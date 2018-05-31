import Alien from "./Alien";
import Ship from "./Ship";
import Rocket from "./Rocket";

export default class Game {
    private static instance: Game;

    private viewPortHeight: number =  document.documentElement.clientHeight;
    private viewPortWidth: number = document.documentElement.clientWidth;

    private viewPort: HTMLElement = null;

    private ship: Ship = null;
    public rocket: Rocket = null;
    private aliens: Alien[] = null;

    private lblScore: HTMLLabelElement = null;
    private score: number = 0;

    constructor() {
        this.viewPort = <HTMLElement>document.getElementById("root");
        this.initiateBattlefield();
        this.gameLoop();
        //this.initiateEvents();
    }

    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }

     initiateBattlefield() {
        this.viewPort.style.position = 'relative';
        this.viewPort.style.width = this.viewPortWidth.toString() + 'px';
        this.viewPort.style.height = this.viewPortHeight.toString() + 'px';
        this.viewPort.style.left = ((document.documentElement.clientWidth - this.viewPortWidth) / 2).toString() + 'px';
        this.viewPort.style.top = ((document.documentElement.clientHeight - this.viewPortHeight) / 2).toString() + 'px';
        this.viewPort.style.backgroundColor = 'Black';

        this.ship = new Ship(
            this.viewPortWidth / 4,
            300,
            35,
            60,
            "./assets/images/Ship.png",
            this.viewPort
        );

        this.aliens = [];
        for (var indexY = 0; indexY < 2; indexY++) {
            for (var index = 0; index < 10; index++) {
                const alien: Alien = new Alien([
                    './assets/images/Blowup1.png',
                    './assets/images/Blowup2.png',
                    './assets/images/Blowup3.png',
                    './assets/images/Blowup4.png'
                ],
                    150,
                    300,
                    47,
                    34,
                    "./assets/images/Invader.png",
                    this.viewPort,
                );
                alien.start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));
                alien.currentDirection = Alien.Direction.Right;
                this.aliens.push(alien);
            }
        }
    }

    // private initiateEvents() {
    //     setInterval(() => {
    //         if (this.rocket.active)
    //             this.rocket.move();

    //         if (this.rocket.active) {
    //             var rocketRect: ClientRect = this.rocket.element.getBoundingClientRect();

    //             for (var index = 0; index < this.aliens.length; index++) {
    //                 if (this.aliens[index].active) {
    //                     var alienRect: ClientRect = this.aliens[index].element.getBoundingClientRect();
    //                     if (!(rocketRect.right < alienRect.left || rocketRect.left > alienRect.right || rocketRect.bottom < alienRect.top || rocketRect.top > alienRect.bottom)) {
    //                         this.aliens[index].kill();
    //                         this.rocket.kill();

    //                         this.score += 1000;
    //                         this.lblScore.textContent = this.score.toString();
    //                     }
    //                 }
    //             }
    //         }

    //     }, 1);

    //     setInterval(() => {
    //         for (var index = 0; index < this.aliens.length; index++)
    //             if (this.aliens[index].active)
    //                 this.aliens[index].move();
    //     }, 1);
    // }

    private addEventListener(element: any, event: string, listener: EventListener) {
        if (element.addEventListener)
            element.addEventListener(event, listener);
        else if (element.attachEvent)
            element.attachEvent(event, listener);
    }

    private update() {
        this.ship.move();
    }

    private gameLoop() {
        this.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}


