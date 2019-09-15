const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, 'public/'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configuriation
const viewsPath = path.join(__dirname, 'templates/views')
const publicDirectoryPath = path.join(__dirname, 'public')
const partialsPath = path.join(__dirname, 'templates/partials')

//if you want to put hbs files in a folder not named viiews use this code
app.set('views', viewsPath)
//set up handlebars engine
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Evan Blank'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: "Please call 911 for Assistance.",
        name: 'John Squan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Evan Blank'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "no address provided"
        })
    }
    if(!req.query.language){
        re1.query.language = ""
    }
    geocode(req.query.address, req.query.language, (error, {lat, lon, name} = {}) => {
        //return stops the function if there is an error
        if(error) {
            return res.send({
                error: `Geo Error: ${error}`
            })
        }
        forecast(lat, lon, req.query.language, (error, {summary: sum, temp, rainProb: rP}) => {
            if(error) {
                return res.send({
                    error: `Forecast Error: ${error}`
                })
            }
            return res.send({
                lattitude: lat,
                longitude: lon,
                name: name,
                summary: sum,
                tempreature: temp,
                chanceOfRain: rP
            })
        })
    
    })
})

//cannot send 2 responses so return makes it that it does not read the rest
app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: "you must search for a term"
        })
    }
    res.send({
        products: []
    })
})

//catch all for help 4040
app.get('/help/*', (req, res) => {
    res.render('errors', {
        error: "Help article not found",
        name: 'Evan Blank', 
        title: "An Error Has Occured"
    })
})

//must come last
//* means match anything that hasnt already been matched
app.get('*', (req, res) => {
    res.render('errors', {
        error: "Page not found",
        name: 'Evan Blank', 
        title: "An Error Has Occured"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})