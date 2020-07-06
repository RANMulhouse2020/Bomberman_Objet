import Character from './Character';
import Bomb from './Bomb';
import { getComputedStyleInt, displayLives, gameOver } from './../functions';

export default class Player extends Character {
    constructor(attribute, name) {
        super(attribute, name);
        this.lives = 3;
        this.invincible = false;
    }

    createBomb = () => {
        let topBomb = getComputedStyleInt(this.element, "top");
        let leftBomb = getComputedStyleInt(this.element, "left");
        return new Bomb(topBomb, leftBomb);
    }

    updateLife = () => {
        this.lives--;
        displayLives(this.lives);
        this.element.classList.add("touched");
        this.invincible = true;
        setTimeout(() => {
            this.element.classList.remove("touched");
            this.invincible = false;
        }, 3000);
        if (this.lives <= 0) {
            gameOver();
        }
    }

    detectionEnnemies = (ennemies) => {
        if (!this.invincible) {
            //On vérifie pour chaques ennemis
            for (let i = 0; i < ennemies.length; i++) {
                let ennemiTop = getComputedStyleInt(ennemies[i].element, "top");
                let ennemiLeft = getComputedStyleInt(ennemies[i].element, "left");
                let playerTop = getComputedStyleInt(this.element, "top");
                let playerLeft = getComputedStyleInt(this.element, "left");
                if ((ennemiTop === playerTop) && (ennemiLeft === playerLeft)) {
                    this.updateLife();
                }
            }
        }
    }
}


