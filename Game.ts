module Games {

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
        }

        private InitiateEvents() {
            setInterval(() =>
                1);

            this.addEventListener(document, 'keydown', (event) => {
                var keyEvent: KeyboardEvent = <KeyboardEvent>event;
                var keyCode: number = 0;
                if (keyEvent && keyEvent.keyCode)
                    keyCode = keyEvent.keyCode;
                else if (window.event && window.event.keyCode)
                    keyCode = window.event.keyCode;

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
    }
}

export class Ship {

    public posX: number = 0;
    public posY: number = 0;
    public width: number = 0;
    public height: number = 0;

    constructor() {

    }
}

export class Rocket {

    public posX: number = 0;
    public posY: number = 0;
    public width: number = 0;
    public height: number = 0;

    constructor() {

    }
}

export class Alien {

    public posX: number = 0;
    public posY: number = 0;
    public width: number = 0;
    public height: number = 0;

    constructor() {

    }
}
}