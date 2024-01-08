
$(document).ready(function () {
    // Initierar prisspannet för resenärens(ernas) budget;
    $("#price-slider").slider({
        range: true,
        min: 0,
        max: 100000,
        values: [0, 100000],
        slide: function (event, ui) {
            $("#price-value").text(ui.values[0] + " - " + ui.values[1]);
        }
    });

    // Initierar nummerspannet till slidern för antalet resenärer ;
    $("#travelers-slider").slider({
        range: false,
        min: 1,
        max: 10,
        value: 1,
        slide: function (event, ui) {
            $("#travelers-value").text(ui.value);
        }
    });

    // Click funktion för toggle dreams elementet;
    $("#dreams").click(function () {
        $("#dreamsContent").toggle("fade", "slow");
    });
});

$(function () {
    $("#datepicker1").datepicker({
        // Gör så att användaren inte kan väla et paserat datum;
        minDate: 0,
        onSelect: function (selectedDate) {
            // Ställer in minDate för datepicker2 att vara det valda Datum + 1 dag
            $("#datepicker2").datepicker("option", "minDate", selectedDate);
        }
    });
});

$(function () {
    $("#datepicker2").datepicker({
        minDate: 0 // // Baserar återresans datum i kalendern på det valda utresedatumet;
    });
});

$(function () {
    $("#selectable").selectable();
});

$(document).ready(function () {

    // Click funktion för "subbtn"
    $("#subbtn").click(function () {
        collectAndSendData();
    });
});

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