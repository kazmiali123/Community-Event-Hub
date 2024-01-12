const address = document.querySelector("#address");
const results = document.querySelector("#results");
const searchBtn = document.querySelector("#search-btn");

// show address on the html page
function showAddress(data) {
  results.innerHTML = " ";
  if (data.length > 0) {
    results.innerHTML +=
      "<div class='results'>" +
      data[0].display_name +
      "<br> Lat: " +
      data[0].lat +
      " Lng: " +
      data[0].lon +
      "</div>";
  } else {
    results.innerHTML = "<p style='color: red;'>Not found</p>";
  }
}

// fetch request to openstreetmap api using address search to get lng-lat coordinates
function findAddress(event) {
  event.preventDefault();
  let url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
    address.value;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showAddress(data);
      showMap(data);
    })
    .catch((err) => console.log(err));
}

// leaflet map widget controls
function showMap(data) {
  let mapDisplay = L.map("map").setView([data[0].lat, data[0].lon], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapDisplay);

  let marker = L.marker([data[0].lat, data[0].lon])
    .addTo(mapDisplay)
    .bindPopup(`<b>My Map Marker</b><br>${data[0].display_name}`);
}

function showMap() {
  let mapDisplay = L.map("map").setView([data[0].lat, data[0].lon], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapDisplay);

  let marker = L.marker([data[0].lat, data[0].lon])
    .addTo(mapDisplay)
    .bindPopup(`<b>My Map Marker</b><br>${data[0].display_name}`);
}

searchBtn.addEventListener("click", findAddress);
