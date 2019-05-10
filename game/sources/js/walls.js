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
        this.lastCut =params.lastCut || 250
        this.cmin =100
        this.cmax = 250 
        
    }
    createWall(){
        var wall = Wall({
            gameArea:{
                height:this.lastPosition,
                width:this.gameArea.width
            }
        })
        var cond = true;
        do{

            var cut = this.getRandomIntInclusive(0, this.gameArea.width - 100);
            var diference = Math.abs(cut-this.lastCut)
           
            if((diference>this.cmin && diference<this.cmax ) ){
                console.log("diferencia entre  cortes",diference);
                cond= false;
            }   
        }while(cond); 
        this.lastCut = cut;
        wall.write(this.engineworld,60,cut);
        this.elements.push(wall); 
        this.lastPosition-= 60+300;
    }
    destroyWall(){
        var wall = this.elements.shift();
        wall.destroy(this.engineworld);
       
    }
    getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }   
     
    

     
}

// Export a function that returns a new instance of the main class
module.exports = params => new Walls(params)