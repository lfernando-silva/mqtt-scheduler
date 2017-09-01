const EDL = require('easy-dependency-loader')
EDL.setDependencies(require('./configs/dependencies.json'))

const DatabaseListener = EDL.load('DatabaseListener')
const ServerHandler = EDL.load('MqttServer')
const SocketHandler = EDL.load('SocketHandler')
/*const Messenger = EDL.load('Messenger')
const CommandLineUtil = EDL.load('CommandLineUtil')*/

const Promise = require('bluebird')

const beforeStart = configs => {
    console.log("[ **** IOT SCHEDULER --- MQTT API **** ]")
    return Promise
        .resolve(configs)
        .then(DatabaseListener.start)
        .then(() => configs)
}

const start = (configs, socketEventHandlers) => {
    return Promise
        .resolve(configs)
        .then(beforeStart)
        .then(configs => ServerHandler.start(configs, socketEventHandlers))
        //.then(() => CommandLineUtil.listen())
}

start(EDL.load(process.env.NODE_ENV || 'development'), SocketHandler.getHandlers())

/*




const config = {
    port: 1883,
    backend: {
        type: 'mongo',
        url: 'mongodb://localhost:27017/mqtt',
        pubsubCollection: 'scheduler',
        mongo: {}
    },
    persistence: {
        factory: mosca.persistence.Mongo,
        url: 'mongodb://localhost:27017/schedules-db'
    }
}

const server = new mosca.Server(config)
server.on('ready', setup)

server.on('clientConnected', function(client) {


    const msg = {
        type: 1,
        content: 55
    }

    const message = {
        topic: '/309',
        payload: JSON.stringify(msg), // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
    };
    server.publish(message, function() {
        console.log('done!');
    });
})

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published', packet.payload)
})

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}*/
