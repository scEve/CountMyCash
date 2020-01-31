/* JavaScript-Datei f�r eigene Animationen */

/**
 * Handler-Funktion des Buttons "btnHome" auf erster Seite mit Link auf zweite Seite
 */
$("#btnHome").click(function () {
    window.location.replace("#startPage");
});

/**
 * Handler-Funktion des Buttons "btnStart" auf zweiter Seite mit Link auf dritte Seite
 *  und zus�tzlich Test, ob input-Felder Werte besitzen
 */
$("#btnStart").click(function () {
    if ($("#inpMonth").val() != "" && $("#inpYear").val() != "" && $("#inpMoney").val()) {
        window.location.replace("#inputPage");
    }
    else {
        alert("Bitte f�lle zuerst alle Felder aus!");
    }
});

/**
 * Handler-Funktion des Buttons "btnAdd" auf dritter Seite zum Hinzuf�gen von einzelnen Ausgaben
 *  und zus�tzlich Test, ob input-Felder Werte besitzen
 */
$("#btnAdd").click(function () {
    if ($("#inpType").val() != "" && $("#inpAmount").val() != "") { }
    else {
        alert("Bitte f�lle zum Hinzuf�gen die Felder aus!");
    }
});

/**
 * Handler-Funktion des Buttons "btnList" auf dritter Seite mit Link auf vierte Seite
 */
$("#btnList").click(function () {
    window.location.replace("#listPage");
});

/**
 * Handler-Funktion des Buttons "btnAddAnother" auf vierter Seite mit Link zur�ck auf dritte Seite
 */
$("#btnAddAnother").click(function () {
    window.location.replace("#inputPage");
});

/**
 * Handler-Funktion des Abbruch-Buttons "cancelHeader" auf jeder Seite (au�er "Home")
 * mit Link zur�ck auf Startseite "Home" und zus�tzlich �berschreiben aller eingegebenen input-Werte
 */
$(".cancelHeader").click(function () {
    window.location.replace("#homePage");

    $("#inpMonth").val("");
    $("#inpYear").val("");
    $("#inpMoney").val("");
    $("#inpType").val("");
    $("#inpAmount").val("");
});

/**
 * Handler-Funktion zur Sicherstellung der Benutzung der App im Portr�t-Modus
 */
$(window).resize (function () {
    var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

    if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
        alert("Bitte verwende mich nur im Portr�t-Modus!");
    }
});