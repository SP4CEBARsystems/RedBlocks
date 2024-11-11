import { setNumber } from "./helper_functions.js";
import { itemCollision } from "./physics.js";
import { myGameArea, gameParameters } from "./index.js";
import { gameObjects } from "./index.js";

export function updateGameArea() {
    //platformer
    //background
    myGameArea.clear();
    //gameObjects.myGamePiece.x += 1;

    if (gameObjects.myGamePiece.isMoving) {
        gameParameters.money += gameParameters.fundingLevel;
    }
    gameObjects.myGamePiece.update();
    gameObjects.myLoot.update();
    gameObjects.myBackground.update();
    //document.getElementById("money").innerHTML=gameParameters.money.gameParameters.toString();
    updateDisplays();
}

export function component(width, height, color, x, y /*, background*/) {
    this.type = "component";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.offsetx = 0;
    this.offsety = 0;
    this.color = color;
    //this.background = background;
    this.update = function () {
        const context = myGameArea.context;
        context.fillStyle = this.color;
        context.fillRect(this.x - this.offsetx, this.y - this.offsety, this.width, this.height);
    }
}

export function background(components, parallaxFactor) {
    this.type = "background";
    this.x = 0;
    this.y = 0;
    this.offsetx = 0;
    this.offsety = 0;
    this.parallaxFactor = parallaxFactor;
    this.components = components;
    this.update = function () {
        this.components.forEach(objectUpdate, this);
    }
    //element.xxx is applied to the sub-backgrounds as well
}

export function background_original(backgroundData, x, y, parallaxFactor) {
    //let x=0;
    //let y=0;
    this.x = -x;
    this.y = -y;
    this.offsetx = 0;
    this.offsety = 0;
    this.parallaxFactor = parallaxFactor;
    this.type = "background";

    this.components = [];
    backgroundData.forEach((element, index) => {
        //console.log(element)
        this.components[index] = new component(element[0], element[1], element[2], element[3], element[4]);
    });
    //this.components = backgroundData;
    this.update = function () {
        //this.components.foreach(k,v){
        //v.update();
        //}
        //this.components[0].update();
        this.components.forEach(objectUpdate, this);
    }
}

function objectUpdate(element) {
    element.offsetx += this.x + this.offsetx;
    element.offsety += this.y + this.offsety;
    element.update();
    element.offsetx = 0;
    element.offsety = 0;
}

//function drag(intensity, v, a){
//let dragForce = v*v*intensity;
//}

export function item(width, height, x, y, background, player, object) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.background = background;
    this.components = object;
    this.type = "item";
    this.update = function () {
        //object.components[0].color = "blue";
        itemCollision(this, player);
        const myComponents = this.components;
        myComponents.x = 0;
        myComponents.y = 0;
        myComponents.offsetx = - this.x + background.x;
        myComponents.offsety = - this.y + background.y;
        myComponents.update();
    }
}

export function updateDisplays() {
    setNumber("money", gameParameters.money);
    const gamePiece = gameObjects.myGamePiece;
    setNumber("playerPX", gamePiece.x);
    setNumber("playerPY", gamePiece.y);
    setNumber("playerVX", gamePiece.vx);
    setNumber("playerVY", gamePiece.vy);
    setNumber("playerAX", gamePiece.ax);
    setNumber("playerAY", gamePiece.ay);
}