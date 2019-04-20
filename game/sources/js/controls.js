/**
 * This module helps with the key bindings, gestures and so, and registers all in one place
 * 
 * @todo bind remote event
 * @todo bind Gestures
 */
class Controls {
    constructor(params = {}){
        this.events = params.events || {}

        this.gameContainer = params.gameContainer || document.querySelector("body")
    }
    // Agregar eventos de control y si viene con función, agregarla al array del evento
    registerEvent(event, fn) {
        let eventArray = this.events[event] || []
        if(typeof fn == "function") eventArray.push(fn)
        this.events[event] = eventArray
        console.log(event, eventArray)
        return eventArray
    }
    // Alias de registerEvent
    on(event, fn){
        if(typeof this.events[event] != "undefined") this.registerEvent(event, fn)
    }
    // Registrar una tecla (por su KeyCode) a un evento
    bindKey(keyCode, event, listener = 'keypress'){
        this.gameContainer.addEventListener(listener, e => {
            // console.log(e.keyCode, "Key pressed!")
            if(e.keyCode == keyCode){
                if(typeof this.events[event] != "undefined") this._executeEvent(this.events[event], e)
            }
        })
    }
    // Quitar una tecla de un evento
    unBindKey(){}
    // Executar el array de funciones de un evento
    _executeEvent(event = [], param){
        event.map(fn => {
            fn(param)
        })
    }
}

module.exports = params => new Controls(params)