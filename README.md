# Spaceinvaders

Een game gemaakt in Typescript voor het leren van OOP patterns.

# Installation

- run npm install
- run webpack

# OOP principles

## Singleton

De singleton implementatie wordt gemaakt door een klas te definiëren met de methode getInstance die een nieuw object aanmaakt als het nog niet bestaat en een bestaand object teruggeeft als er al wel een dergelijk object bestaat.

    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }

## Polymorfisme

De polymorfisme implementatie is terug te vinden in de class Projectiles. Dit is de parent van Rocket & Laser. In de class Battlefield word er door de beide classes heen geloopt, om zo de functie move aan te spreken.

    this.rocket = new Rocket();
    this.laser = new Laser();

    this.projectiles.push(this.rocket, this.laser);

    for (const p of this.projectiles) {
      p.move();
    }

## Strategy

Het Strategy pattern gebruik ik om het gedrag van het Ship te veranderen. Ik heb hiervoor de interface WeaponBehaviour gemaakt. Door op "Z" of "X" kan een gebruiker kiezen tussen het schieten van een Laser of een Rocket.

    interface WeaponBehaviour extends GameObject {
        ship: Ship;
        move(): void;
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

Het observer pattern heb ik op de volgende manier geimplementeerd: wanneer het Ship een wave van Aliens heeft gekilld, krijgen Aliens en Battlefield te weten dat er een nieuwe wave komt. Het Battlefield gebruikt dit voor een verhoging in de score en Aliens gebruiken dit om hun snelheid te verhogen.

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

# Pull request

**Week 4: PULL REQUEST**

- Maak een fork van het project van een medestudent.
- Ga op zoek naar een verbeterpunt. Dit kan een verbetering zijn van
  incorrecte code of een nieuwe feature. Pas de tot nu toe geleerde OOP
  principes hierin toe.

In de link hieronder staat mijn uitgevoerde pull-request op de repository van klasgenoot Marvin. De toegepaste principes van OOP die ik heb toegevoegd zijn terug te zien in het gescheiden van de toegevoegde code in de game componenten. Ik heb hiervoor de achtergondmuziek in het Game object gezet en de SFX in het Car object. Wanneer de instantie van dit object verwijderd zou worden, dan zal het SFX van Car ook verwijderd worden.

[Pull-Request](https://github.com/dafkas/typescript-game/pull/2)

# Peer review

**Week 6: PEER REVIEW**

- Bestudeer het project van een medestudent en installeer zijn/haar game
  werkend op je eigen machine.
- Beoordeel de OOP ontwerptechnieken die gebruikt zijn in de code - zijn
  alle technieken aanwezig en zijn ze correct toegepast?
- Maak een issue aan in de repository van de medestudent, hierin schrijf je
  je beoordeling. De link naar deze issue komt in je eigen ReadMe file.

In de link hieronder staat mijn uitgevoerde issue op de repository van klasgenoot Joey.

[Peer-Review](https://github.com/joey-school/Neverest/issues/1)
