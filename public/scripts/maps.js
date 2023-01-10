// Handle Maps data in sidebar views
$(() => {
  $('#mapsList a').on('click', function(e) {
    e.preventDefault();
    const $this = $(this);
    const mapID = $this.data('mapid');

    $.ajax({
      type: 'GET',
      url: `/maps/${mapID}`
    })
      .done((res) => {
        const { pins } = res;
        const $pinsListEl = $('#pinsList');
        $pinsListEl.empty();

        pins.forEach((pin) => {
          console.log('pin data ', pin);
          const $html = $(`
          <li class="pin">
            <img src="${pin.img_url}" />
            <a href="/pins/${pin.id}" data-pinid="${pin.id}">${pin.title}</a>
            <p>${pin.description}</p>
          </li>
          `);
          $html.appendTo($pinsListEl);
        });
      })
      .fail((err) => {
        console.log('error: ', err);
      });

    $('#deleteMap').removeAttr('data-mapid').attr('data-mapid', mapID);
    $('#updateMap').removeAttr('data-mapid').attr('data-mapid', mapID);
  });

  // Open form to update map details
  $('#updateMap').on('click', function(e) {
    e.preventDefault();
    const $this = $(this);
    const mapID = $this.data('mapid');

    // Show update form

    // Use this ajax for form submit
    // $.ajax({
    //   type: 'POST',
    //   url: `/maps/${mapID}/update`
    // })
    //   .done((res) => {
    //     console.log('map updated ', res);

    //   })
    //   .fail((err) => {
    //     console.log('error: ', err);
    //   });
  });

  const confirmDelete = () => {
    const userResponse = confirm("Are you sure you want to delete this map and all of it's pins?");
    return userResponse;
  };

  $('#deleteMap').on('click', function(e) {
    e.preventDefault();

    if (confirmDelete()) {
      const $this = $(this);
      const mapID = $this.data('mapid');

      $.ajax({
        type: 'POST',
        url: `/maps/${mapID}/delete`
      })
        .done((res) => {
          console.log('map deleted ', res);
          // To Do refresh list of maps
        })
        .fail((err) => {
          console.log('error: ', err);
        });
    }
  });
});
