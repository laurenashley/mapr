let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.04862, lng: -114.07085 },
    zoom: 2,
  });
}

window.initMap = initMap;
