// Den här variabeln är ett tomt objekt som lagrar användarens favoritländer;
let userFavoriteCountries = {};
// Den här variabeln lagrar och håller reda på det aktuella användarnamn;
let currentUsername = "";
// Den här variabel tilldelar ett serienummer till de länder användaren lägger till i sin favorit lista;
let serialNumber = 1;

function myFavorites() {
    // Hämtar username-inputs
    const usernameInputs = document.getElementsByName("username");
    const usernameInput = usernameInputs[0];
    const username = usernameInput.value.trim();

    // Kontrollerar om användarnamnet har ändrats;
    if (currentUsername !== username) {
        // Återställer listan för en ny användare;
        userFavoriteCountries[username] = [];
        currentUsername = username;

        // Återställer serienumret för den nya användar-listan;
        serialNumber = 1;

        // Raderar den gamla listan genom att tömma innehållet i list div:en;
        const listElements = document.getElementsByName("list");
        const listElement = listElements[0];
        if (listElement) {
            listElement.innerHTML = "";

            // Skriver ut en ny header med namnet på den aktuella användaren;
            const changeHeadElements = document.getElementsByName("changeHead");
            const changeHeadElement = changeHeadElements[0];
            if (changeHeadElement) {
                changeHeadElement.innerText = `${username}'s favorite list:`;
            } else {
                console.error("changeHeadElement is not defined");
            }
        } else {
            console.error("listElement is not defined");
        }
    }

    // Hämtar countrySelect elementet;
    const countrySelects = document.getElementsByName("countrySelect");
    const countrySelect = countrySelects[0];

    // Get the selected options
    // Hämtar de valda elementen (länderna som användaren har valt)
    const selectedCountries = countrySelect.selectedOptions;

    // Lägger till de valda länderna i användarens lista;
    Array.from(selectedCountries).forEach(option => {
        addFavoriteCountry(username, option.value);
    });

    // Sparar användarens favoritländer i en cookie
    saveListToCookie(username);

    // Skriver ut användarens favoritländer;
    printFavoriteCountries(username);
}

function addFavoriteCountry(username, country) {
    if (!userFavoriteCountries[username]) {
        userFavoriteCountries[username] = [];
    }

    // Lägger till det valda landet med ett serienummer i användarens lista;
    userFavoriteCountries[username].push({ serialNumber, country });

    // Ger länderna serienumer som ökar med 1 för varje inmatade land;
    serialNumber++;
}

function printFavoriteCountries(username) {
    const listElements = document.getElementsByName("list");
    const listElement = listElements[0];

    // Rensar listan när en ny användare lägger till sina länder;
    if (listElement) {
        listElement.innerHTML = "";

        // Lägger till nya länder till listan;
        listElement.innerHTML += ``;

        // Skriver ut varje land i numrerad orning med ett serienummer;
        if (userFavoriteCountries[username]) {
            userFavoriteCountries[username].forEach(countryObj => {
                listElement.innerHTML += `${countryObj.serialNumber}. ${countryObj.country}<br>`;
            });
        }
    } else {
        console.error("listElement is not defined");
    }
}

function saveListToCookie(username) {
    // Skapar en lista över användarens favoritländer som en sträng
    const listArray = userFavoriteCountries[username].map(countryObj => `${countryObj.country}`);
    const listString = listArray.join(',');

    // Sparar användarens favoritländer i en cookie som kommer att hålla i 30 dagar
    setCookie(username, listString, 30);
}

function getUserFavorites() {
    // Hämtar användarens valda användarnamn från inputfältet
    const pickUsernameInputs = document.getElementsByName("pickUsername");
    const pickUsernameInput = pickUsernameInputs[0];
    const pickUsername = pickUsernameInput.value.trim();

    // Hämtar användarens favoritländer från cookien
    const listString = getCookie(pickUsername);
    // Hämtar listElement från formuläret med hjälp av taggen "div" och attributet "name"
    const listElements = document.getElementsByName("list");
    const listElement = listElements[0];

    if (listString && listElement) {
        // Om det finns favoritländer, skapa element och visa dem
        const listArray = listString.split(','); // Delar upp cookie strängen i en array;
        listElement.innerHTML = ""; // Tömmer listan för ny användare;

        // Skapar ett nytt div-element för varje land som läggs till i listan;
        listArray.forEach((country, index) => {
            const listItem = document.createElement("div");
            listItem.innerHTML = `${index + 1}. ${country}`;
            listElement.appendChild(listItem);
        });

        // Skriver ut "användaren's favorite list:" när en ny användare skapar en ny lista;
        const changeHeadElements = document.getElementsByName("changeHead");
        const changeHeadElement = changeHeadElements[0];
        
        if (changeHeadElement) {
            // Uppdaterar rubriken med användarens namn
            changeHeadElement.innerText = `${pickUsername}'s favorite list:`;
        } else {
            console.error("changeHeadElement is not defined");
        }
    } else {
        // Om det inte finns några favoritländer eller om listElement inte hittas
        // Visas ett meddelande till användaren
        const errorMessage = "User's list not found. Please check the username.";

        // Skapa ett span-element för att visa felmeddelandet
        const errorSpan = document.createElement("span");
        errorSpan.style.color = "red";  // Om du vill ge felmeddelandet en röd färg
        errorSpan.innerText = errorMessage;

        // Hämta eller skapa en container för felmeddelandet
        const errorContainer = document.getElementById("errorContainer");
        if (errorContainer) {
            // Töm eventuellt tidigare felmeddelande
            errorContainer.innerHTML = "";
            // Lägg till det nya felmeddelandet
            errorContainer.appendChild(errorSpan);
        } else {
            console.error("errorContainer is not defined");
        }
    }
}

function setCookie(name, value, days) {
    // Sätter en cookie med namn, värde och utgångsdatum (om det finns)
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    // Hämtar värdet av en cookie baserat på dess namn
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }

    return null;
}