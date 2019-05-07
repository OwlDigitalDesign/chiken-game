// Al ser otro módulo, también tengo que requerir el Matter
// Modules
const Matter = require('matter-js')

// Aliases
const Bodies = Matter.Bodies
const Body = Matter.Body
const World = Matter.World

/**
 * @class wall
 * @description This class allows [...]
 */
class Wall {
    constructor(params = {}){
        // Environment 
        this.gameArea = params.gameArea
        this.velocityGrow = params.velocityGrow || 1        
        // Element
        this.body = {right: params.right,  left: params.left} || false
    
        this.internalCycle = 0;
        
    }
    write(world,h){

        
        var y = this.gameArea.height;

        var cut = this.getRandomIntInclusive(60, this.gameArea.width - 120);
        var hole =200;//this.getRandomIntInclusive(200, 300);

        var w1 = this.gameArea.width+150 - 60 - cut - hole;
        var w2 = cut - hole;

        var x1 = w1 / 2;
        var x2 = this.gameArea.width+60- w2 / 2 - 60; 

        var wp = this.gameArea.width+60 -w1 -w2-60;
        var xp =w1 + (wp/2);
        // Create body
         this.body = {
            lef: Bodies.rectangle(x1,y, w1,h, { 
                isStatic: true,
                isSensor:false ,
                label:'death', 
                render:{
                    fillStyle: 'red',
                    strokeStyle: 'red' 
                } 
            }),
            right: Bodies.rectangle(x2,y,w2,h, { 
                isStatic: true ,
                isSensor:false,
                label:'death', 
                render:{
                    fillStyle: 'red',
                    strokeStyle: 'red' 
                } 
                
            }),
            point: Bodies.rectangle(xp,y-h,wp,h, { 
                isStatic: true ,
                isSensor:true ,
                label:'point',
                render:{
                    fillStyle: '#fff0',
                    strokeStyle: '#fff0' ,
                    background: '#fff0'
                }  
            })
         }
         /*
         console.log("x1",x1);
         console.log("x2",x2);
         console.log("y",y);
         console.log("w1",w1);
         console.log("w2",w2);
         console.log("h",h);
         console.log("cut",cut);
         console.log("hole",hole);
         */
        // Add to @param world
        World.add(world, this.body.lef);
        World.add(world, this.body.right);
        World.add(world, this.body.point);
        
       
        
       
    }
    destroy(world){
        
        if(this.body.point != undefined){
            World.remove(world, [this.body.right,this.body.point, this.body.lef]);
        }else{
            World.remove(world, [this.body.right, this.bosy.lef]);
        }
    }
    grow(){
        if(!this.body) throw "You must write the body before growing"
       
        //Body.scale(this.body.right, 1+Math.sin(this.internalCycle),1);
        //Body.scale(this.body.top, 1+Math.sin(this.internalCycle),1);
       
        //console.log(Math.sin(this.internalCycle));
        
       
       
        
    }
   
    getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }   

     
}

// Export a function that returns a new instance of the main class
module.exports = params => new Wall(params)