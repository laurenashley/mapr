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
  // bind click events and send elements to hide/show to switchView()
});
