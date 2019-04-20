// Al ser otro módulo, también tengo que requerir el Matter
// Modules
const Matter = require('matter-js')

// Aliases
const Bodies = Matter.Bodies
const Body = Matter.Body
const World = Matter.World

/**
 * @class Player
 * @description This class allows [...]
 */
class Player {
    constructor(params = {}){
        // Environment 
        this.gameArea = params.gameArea
        this.jumpVelocity = params.jumpVelocity || -10
        this.moveVelocityIncrement = params.moveVelocityIncrement || 5
        // Element
        this.body = params.body || false
    }
    write(world, pos = {x: this.gameArea.width / 2, y: 200}, size = {w: 100, h: 100}){
        // Create body
        this.body = Bodies.rectangle(pos.x, pos.y, size.w, size.h)
        // Add to @param world
        World.add(world, this.body)
    }
    destroy(){
        // Delete from world
    }
    jump(){
        if(!this.body) throw "You must write the body before jumping"
        // Apply velocity on the body on Y
        Body.setVelocity(this.body, {
            x: this.body.velocity.x,
            y: this.jumpVelocity
        })
        // Returns final value
        return this.jumpVelocity
    }
    /**
     * 
     * @param {Integer} value       Value between -1 to 1 when "fixed" type and value from 0 to infinite when "increment" type 
     * @param {String} direction    [ left || right ] (Increment only) defines the direction of the velocity (value) applied in X
     * @param {String} type         [ fixed || increment ] Movement type. Fixed use the value as percent of the game area to place the body and increment adds the value to the current body velocity in X
     */
    moveX(value = 0, direction = "right", type = "fixed"){
        if(!this.body) throw "You must write the body before moving"
        switch(type){
            case 'fixed':
                // Change the position of the Body in X where -1 is the most left and 1 the most right
                // [Todo: spell check]
                break
            case 'increment':
                // Negative velocity on left direction
                if(direction == "left") value = -value
                value = this.body.velocity.x + value
                // Apply velocity on the body on X
                Body.setVelocity(this.body, {
                    x: value,
                    y: this.body.velocity.y
                })
                break
            default:
                // error
                throw `${type} is not a valid movement type!`
        }
        // Returns final value
        return value
    }
}

// Export a function that returns a new instance of the main class
module.exports = params => new Player(params)