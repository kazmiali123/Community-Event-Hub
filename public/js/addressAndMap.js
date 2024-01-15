// const address = document.querySelector("#address");
// const results = document.querySelector("#results");
// const searchBtn = document.querySelector("#search-btn");

// // show address on the html page
// function showAddress(data) {
//   results.innerHTML = " ";
//   if (data.length > 0) {
//     results.innerHTML +=
//       "<div class='results'>" +
//       data[0].display_name +
//       "<br> Lat: " +
//       data[0].lat +
//       " Lng: " +
//       data[0].lon +
//       "</div>";
//   } else {
//     results.innerHTML = "<p style='color: red;'>Not found</p>";
//   }
// }

// // fetch request to openstreetmap api using address search to get lng-lat coordinates
// function findAddress(event) {
//   event.preventDefault();
//   let url =
//     "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
//     address.value;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       showAddress(data);
//       showMap(data);
//     })
//     .catch((err) => console.log(err));
// }

// // leaflet map widget controls
// function showMap(data) {
//   let mapDisplay = L.map("map").setView([data[0].lat, data[0].lon], 13);

//   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }).addTo(mapDisplay);

//   let marker = L.marker([data[0].lat, data[0].lon])
//     .addTo(mapDisplay)
//     .bindPopup(`<b>My Map Marker</b><br>${data[0].display_name}`);
// }

// let data = events;
// console.log(data);

window.addEventListener('load', async () => {

  let eventDataString = await window.dataHdbrs;
  // console.log(eventDataString);

  if (eventDataString !== undefined) {
    let events = JSON.parse(eventDataString);
    console.log(events);

    let mapArray = events.map((event) => ({
      lat: event.location_lat,
      lon: event.location_long,
      name: event.name,
      organizedBy: event.user.name
    }));

    console.log(mapArray);
    let userAllNames = events.map((event) => event.user.name);

    let uniqueUsers = (_.uniq(userAllNames));
    console.log(uniqueUsers);

    showMapDefault(mapArray, uniqueUsers);
  }

})


function showMapDefault(mapArray, uniqueUsers) {
  let mapDisplay = L.map("map").setView([43.663209, -79.382994], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapDisplay);

  let markerColorCounter = 1;
  for (let j = 0; j < uniqueUsers.length; j++) {
    let userEvents = mapArray.filter((event) => event.organizedBy === uniqueUsers[j]);

    for (let i = 0; i < userEvents.length; i++) {
      let greenIcon = new L.Icon({
        iconUrl: `/images/marker${markerColorCounter}.svg`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [40, 75],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      let marker = L.marker([userEvents[i].lat, userEvents[i].lon], { icon: greenIcon })
        .addTo(mapDisplay).bindPopup(`<b>${userEvents[i].name}</b><br> Organizer:${userEvents[i].organizedBy}`);
    }

    if (markerColorCounter === 10) {
      markerColorCounter = 1;
    } else {
      markerColorCounter += 1;
    }
  }
}

// showMapDefault();

// searchBtn.addEventListener("click", findAddress);
