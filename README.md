# Spaceinvaders

Een game gemaakt in Typescript voor het leren van OOP

# Installation
- run npm install 
- run webpack

# OOP principles

* Singleton 

De singleton implementatie wordt gemaakt door een klas te definiëren met de methode getInstance die een nieuw object aanmaakt als het nog niet bestaat en een bestaand object teruggeeft als er al wel een dergelijk object bestaat.

    
    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }


* Polymorfisme

* Strategy

* Observer 

Het observer pattern heb ik op de volgende manier geimplementeerd: wanneer het Ship een wave van Aliens heeft gekilld, krijgen Aliens en Battlefield te weten dat er een nieuwe wave komt. Het Battlefield gebruikt dit voor een verhoging in de score en Aliens gebruiken dit om hun snelheid te verhogen.

* Subject

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

* Observer

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

__Week 4: PULL REQUEST__
* Maak een fork van het project van een medestudent.
* Ga op zoek naar een verbeterpunt. Dit kan een verbetering zijn van
incorrecte code of een nieuwe feature. Pas de tot nu toe geleerde OOP
principes hierin toe.

In de link hieronder staat mijn uitgevoerde pull-request op de repository van klasgenoot Marvin. De toegepaste principes van OOP die ik heb toegevoegd zijn terug te zien in het gescheiden van de toegevoegde code in de game componenten. Ik heb hiervoor de achtergondmuziek in het Game object gezet en de SFX in het Car object. Wanneer de instantie van dit object verwijderd zou worden, dan zal het SFX van Car ook verwijderd worden.

[Pull-Request](https://github.com/dafkas/typescript-game/pull/2)

# Peer review

__Week 6: PEER REVIEW__
* Bestudeer het project van een medestudent en installeer zijn/haar game
werkend op je eigen machine.
* Beoordeel de OOP ontwerptechnieken die gebruikt zijn in de code - zijn
alle technieken aanwezig en zijn ze correct toegepast?
* Maak een issue aan in de repository van de medestudent, hierin schrijf je
je beoordeling. De link naar deze issue komt in je eigen ReadMe file.

In de link hieronder staat mijn uitgevoerde issue op de repository van klasgenoot Joey. 

[Peer-Review](https://github.com/joey-school/Neverest/issues/1)
