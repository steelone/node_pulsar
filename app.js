const fs = require('fs');
const {fork} = require("child_process");
const EventEmitter = require('events');

const worker = fork('./pulsar.js');
const workerEmitter = new EventEmitter();
worker.on('message', msg => {
    workerEmitter.emit(msg.key, msg);
});

// Subscribing to pulsar's new comment topic
function subscribePulsar(topic, onMessage, onError = console.error) {
    const key = topic + topic + '-sub';
    workerEmitter.on(key, msg => {
        console.log('RAW: ',msg);
        if (msg.error) {
            onError(msg.error);
            workerEmitter.removeAllListeners(key);
        } else {
            onMessage(msg.message);
        }
    });
    worker.send({
        topic: topic,
        subscription: topic + '-sub'
    });
}

function handler(msg){
    console.info('MSG: ', msg);
}

subscribePulsar("test1", handler, console.error);
subscribePulsar("test2", handler, console.error);
subscribePulsar("test3", handler, console.error);
subscribePulsar("test4", handler, console.error);

let counter = 0
setInterval(() => {

    /* CHECKING readFile or readdir */
    fs.readdir('./', (err, data)=>{
        console.log(data);
    });

    console.log(`-------------------------${counter++}----------------------------`);
}, 1000);
