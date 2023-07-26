let searchInp = document.querySelector('.weather_search');
let city = document.querySelector('.weather_city');
let day = document.querySelector('.weather_day');
let humidity = document.querySelector('.weather_indicator--humidity>.value');
let wind = document.querySelector('.weather_indicator--wind>.value');
let pressure = document.querySelector('.weather_indicator--pressure>.value');
let image = document.querySelector('.weather_image');
let temperature = document.querySelector('.weather_temperature>.value');
let forecastBlock = document.querySelector('.weather_forecast');
const API_KEY = 'dcd60eb8cec748c18ba65041232207';

let getWeatherByCityName = async (city) =>{
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
    let response = await fetch(url);
    let weatherData = await response.json();
    return weatherData;
};
let updateCurrentWeather = (data) => {
    city.textContent = data.location.name + ', ' + data.location.country;
    day.textContent = dayOfWeek();
   humidity.textContent = data.current.humidity + '%';
   pressure.textContent = data.current.pressure_mb + 'mph';
    wind.textContent = data.current.wind_dir + ', ' + data.current.wind_mph;
    temperature.textContent = data.current.temp_c ;
    image.src = data.current.condition.icon;
    image.alt = data.current.condition.text;
};
let updateForecast = (data) => {
    forecastBlock.innerHTML = '';
    for (let i = 1; i <= 6; i++) {
        let forecastDate = new Date(data.forecast.forecastday[i].date);
        let forecastDay = forecastDate.toLocaleDateString('en-EN', { weekday: 'long' });
        let  forecastTemp = data.forecast.forecastday[i].day.avgtemp_c;
        let forecastCondition = data.forecast.forecastday[i].day.condition.icon;

        let forecastItem = document.createElement('article');
        forecastItem.classList.add('weather_forecast_item');
        forecastItem.innerHTML = `
        <img src="${forecastCondition}" alt="${forecastDay}" class="weather_forecast_icon">
        <h3 class="weather_forecast_day">${forecastDay}</h3>
        <p class="weather_forecast_temperature"><span class="value">${forecastTemp}</span>&deg; C</p>
        `;

        forecastBlock.appendChild(forecastItem);
    }
 }; 
let dayOfWeek = () =>{
     return new Date().toLocaleDateString('en-EN',{'weekday':'long'});
};
searchInp.addEventListener('keydown' , async (e) => {
    if(e.keyCode === 13){
       let weatherData =  await  getWeatherByCityName(searchInp.value);
       updateCurrentWeather(weatherData);
       updateForecast(weatherData);
    }
});
