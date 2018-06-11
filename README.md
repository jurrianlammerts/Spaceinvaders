# Spaceinvaders

Een game gemaakt in Typescript voor het leren van OOP

# Installation
- run npm install 
- run webpack

# OOP principles

* Singleton 

De singleton implementatie wordt gemaakt door een klas te definiëren met de methode getInstance die een nieuw object aanmaakt als het nog niet bestaat en een bestaand object teruggeeft als er al wel een dergelijk object bestaat.

    ```
    static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }
    ```

* Polymorfisme

* Strategy

* Observer 



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
