const EDL = require('easy-dependency-loader')
const Promise = require('bluebird')
const Later = require('later')
const _ = require('lodash')

const Schedules = EDL.load('Schedules')
const Calendary = EDL.load('Calendary')

const executeTasks = server => {
    let date = Calendary.getObjectDate((new Date()))
    let tasks = [
        Schedules.checkScheduledOperations(date, server)
    ]
    return Promise.all(tasks)
}

const getRecurrence = interval => Later.parse.recur().every(interval || 1).minute()

module.exports = {
    executeScheduledTasks: (server, interval) => Later.setInterval(() => executeTasks(server), getRecurrence(interval))
}