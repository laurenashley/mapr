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

