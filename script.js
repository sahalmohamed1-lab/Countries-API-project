const API = "https://restcountries.com/v3.1/all?fields=name,capital,flags,region";
const page = typeof location !== "undefined"
  ? location.pathname
  : "";

/* ---------- COUNTRIES PAGE ---------- */
if (page.includes("countries")) {
  const box = document.getElementById("countries");
  const search = document.getElementById("search");
  const loading = document.getElementById("loading");

  let countries = [];

  fetch(API)
    .then(res => res.json())
    .then(data => {
      countries = data;
      loading.style.display = "none";
      show(data);
    })
    .catch(() => {
      loading.innerText = "Failed to load";
    });

  function show(data) {
    box.innerHTML = data.map(c => `
      <div onclick="go('${encodeURIComponent(c.name.common)}')">
        <img src="${c.flags.png}">
        <p>${c.name.common}</p>
        <p>Capital: ${c.capital?.[0] || "N/A"}</p>
        <p>Region: ${c.region}</p>
      </div>
    `).join("");
  }

  search.oninput = e => {
    const value = e.target.value.toLowerCase();
    show(countries.filter(c =>
      c.name.common.toLowerCase().includes(value)
    ));
  };
}

/* ---------- DETAILS PAGE ---------- */
if (page.includes("country")) {
  const box = document.getElementById("country-details");
  const loading = document.getElementById("loading");

  const name = new URLSearchParams(location.search).get("name");

  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then(data => {
      const c = data[0];
      loading.style.display = "none";

      box.innerHTML = `
        <img src="${c.flags.png}">
        <h2>${c.name.common}</h2>
        <p>Capital: ${c.capital?.[0] || "N/A"}</p>
        <p>Region: ${c.region}</p>
      `;
    })
    .catch(() => {
      loading.innerText = "Failed to load";
    });
}

/* ---------- NAVIGATION ---------- */
function go(name) {
  location.href = `country.html?name=${name}`;
}

/* ---------- TESTABLE FUNCTION ---------- */
function getCountryHTML(data) {
  return data.map(c => `
    <div>
      <h3>${c.name.common}</h3>
      <p>Capital: ${c.capital?.[0] || "N/A"}</p>
      <p>Region: ${c.region}</p>
    </div>
  `).join("");
}

/* ---------- EXPORT FOR TESTS ---------- */
if (typeof module !== "undefined") {
  module.exports = { getCountryHTML };
}