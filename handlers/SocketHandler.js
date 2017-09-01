const EDL = require('easy-dependency-loader')
const Scheduler = EDL.load('Scheduler')

const onReady = server => {
    console.log('MQTT Broker Ready')
    return Scheduler.executeScheduledTasks(server,1)
}
const onClientConnected = client => console.log(`Client ${client.id} is connected`)

const onPublished = packet => {
    return console.log(`Client puslished ${packet.payload}`)
}

module.exports = {
    getHandlers: () => {
        return {
            onReady: onReady,
            onClientConnected: onClientConnected,
            onPublished: onPublished,
        }
    }
}