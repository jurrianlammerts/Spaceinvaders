import { Alien } from "./Alien";
import { Ship } from "./Ship";
import { Rocket } from "./Rocket";

export module Game {

    export class Game {

        public static KeyCodes = { LeftArrow: 37, RightArrow: 39, SpaceBar: 32 };

        private viewPortHeight: number = 600;
        private viewPortWidth: number = 800;

        private viewPort: HTMLDivElement = null;

        private ship: Ship = null;
        public rocket: Rocket = null;
        private aliens: Alien[] = null;

        private lblScore: HTMLLabelElement = null;
        private score: number = 0;

        constructor(viewPortElementId: string) {
            this.viewPort = <HTMLDivElement>document.getElementById(viewPortElementId);
            this.InitiateBattlefield();
            this.InitiateEvents();

        }

        private InitiateBattlefield() {
            this.viewPort.style.position = 'absolute';
            this.viewPort.style.width = this.viewPortWidth.toString() + 'px';
            this.viewPort.style.height = this.viewPortHeight.toString() + 'px';
            this.viewPort.style.left = ((document.documentElement.clientWidth - this.viewPortWidth) / 2).toString() + 'px';
            this.viewPort.style.top = ((document.documentElement.clientHeight - this.viewPortHeight) / 2).toString() + 'px';
            this.viewPort.style.backgroundColor = 'Black';

            this.ship = new Ship('Images/Alien.png', this.viewPort);
            this.ship.SetXPos(this.viewPortWidth / 2);
            this.ship.SetYPos(this.viewPortHeight - this.ship.image.height);

            this.rocket = new Rocket('Images/Rocket.png', this.viewPort);

            this.aliens = new Array();
            for (var indexY = 0; indexY < 2; indexY++) {
                for (var index = 0; index < 10; index++) {
                    var alien: Alien = new Alien('Images/Invader.png', this.viewPort, ['Images/Blowup1.png', 'Images/Blowup2.png', 'Images/Blowup3.png', 'Images/Blowup4.png']);
                    alien.Start(Math.max((alien.width + 20) * index, 1), Math.max((alien.height + 15) * indexY, 1));
                    alien.currentDirection = Alien.Direction.Right;
                    this.aliens.push(alien);
                }
            }
        }

        private InitiateEvents() {
            setInterval(() => {
                if (this.rocket.active)
                    this.rocket.Move();

                if (this.rocket.active) {
                    var rocketRect: ClientRect = this.rocket.image.getBoundingClientRect();

                    for (var index = 0; index < this.aliens.length; index++) {
                        if (this.aliens[index].active) {
                            var alienRect: ClientRect = this.aliens[index].image.getBoundingClientRect();
                            if (!(rocketRect.right < alienRect.left || rocketRect.left > alienRect.right || rocketRect.bottom < alienRect.top || rocketRect.top > alienRect.bottom)) {
                                this.aliens[index].Kill();
                                this.rocket.Kill();

                                this.score += 1000;
                                this.lblScore.textContent = this.score.toString();
                            }
                        }
                    }
                }

            }, 1);

            setInterval(() => {
                for (var index = 0; index < this.aliens.length; index++)
                    if (this.aliens[index].active)
                        this.aliens[index].Move();
            }, 1);

            this.addEventListener(document, 'keydown', (event) => {
                var keyEvent: KeyboardEvent = <KeyboardEvent>event;
                var keyCode: number = 0;
                if (keyEvent && keyEvent.keyCode)
                    keyCode = keyEvent.keyCode;
                else if (window.event && window.event)
                    //keyCode = window.event.keyCode;

                    if (keyCode) {
                        switch (keyCode) {
                            case Game.KeyCodes.LeftArrow:
                            case Game.KeyCodes.RightArrow:

                                this.ship.Move(keyCode);

                                break;

                            case Game.KeyCodes.SpaceBar:

                                if (this.rocket.active)
                                    this.rocket.Move();
                                else
                                    this.rocket.Start(this.ship.posX + (this.ship.width / 2), this.ship.posY);

                                break;
                        }
                    }
            });
        }
        private addEventListener(element: any, event: string, listener: EventListener) {
            if (element.addEventListener)
                element.addEventListener(event, listener);
            else if (element.attachEvent)
                element.attachEvent(event, listener);
        }
    }
}

