const mosca = require('mosca')

const buildMqttConfigs = configs => {
    return {
        port: configs.mqtt.port,
        backend: {
            type: configs.mqtt.type,
            url: configs.mqtt.string,
            pubsubCollection: configs.mqtt.pubsubCollection,
            mongo: {}
        },
        persistence: {
            factory: mosca.persistence.Mongo,
            url: configs.mqtt.string
        }
    }
}

module.exports = {
    start: (configs, handlers) => {
        const mqttConfigs = buildMqttConfigs(configs)
        const server = new mosca.Server(mqttConfigs)
        server.on('ready', ()=> handlers['onReady'](server))
        server.on('clientConnected', handlers['onClientConnected'])
        server.on('published', handlers['onPublished'])
    }
}