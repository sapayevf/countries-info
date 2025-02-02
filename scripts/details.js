const countryDetails = document.getElementById("country-details");
const selectedCountry = localStorage.getItem("selectedCountry");

console.log(selectedCountry);

if (!selectedCountry) {
  countryDetails.innerHTML = "<p>No country selected.</p>";
} else {
  async function getCountryDetails() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(
          selectedCountry
        )}`
      );
      const data = await res.json();

      if (!res.ok || res.status !== 200) {
        throw new Error("Country not found!");
      }

      const country = data[0];

      countryDetails.innerHTML = `
        <div class="country-details flex gap-[100px] items-start">
          <img src="${country.flags.svg}" alt="${country.name.common}" 
            class="w-[50%] object-cover rounded-md" />
          <div>
            <h2 class="text-2xl font-bold mb-[30px]">${country.name.common}</h2>
            <div class="flex flex-col gap-5">
            <p><b>Native Name: </b>${
              country.name.nativeName
                ? Object.values(country.name.nativeName)[0].common
                : "N/A"
            }</p>
              <p><b>Population:</b> ${country.population.toLocaleString()}</p>
             <p><b>Region:</b> ${country.region}</p>
             <p><b>Sub Region:</b> ${country.subregion || "N/A"}</p>
             <p><b>Capital:</b> ${
               country.capital ? country.capital[0] : "N/A"
             }</p>
             <p><b>Top Level Domain:</b> ${
               country.tld ? country.tld[0] : "N/A"
             } </p>
            <p><b>Currencies:</b> ${
              country.currencies
                ? Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")
                : "N/A"
            }</p>
             <p><b>Languages:</b> ${
               country.languages
                 ? Object.values(country.languages).join(", ")
                 : "N/A"
             } </p>
            
            </div>
            <br>
            <br>
            <p><b>Border Countries:</b> 
            ${
              country.borders
                ? country.borders
                    .map(
                      (border) =>
                        `<span class="border px-2 py-1 rounded">${border}</span>`
                    )
                    .join(" ")
                : "None"
            }</p>
          </div>
        </div>
      `;
    } catch (err) {
      countryDetails.innerHTML = `<p>Error loading country details.</p>`;
      console.error(err);
    }
  }

  getCountryDetails();
}
