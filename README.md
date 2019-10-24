# Spaceinvaders

A game made in Typescript for learning OOP patterns.

Click [here](https://jurrianlammerts.github.io/space-invaders/) to play the game. 

# Installation

- clone repository
- run npm install
- run webpack

# OOP principles

## Singleton

The singleton implementation is created by defining a class with the getInstance method that creates a new object if it does not exist yet and returns an existing object if such an object already exists.

    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }

## Polymorfisme
The polymorphism implementation can be found in the Projectiles class. This is the parent of Rocket & Laser. In the Battlefield class, people walk through both classes to address the move function.

    this.rocket = new Rocket();
    this.laser = new Laser();

    this.projectiles.push(this.rocket, this.laser);

    for (const p of this.projectiles) {
      p.move();
    }


The second implementation can be found in the GameObjects class. The polymorphism has been applied to the children of this class. In the Battlefield class, they are pushed and in the Game class, all objects walk to address the function of the parent. This happens when it is GameOver, at which point all objects are hidden and the EndScreen is shown.

    this.ship = new Ship();

     for (let y = 0; y < this.alienRows * this.wave; y++) {
      for (let x = 0; x < this.alienColumns; x++) {
        const alien = new Alien();
        alien.start();
        this.aliens.push(alien);
      }
    }
    
    this.gameObjects.push(this.ship, this.aliens[i]);

    for (const o of this.battlefield.gameObjects) {
      o.kill();
    }

## Strategy
I use the Strategy pattern to change the behavior of the Ship. For this I created the Weapon Behavior interface. Pressing "Z" or "X" allows a user to choose between shooting a Laser or a Rocket.

    interface WeaponBehaviour extends GameObject {
        ship: Ship;
        move(): void;
    }

    class Laser extends Projectile implements WeaponBehaviour {
        public active: boolean = false;
        public ship: Ship;

        constructor(ship: Ship) {
            super();
            this.ship = ship;
        }

        public move() {

        }
    }

    class Rocket extends Projectile implements WeaponBehaviour {
        public active: boolean = false;
        public ship: Ship;

        constructor(ship: Ship) {
            super();
            this.ship = ship;
        }

        public move() {
            
        }
    }

    class Ship extends GameObject implements Subject {
        public ship: Ship;
        public laser: Laser;
        public rocket: Rocket;
        public currentWeapon: WeaponBehaviour;

        constructor() {
            super()
            this.setWeapons();
        }

        public setWeapons() {
            this.rocket = new Rocket();
            this.laser = new Laser();
            this.currentWeapon = this.laser;
        }

        private onKeyDown(event: KeyboardEvent): void {
            switch (event.keyCode) {
            case 32:
                if (!this.currentWeapon.active) {
                this.currentWeapon.start();
                this.currentWeapon.move();
                }
                break;
            case 90:
                this.currentWeapon = this.rocket;
                break;
            case 88:
                this.currentWeapon = this.laser;
                break;
            }
        }
    }


## Observer
I implemented the observer pattern in the following way: when the Ship has chilled a wave from Aliens, Aliens and Battlefield get to know that a new wave is coming. The Battlefield uses this for an increase in the score and Aliens use this to increase their speed.

###### Subject

        interface Subject {
            observers: Observer[];
            subscribe(c: Observer): void;
            unsubscribe(c: Observer): void;
        }

        class Ship extends GameObject implements Subject {
            public observers: Observer[] = [];
            public wave: number;

            constructor() {
                super()
            }

            public subscribe(o: Observer) {
            this.observers.push(o);
            }

            public unsubscribe(o: Observer) {
            let index = this.observers.indexOf(o);
            this.observers.splice(index, 1);
            }

            public sendMessage() {
            for (let c of this.observers) {
                c.notify(2);
            }
            }
        }  

###### Observer

        interface Observer {
            notify(wave: number): void;
        }

        class Alien extends GameObject implements Observer {
            subject: Subject;
            movementSpeed: number;

            constructor(s: Subject, movementSpeed: number) {
                super()
                this.movementSpeed = movementSpeed;
                this.subject = s;
                this.subject.subscribe(this);
            }

            public notify(wave: number) {
                this.movementSpeed *= 0, 5 * wave;
            }
        }

        class BattleField implements Observer {
            wave: number;
            constructor() {
            this.ship.subscribe(this);
            }

            public notify(wave: number) {
                Game.getInstance().score *= wave;
                this.wave *= wave;
            }

            public updateGame() {
                if (this.totalAliensAlive === 0) {
                    this.ship.sendMessage();
                    this.generateAliens(this.wave);
            }
        }

# UML Class diagram



![UML](assets/image/UML.png?raw=true "UML")



# Pull request

**Week 4: PULL REQUEST**

- Fork a project of a fellow student.
- Look for improvements.

In the link below my executed pull request is on the repository of classmate Marvin. The applied principles of OOP that I have added can be seen in the separation of the added code in the game components. For this I put the background music in the Game object and the SFX in the Car object. If the instance of this object were deleted, the SFX of Car would also be deleted.

[Pull-Request](https://github.com/dafkas/typescript-game/pull/2)

# Peer review

**Week 6: PEER REVIEW**

- Study the project of a fellow student and install his / her game.
- Assess the OOP design techniques used in the code, are all techniques present and have they been applied correctly?
- Create an issue in the fellow student's repository, write your review here. The link to this issue is in your own ReadMe file.

In the link below you can find my executed issue on the repository of classmate Joey.

[Peer-Review](https://github.com/joey-school/Neverest/issues/1)
