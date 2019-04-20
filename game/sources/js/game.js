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
        wireframes: false
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
Events.on(engine, 'beforeUpdate', function(event) {
    
});
var keys = [];
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
  });


(function cycle() { //render loop
    console.log('volociti',player.body);
   
    
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