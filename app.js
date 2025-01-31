function fetchUserData() {
  fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Countries Not Found!");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("user-info").innerHTML = `
                        <img src="${
                          data.avatar_url
                        }" width="100" height="100" alt="${data.login}">
                        <h2>${data.name || data.login}</h2>
                        <p>@${data.login}</p>
                        <p>Followers: ${data.followers}</p>
                        <p>Following: ${data.following}</p>
                        <a href="${
                          data.html_url
                        }" style="text-decoration: none; color: green;" target="_blank">GitHub Profilini Ko‘rish</a>
                    `;
    })
    .catch((error) => {
      document.getElementById(
        "user-info"
      ).innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}
