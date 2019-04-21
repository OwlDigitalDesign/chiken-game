// Configs
const WORLD_GRAVITY = 0.00091
const JUMP_VELOCITY = -10   
const MOVE_VELOCITY_INCREMENT = 3

const ASPECT_RATIO = 16/9
const GAME_WIDTH = 1000
const GAME_HEIGHT = GAME_WIDTH / ASPECT_RATIO

// Modules
const Matter = require('matter-js')
const Controls = require('./controls')()

// Así como hice un módulo para player que la idea es que contenga todas las funciones que ejecutará la gallina, deberían
// de existir mmódulos por los demás elementos que pueden ir desde los tipos de "enemigos", escenarios, pantallas, etc
// para que este archivo sea solo el puente que conecta todo! <3
const player = require('./player')({
    gameArea : {
        width : GAME_WIDTH,
        height : GAME_HEIGHT
    },
    jumpVelocity : JUMP_VELOCITY,
    moveVelocityIncrement: MOVE_VELOCITY_INCREMENT
    
})

// Aliases
const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Events = Matter.Events
const Body = Matter.Body;
const Bounds = Matter.Bounds;
// Create engine
const engine = Engine.create()
// Create renderer
const render = Render.create({
    element: document.body,
    engine,
    options: {
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        pixelRatio: 1,
        background: '#18181d',
        wireframeBackground: '#0f0f13',
        enabled: true,
        wireframes: false,
        hasBounds: true//cambio
    }
})

// Create Bodies
// Esto no debería de crearse aquí, ya que se debería de tener un módulo para las paredes
// P.D.: Le puse un alto de 200 px porque al parecer, si el muro es delgado y la gallina cae con mucha velocidad, lo atravieza xd
const ground = Bodies.rectangle(Math.round(GAME_WIDTH / 2), GAME_HEIGHT, GAME_WIDTH, 200, {isStatic: true})

// World configs
engine.world.gravity.scale = WORLD_GRAVITY

// Add bodies to world
World.add(engine.world, [ground])
// Execute engine and start rendering
Engine.run(engine)
Render.run(render)


// ------------------------------------------------------

// Print player
player.write(engine.world)

// Register control events
/*
Controls.registerEvent('MOVE_LEFT', e => player.moveX(player.moveVelocityIncrement, 'left', 'increment'))
Controls.registerEvent('MOVE_RIGHT', e => player.moveX(player.moveVelocityIncrement, 'right', 'increment'))
Controls.registerEvent('JUMP', e => player.jump())

// Bind keyboard keys for testing
Controls.bindKey(32, 'JUMP')
Controls.bindKey(37, 'MOVE_LEFT')
Controls.bindKey(39, 'MOVE_RIGHT')
*/
//Eventos

//configuracion delos bounds
world_padding = 300;
engine.world.bounds.min.x = 0 - world_padding;
engine.world.bounds.min.y = 0 - world_padding;
engine.world.bounds.max.x = 3000 + world_padding;
engine.world.bounds.max.y = 3000;

bounds_scale_target = 1;
tbounds_scale = { x: 1, y: 1 };
var canvas =document.getElementsByTagName('canvas')[0];

var ctx = canvas.getContext("2d");//tomar el canvas

//---------------
var walls = [];
var keys = [];
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
  });


 
 
window.onresize = function() {
    this.render.canvas.width = GAME_WIDTH;
    this.render.canvas.height = GAME_HEIGHT;

}.bind(this);

(function cycle() { //render loop
  // console.log(player.body.position);
  ctx.translate(GAME_WIDTH/2, GAME_HEIGHT/2);
  ctx.scale(1 , 1);
  ctx.translate(-GAME_WIDTH/2, -GAME_HEIGHT/2);  

  // center view at player 
  Bounds.shift(render.bounds,
  {
      x: 0,
      y: player.body.position.y - GAME_HEIGHT / 2
  });
    window.requestAnimationFrame(cycle);

    if (keys[37] || keys[65]) { //left
         player.moveX(player.moveVelocityIncrement, 'left', 'increment');
       
      } else if (keys[39] || keys[68]) { //right
        player.moveX(player.moveVelocityIncrement, 'right', 'increment');
        
      }
      if(keys[32] || keys[38]){

        player.jump()
      }
      //player.moveX(0,'','fixed');
 })();






 function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createWall() {


    var h =60;
    var y = -GAME_HEIGHT - h  / 2;

    var cut = getRandomIntInclusive(60, GAME_WIDTH+60 - 120);
    var hole = getRandomIntInclusive(120, 160);

    var w1 = GAME_WIDTH+60 - 60 - cut - hole;
    var w2 = cut - hole;

    var x1 = w1 / 2;
    var x2 = GAME_WIDTH+60- w2 / 2 - 60; 
    console.log()
    

    var wall = {
        top: Bodies.rectangle(x1,y, w1,h, { isStatic: true }),
        bottom: Bodies.rectangle(x2,y,w2,h, { isStatic: true }),
    };
    console.log(wall);
    // add body to walls array so the wall's position will be updated on each loop
    walls.push(wall);

    World.add(engine.world, [wall.top, wall.bottom]);
}
function removeWall(wall) {
    World.remove(engine.world, [wall.top, wall.bottom]);
    walls.shift();
}
function moveWalls() {
    //if (collision || !start) return;

    walls.map(function(wall, i) {
        // remove the wall when it's out of view
        if (wall.top.position.y> 700) {
            removeWall(wall);
           // increaseScore(1);
            createWall();
        }

        // point to translate the wall 
        var t = { x: 0, y: 2 };
        Body.translate(wall.top, t);
        Body.translate(wall.bottom, t);
    });
}
function growWalls() {
    //if (collision || !start) return;

    walls.map(function(wall, i) {
       

        // point to translate the wall 
        var t = { x: 0, y: 2 };
        Body.translate(wall.top, t);
        Body.translate(wall.bottom, t);
    });
}
createWall();
Events.on(engine, 'tick', moveWalls);
//Events.on(engine, 'tick', growWalls);
    // Collision Event ends the game :-(
   // Events.on(engine, 'collisionStart', endGame);