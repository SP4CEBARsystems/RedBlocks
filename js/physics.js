import { toSign } from "./helper_functions.js";
import { smoothen } from "./helper_functions.js";
import { gameParameters } from "./index.js";

export function itemCollision(object, player) {
    if (hitDetect(object, player)) {
        object.components.components[0].color = "#A00";
        //remove object
        //add score points
        //add fuel or whatever
    } else {
        object.components.components[0].color = "red";
    }
}

export function hitDetect(a, b) {
    if (
        a.x + a.width >= b.x &&
        b.x + b.width >= a.x &&
        a.y + a.height >= b.y &&
        b.y + b.height >= a.y
    ) return true;
    return false;
}

export function physicsComponent(width, height, x, y, vx, vy, ax, ay, background, focussed, object) {
    this.width = width;
    this.height = height;
    this.centerx = 150;
    this.centery = 100;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.isMoving = true;
    this.background = background;
    this.components = object;
    this.type = "physics";
    this.update = function () {
        //let v = sqrt(vx*vx + vy*vy);
        //let dx = this.vx / v;
        //let dy = this.vy / v;
        simulatePhysics(this);
        collision(this);
        this.components.x = 0;
        this.components.y = 0;
        this.components.offsetx = - this.x + background.x;
        this.components.offsety = - this.y + background.y;
        if (focussed) {
            parallaxAllClildren(background, this);
        }
        this.components.update();
    }
}

export function parallaxAllClildren(background, player) {
    if (background.type != "background") return false;
    // W O R K   I N   P R O G R E S S
    /*background.components.forEach((element, index) => {
        parallaxAllClildren( element, player );
    });*/
    backgroundTrackPlayer(background, player, background.parallaxFactor, 0.9);
    return true;

    // let component = background;
    // while (component.type == "background") {
    //     component.components.forEach((element, index) => {

    //     });
    // }
}

export function backgroundTrackPlayer(background, player, parallaxFactor, smootheningFactor) {
    background.x = smoothen(background.x, (player.x - player.centerx) * parallaxFactor, smootheningFactor);
    background.y = smoothen(background.y, (player.y - player.centery) * parallaxFactor, smootheningFactor);
}

export function simulatePhysics(object) {
    object.ay += 0.005 / gameParameters.liftLevel;
    object.ax -= drag(object.vx, 0.01 / gameParameters.streamLineLevel);//Math.min(object.vx*0.02, Math.abs(object.vx));
    object.ay -= drag(object.vy, 0.01 / gameParameters.streamLineLevel);

    object.vx += object.ax;
    object.vy += object.ay;
    object.x += object.vx;
    object.y += object.vy;
    //console.log(object.y);
    object.ax = 0;
    object.ax = 0;
}

export function drag(velocity, dragFactor) {
    //return 0;
    return friction(0.001 / gameParameters.streamLineLevel, velocity);
    //return sq(velocity) * dragFactor *0.02;
}

export function friction(frictionForce, velocity) {
    return toSign(velocity >= 0) * Math.min(frictionForce, Math.abs(velocity));
    //real friction should only reduce the force until its zero
}

export function collision(object) {
    if (object.y > 170) {
        object.y = 170;
    }
    if (object.y >= 170) {
        object.vx -= friction(5, object.vx);
        if (object.vy > 0) object.vy = 0;
        if (object.ay > 0) object.ay = 0;
    }
    object.isMoving = (Math.abs(object.vx) > 0.01 || Math.abs(object.vx) > 0.01)
}