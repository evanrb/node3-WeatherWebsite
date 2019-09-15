const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/395cbf1f8b2c617a3e7d94db2735f1a3/${latitude},${longitude}?lang=he`
    request({ url: url, json: true}, (error, {body}) => {
    //1 handle OS errors
    //2 handle data errors
    //3 handle no error case
        if(error) callback("Cannot connect to weather services", undefined)
        else if(body.error) callback("Unable to find location", undefined)
        else callback(undefined, {
            summary: body.daily.data[0].summary,
            rainProb: body.currently.precipProbability,
            temp: body.currently.temperature
        })
    })
}

module.exports = forecast
