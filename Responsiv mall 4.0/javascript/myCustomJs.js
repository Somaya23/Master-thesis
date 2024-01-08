
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Hämtar och skickar användarens information med mailto funktionen;
function collectAndSendData() {
    // Hämtar data från formulär;
    var departureDate = $("#datepicker1").val();
    var returnDate = $("#datepicker2").val();
    var priceRange = $("#price-value").text();
    var numberOfTravelers = $("#travelers-value").text();

    // Hämtar de valde städerna från den valbara listan;
    var selectedCities = [];
    $("#selectable .ui-selected").each(function () {
        selectedCities.push($(this).text());
    });
    var cities = selectedCities.join(", ");

    // Hämtar användarens kontakt-information;
    var firstName = $("#name").val();
    var surname = $("#surname").val();
    var email = $("#epost").val();
    var additionalInfo = $("#meddelande").val();

    // Konstruerar email-skelettet;
    var emailBody =
        "Departure Date: " + departureDate + "\n" +
        "Return Date: " + returnDate + "\n" +
        "Price Range: " + priceRange + "\n" +
        "Number of Travelers: " + numberOfTravelers + "\n" +
        "Selected Cities: " + cities + "\n" +
        "First Name: " + firstName + "\n" +
        "Surname: " + surname + "\n" +
        "Email: " + email + "\n" +
        "Additional Info: " + additionalInfo;

    var encodedEmailBody = encodeURIComponent(emailBody);

    // Konstruerar mailto URI;
    var mailtoUri = "mailto:somaya.e78@gmail.com?subject=Travel%20Planner%20Form&body=" + encodedEmailBody;

    // Öppnar en decault e-mail klient för att skicka användarinformationen;
    window.location.href = mailtoUri;
}