import Player from './class/Player';
import Ennemi from './class/Ennemi';
import { displayLives } from './functions';

const player = new Player("id", "player");

const gameBoard = document.getElementById("gameBoard");
gameBoard.appendChild(player.element);

displayLives(player.lives);

const ennemies = [];
const randomPos = Ennemi.randomPositions();

for (let i = 0; i < randomPos.length; i++) {
    ennemies[i] = new Ennemi("class", "ennemi", randomPos[i]);
    gameBoard.appendChild(ennemies[i].element);
}
const directions = ["up", "down", "left", "right"];

document.addEventListener("keydown", function (e) {
    //Utiliser un switch ? Sans doute...
    if (e.key === "ArrowUp") {
        player.move("up");
        player.detectionEnnemies(ennemies);
    }

    if (e.key === "ArrowDown") {
        player.move("down");
        player.detectionEnnemies(ennemies);
    }

    if (e.key === "ArrowLeft") {
        player.move("left");
        player.detectionEnnemies(ennemies);
    }

    if (e.key === "ArrowRight") {
        player.move("right");
        player.detectionEnnemies(ennemies);
    }

    if (e.key === " ") {
        let bomb = player.createBomb();
        setTimeout(() => {
            bomb.explode();
            bomb.detectionExplosion(player, ennemies);
        }, 3000);
    }

    if (e.key === "0") {
        //version lazy pour faire une nouvelle partie
        location.reload();
    }
});

setInterval(function () {
    for (let i = 0; i < ennemies.length; i++) {
        let random = Math.floor(Math.random() * 4);
        ennemies[i].move(directions[random]);
        ennemies[i].detectionPlayer(player);
    }
}, 1000);
