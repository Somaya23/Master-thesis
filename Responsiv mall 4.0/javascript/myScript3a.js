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
