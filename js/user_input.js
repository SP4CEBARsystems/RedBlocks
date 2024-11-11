import { setNumbers } from "./helper_functions.js";
import { gameParameters } from "./index.js";
import { gameObjects } from "./index.js";

export function assignButtons() {
    // addEventListenerByQuerySelector("main", "load", startGame);
    addEventListenerById("launchAgainButton", "click", launchAgain);
    
    addEventListenerById("streamlining-button", "click", () => {
        gameParameters.streamLineLevel = upgrade('streamlining', gameParameters.streamLineLevel);
    });
    addEventListenerById("launchForce-button", "click", () => {
        gameParameters.launchForceLevel = upgrade('launchForce', gameParameters.launchForceLevel);
    });
    addEventListenerById("funding-button", "click", () => {
        gameParameters.fundingLevel = upgrade('funding', gameParameters.fundingLevel);
    });
    addEventListenerById("lift-button", "click", () => {
        gameParameters.liftLevel = upgrade('lift', gameParameters.liftLevel);
    });
}

function addEventListenerByQuerySelector(query, type, callback) {
    const element = document.querySelector(query);
    if (element === null) {
        return;
    }
    element.addEventListener(type, callback);
}

function addEventListenerById(elementId, type, callback) {
    const element = document.getElementById(elementId);
    if (element === null) {
        return;
    }
    element.addEventListener(type, callback);
}

function launchAgain() {
    gameObjects.myGamePiece.ax += 10 * gameParameters.launchForceLevel;
    gameObjects.myGamePiece.ay -= 0.1 * gameParameters.launchForceLevel;
}

function upgrade(id, value) {
    //cost = Math.pow(1.1,value);
    let cost = getPrice(value);
    if (gameParameters.money < cost) return value;
    gameParameters.money -= cost;
    value++;
    setNumbers(id, [value, cost]);
    return value;
}

//getPrice(){
//return Math.pow(1.1,upgrades[index]);
//}

//cost = getPrice(upgrades[index]);
function getPrice(level) {
    return Math.pow(2, level);
}