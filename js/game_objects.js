import { item } from "./graphics.js";
import { physicsComponent } from "./physics.js";
import { background_original } from "./graphics.js";
import { component } from "./graphics.js";
import { background } from "./graphics.js";
import { gameObjects, myGameArea } from "./index.js";

export function startGame() {
    console.log("game started");
    /*
    gameObjects.myBackground = new background_original([
      [100,200,"black",300000,20],
      [100,210,"black",3000,20],
      [100,220,"black",4000,20],
      [100,230,"black",5000,20]
    ]);
    myCloud = new background([]);
    myCloud2 = new background([]);
    myCloud.components = [
       new component( 20  , 10, "blue", 3360, 100 ),
       new component( 40  , 10, "blue", 3350, 110 ),
       new component( 80  , 10, "blue", 3330, 120 ),
       new component( 100 , 10, "blue", 3320, 130 )
    ];
    myCloud2.components = [
       new component( 20  , 10, "blue", 1000, 100 ),
       new component( 40  , 10, "blue", 1000, 110 ),
       new component( 80  , 10, "blue", 1000, 120 ),
       new component( 100 , 10, "blue", 0, 180 )
    ];
    */

    let cloudData = [
        [20, 10, "blue", 3360, 100],
        [40, 10, "blue", 3350, 110],
        [80, 10, "blue", 3330, 120],
        [100, 10, "blue", 3320, 130]
    ];

    gameObjects.myBackground = new background([], 1);
    let myObject = new background([], 1);
    let myItem = new background([new component(50, 50, "red", 0, 0)], 1);
    gameObjects.myBackground.components = [
        new component(300000, 10, "black", 100, 200),
        new component(3300, 10, "black", 0, 210),
        new component(4000, 10, "black", 100, 220),
        new component(5000, 10, "black", 100, 230),
        //new component( 20  , 10, "blue", 3360, 100 ),

        new background([
            new background_original(cloudData, 0, 0),
            new background_original(cloudData, 200, 0),
            new background_original(cloudData, 500, 50),
            //myCloud
        ], 1)
    ];
    myObject.components = [
        new component(30, 30, "red", 60, 0),
        new component(60, 10, "red", 0, 0),
    ];
    let myObject2 = new component(30, 30, "red", 0, 0);
    //gameObjects.myBackground.components.concat(myCloud);
    //gameObjects.myBackground.components.concat(new component( 20  , 20, "blue", 3300, 180, gameObjects.myBackground ));
    gameObjects.myGamePiece = new physicsComponent(
        90, 30, 10, 120, 0, 0, 40, -0.15, gameObjects.myBackground, true, myObject
    );
    gameObjects.myLoot = new item(50, 50, 3650, 150, gameObjects.myBackground, gameObjects.myGamePiece, myItem);
    //myItem.components[0].color = "blue";
    //if(myItem.components[0]==itemComponent) itemComponent.color = "blue";
    myGameArea.start();
}