var cities = [];

// "addCity"-funktionen validerar och formaterar användarens input lägger till den i städerna och uppdaterar sedan den visade stadslistan och stadsinformationen.
function addCity() {
    // Hämtar stads-namnet från input-fältet
    var inputCity = document.getElementById("inputCity").value;
    // Hämtar span elementet för fel meddelande;
    var errorSpan = document.getElementById("error");

    // Återställer felmeddelandet;
    errorSpan.textContent = "";

    // Kontrollerar om input-fältet är tomt;
    if (inputCity === "") {
        // Skriver ut ett felmeddelande om man försöka lägga till ett tomt fält;
        errorSpan.textContent = "Please enter a city name.";
        return;
    }

    // Kontrollerar om inmatningen påbörjas med space;
    if (inputCity.charAt(0) === " ") { // Om inmatade staden börjar med space skrivs ett felmeddelande ut;
        errorSpan.textContent = "City name cannot start with a space."; // Skriver ut ett felmeddelande;
        return;
    }

    // Kontrollarar hur många städer som lagts till;
    if (cities.length >= 5) {
        // Om 5 städer lagts till skrivs ett felmeddelande ut;
        errorSpan.textContent = "You have already added 5 cities.";
        return; // Avslutar funktionen;
    }

    // Formaterar stadsnamnet så att den första bokstaven är stor och resterande små;
    var formattedCity = inputCity.charAt(0).toUpperCase() + inputCity.slice(1).toLowerCase();

    // Med den här funktionen tillåts användaren att lägga till en stad med enter-knappen;
document.getElementById("inputCity").addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // Lägger in en händelse när tangenten Enter trycks ned;
        event.preventDefault(); 
        addCity();
    }
});

    // Lägger till den formaterade staden i cities arrayen och uppdaterar;
    cities.push(formattedCity);
    renderCities();
    clearInput(); // Tömmer input-fältet för nästa inmatning;
}

// "sortCities"-funktionen sorterar de tillagda städerna i alfabetisk ordning;
function sortCities() {
    cities.sort();
    renderCities();
}

// "resetForm"-funktionen rensar formuläret från samtliga tillagda städer.
function resetForm() {
    cities = [];
    // Uppdaterar listan och "stadsinformationen";
    renderCities();
    clearInput();
}

// "renderCities"-funktionen uppdaterar de fem textarea-rutorna med namnen på städer som är lagrade i stadsarrayen och
// anropar "updateCityInfo"-funktionen för att visa informationen för den senast tillagda staden.
function renderCities() {
    for (var i = 1; i <= 5; i++) // Tillåter användaren att mata in 5 städer;
    {
        var textarea = document.getElementById("city" + i);
        if (cities[i - 1]) {
            textarea.value = cities[i - 1]; // Ger inmatade städer ett värde;
        } else {
            textarea.value = "";
        }
    }
    updateCityInfo();
}

function updateCityInfo(textarea) {
    var cityInfo = document.getElementById("cityInfo"); // Skriver ut cityInfo elementet;
    var cityCountElement = document.getElementById("cityCount"); // Skriver ut cityCount elementet;
    var lastCityIndex = cities.length - 1; // Räknar ut index av senast tillagda stad;

    if (lastCityIndex >= 0) {
        var cityName = cities[lastCityIndex].toUpperCase(); // Omvandlar från små till stora bokstäver;
        var firstLetter = cityName[0]; // Hämtar första bokstaven i stadens namn;
        var cityLength = cityName.length; // Hämtar ordets längd/antalet bokstäver;
        var cityCount = cities.length; // Hämtar information om antalet inmatade städer;

        // Skriver ut ett meddelande med stad, stadens första bokstav och antalet bokstäver i stadens namn;
        cityInfo.innerHTML = `${cityName} starts with ${firstLetter} and has ${cityLength} letters`;

        // Skriver ut ett meddelande om antalet utskrivna städer i listan;
        cityCountElement.textContent = `Your bucket list contains ${cityCount} cities.`;

    } else {

        cityCountElement.textContent = "No cities added yet."; // Skriver ut ett meddelande när inga städer blivit inmatade;
    }
}

// Rensar input-fältet efter inmatning, och gör fältet redo för en ny inmatning av användaren;
function clearInput() {
    document.getElementById("inputCity").value = "";
    document.getElementById("inputCity").focus();
}