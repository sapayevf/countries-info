const mainList = document.getElementById("main-list");
const changeThemeBtn = document.getElementById("change-theme-btn");
const searchInput = document.getElementById("default-search");
const selectRegions = document.getElementById("regions");
const body = document.body;

let countriesData = [];

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  changeThemeBtn.textContent = "Light Mode";
} else {
  changeThemeBtn.textContent = "Dark Mode";
}

changeThemeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    changeThemeBtn.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    changeThemeBtn.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

async function getData() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  countriesData = data;

  if (!res.ok || res.status !== 200) {
    throw new Error("Countries Not Found!");
  }

  return data;
}

getData()
  .then((data) => {
    render(data);
  })
  .catch((err) => {
    console.log(err);
  });

function render(data) {
  mainList.innerHTML = "";

  data.forEach((country) => {
    const countryList = document.createElement("div");
    countryList.classList.add("p-4", "shadow-lg", "rounded-xl", "bg-white");

    countryList.innerHTML = `
        <img src='${country.flags.svg}' alt='${
      country.flags.alt || country.name.common
    }' 
             class='w-full h-[150px] object-cover rounded-md mb-4' />
        <b class="text-lg">${country.name.common}</b>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
        <br>
        <a target='_blank' href='${country.maps.googleMaps}'>View on Maps</a>
      `;

    mainList.appendChild(countryList);
  });
}

searchInput.addEventListener("keyup", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredCountries = countriesData.filter((country) => {
    return country.name.common.toLowerCase().includes(searchValue);
  });
  render(filteredCountries);
});

searchInput.addEventListener("keyup", filterCountries);
selectRegions.addEventListener("change", filterCountries);

function filterCountries() {
  const selectedRegion = selectRegions.value;
  const searchValue = searchInput.value.toLowerCase();

  const filteredCountries = countriesData
    .filter((country) => {
      return (
        selectedRegion == "Filter by Region" || country.region == selectedRegion
      );
    })
    .filter((country) => {
      return country.name.common.toLowerCase().includes(searchValue);
    });

  render(filteredCountries);
}
