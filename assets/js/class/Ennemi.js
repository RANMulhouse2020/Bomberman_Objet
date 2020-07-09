import Character from './Character';
import { getComputedStyleInt } from './../functions';

export default class Ennemi extends Character {
    constructor(attribute, name, positions) {
        super(attribute, name);
        this.element.style.top = `${positions[0]}px`;
        this.element.style.left = `${positions[1]}px`;
    }

    static get nbEnnemies() {
        return 5;
    }

    static randomPositions = () => {
        let x;
        let y;
        let nbEnnemies = Ennemi.nbEnnemies;
        const positions = [];
        //On peut simplifier cet algo je crois...
        while (positions.length < nbEnnemies) {
            //on  créé des valeurs aléatoires pour une position sur l'axe x et y qui ont des valeurs multiples de 50, soit la longueur et largeur de nos éléments, et qui sont adaptés à la taille de notre plateau de jeu
            x = Math.floor(Math.random() * 15) * 50;
            y = Math.floor(Math.random() * 15) * 50;
            //si ces valeurs ne sont pas trop proches du centre, soit la zone où se trouve notre personnage
            if (!(x >= 250 && x <= 450) && !(y >= 250 && y <= 450)) {
                let add = true;
                for (let i = 0; i < positions.length; i++) {
                    //si cette position existe déjà dans notre tableau de positions, càd qu'un ennemi a déjà cette position
                    if (positions[i][0] === x && positions[i][1] === y) {
                        //on empêvhe le fait de rajouter cette position dans notre tableau de position
                        add = false;
                    }
                }
                //si on a respecté toutes les conditions ==> add = true
                if (add) {
                    positions.push([x, y]);                   
                }
            }
        }
        return positions;
    }

    detectionPlayer = (player) => {
        if (!player.invincible) {
            let ennemiTop = getComputedStyleInt(this.element, "top");
            let ennemiLeft = getComputedStyleInt(this.element, "left");
            let playerTop = getComputedStyleInt(player.element, "top");
            let playerLeft = getComputedStyleInt(player.element, "left");
            if ((ennemiTop === playerTop) && (ennemiLeft === playerLeft)) {
                player.updateLife();
            }
        }
    }
}