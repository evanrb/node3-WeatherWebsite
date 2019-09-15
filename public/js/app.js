console.log("client side script loaded in")

const message_1 = document.querySelector('#message1')
const message_2 = document.querySelector('#message2')
const summary = document.querySelector('#defaultSummary')

const fetchWeather = (searchLocation, lang) => {
    fetch(`/weather?address=${searchLocation}&language=${lang}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                message_1.textContent = "Invalid Input"
                message_2.textContent = ""
                summary.textContent = ""
                return
            }
            console.log(data)
            message_1.textContent = data.name
            message_2.textContent = `The temperature is ${data.tempreature} degrees and there ${data.chanceOfRain}%  chance of rain.`
            summary.textContent = data.summary
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const langSelector = document.querySelector('select')


weatherForm.addEventListener('submit', (e) => {
    //dont refresh the browser and simply run the code in the function
    e.preventDefault()

    const location = search.value
    let language = langSelector.options[langSelector.selectedIndex].value;
    fetchWeather(location, language)
    console.log('testing!')
})