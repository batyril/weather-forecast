import { UI_ELEMENTS_FORECAST_DAY1} from "../js/view.js";
import { UI_ELEMENTS_FORECAST_DAY2} from "../js/view.js";
import { UI_ELEMENTS_FORECAST_DAY3} from "../js/view.js";

export function addForecast(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const apiKey = '5874581abdb6ef7d58e780dc34547754';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey }`;
    fetch(url)
        .then(response => response.json())
        .then(function (cityName) {
            UI_ELEMENTS_FORECAST_DAY1.CITY_NAME.textContent = cityName.city.name
            return cityName
        })
        .then(function (data) {
            UI_ELEMENTS_FORECAST_DAY1.DATA.textContent = data.list[1].dt_txt.slice(5,10)
            UI_ELEMENTS_FORECAST_DAY2.DATA.textContent = data.list[9].dt_txt.slice(5,10)
            UI_ELEMENTS_FORECAST_DAY3.DATA.textContent = data.list[17].dt_txt.slice(5,10)
            return data
        })
        .then(function (time) {
            UI_ELEMENTS_FORECAST_DAY1.TIME.textContent = time.list[1].dt_txt.slice(11,16)
            UI_ELEMENTS_FORECAST_DAY2.TIME.textContent = time.list[9].dt_txt.slice(11,16)
            UI_ELEMENTS_FORECAST_DAY3.TIME.textContent = time.list[17].dt_txt.slice(11,16)
            return time
        })
        .then(function (temperature) {
            UI_ELEMENTS_FORECAST_DAY1.TEMPERATURE.textContent ='Temperature: ' + Math.round(+temperature.list[1].main.temp - 273)
            UI_ELEMENTS_FORECAST_DAY2.TEMPERATURE.textContent ='Temperature: ' + Math.round(+temperature.list[9].main.temp - 273)
            UI_ELEMENTS_FORECAST_DAY3.TEMPERATURE.textContent ='Temperature: ' + Math.round(+temperature.list[17].main.temp - 273)

            return temperature
        })
        .then(function (weather) {
            UI_ELEMENTS_FORECAST_DAY1.WEATHER.textContent = weather.list[1].weather[0].main
            UI_ELEMENTS_FORECAST_DAY2.WEATHER.textContent = weather.list[9].weather[0].main
            UI_ELEMENTS_FORECAST_DAY3.WEATHER.textContent = weather.list[17].weather[0].main
            return weather
        })
        .then(function (feels_like) {
            UI_ELEMENTS_FORECAST_DAY1.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(+feels_like.list[1].main.feels_like - 273)
            UI_ELEMENTS_FORECAST_DAY2.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(+feels_like.list[9].main.feels_like - 273)
            UI_ELEMENTS_FORECAST_DAY3.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(+feels_like.list[17].main.feels_like - 273)
            return feels_like
        })
        .then(function (img) {
            let icon = img.list[1].weather[0].icon
            const serverUrlImg = 'http://openweathermap.org/img/wn';
            let urlImg = `${serverUrlImg}/${icon}@4x.png`;
            UI_ELEMENTS_FORECAST_DAY1.IMG.removeAttribute('src');
            UI_ELEMENTS_FORECAST_DAY1.IMG.setAttribute('src', urlImg)

            icon = img.list[9].weather[0].icon
            urlImg = `${serverUrlImg}/${icon}@4x.png`;
            UI_ELEMENTS_FORECAST_DAY2.IMG.removeAttribute('src');
            UI_ELEMENTS_FORECAST_DAY2.IMG.setAttribute('src', urlImg)

            icon = img.list[17].weather[0].icon
            urlImg = `${serverUrlImg}/${icon}@4x.png`;
            UI_ELEMENTS_FORECAST_DAY3.IMG.removeAttribute('src');
            UI_ELEMENTS_FORECAST_DAY3.IMG.setAttribute('src', urlImg)

            return img
        })
}