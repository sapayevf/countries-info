const mainList = document.getElementById("main-list");
const changeThemeBtn = document.getElementById("change-theme-btn");

async function getData() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

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
  if (data.length) {
    data.forEach((country) => {
      const countryList = document.createElement("div");
      countryList.classList.add("p-4", "shadow-lg", "rounded-xl", "bg-white");

      countryList.innerHTML = `
          <img src='${country.flags.svg}' alt='${
        country.flags.alt || country.name.common
      }' class='w-full h-[150px] object-cover rounded-md mb-4' />
          <b class="text-lg">${country.name.common}</b>
          <p>Population: ${country.population.toLocaleString()}</p>
          <p>Region: ${country.region}</p>
          <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
          <br>
          <a style="color: rgb(62, 62, 171);" target='_blank' href='${
            country.maps.googleMaps
          }'>View on Maps</a>
        `;

      mainList.appendChild(countryList);
    });
  }
}
