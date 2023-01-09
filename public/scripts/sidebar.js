function toggleNav() {
  const displayElements = document.getElementsByClassName("showNav");
  const hiddenElements = document.getElementsByClassName("hideNav");

  if (hiddenElements.length === 0) {
    for (var el of displayElements)
      el.classList.add("hideNav");
  } else {
    for (var el of displayElements)
      el.classList.remove("hideNav");
  }
};

// Fn to toggle which view to show within the sidebar
const switchView = (el1, el2) => {
  console.log('switchView');
  // hide el1, show el2
};

$(() => {
  $('#mapsList li').on('click', (e) => {
    e.preventDefault();
    const mapID = $(this).data('mapid');
    console.log('li clicked! ', mapID); // To Do mapID is undefined
    const el1 = $('#mapsList');
    const el2= $('#map');
    switchView(el1, el2);
  });
});
