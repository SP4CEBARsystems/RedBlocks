import { startGame } from "./game_objects.js";
import { assignButtons } from "./user_input.js";
import { updateGameArea } from "./graphics.js";

// fetch('../test.glsl')
//   .then(response => response.text())
//   .then((data) => {
//     console.log(data)
//   })

console.log(document);
assignButtons();

//upgrades=[1,1,1,1,1,1,1];
export const gameParameters = {
    launchForceLevel: 1,
    streamLineLevel: 1,
    fundingLevel: 1,
    liftLevel: 1,
    
    frameRate: 50,
    // deltaTime: 1000 / this.frameRate,
    money: 0,
}

gameParameters.deltaTime = 1000 / gameParameters.frameRate

export const gameObjects = {
    // myGamePiece: undefined,
    // myLoot: undefined,
    // myBackground: undefined,
}

export let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        const canvasElement = this.canvas;
        canvasElement.width = 480;
        canvasElement.height = 270;
        this.context = canvasElement.getContext("2d");
        document.body.insertBefore(canvasElement, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, gameParameters.deltaTime);
    },
    clear: function () {
        const canvasElement = this.canvas;
        this.context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }
}

document.addEventListener("DOMContentLoaded", startGame);
// document.body.addEventListener("load", startGame);

/*
function backgroundv1(backgroundData) {
    //let x=0;
    //let y=0;
    this.x = 0;
    this.y = 0;
    this.components = [];
    backgroundData.forEach((element, index) => {
      //console.log(element)
       this.components[index] = new component( element[2], element[3], "black", element[0], element[1], this );
    });
    //this.components = backgroundData;
    this.update = function(){
        //this.components.foreach(k,v){
          //v.update();
        //}
        //this.components[0].update();
        this.components.forEach((element, index) => {
          //console.log(element)
          element.update(this);
        });
    }
}
  
function backgroundv2( components ) {
    //let x=0;
    //let y=0;
    this.x = 0;
    this.y = 0;
    element.offsetx = 0;
    element.offsety = 0;
    this.components = [];
    components.forEach((element, index) => {
      //console.log(element)
      //element.background = this;
      this.components[index] = new component( element.width, element.height, element.color, element.x, element.y, element );
      //this.components[index] = element;
      this.components[index].background = this;
    });
    //this.components = backgroundData;
    this.update = function(){
        //this.components.foreach(k,v){
          //v.update();
        //}
        //this.components[0].update();
        this.components.forEach((element, index) => {
          //console.log(element)
          element.update();
        });
    }
}
*/
