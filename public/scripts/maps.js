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

      // To Do if map is fav'd by user show filled heart icon
      // SELECT * FROM favourite_maps WHERE user_id = $1 AND map_id = $2;
      // if above is not empty, switch icon class to solid

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
  };


  /**
   * Load new pin from clicking on map
   * Get coordinates when clicking on map
   * 
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

        // Update global variable
        currentPosition = position;

        // Create the marker
        tempMarker = new google.maps.Marker({
          position: position,
          map,
        });

        if (currentPosition) {
          // Set the map id from the referring button
          $('#newPinForm').find('#pinLat').val(currentPosition["lat"]);
          // Set the map id from the referring button
          $('#newPinForm').find('#pinLong').val(currentPosition["lng"]);
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

      loadTemplateHTML(href, '.ajaxWrap');

      // getSingleMap($(this));
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
  const confirmDelete = () => {
    const userResponse = confirm("Are you sure you want to delete this pin?");
    return userResponse;
  };

  /**
   * Handle User Profile Links
   *
   */

  const users = () => {
    $('#profileModal a').on('click', function(e) {
      e.preventDefault();

      const url = $(this).attr('href');

      loadTemplateHTML(url, '.ajaxWrap');
    });
  }

  /**
   * Handle Pins & Pin Forms
   *
   */
  const pins = () => {
    /**
     * Load Single Pin via AJAX
     *
     */
    const pinDiv = '#pinSingle';

    $('#pinsList li a').on('click', function(e) {
      e.preventDefault();
      const pinID = $(this).data('pinid');
      const url = `/pins/${pinID}`;

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

      console.log(currentPosition["lat"]);

      // Set Lat and Lng from clicking on the map

      // Set back button url
      $('#backBtnMap').attr('href', '/maps/' + mapid);
    });

    /**
     * Submit new pin form via AJAX
     *
     */
    $('#newPinForm').submit( function(e) {
      e.preventDefault();

      url = $(this).find('input[type="submit"]').data('referer');

      const data = $(this).serialize();

      $.post('/pins/new', data, function(data) {
        console.log('Created new pin');

        loadTemplateHTML(url, '.ajaxWrap');
      });
    });

    /**
     * Update Pin
     */

    $('a#updatePin').on('click', function(e) {
      e.preventDefault();

      const pinid = $(this).data('pinid');
      const url = $(this).attr('href');
      console.log(url);

      loadTemplateHTML(url, '.ajaxWrap');
    });

    $('#updatePinForm').submit(function(e) {
      // To Do this crashes app, nothing opens
      e.preventDefault();
      console.log('save btn clicked');
      const data = $(this).serialize();
      const pinid = $(this).data('pinid');
      const mapid = $(this).data('mapid');
      const url = '/maps/' + mapid;
      console.log(mapid);

      submitForm(`/pins/${pinid}/update`, data, loadTemplateHTML(url, '.ajaxWrap'));
    });

    /**
     * Delete pin
     *
     */

    $('#deletePin').on('click', function(e) {
      e.preventDefault();

      if (confirmDelete()) {
        const $this = $(this);
        const pinid = $(this).data('pinid');

        $.post(`/pins/${pinid}/delete`, () => {
          loadTemplateHTML('/maps', '.ajaxWrap');
        });
      }
    });
  };

  /**
   * Handle Map Forms
   *
   */
  const mapForms = function() {
    /** Load New Map form */
    $('.addNewMapBtn').off().on('click', (e) => {
      e.preventDefault();
      loadTemplateHTML('/maps/new', '.ajaxWrap');
    });

    /**
     * Create New Map
     */
    $('#newMapForm').submit(function(e) {
      e.preventDefault();
      const data = $(this).serialize();
      submitForm('/maps/new', data, loadTemplateHTML('/maps', '.ajaxWrap'));
    });

    /**
     * Add Map to Favourites
     */
    $('a#favouriteBtn').off().on('click', function(e) {
      e.preventDefault();

      const userid = 1;
      const $icon = $(this).children('i');
      const isFav = $icon.hasClass('fa-solid');

      if (isFav) {
        // change icn back to heart outline
        $icon.removeClass('fa-solid').addClass('fa-regular');

        $.post(`/users/${userid}/favs/remove`, () => {});
      } else {
        // change icn to filled in heart
        $icon.removeClass('fa-regular').addClass('fa-solid');

        $.post(`/users/${userid}/favs/add`, () => {});
      }
    });

    /**
     * Update Existing Map
     */

    /** Load Update Map form */
    $('a#updateMap').off().on('click', function(e) {
      e.preventDefault();
      console.log('update map btn clicked');
      const mapID = $(this).data('mapid');
      console.log('mapid: ', mapID);
      loadTemplateHTML(`/maps/${mapID}/update`, '.ajaxWrap');
    });

    $('#updateMapForm').submit(function(e) {
      e.preventDefault();
      console.log('Update form submit');
      const data = $(this).serialize();
      const mapid = $(this).data('mapid');

      submitForm(`/maps/${mapid}/update`, data, loadTemplateHTML('/maps', '#mapsList'));
    });

    /**
    * Delete Map
    */

    $('#deleteMap').off().on('click', function(e) {
      e.preventDefault();

      if (confirmDelete()) {
        const $this = $(this);
        const mapid = $this.data('mapid');

        $.post(`/maps/${mapid}/delete`, () => {
          loadTemplateHTML('/maps', '#mapsList');
        });
      }
    });
  }

  // Load Function Groups for Users and Maps List on initial page load
  users();
  mapForms();
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
