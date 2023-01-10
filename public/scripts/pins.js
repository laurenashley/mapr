// Handle Pins data in sidebar views
$(() => {
  $('#pinsList li a').on('click', function(e) {
    console.log('a is clicked, prevent default should have happneed');
    e.preventDefault();
    console.log('a is clicked, prevent default should have happneed');
    const $this = $(this);

    // Hide pins list, show pin detail using loaded data per pinid
  });
});
