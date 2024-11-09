

const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
window.apiKey = 'c89728af5997f8528f18d06185c13cfb';

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError('Please enter a city');
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    
    const{name: city, 
          main: {temp, humidity}, 
          weather:[{description, id}]} = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement('h1');
        const tempDisplay= document.createElement('p');
        const humidityDisplay = document.createElement('p');
        const descDisplay = document.createElement('p');
        const weatherEmoji = document.createElement('p');

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${((temp - 273.15)* 9/5 +32).toFixed(1)}°F`;
        humidityDisplay.textContent = `Humidity: ${humidity}`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);      

        cityDisplay.classList.add('city-display');
        tempDisplay.classList.add("temp-display");
        humidityDisplay.classList.add("humidity-display");
        descDisplay.classList.add("desc-display");
        weatherEmoji.classList.add("weather-emoji");

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch (true){
        case(200 <= weatherId && weatherId < 300):
            return "⚡";
        case(300 <= weatherId && weatherId < 400):
            return "🌧️";
        case(500 <= weatherId && weatherId < 600):
            return "🌧️";
        case(600 <= weatherId && weatherId < 700):
            return "☃️";
        case(700 <= weatherId && weatherId < 800):
            return "😶‍🌫️";
        case(weatherId === 800):
            return "🌞";
        case(801 <= weatherId && weatherId < 810):
            return "☁️";
        default:
            return "👽";
    }
}

function displayError(message){

    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}