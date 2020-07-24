// Week 4 Challenge 1
let today = new Date();
let date = today.getDate();
let year = today.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let month = today.getMonth() + 1;
let hours = today.getHours();
let minutes = today.getMinutes();
if (month.toString().length == 1) month = "0" + month;
if (hours.toString().length == 1) hours = "0" + hours;
if (minutes.toString().length == 1) minutes = "0" + minutes;
let dateToday = document.querySelector("h2.date-today");
dateToday.innerHTML = `It's ${day} <span style="color: rgb(69, 147, 173);"> <br /> ${date}/${month}/${year}</span>, ${hours}:${minutes}`;

// Week 4 Challenge 2 + week 5 Challenge 1
function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-search-city");
  let showSearchCity = document.querySelector("h1.showCity");
  showSearchCity.innerHTML = `What shall we do today <br /> in <span style="color: rgb(69, 147, 173);">${inputCity.value}</span> ?`;
  let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureSearch);
}

function showTemperatureSearch(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let windspeed = Math.round(response.data.wind.speed);
  console.log(response.data.wind.speed);
  let precipitation = Math.round(response.data.main.humidity);
  let currentTempGeo = document.querySelector("#temperature-today");
  currentTempGeo.innerHTML = temp;
  let showSearchCity = document.querySelector("h1.showCity");
  showSearchCity.innerHTML = `What shall we do today <br /> in <span style="color: rgb(69, 147, 173);">${city}</span> ?`;
  let currentDescriptionGeo = document.querySelector("#description");
  let currentWindSpeed = document.querySelector("#wind");
  let currentPrecipitation = document.querySelector("#precipitation");
  currentDescriptionGeo.innerHTML = description;
  currentWindSpeed.innerHTML = `Windspeed: ${windspeed} km/h`;
  currentPrecipitation.innerHTML = `Precipitation: ${precipitation}%`;
}

let buttonSearchCity = document.querySelector("#search-form");
buttonSearchCity.addEventListener("submit", searchCity);

// Week 4 Challenge 3
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function convertFahrToCels() {
  buttonTempFahr.removeEventListener("click", convertFahrToCels);
  buttonTempCels.addEventListener("click", convertCelsToFahr);
  let tempToday = document.querySelector("#temperature-today");
  let tempCels = tempToday.innerText;
  if (tempToday !== undefined) {
    tempToday.innerHTML = parseInt(Math.round(tempCels * 1.8 + 32), 0);
    buttonTempFahr.style.color = "rgb(69, 147, 173)";
    buttonTempCels.style.color = "rgb(95, 95, 95)";
  }
}

function convertCelsToFahr() {
  buttonTempCels.removeEventListener("click", convertCelsToFahr);
  buttonTempFahr.addEventListener("click", convertFahrToCels);
  let tempToday = document.querySelector("#temperature-today");
  let tempFahr = tempToday.innerText;
  if (tempToday !== undefined) {
    tempToday.innerHTML = parseInt(Math.round((tempFahr - 32) / 1.8), 0);
    buttonTempFahr.style.color = "rgb(95, 95, 95)";
    buttonTempCels.style.color = "rgb(69, 147, 173)";
  }
}

let buttonTempFahr = document.querySelector(
  "#button-temperature-today-fahrenheit"
);
buttonTempFahr.addEventListener("click", convertFahrToCels);
let buttonTempCels = document.querySelector(
  "#button-temperature-today-celcius"
);
buttonTempCels.removeEventListener("click", convertCelsToFahr);
buttonTempCels.style.color = "rgb(69, 147, 173)";

// Week 5 Challenge 1 (see week 4 challenge 2)

// Week 5 Challenge 2
function showCity(event) {
  function showGeolocation(position) {
    console.log(position.coords.latitude);
    let lat = position.coords.latitude;
    console.log(position.coords.longitude);
    let lon = position.coords.longitude;
    let apiKey = "5105e9ba47cefb06b8ba8c75ae83f74e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showTemperatureGeo);
  }

  function showTemperatureGeo(response) {
    console.log(response.data);
    let temp = Math.round(response.data.main.temp);
    let city = response.data.name;
    let description = response.data.weather[0].description;
    let windspeed = Math.round(response.data.wind.speed);
    console.log(response.data.wind.speed);
    let precipitation = Math.round(response.data.main.humidity);
    let currentTempGeo = document.querySelector("#temperature-today");
    currentTempGeo.innerHTML = temp;
    let showSearchCity = document.querySelector("h1.showCity");
    showSearchCity.innerHTML = `What shall we do today <br /> in <span style="color: rgb(69, 147, 173);">${city}</span> ?`;
    let currentDescriptionGeo = document.querySelector("#description");
    let currentWindSpeed = document.querySelector("#wind");
    let currentPrecipitation = document.querySelector("#precipitation");
    currentDescriptionGeo.innerHTML = description;
    currentWindSpeed.innerHTML = `Windspeed: ${windspeed} km/h`;
    currentPrecipitation.innerHTML = `Precipitation: ${precipitation}%`;
  }
  navigator.geolocation.getCurrentPosition(showGeolocation);
}
let buttonShowCity = document.querySelector("#button-show-city");
buttonShowCity.addEventListener("click", showCity);
