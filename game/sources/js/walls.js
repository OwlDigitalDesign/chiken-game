// Al ser otro módulo, también tengo que requerir el Matter
// Modules
const Matter = require('matter-js')
const Wall = require('./wall');
// Aliases
const Bodies = Matter.Bodies
const Body = Matter.Body
const World = Matter.World

/**
 * @class walls
 * @description This class allows [...]
 */
class Walls {
    constructor(params = {}){
        // Environment 
        this.elements = params.elements||[]
        this.lastPosition = params.lastPosition || 0
        this.engineworld  = params.engineworld
        this.gameArea= params.gameArea
        
    }
    createWall(){
        var wall = Wall({
            gameArea:{
                height:this.lastPosition,
                width:this.gameArea.width
            }
        })
        wall.write(this.engineworld,60);
        this.elements.push(wall);
        this.lastPosition-= 60+300;
    }
    destroyWall(){
        var wall = this.elements.shift();
        wall.destroy(this.engineworld);
       
    }
    
    

     
}

// Export a function that returns a new instance of the main class
module.exports = params => new Walls(params)