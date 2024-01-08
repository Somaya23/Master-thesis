
$(document).ready(function () {
    $("#hide").hide(); // Döljer bilden thankyou.png;
    $("#show").show(); // Visar bilden please.png;

    // Anropar funktionen saveFile;
    $("#bt").click(function () {
        saveFile();
    });
})

function saveFile() {
     // Förhindra att flera alertmeddelanden poppar upp när användaren försöker skicka formuläret;
     $("#bt").off().click(function () {
        saveFile();
    });
    // Hämtar vardera id:s värde från dess element
    // och tilldelar de till varderas variabel;
    const name = $("#txtName").val();
    const email = $("#txtEmail").val();
    const city = $("#selCity").val();
    const msg = $("#msg").val();

    // Validerar formulärets fält;
    if (validateForm(name, email, city, msg)) {
        // Skapar en sträng för att representera formulärdata, och lägger till variablernas data i textformat med radbrytningar;
        const data = '\r Name: ' + name + ' \r\n ' +
            'Email: ' + email + ' \r\n ' +
            'City: ' + city + ' \r\n ' +
            'Message: ' + msg;

        // Konverterar texten till BLOB (Binary Large Object)
        const textToBLOB = new Blob([data], { type: 'text/plain' });
        const sFileName = 'formData.txt'; // The file to save the data.

        const newLink = document.createElement("a");
        // skapar ett HTML 'a'-element för att länka till den nedladdade filen;
        newLink.download = sFileName;
        // Anger filnamnet för nedladdningen;

        // Här skapas en URL från BLOB för nedlddning;
        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        } else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
            // Använder window.webkitURL eller window.URL för att skapa en URL av en Blob,
            // beroende på webbläsaren, window.URL används för moderna webbläsare;
        }

        newLink.click();
        // Anropar displayImage funktionen för att dölja bildfilen please.png och visa thankyou.png när man trycker på Send och formuläret fyllts i och sparats framgångsrikt;
        displayImage("#show", "#hide");
    } else {
        // Om formuläret är felaktigt ifyllt skrivs ett fel-meddelande ut med en alert;
        alert("Please fill in all fields correctly.");
    }
}

function validateForm(name, email, city, message) {
    // Kontrollerar om fälten är ifyllda;
    if (name === "" || email === "" || city === "" || message === "") {
        // Om ett fält ej är ifyllt skrivs ett felmeddelande ut med en alert;
        alert("Please fill in all fields.");
        // Markerar tomma fält med en röd border genom att anropa funktionen highlightEmpytField;
        highlightEmptyField([$("#txtName"), $("#txtEmail"), $("#selCity"), $("#msg")]);

        return false;
    }

    // Validerar formatet som e-postadressen måste anges i;
    var emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        // Om e-postadressen angetts i ett felaktigt format skrivs ett felmeddelande ut med en alert;
        alert("Please enter a valid email address.");
        // fältet får då en rödmarkerad border genom att anropa funktionen highlightEmptyField;
        highlightEmptyField([$("#txtName"), $("#txtEmail"), $("#selCity"), $("#msg")]);

        return false;
    }

    return true;
}

function highlightEmptyField(elements) {
    //Itererar över varje element i arrayen;
    elements.forEach(element => {
// Lägger till en händelselyssnare på aktuellt element;
        $(element).on('input', function () {
            //kontrollerar om ett fält är ifyllt;
            if ($(this).val() !== "") {
                // Återställer fältet till ordinarie border-färg om fältet är ifyllt;
                $(this).css("border", "");
                // Tar bort händelselyssnaren i aktuellt fält när användaren börjat skriva;
                $(this).off('input');
            }
        });

        // Kontrollerar om fältet är tomt och ger det en röd-färgad border isåfall;
        if ($(element).val() === "") {
            $(element).css("border", "1px solid red");
        }
    });
}

function displayImage(showSelector, hideSelector) {
    // När formuläret är korrekt ifyllt och skickas iväg med Send-knappen byter elementet vilken bild som ska visas;
    $(showSelector).hide(); // Döljer bilden med id #show;
    $(hideSelector).show(); // Visar bilden med id #hide;
}

