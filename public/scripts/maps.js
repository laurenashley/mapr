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
  });
});
