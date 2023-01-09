const queryParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Set Default
let map;
let mapid = null;
let setLatitude = 51.04862;
let setLongitude = -114.07085;
let setZoom = 2.3;
let pinsData = {};

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
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: setLatitude, lng: setLongitude },
    zoom: setZoom,
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
  });

  // const contentString =
  //   `<div id="content">
  //     This is a test
  //   </div>`;
  // const infowindow = new google.maps.InfoWindow({
  //   content: contentString,
  //   ariaLabel: "test",
  // });

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

function newLocation(newLat, newLng, newZoom) {
	map.setCenter({
		lng: newLng,
    lat: newLat,
	});

  map.setZoom(newZoom);
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



// Handle Maps data in sidebar views
$(() => {
  $('#mapsList a').on('click', function(e) {
    e.preventDefault();
    const $this = $(this);
    const queryString = $this.attr('href');
    const mapID = $this.data('mapid');
    const mapLat = $this.data('lat');
    const mapLong = $this.data('long');
    const mapZoom = $this.data('zoom');

    $.ajax({
      type: 'GET',
      url: `/maps/${mapID}`
    })
      .done((res) => {
        const { pins } = res;
        const $pinsListEl = $('#pinsList');
        $pinsListEl.empty();

        newLocation(mapLat, mapLong, mapZoom);

        pins.forEach(pin => {
          console.log('pin data ', pin);
          pinsData = pin;
          const $html = $(`
          <li class="d-flex mb-3">
            <img class="pr-3" alt="${pin.title}" width="75" src="${pin.image_url}" loading="lazy" />
            <div>
              <a href="">${pin.title}</a>
              <p>${pin.description}</p>
            </div>
          </li>
          `);
          $html.appendTo($pinsListEl);

        });
      })
      .fail((err) => {
        console.log('there was an error: ', err);
      });
  });
});