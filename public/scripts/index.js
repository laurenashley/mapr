let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49.2608724, lng: -123.113952 },
    zoom: 12,
  });


}


window.initMap = initMap;
