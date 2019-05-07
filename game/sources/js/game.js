// Configs
const WORLD_GRAVITY = 0.005
const JUMP_VELOCITY = -20   
const MOVE_VELOCITY_INCREMENT = 1

const ASPECT_RATIO = 16/9
const GAME_WIDTH = 1000
const GAME_HEIGHT = 1000000// GAME_WIDTH / ASPECT_RATIO

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
       
        
        pixelRatio: 1,
        background: '#18181d',
        wireframeBackground: '#0f0f13',
        enabled: true,
        wireframes: false,
        hasBounds: true,//cambio
        width: 1000,
        height: 9000
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
//controlador de  muros
var Walls = require('./walls')({
    lastPosition:GAME_HEIGHT-500,
    engineworld:engine.world,
    gameArea:{
        width: GAME_WIDTH,
        height:GAME_HEIGHT
    }
});
console.log(Walls);
// ------------------------------------------------------

// Print player
player.write(engine.world)


var PosisionYCamareT = (player.body.position.y-450);
var PossionYCamareB =  ( player.body.position.y-75 ) ;
console.log('Pyt',PosisionYCamareT);
console.log('Pyb',PossionYCamareB);
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
engine.world.bounds.min.y = 0;
engine.world.bounds.max.x = GAME_WIDTH + world_padding;
engine.world.bounds.max.y = GAME_HEIGHT;

bounds_scale_target = 1;
tbounds_scale = { x: 1, y: 1 };
var canvas =document.getElementsByTagName('canvas')[0];

var ctx = canvas.getContext("2d");//tomar el canvas

//---------------

var keys = [];
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
  });


Walls.createWall();
Walls.createWall();
Walls.createWall();
Walls.createWall();
Walls.createWall();

console.log(Walls);
;

console.log(Walls);

 

 
//Escuchando  colisisones de entradas

Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    
    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
        console.log(pair);
        if (pair.bodyA.label === "death") {
            console.log('Muerto');
            player.live= false;
            Body.setVelocity(player.body, {
                x: 0,
                y: 0
            });
        } else if (pair.bodyB.label === 'death') {
            console.log('Muerto');
            player.live= false;
            Body.setVelocity(player.body, {
                x: 0,
                y: 0
            });
        }   
           
    }
});
Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;
    
    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
        console.log(pair);
        if (pair.bodyA.label === "point") {           
            console.log('Un punto');
            
            World.remove(engine.world, pair.bodyA.parent);
        } else if (pair.bodyB.label === 'point') {
            console.log('Un Punto');
            World.remove(engine.world, pair.bodyB.parent);
            
        }  
           
    }
});
console.log(GAME_HEIGHT);

Events.on(engine, 'tick', function() {
    if(player.live){
        
        //console.log(PossionRelativa);
        //Fijar la camara
        var PossionRelativa =player.body.position.y-300; 
        
        
        if(player.body.velocity.y < -1 && PossionRelativa< PosisionYCamareT){
           PosisionYCamareT =  PossionRelativa+10;
           PossionYCamareB =  PossionRelativa+350;

        }
        if(PossionRelativa > PossionYCamareB ){
            player.live= false;
            console.log('Muerto');
        
        }
       
        Bounds.shift(render.bounds,
        {
            x: 0,
            y: PosisionYCamareT
        });
      /*  
        console.log('PYt',PosisionYCamareT);
        console.log('PYb',PossionYCamareB);
        console.log('PYr',PossionRelativa);
        */
  
      if (keys[37] || keys[65]) { //left
           player.moveX(player.moveVelocityIncrement, 'left', 'increment');
         
        } else if (keys[39] || keys[68]) { //right
          player.moveX(player.moveVelocityIncrement, 'right', 'increment');
          ;
        }
        if(keys[32] || keys[38]){
            
          player.jump();
        }
        //vreser y decreser 
        
    }
});

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






//Events.on(engine, 'tick', growWalls);
    // Collision Event ends the game :-(
   // Events.on(engine, 'collisionStart', endGame);