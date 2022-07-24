// Api  key
const apiKey = "ee1d735bbf335bfa8c52501dc5986d50";

// On click event
document.querySelector("button").addEventListener("click", fetchWeatherData);

// Function to fetch the data of weather
function fetchWeatherData() {
  const input = document.querySelector("input");
  const cityName = input.value;

  const mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(mainUrl)
    .then((res) => res.json())
    .then((data) => show_Weather_DOM(data));

  // Input validation
  if (input.value === "") {
    document.getElementById("message_alert").style.display = "block";
    setTimeout(() => {
      document.getElementById("message_alert").style.display = "none";
    }, 3000);
  }

  // Reset the value of the input
  input.value = "";
}

// Call the function when enter key is pressed
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) fetchWeatherData();
});

function show_Weather_DOM(data) {
  const kelvin = 273.15;
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  let iconCode = data.weather[0].icon;
  let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

  let html = `
  <div class="card my-3" style="width: 18rem; background: transparent; color: white; border: 2px solid white; padding:1rem;">
        <div class="card-body>
      <h2 class="card-title" style="font-size: 2.25rem;">${data.name}</h2>
        <div class="card-text">
          <div style="display: flex; align-items: center; gap: 0rem .25rem; height: 5vh;">
              <li>Weather : <li style="text-transform:lowercase;"> ${
                data.weather[0].main
              }</li></li>
              <img src="${iconURL}"></img>
          </div>
            <li>Description : ${data.weather[0].description}</li>
            <li>Temperature : ${(data.main.temp - kelvin).toFixed(2)} C</li>
            <li>Humidity : ${data.main.humidity} %</li>
            <li>Country : ${data.sys.country}</li>
            <li>Timzone : ${data.timezone}</li>
        </div>
      </div>
</div>
  `;
  cardContainer.innerHTML = html;
}
