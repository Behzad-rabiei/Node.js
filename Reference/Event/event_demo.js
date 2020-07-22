const EventEmitter = require('events');

//  CREATE CLASS
class MyEmitter extends EventEmitter { };

//  INIT OBJECT
const emitter1 = new MyEmitter();

//  EVENT LISTENER
emitter1.on('event', eventHandler);

//  INIT EVENT
emitter1.emit('event');

function eventHandler() {
  console.log('evnet fired');
}
