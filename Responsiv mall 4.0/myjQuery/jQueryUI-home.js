$(document).ready(function () {
    // Skapar en trigger som aktiverar toggle fukntionen;
    $(".toggle-trigger").click(function () {
        // Hittar nästa syskon med klassen "toggle-info" och togglar synligheten;
        $(this).next(".toggle-info").toggle("fade", "slow");
    });
    // Skapar dialogrutan och öppna den direkt;
    $("#terms-dialog").dialog({
        autoOpen: true, // Öppnar dialogrutan automatiskt när sidan laddas;
        modal: true,
        width: "80%", // Anpassar bredden;
        buttons: {
            "Accept": function () {
                if ($("#read-terms-checkbox").prop("checked")) {
                    // Om användaren har klickat i kryssrutan kan användare stänga dialogrutan;
                    $(this).dialog("close");
                } else {
                    // Annars markeras checkboxen med rött;
                    $("#read-terms-checkbox").addClass("error-checkbox");
                }
            }
        }
    });
});




