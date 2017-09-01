const EDL = require('easy-dependency-loader')
const SchedulesSchema = EDL.load('SchedulesSchema')
const _ = require('lodash')

const hasNoSchedules = scheduled => Object.keys(scheduled).length === 0

module.exports = {
    checkScheduledOperations: (now,server) => {
        console.log(`Checking scheduled operations to: ${now.complete} ...`)
        return SchedulesSchema
            .findAll(now)
            .then(schedules => _.groupBy(schedules,"clientId"))
            .then(scheduled => hasNoSchedules(scheduled)? false: scheduled)
            .then(schedules => {
                if (!schedules) return console.log('It has no schedules.')
                console.log(`It has ${schedules.length} schedules...`)
                return _.mapValues(schedules, (s, key) => {
                    const message = {
                        topic: `/schedules/${key}`,
                        payload: JSON.stringify(s), // or a Buffer
                        qos: 0, // 0, 1, or 2
                        retain: false // or true
                    }
                    return server.publish(message, () => console.log(`Schedules sent to ${key}!`))
                })
            })
    }
}