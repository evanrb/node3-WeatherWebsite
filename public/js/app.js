console.log("client side script loaded in")

const message_1 = document.querySelector('#message1')
const message_2 = document.querySelector('#message2')

const fetchWeather = (searchLocation) => {
    fetch(`http://localhost:3000/weather?address=${searchLocation}`).then((res) => {
        res.json().then((data) => {
            if(data.error) return message_1.textContent = "Error Has Occured"
            console.log(data)
            message_1.textContent = data.name
            message_2.textContent = `The temperature is ${data.tempreature} degrees and there ${data.chanceOfRain}%  chance of rain.`
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit', (e) => {
    //dont refresh the browser and simply run the code in the function
    e.preventDefault()

    const location = search.value
    fetchWeather(location)
    console.log('testing!')
})