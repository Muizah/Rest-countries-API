const CardContainer = document.querySelector(".card-container");

let countryData = [];
const fetchData = fetch("https://restcountries.com/v3.1/all");
fetchData
  .then((response) => response.json())
  .then((response) => {
    countryData = response;
    updateDom(response);
  })
  .catch((error) => console.log(error));

function updateDom(response) {
  var countries = "";
  for (var index = 0; index < response.length; index++) {
    const countryName = response[index].name.common;
    const population = response[index].population;
    const region = response[index].region;
    const capital = response[index].capital;
    const flag = response[index].flags.png;

    var cardHtml = `<div class="card">
  <img src=${flag} />
  
  <div class="card-content">
    <h2>${countryName}</h2>
    <div class="pop">
      <h4>Population:</h4>
      <span>${population}</span>
    </div>
    <div class="pop">
      <h4>Region:</h4>
      <span>${region}</span>
    </div>
    <div class="pop">
      <h4>Capital:</h4>
      <span>${capital}</span>
    </div>
  </div>
  </div>
  `;
    countries += cardHtml;
  }
  CardContainer.innerHTML = countries;
}
var inputSearch = document.querySelector(".input_search");
// console.log(inputSearch.value);
inputSearch.addEventListener("keyup", (event) => {
  const value = event.target.value.toLowerCase();
  const resultCountry = [];
  for (var country of countryData) {
    const countryName = country.name.common.toLowerCase();
    if (countryName.includes(value)) {
      resultCountry.push(country);
    }
  }
  updateDom(resultCountry);
});

var filter = document.querySelector(".filter");
var regions = document.querySelector(".regions");
var regionsArray = document.querySelectorAll(".regions li");
var isCloseRegion = false;
const regionsDom = new Set();
function toggleRegion(isCloseRegion) {
  countryData.forEach((country) => {
    regionsDom.add(`<li>${country.region}</li>`);
  });

  regions.innerHTML = Array.from(regionsDom).join("");
  regionsArray = document.querySelectorAll(".regions li");
  regionFn(regionsArray);
  if (isCloseRegion) {
    regions.classList.add("close-region");
  } else {
    regions.classList.remove("close-region");
  }
}

toggleRegion(isCloseRegion);
filter.addEventListener("click", () => {
  isCloseRegion = !isCloseRegion;
  toggleRegion(isCloseRegion);
});
function regionFn(regionsArray) {
  regionsArray.forEach((region) => {
    region.addEventListener("click", () => {
      const selectedRegion = region.innerText.toLowerCase();
      const regionalCountries = [];
      console.log(selectedRegion);
      countryData.forEach((country) => {
        const countryRegion = country.region.toLowerCase();
        if (countryRegion.includes(selectedRegion)) {
          regionalCountries.push(country);
        }
      });
      updateDom(regionalCountries);
    });
  });
}

var mode = document.querySelector("#mode_change");
mode.addEventListener("click", () => {
  const css = document.querySelector("#cssfile");
  const modechange = document.querySelector("#mode_change");

  if (modechange.innerHTML == "Dark Mode") {
    css.setAttribute("href", "dark_mode.css");
    modechange.innerHTML = "Light Mode";
  } else {
    css.setAttribute("href", "style.css");
    modechange.innerHTML = "Dark Mode";
  }
});
