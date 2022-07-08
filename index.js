// Api  key
const apiKey = "ee1d735bbf335bfa8c52501dc5986d50";

// On click event
document.querySelector("button").addEventListener("click", fetchWeatherData);

// Function to fetch the data of weather
function fetchWeatherData() {
  const input = document.querySelector("input");
  const cityName = input.value;
  const kelvin = 273.15;
  const cardContainer = document.querySelector(".card-container");

  // Ajax HTTP Request
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    true
  );

  xhr.onload = function () {
    if (this.status == 200) {
      let response = JSON.parse(this.responseText);
      let string = "";
      string += `
      <div class="card my-3" style="width: 18rem; background: transparent; color: white; border: 2px solid white; padding:1rem;">
        <div class="card-body>
          <h2 class="card-title" style="font-size: 2.25rem;">${response.name}</h2>
          <div class="card-text">
          <div style="display: flex; align-items: center; gap: .25rem;">
              <li>Weather - <li style="text-transform:lowercase;"> ${response.weather[0].main}</li></li>
          </div>
              <li>Description - ${response.weather[0].description}</li>
              <li>Temperature - ${(response.main.temp - kelvin).toFixed(2)} C</li>
              <li>Humidity - ${response.main.humidity} %</li>
              <li>Country - ${response.sys.country}</li>
              <li>Timzone - ${response.timezone}</li>
          </div>
        </div>
      </div>
      `;
      cardContainer.innerHTML = string;
    } else {
        document.getElementById("message_alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("message_alert").style.display = "none";
      }, 3000);
    }
  };

  // Input validation
  if (input.value === "") {
    document.getElementById("message_alert").style.display = "block";
    setTimeout(() => {
      document.getElementById("message_alert").style.display = "none";
    }, 3000);
  }

  // Send the request
  xhr.send();
  // Reset the value of the input
  input.value = "";
}

// Call the function when enter key is pressed
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) fetchWeatherData();
});
