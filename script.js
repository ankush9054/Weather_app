//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const weatherApi = {
  key: "181bb850e0770fa00c80858eb08dcd52",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");

//Event listener function on keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
  }
});

//Get weather report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

//Show weather report

function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minmaxTemp = document.getElementById("min-max");
  minmaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url(images/clear_sky.jpg)";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url(images/Haze.jpg)";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url(images/cloudy.jpg)";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url(images/snow.jpg)";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url(images/rain.jpg)";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url(images/Thunder.jpg)";
  }
}
//Date manage

function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
