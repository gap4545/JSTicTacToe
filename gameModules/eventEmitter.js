// Borrowed from https://betterprogramming.pub/how-to-create-your-own-event-emitter-in-javascript-fbd5db2447c4

class MyEventEmitter {
    constructor() {
      this._events = {};
    }
  
    on(name, listener) {
      if (!this._events[name]) {
        this._events[name] = [];
      }
  
      this._events[name].push(listener);
    }
  
    removeListener(name, listenerToRemove) {
      if (!this._events[name]) {
        throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
      }
  
      const filterListeners = (listener) => listener !== listenerToRemove;
  
      this._events[name] = this._events[name].filter(filterListeners);
    }
  
    emit(name, data = null) {
      if (!this._events[name]) {
        throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
      }
  
      const fireCallbacks = (callback) => {
        callback(data);
      };
  
      this._events[name].forEach(fireCallbacks);
    }
  }

const eventEmitter = new MyEventEmitter();
export default eventEmitter;