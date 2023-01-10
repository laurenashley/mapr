// Set Defaults
let map;
let mapid = null;
let setLatitude = 51.04862;
let setLongitude = -114.07085;
let setZoom = 2.3;
let pinsData = {};
let markers = [];
let infoWindows = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: setLatitude, lng: setLongitude },
    zoom: setZoom,
  });

  // // This event listener calls addMarker() when the map is clicked.
  // google.maps.event.addListener(map, "click", (event) => {
  //   addMarker(event.latLng, map);
  // });
}

function newLocation(newLat, newLng, newZoom) {
	map.setCenter({
		lng: newLng,
    lat: newLat,
	});

  map.setZoom(newZoom);
}

function clearMarkers() {
  for (let marker of markers) {
    marker.setMap(null);
  }
  markers = [];
}

function addInfoWindow(string) {
  const contentString =
    `<div id="content">
      ${string}
    </div>`;
  
  new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: string,
  });
}

// https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng

window.initMap = initMap;

// Handle Maps data in sidebar views
// Start JQuery
$(() => {
  $('#mapsList a').on('click', function(e) {
    e.preventDefault();
    const $this = $(this);
    const mapID = $this.data('mapid');
    const mapLat = $this.data('lat');
    const mapLong = $this.data('long');
    const mapZoom = $this.data('zoom');
    console.log(mapID);

    $.ajax({
      type: 'GET',
      url: `/maps/${mapID}`
    })
      .done((res) => {
        const { pins } = res;
        const $pinsListEl = $('#pinsList');
        $pinsListEl.empty();

        // Recenter the map
        newLocation(mapLat, mapLong, mapZoom);

        clearMarkers();

        // Load new pin data and create markers
        pins.forEach(pin => {
          console.log('pin data ', pin);
          pinsData = pin;
          const $html = $(`
          <li class="d-flex mb-3">
            <img class="pr-3" alt="${pin.title}" width="75" src="${pin.image_url}" loading="lazy" />
            <div>
              <a href="" dat-lat="${pin.latitude}" data-long="${pin.longitude}" >${pin.title}</a>
              <p>${pin.description}</p>
            </div>
          </li>
          `);
          $html.appendTo($pinsListEl);

          /**
           * Create Markers for given map id on ajax load
           */

          // Create new object with lat and long
          const position = {};
          position['lat'] = Number(pin["latitude"]);
          position['lng'] = Number(pin["longitude"]);

          // Create the marker
          const marker = new google.maps.Marker({
            position: position,
            map,
          });

          // Add to global array
          markers.push(marker);

          /**
           * Create Info Windows
           * @kgislason
           */

          const infoWindowContent = `
            <div class="info-content">
              <h6>${pin["title"]}</h6>
              <p>${pin["description"]}</p>
            </div>
          `;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            ariaLabel: pin["title"], 
          });

          // Add to global array
          infoWindows.push(infoWindow);

          /**
           * Add Event Listener when marker is clicked to open infoWindow
           */
          marker.addListener('click', () => {
            infoWindow.open({
              anchor: marker,
              map
            });
          });
        }); // END forEach

        console.log(markers);
        console.log(infoWindows);

      })
      .fail((err) => {
        console.log('there was an error: ', err);
      });
  });
});