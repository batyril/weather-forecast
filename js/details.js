import {UI_ELEMENTS_DETAIL} from "./view.js";
import {URL} from "./now.js";

export function addDetail(cityName) {
    const url = `${URL.SERVER_URL}?q=${cityName}&appid=${URL.APIKEY}`;
    fetch(url)
        .then(response => response.json())
        .then(function (cityName) {
            UI_ELEMENTS_DETAIL.CITY_NAME.textContent = cityName.name;
            return cityName
        })
        .then(function (temperature) {
            let temperatureConvert = +temperature.main.temp - 273;
            UI_ELEMENTS_DETAIL.TEMPERATURE.textContent = 'Temperature: ' + Math.round(temperatureConvert) + '°';
            return temperature
        })
        .then(function (feelLike) {
            let temperatureConvert = +feelLike.main.feels_like - 273;
            UI_ELEMENTS_DETAIL.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(temperatureConvert) + '°';
            return feelLike
        })
        .then(function (weathers) {
            UI_ELEMENTS_DETAIL.WEATHER.textContent = 'Weather: ' +weathers.weather[0].main
            return weathers
        })
        .then(function (sunrise) {
            UI_ELEMENTS_DETAIL.SUNRISE.textContent = 'Sunrise: ' + translate_unix_Time(sunrise.sys.sunrise)
            return sunrise
        })
        .then(function (sunset) {
            UI_ELEMENTS_DETAIL.SUNSET.textContent = 'Sunset: ' + translate_unix_Time(sunset.sys.sunset)
            return sunset
        })
}

function translate_unix_Time(unix_timestamp){
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours ();
    let minutes = date.getMinutes ();
    return `${hours }:${ minutes}`
}