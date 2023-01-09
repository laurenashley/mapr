const queryParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Set Default
let mapid = null;
let setLatitude = 51.04862;
let setLongitude = -114.07085;
let setZoom = 2.3;

// Check for query params
if (queryParams.mapid !== null) {
  mapid = queryParams.mapid;
}

if (queryParams.lat !== null) {
  setLatitude = Number(queryParams.lat);
}

if (queryParams.long !== null) {
  setLongitude = Number(queryParams.long);
}

if (queryParams.zoom !== null) {
  setZoom = Number(queryParams.zoom);
}

function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: setLatitude, lng: setLongitude },
    zoom: setZoom,
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
  });

  const contentString =
    `<div id="content">
      This is a test
    </div>`;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "test",
  });

  // const marker = new google.maps.Marker({
  //   position: { lat: 51.04862, lng: -114.07085 },
  //   map,
  //   title: "TEST",
  // });

  // marker.addListener("click", () => {
  //   infowindow.open({
  //     anchor: marker,
  //     map,
  //   });
  // });
}

// Adds a marker to the map.
// function addMarker(location, map) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   new google.maps.Marker({
//     position: location,
//     label: 'A',
//     map,
//     title: "New test"
//   });

// }

// https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng

window.initMap = initMap;

$(() => {

  
});