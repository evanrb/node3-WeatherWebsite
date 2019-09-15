const request = require("request")

const geocode = (address, language, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXZhbnJiIiwiYSI6ImNrMGQ2NGhkczA0dGkzbnJuejlqanZ0bW8ifQ.8lIFDkdnPEmzkO83aRQd5A&limit=1`
    request({url: url, json: true}, (error, {body}) => {
        if(error) callback("Unable to connect to loaction services", undefined)
        else if(!body.features[0]) callback("Unable to find location")
        else callback(undefined, {
            lat: body.features[0].center[1],
            lon: body.features[0].center[0],
            name: body.features[0].place_name,
            lang: language
        })
    })
}

module.exports = geocode