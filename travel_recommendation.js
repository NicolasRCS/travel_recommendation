let travelData = {};

fetch("./travel_recommmendation_api.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el JSON");
    }
    return response.json();
  })
  .then(data => {
    travelData = data;
    console.log("JSON cargado correctamente:", data);
  })
  .catch(error => {
    console.error("Error al cargar JSON:", error);
  });

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchBtn").addEventListener("click", function () {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    let results = [];

    if (!travelData.countries) {
      console.log("El JSON todavía no cargó o falló la carga");
      return;
    }

    if (
      input === "beach" ||
      input === "beaches" ||
      input === "playa" ||
      input === "playas"
    ) {
      results = travelData.beaches;
    } 
    else if (
      input === "temple" ||
      input === "temples" ||
      input === "templo" ||
      input === "templos"
    ) {
      results = travelData.temples;
    } 
    else {
      const country = travelData.countries.find(country =>
        country.name.toLowerCase() === input
      );

      if (country) {
        results = country.cities;
      }
    }

    displayResults(results);
  });

  document.getElementById("clearBtn").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
  });
});

function displayResults(results) {
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";
  
    if (results.length === 0) {
      resultDiv.innerHTML = "<p style='color:white;'>No se encontraron resultados.</p>";
      return;
    }
  
    results.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      `;
  
      resultDiv.appendChild(card);
    });
  }