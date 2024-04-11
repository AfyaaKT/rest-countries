function fetchFunction() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => render(data));
  }
  
  fetchFunction();
  
  //home page card container rendering
  function render(data) {
    const cardsContainer = document.getElementById("cards-container");
  
    data.map((country) => {
      if (country.name.common !== "Israel") {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
      <img src=${country.flags.png} alt="flag" class="flag">
      <div class="card-content">
          <h3 class="name">${country.name.common}</h3>
          <p class="population"><b>Population: </b>${country.population}</p>
          <p class="region"><b>Region: </b>${country.region}</p>
          <p class="capital"><b>Capital: </b>${country.capital}</p>
      </div>`;
        card.addEventListener("click", () => {
          localStorage.setItem("selectedCard", JSON.stringify(country));
          window.location.href = "details.html";
        });
        cardsContainer.appendChild(card);
      }
    });
  }
  
  //details page
  //detialed card functionality
  document.addEventListener("DOMContentLoaded", () => {
    const selectedCard = JSON.parse(localStorage.getItem("selectedCard"));
    const detailsContainer = document.getElementById("details-container");
    
    //reach the languages
    languagesObj = selectedCard.languages;
    let languagesHTML = "";
    for (const key in languagesObj) {
      languagesHTML += `<span>${languagesObj[key]}</span>, `;
    }
    languagesHTML = languagesHTML.slice(0, -2);
    //reach the currencies
    function getCurrencyInfo(currenciesObj) {
      const currencyInfo = [];
      for (const key in currenciesObj) {
        if (currenciesObj.hasOwnProperty(key)) {
          const currency = currenciesObj[key];
          currencyInfo.push(`${currency.name} (${currency.symbol})`);
        }
      }
      return currencyInfo.join(", ");
    }
  
    detailsContainer.innerHTML = `
      <div class="details">
      <img src=${selectedCard.flags.png} alt="" class="details-img">
      <div class="details-content ">
          <h1 class='common-name'>${selectedCard.name.common}</h1>
          <div class='sub-content'>
              <div>
                  <p>Native Name: <span> </span></p>
                  <p>Population: <span> ${selectedCard.population}</span></p>
                  <p>Region: <span>${selectedCard.region}</span> </p>
                  <p>Sub Region: <span>${selectedCard.subregion}</span></p>
                  <p>Capital: <span>${selectedCard.capital}</span></p>
              </div>
              <div>
                  <p>Top Level Domain: <span>${selectedCard.tld}</span></p>
                  <p>Currencies: <span>${getCurrencyInfo(
                    selectedCard.currencies
                  )}</span> </p>
                  <p>Languages: <span>${languagesHTML}</span></p>
              </div>
          </div>
          <div class='border-countries'>
              <p>Border Countries: </p><span>${"still unknown"}</span>
          </div>
      </div>
  
  </div>
      `;
  });
  
  // go back button
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  
  //dark mood toogle
  const bg = document.body;
  
  const toggler = document.getElementById("toggler");
  toggler.addEventListener("click", () => {
    bg.classList.toggle("dark");
  });
  