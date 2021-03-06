const locationText = document.querySelector("#locationText");
const API_KEY = "7fce5dfeb5a99ccd9e3b5a53e4e05088";
const locationLogo = document.querySelector("#locationLogo"),
  locationBox = document.querySelector("#locationBox");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position) {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  getCityName(latitude, longitude);
}

function getCityName(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then(function (r) {
      return r.json();
    })
    .then(function (json) {
      ls.setItem("country", json.sys.country);
      ls.setItem("city", json.name);
      loadCity();
    });
}

function loadCity() {
  const currentCity = ls.getItem("city");

  if (currentCity) {
    const currentCountry = ls.getItem("country");
    const locationLength = currentCity.length + currentCountry.length - 3;
    locationBox.style.width = `${100 + 15 * locationLength}px`;
    locationBox.style.left = `${(1920 - (100 + 15 * locationLength)) / 2}px`;
    locationText.innerText = `${currentCountry} | ${currentCity}`;
    locationText.style.width = `${80 + locationLength * 15}px`;
    locationText.style.left = `${
      (1920 - (80 + locationLength * 15)) / 2 + 10
    }px`;
    locationLogo.src = "src/resources/location2.png";
    locationLogo.style.left = `${
      (1920 - (80 + locationLength * 15)) / 2 + 4
    }px`;
  } else {
    getLocation();
  }
}

function init() {
  loadCity();
}
init();
