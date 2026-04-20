const API = "https://restcountries.com/v3.1/all?fields=name,capital,flags,region"

if (typeof document !== "undefined") {
const countriesBox = document.getElementById("countries");
const searchInput = document.getElementById("search");
const loadingText = document.getElementById("loading");
const detailsBox = document.getElementById("details");

let countries = [];

fetch(API)
.then(response => response.json())
.then(data => {
  countries = data;
  displayCountries(countries);
})
.catch(() => {
  loadingText.textContent = "Failed to load"
});

function displayCountries(list) {
  countriesBox.innerHTML = "";
  list.forEach(country => {
    const card = document.createElement("div");

    card.innerHTML = `
    <img src="${country.flags.png}">
    <p>${country.name.common}</p>
    <p>Capital: ${country.capital}</p>
    <p>Region: ${country.region}</p>
    `;

    card.addEventListener("click", () => {
      showDetails(country.name.common);
    })
    countriesBox.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(value)
);
  
displayCountries(filtered);
});

function showDetails(name) {
  detailsBox.innerHTML = "loading...";

  fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
  .then(response => response.json())
  .then(data => {
    const oneCountry = data[0];

    detailsBox.innerHTML = `
    <h2>${oneCountry.name.common}</h2>
    <img src="${oneCountry.flags.png}" width = "100">
    <p>Capital: ${oneCountry.capital}</p>
    <p>Region: ${oneCountry.region}</p>
    `;
  })
  .catch(() => {
    detailsBox.textContent = "Failed to load details";
  });
}
}

function getCountryHTML(data) {
  return data.map(oneCountry => `
    <div>
     <h3>${oneCountry.name.common}</h3>
     <p>Capital: ${oneCountry.capital}</p>
     <p>Region: ${oneCountry.region}</p>
     </div>
     `).join("");
  }

  if (typeof module !== "undefined") {
    module.exports = {getCountryHTML};
  }