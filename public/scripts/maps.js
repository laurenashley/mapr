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

  // Global Vars
  const sidenavContent = $('#sidenavContent');

  const getSingleMap = function() {
    $('#mapsList a').on('click', function(e) {
      e.preventDefault();

      const $this = $(this);
      const mapID = $this.data('mapid');
      const mapLat = $this.data('lat');
      const mapLong = $this.data('long');
      const mapZoom = $this.data('zoom');
      console.log(mapID);
      const url = `/maps/${mapID}`;

      $('#sidenavContent').load(url + ' #mapSingle', function() {
        console.log("Loaded single map and pins");
      });

      // $.ajax({
      //   type: 'GET',
      //   url: `/maps/${mapID}`
      // })
        // .done((res) => {
          // const { pins } = res;
          // const $pinsListEl = $('#pinsList');
          // const $pinDiv = $('#pinSingle');
          // $pinsListEl.empty();
          // $pinDiv.empty();

          // // Recenter the map
          // newLocation(mapLat, mapLong, mapZoom);

          // // Clear markers from previous map
          // clearMarkers();

          // // Load new pin data and create markers
          // pins.forEach(pin => {
          //   console.log('pin data ', pin);
          //   pinsData = pin;
          //   const $html = $(`
          //   <li class="d-flex mb-3">
          //     <div class="pe-3">
          //       <img alt="${pin.title}" width="75" height="75" src="${pin.image_url}" loading="lazy" />
          //     </div>
          //     <div>
          //       <a href="/pins/${pin.id}" data-pinid="${pin.id}" dat-lat="${pin.latitude}" data-long="${pin.longitude}" >${pin.title}</a>
          //       <p>${pin.description}</p>
          //     </div>
          //   </li>
          //   `);
          //   $html.appendTo($pinsListEl);

          //   /**
          //    * Create Markers for given map id on ajax load
          //    */

          //   // Create new object with lat and long
          //   const position = {};
          //   position['lat'] = Number(pin["latitude"]);
          //   position['lng'] = Number(pin["longitude"]);

          //   // Create the marker
          //   const marker = new google.maps.Marker({
          //     position: position,
          //     map,
          //   });

          //   // Add to global array
          //   markers.push(marker);

          //   /**
          //    * Create Info Windows
          //    * @kgislason
          //    */

          //   const infoWindowContent = `
          //     <div class="info-content d-flex p-3">
          //       <div class="pe-3">
          //         <img src="${pin["image_url"]}">
          //       </div>
          //       <div class="">
          //         <h6>${pin["title"]}</h6>
          //         <p>${pin["description"]}</p>
          //       </div>
          //     </div>
          //   `;

          //   const infoWindow = new google.maps.InfoWindow({
          //     content: infoWindowContent,
          //     ariaLabel: pin["title"], 
          //   });

          //   // Add to global array
          //   infoWindows.push(infoWindow);

          //   /**
          //    * Add Event Listener when marker is clicked to open infoWindow
          //    */
          //   marker.addListener('click', () => {
          //     infoWindow.open({
          //       anchor: marker,
          //       map
          //     });
          //   });
          // }); // END forEach

          // console.log(markers);
          // console.log(infoWindows);

        // })
        // .fail((err) => {
        //   console.log('there was an error: ', err);
        // });
    });
  }

  getSingleMap();

/**
 * Load Single Pin via AJAX
 * 
 */

  const getSinglePin = function() {
    const $pinDiv = $('#pinSingle');

    $('#pinsList li a').on('click', function(e) {
      const $this = $(this);

      e.preventDefault();

      const pinID = $this.data('pinid');
      console.log('pinid: ', pinID);

      $.ajax({
        type: 'GET',
        url: `/pins/${pinID}`
      })
      .done((res) => {
        const { pin } = res;
        $pinDiv.empty();

        console.log(pin);

        pin.forEach(pinData => {

        const $html = $(`
          <li class="d-flex mb-3 bg-light">
            <div class="pe-3">
              <img alt="${pinData .title}" width="100" height="100" src="${pinData.image_url}" loading="lazy" />
            </div>
            <div class="p-3">
              <h4 class="h5 text-primary">${pinData.title}</h4>
              <p>${pinData.description}</p>
            </div>
          </li>
          `);
          $html.appendTo($pinDiv);
        });
      });

    });
  }

  getSinglePin();

  $(document).on('ajaxComplete', function() {
    getSinglePin();
  });

  /**
   * Submit Add new map form via AJAX
   * 
   */
  const addNewMap = function() {
    $('#newMapForm').submit( function(e) {
      e.preventDefault();

      const data = $(this).serialize();

      $.post("/maps/new", data, function(data) {
        console.log('Done');
      });
    });
  }
  addNewMap();
});