$(() => {
  $(document).ready(function() {
    loadCategories();
  });
});

// ----------------- MAPS -----------------
const createMapItem = (mapInfo) => {
  const $mapItem = `
    <li class="mapItem">
      <img src="${mapInfo.image_url}" alt="Map Image" width="300" height="300">
      <div class="mapItemContent">
        <h4>${mapInfo.title}</h4>
        <p>${mapInfo.description}</p>
      </div>
    </li>
  `;

  return $mapItem;
};

// Retrieve information for maps api
// Display information in the sidebar
const renderMapList = (maps) => {
  let $mapList = `
    <button onclick="loadCategories()">Go back</button>
    <ul id="mapList">
  `;

  for(const map of maps) {
    const $mapItem = createMapItem(map);
    $mapList += `${$mapItem}`;
  }

  $mapList += `</ul>`;
  $('#sidebarContent').empty();
  $('#sidebarContent').append($mapList);
};

const loadMaps = (id) => {
  $.get(`/categories/${id}`)
  .then(data => {
    renderMapList(data);
  });
};


// ------------------- CATEGORIES -------------------
const createCategoryItem = (categoryInfo) => {
  const $categoryItem = `
    <li onclick="loadMaps(${categoryInfo.id})">
      <img alt="Mapr" width="100" src="/images/icon.png" />
      <p>${categoryInfo.title}</p>
    </li>
  `;

  return $categoryItem;
};

// Retrieve information for cateogories api
// Display information in the sidebar
const renderCategoriesList = (categories) => {
  let $categoryList = `
    <ul id="categoryList">
  `;

  for(const category of categories) {
    const $categoryItem = createCategoryItem(category);
    $categoryList += `${$categoryItem}`;
  }

  $categoryList += `</ul>`;
  $('#sidebarContent').empty();
  $('#sidebarContent').append($categoryList);
};

const loadCategories = () => {
  $.get(`/categories/`)
  .then(data => {
    renderCategoriesList(data);
  });
}

// ------------------- TOGGLE SIDEDBAR -------------------

const toggleNav = () => {
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

