import {addDetail} from "./details.js";
import {UI_ELEMENTS} from "./view.js";
import {addForecast} from "./forecast.js";

export const URL = {
    SERVER_URL: 'http://api.openweathermap.org/data/2.5/weather',
    APIKEY: '5874581abdb6ef7d58e780dc34547754',
}

export function GetCity(cityName) {
    const url = `${URL.SERVER_URL}?q=${cityName}&appid=${URL.APIKEY}`;
    fetch(url)
        .then(response => response.json())
        .then(function (cityName) {
            UI_ELEMENTS.NOW_CITY.textContent = cityName.name;
            return cityName
        })
        .then(function (temperature) {
            let temperatureConvert = +temperature.main.temp - 273;
            UI_ELEMENTS.NOW_TEMPERATURE.textContent = Math.round(temperatureConvert) + '°';
            return temperature
        })
        .then(function (img) {
            const icon = img.weather[0].icon
            const serverUrlImg = 'http://openweathermap.org/img/wn';
            const urlImg = `${serverUrlImg}/${icon}@4x.png`;
            UI_ELEMENTS.NOW_IMG.removeAttribute('src');
            UI_ELEMENTS.NOW_IMG.setAttribute('src', urlImg)
            localStorage.setItem('lastCity', cityName);
        })
        .catch( () => alert('Такого города нет, повторите попытку'));
    addDetail(cityName);
    addForecast(cityName);
}