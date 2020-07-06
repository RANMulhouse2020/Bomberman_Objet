import { getComputedStyleInt } from './../functions';

export default class Character {
    constructor(attribute, name) {
        this.element = document.createElement("div");
        this.element.setAttribute(attribute, name);
    }

    move = (direction) => {
        let topElement = getComputedStyleInt(this.element, "top");
        let leftElement = getComputedStyleInt(this.element, "left");

        switch (direction) {
            case "up":
                if (topElement > 0) {
                    this.element.style.top = topElement - 50 + "px";
                }
                break;

            case "down":
                if (topElement < 700) {
                    this.element.style.top = topElement + 50 + "px";
                }
                break;

            case "left":
                if (leftElement > 0) {
                    this.element.style.left = leftElement - 50 + "px";
                }
                break;

            case "right":
                if (leftElement < 700) {
                    this.element.style.left = leftElement + 50 + "px";
                }
                break;
        }
    }
}

