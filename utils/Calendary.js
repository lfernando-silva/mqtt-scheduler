const moment = require('moment-timezone')

const weekDays = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
}

const getFormattedDate = (date,timezone) => {
    let dt = moment.tz(date || new Date(), timezone || "America/Sao_Paulo").format().toString()
    return {
        date: dt.slice(0, dt.indexOf('T')), //2013-11-18
        hour: dt.slice(11, 19), //11:55:00
        week: weekDays[new Date().getUTCDay()], //0 a 6
        complete: dt.slice(0, 19).replace("T", " ") //2013-11-18 11:55:00
    }
}

module.exports = {
    getObjectDate: getFormattedDate
}
