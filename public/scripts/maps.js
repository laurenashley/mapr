/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-style */

// Set Defaults
let map;
let mapid = null;
let setLatitude = 51.04862;
let setLongitude = -114.07085;
let setZoom = 2.3;
let pinsData = {};
let markers = [];
let infoWindows = [];
let tempMarker;
let currentPosition = null;
let currentZoom = null;

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

// clears the animation and the info window on click
function clearMap() {
  markers.forEach(marker => marker.setAnimation(null));
  infoWindows.forEach(window => window.close());
}

// https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng

window.initMap = initMap;

// Handle Maps data in sidebar views
// Start JQuery
$(() => {
  // Global Vars
  const sidenavContent = $('#sidenavContent');

  const loadTemplateHTML = function(url, div) {
    tempMarker = null;
    currentPosition = null;
    currentZoom = null;
    
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
              animation: google.maps.Animation.DROP,
            });
            // marker.addListener("click", toggleBounce);
            marker.pinID = pin.id;

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
              clearMap(); // calls the function when click
              marker.setAnimation(google.maps.Animation.BOUNCE);

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
  };

  // Rebuild Map
  const rebuildMap = function(mapid) {
    const url = `/maps/${mapid}`;
    const api = `/maps-api/${mapid}`;

    $.ajax({
      type: 'GET',
      url: api
    })
      .done((res) => {
        const map = res["map"][0];
        const pins = res["pins"];
        console.log(pins);

        // Get from mapsAPI
        const mapLat = Number(map["latitude"]);
        const mapLong = Number(map["longitude"]);
        const mapZoom = Number(map["zoom"]);
        console.log(mapLat);

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
  };

  /**
   * Load coordiates and zoom and set a temp marker by clicking on map
   * Use this data to set add new pin and new map forms
   */

  const getCurrentCoordinates = () => {
    // Get Lat on Long from the map
    map.addListener("click", (mapsMouseEvent) => {
        // Clear previous marker
        if (tempMarker) {
          tempMarker.setMap(null);
        }

        // Log Lat and Long object to console
        console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));

        // Save the position
        const position = mapsMouseEvent.latLng;
        const currentZoom = map.getZoom();

        // Update global variable
        currentPosition = position;

        // Create the marker
        tempMarker = new google.maps.Marker({
          position: position,
          map,
        });

        if (currentPosition) {
          // Map Form
          $('#newMapForm').find('#mapLat').val(currentPosition["lat"]);
          $('#newMapForm').find('#mapLong').val(currentPosition["lng"]);

          //Map Update
          $('#updateMapForm').find('#mapLatEdit').val(currentPosition["lat"]);
          $('#updateMapForm').find('#mapLongEdit').val(currentPosition["lng"]);

          // Pin Form
          $('#newPinForm').find('#pinLat').val(currentPosition["lat"]);
          $('#newPinForm').find('#pinLong').val(currentPosition["lng"]);

          // Pin Update Form
          $('#updatePinForm').find('#pinLat').val(currentPosition["lat"]);
          $('#updatePinForm').find('#pinLong').val(currentPosition["lng"]);
        }

        if (currentZoom) {
          console.log(currentZoom);
          // Get current zoom from map
          $('#newMapForm').find('#mapZoom').val(currentZoom);

          //Update map
          $('#updateMapForm').find('#mapZoomEdit').val(currentZoom);
        }

        // Simulate click event
        // $('#newPinBtn').click();

    });
  }

  const mapNavigation = () => {
    /**
    * All Map - Back Button
    */
    $('#backBtnAllMap').on('click', (e) => {
      e.preventDefault();

      loadTemplateHTML('/maps', '.ajaxWrap');

      // Recenter the map
      newLocation(setLatitude, setLongitude, setZoom);

      // Clear markers from previous map
      clearMarkers();
    });

    /**
    * Map - Back Button
    */
    $('#backBtnMap').on('click', function(e) {
      e.preventDefault();

      const href = $(this).attr('href');
      clearMap();
      loadTemplateHTML(href, '.ajaxWrap');
      getSingleMap($(this));
    });
  };

  /**
   * Helper Functions
   */

  const submitForm = (url, data, cb) => {
    $.post(url, data, cb);
  };

  /**
    * Delete Confirm
    * Helper
    */
  const confirmDelete = (type) => {
    const userResponse = confirm(`Are you sure you want to delete this ${type}?`);
    return userResponse;
  };

  /**
   * Handle User Profile Links
   *
   */

  const users = function() {
    $('#user-favs a').on('click', function(e) {
      e.preventDefault();

      const url = $(this).attr('href');
      console.log('clicked on map link in profile: ', url);
      loadTemplateHTML(url, '.ajaxWrap');
    });
  };

  /**
   * Handle Pins & Pin Forms
   *
   */
  const pins = () => {
    /**
     * Load Single Pin via AJAX
     *
     */

    $('#pinsList li a').on('click', function(e) {
      e.preventDefault();
      const pinID = $(this).data('pinid');
      const url = `/pins/${pinID}`;

      for (let marker of markers) {
        if (marker.pinID === pinID) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      loadTemplateHTML(url, '.ajaxWrap');
    });

    /**
     * Load New Pin Form
     *
     */

    $('#newPinBtn').on('click', function(e) {
      e.preventDefault();

      // Create temp pin and get coordinates when clicking on the map
      getCurrentCoordinates();

      const mapid = $(this).data('mapid');
      const url = $(this).attr('href');

      loadTemplateHTML(url, '.ajaxWrap');

      // Set the map id from the referring button
      $('#newPinForm').find('#mapid').val(mapid);

      // Set Lat and Lng from clicking on the map

      // Set back button url
      $('#backBtnMap').attr('href', '/maps/' + mapid);

    });

    /**
     * Submit new pin form via AJAX
     *
     */
    $('#newPinForm').submit(function(e) {
      e.preventDefault();

      const url = $(this).find('input[type="submit"]').data('referer');
      const mapid = $(this).find('input[type="submit"]').data('mapid');
      const data = $(this).serialize();

      $.post('/pins/new', data, function(data) {
        loadTemplateHTML(url, '.ajaxWrap');  
        rebuildMap(mapid);   
      });
    });

    /**
     * Update Pin
     */

    $('a#updatePin').on('click', function(e) {
      e.preventDefault();

      getCurrentCoordinates();

      const pinid = $(this).data('pinid');
      const url = $(this).attr('href');

      loadTemplateHTML(url, '.ajaxWrap');
      getCurrentCoordinates();
    });

    $('#updatePinForm').submit(function(e) {
      e.preventDefault();
      const data = $(this).serialize();
      const pinid = $(this).data('pinid');
      const mapid = $(this).data('mapid');
      const url = $(this).find('input[type="submit"]').data('referer');

      submitForm(`/pins/${pinid}/update`, data, function() {
        loadTemplateHTML(url, '.ajaxWrap')
      });
    });

    /**
     * Delete pin
     *
     */

    $('#deletePin').on('click', function(e) {
      e.preventDefault();

      if (confirmDelete('pin')) {
        const pinid = $(this).data('pinid');

        $.post(`/pins/${pinid}/delete`, () => {
          loadTemplateHTML('/maps', '.ajaxWrap');
        });
      }
    });
  }; // END Pins

  /**
   * Handle Map Forms
   *
   */
  const mapForms = function() {
    /** Load New Map form */
    $('.addNewMapBtn').on('click', (e) => {
      e.preventDefault();
      loadTemplateHTML('/maps/new', '.ajaxWrap');
      getCurrentCoordinates();
    });

    /**
     * Create New Map
     */
    $('#newMapForm').submit(function(e) {
      e.preventDefault();
      const data = $(this).serialize();
      submitForm('/maps/new', data, function() {
        loadTemplateHTML('/maps', '.ajaxWrap')
      });
    });

    /**
     * Add Map to Favourites
     */
    $('a#favouriteBtn').on('click', function(e) {
      e.preventDefault();

      const userid = $(this).data('uid');
      const $icon = $(this).find('i');
      const isFav = $(this).data('fav');
      const mapid = $(this).data('mapid');

      console.log("Clicked on favourties button")

      if (isFav) {
        // change icn back to heart outline
        $(this).attr('data-fav', false);
        $icon.removeClass('fa-solid').addClass('fa-regular');

        $.post(`/maps/${mapid}/favourites/remove`, function() {
          console.log("Posted");
          $('#ajaxModalWrap').load('/ #profileModal', function() {
            console.log("1 Done reloading profile");
          });
        });
      } else {
        $(this).attr('data-fav', true);
        // change icn to filled in heart
        $icon.removeClass('fa-regular').addClass('fa-solid').data('fav', true);


        $.post(`/maps/${mapid}/favourites/add`, function() {
          console.log("Posted");
          $('#ajaxModalWrap').load('/ #profileModal', function() {
            console.log("2 Done reloading profile");
          });
        });
      }

      $('#ajaxModalWrap').load('/ #profileModal', function() {
        console.log("2 Done reloading profile");
      });
    });

    /**
     * Update Existing Map
     */

    /** Load Update Map form */
    $('a#updateMap').on('click', function(e) {
      e.preventDefault();
      getCurrentCoordinates();
      console.log('update map btn clicked');
      const mapID = $(this).data('mapid');

      loadTemplateHTML(`/maps/${mapID}/update`, '.ajaxWrap');
    });

    $('#updateMapForm').submit(function(e) {
      e.preventDefault();
      const data = $(this).serialize();
      const mapID = $(this).attr('data-mapid');
      const url = `/maps/${mapID}/update`;
      const btn = $(this).find('input[type="submit"]');
      // submitForm(url, data, function() {
      //   loadTemplateHTML(`/maps/${mapID}`, '.ajaxWrap')
      // });

      $.post(`/maps/${mapID}/update`, data, function() {
        console.log('Updated map');
        loadTemplateHTML(`/maps/${mapID}`, '.ajaxWrap');
      });
    });

    /**
    * Delete Map
    */

    $('#deleteMap').on('click', function(e) {
      e.preventDefault();

      if (confirmDelete('map')) {
        const $this = $(this);
        const mapid = $this.data('mapid');

        $.post(`/maps/${mapid}/delete`, () => {
          loadTemplateHTML('/maps', '.ajaxWrap');
        });
      }
    });
  };

  // Load Function Groups for Users and Maps List on initial page load
  mapNavigation();
  pins();
  users();
  getSingleMap($('#mapsList a'));

  // Load on ajaxComplete
  $(document).on('ajaxStop', function() {
    mapForms();
    mapNavigation();
    pins();
    users();
    getSingleMap($('#mapsList a'));
  });
});
