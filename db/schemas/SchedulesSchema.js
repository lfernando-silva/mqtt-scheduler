const Mongoose = require('mongoose')
const Promise = require('bluebird')

const ScheduleSchema = Mongoose.model('Schedule', new Mongoose.Schema({}))

module.exports = {
    findAll: now => {
        const whereSpecificDatetime = {"specificDatetime": now.complete}
        const wherePeriodicDayOfTheWeek = {$and: [{"day": now.week}, {"hour": now.hour}]}
        return new Promise((resolve, reject) => {
            ScheduleSchema
                .find({$or: [whereSpecificDatetime, wherePeriodicDayOfTheWeek]})
                .lean()
                .exec((err, result) => err ? reject(err) : resolve(result))
        })
    }

}