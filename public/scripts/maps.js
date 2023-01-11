// Set Global Variables
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

  const loadTemplateHTML = function(url, div) {
    $('#sidenavContent').load(url + ' ' + div, function() {
      console.log("Loaded");
    });
  };

  const getSingleMap = function(link) {
    link.on('click', function(e) {
      e.preventDefault();

      const $this = $(this);
      const mapID = $this.data('mapid');
      const mapLat = $this.data('lat');
      const mapLong = $this.data('long');
      const mapZoom = $this.data('zoom');
      const url = `/maps/${mapID}`;
      const api = `/maps-api/${mapID}`;

      loadTemplateHTML(url, '.ajaxWrap');

      $.ajax({
        type: 'GET',
        url: api
      })
        .done((res) => {
          const pins = res["pins"];

          // Recenter the map
          newLocation(mapLat, mapLong, mapZoom);

          // Clear markers from previous map
          clearMarkers();

          // Load new pin data and create markers
          pins.forEach(pin => {

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

            // Create Info Windows

            const infoWindowContent = `
              <div class="info-content d-flex p-3">
                <div class="pe-3">
                  <img src="${pin["image_url"]}">
                </div>
                <div class="">
                  <h6>${pin["title"]}</h6>
                  <p>${pin["description"]}</p>
                </div>
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

        })
        .fail((err) => {
          console.log('there was an error: ', err);
        });
    });
  }

  const loadNewMapForm = function() {
    $('.addNewMapBtn').on('click', function(e) {
      e.preventDefault();

      loadTemplateHTML('/maps/new', '.ajaxWrap' );
    });
  }


  /**
   * All Map - Back Button
   */

  const backToAllMaps = function() {
    $('#backBtnAllMap').on('click', function(e) {
      e.preventDefault();

      loadTemplateHTML('/maps', '.ajaxWrap');

      // Recenter the map
      newLocation(setLatitude, setLongitude, setZoom);

      // Clear markers from previous map
      clearMarkers();
    });
  }

  /**
   * Map - Back Button
   */

  const backToMap = function() {
    $('#backBtnMap').on('click', function(e) {
      e.preventDefault();

      const href = $(this).attr('href');

      loadTemplateHTML(href, '.ajaxWrap');

      getSingleMap($(this));

      
    });
  }

  /**
   * Load Single Pin via AJAX
   * 
   */

  const getSinglePin = function() {
    const pinDiv = '#pinSingle';

    $('#pinsList li a').on('click', function(e) {
      e.preventDefault();
      const pinID = $(this).data('pinid');
      const url = `/pins/${pinID}`;

      loadTemplateHTML(url, '.ajaxWrap');
    });
  }

  /**
   * Submit Add new map form via AJAX
   * 
   */
  const submitNewMap = function() {
    $('#newMapForm').submit( function(e) {
      e.preventDefault();

      const data = $(this).serialize();

      $.post("/maps/new", data, function(data) {
        console.log('Created new map');

        loadTemplateHTML('/maps', '.ajaxWrap');
      });
    });
  }

  /**
   * Submit new pin form via AJAX
   * 
   */
  const submitNewPin = function() {
    $('#newPinForm').submit( function(e) {
      e.preventDefault();

      url = $(this).find('input[type="submit"]').data('referer');

      const data = $(this).serialize();

      $.post('/pins/new', data, function(data) {
        console.log('Created new pin');

        loadTemplateHTML(url, '.ajaxWrap');
      });
    });
  }

  const loadNewPinForm = function() {
    $('#newPinBtn').on('click', function(e) {
      e.preventDefault();

      const mapid = $(this).data('mapid');
      const url = $(this).attr('href');
  
      loadTemplateHTML(url, '.ajaxWrap');
  
      // Set the map id from the referring button
      $('#newPinForm').find('#mapid').val(mapid);  

      // Set back button url
      $('#backBtnMap').attr('href', '/maps/' + mapid);
    })
  }


  // Call Functions on initial page load
  loadNewMapForm();
  submitNewMap();
  getSingleMap($('#mapsList a'));
  getSinglePin();
  backToAllMaps();
  backToMap();
  loadNewPinForm();
  submitNewPin();

  // Call again on ajaxComplete
  $(document).on('ajaxComplete', function() {
    loadNewMapForm();
    submitNewMap();
    getSingleMap($('#mapsList a'));
    getSinglePin();
    backToAllMaps();
    backToMap();
    loadNewPinForm();
    submitNewPin();
  });
});