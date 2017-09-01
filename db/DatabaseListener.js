const Mongoose = require('mongoose')

module.exports = {
    start: configs => Mongoose.connect(configs.db.string, {useMongoClient: true})
}