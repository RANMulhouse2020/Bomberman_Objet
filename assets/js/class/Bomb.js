import { getComputedStyleInt, win } from './../functions';

export default class Bomb {
    constructor(top, left) {
        this.top = top;
        this.left = left;
        this.element = document.createElement("div");
        this.element.setAttribute("class", "bomb");
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        document.getElementById("gameBoard").appendChild(this.element);
    }

    explode = () => {
        this.top -= 50;
        this.left -= 50;
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.classList.remove("bomb");
        this.element.classList.add("explosion");
    }

    detectionExplosion = (player, ennemies) => {
        let explosionTop = getComputedStyleInt(this.element, "top");
        let explosionLeft = getComputedStyleInt(this.element, "left");
        let playerTop = getComputedStyleInt(player.element, "top");
        let playerLeft = getComputedStyleInt(player.element, "left");

        //on vérifie pour chaque ennemi s'il est dans le périmètre de l'explosion
        for (let i = 0; i < ennemies.length; i++) {
            let ennemiTop = getComputedStyleInt(ennemies[i].element, "top");
            let ennemiLeft = getComputedStyleInt(ennemies[i].element, "left");

            if ((ennemiTop >= explosionTop && ennemiTop <= explosionTop + 100) && (ennemiLeft >= explosionLeft && ennemiLeft <= explosionLeft + 100)) {
                document.getElementById("gameBoard").removeChild(ennemies[i].element);
                ennemies.splice(i, 1);
                if(ennemies.length <= 0) {
                    win();
                }
            }
        }

        if (!player.invincible) {
            if ((playerTop >= explosionTop && playerTop <= explosionTop + 100) && (playerLeft >= explosionLeft && playerLeft <= explosionLeft + 100)) {
                player.updateLife();
            }
        }

        setTimeout(() => {
            document.getElementById("gameBoard").removeChild(this.element);
        }, 300);
    }
}