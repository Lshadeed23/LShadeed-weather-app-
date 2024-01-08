function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formateDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-app-icon">`;
}

function formateDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
    let apiKey = "e7acafab59o2a05b63830a8t5f4aa341";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function getForecast(city){
let apiKey = "e7acafab59o2a05b63830a8t5f4aa341";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
axios(apiUrl).then(displayForecast);
console.log(apiUrl);
}



function displayForecast(response) {
  console.log(response.data);

  let days = ["Tues", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = `<div class="row">`;

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="col-2">
        <div class="weather-forecast-day"></div>
        <div class="weather-forecast-date">${day}</div>
        <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
        />
        <div class="weather-forecast-temperatures"></div>
        <span class="weather-forecast-temperature-max"> 18° </span>
        <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
    `;
  });
let forecastElement = document.querySelector("#forecast");
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Montgomery");
getForecast("Montgomery");

