export function getComputedStyleInt(element, property) {
    return parseInt(window.getComputedStyle(element).getPropertyValue(property), 10);
}

export function win() {
    const text = document.createElement("h2");
    text.setAttribute("class", "win");
    text.innerText = "YOU WIN !";
    document.getElementById("gameBoard").appendChild(text);
}

export function gameOver() {
    document.getElementById("gameBoard").removeChild(player);
    const text = document.createElement("h2");
    text.setAttribute("class", "gameover");
    text.innerText = "GAME OVER...";
    document.getElementById("gameBoard").appendChild(text);
}

export function displayLives(lives){
    document.getElementById("nbLives").innerText = lives;
}

//export default { getComputedStyleInt, win, gameOver }