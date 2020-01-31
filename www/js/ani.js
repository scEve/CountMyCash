/* JavaScript-Datei für eigene Animationen */

/**
 * Handler-Funktion des Buttons "btnHome" auf erster Seite mit Link auf zweite Seite
 */
$("#btnHome").click(function () {
    window.location.replace("#startPage");
});

/**
 * Handler-Funktion des Buttons "btnStart" auf zweiter Seite mit Link auf dritte Seite
 *  und zusätzlich Test, ob input-Felder Werte besitzen
 */
$("#btnStart").click(function () {
    if ($("#inpMonth").val() != "" && $("#inpYear").val() != "" && $("#inpMoney").val()) {
        window.location.replace("#inputPage");
    }
    else {
        alert("Bitte fülle zuerst alle Felder aus!");
    }
});

/**
 * Handler-Funktion des Buttons "btnAdd" auf dritter Seite zum Hinzufügen von einzelnen Ausgaben
 *  und zusätzlich Test, ob input-Felder Werte besitzen
 */
$("#btnAdd").click(function () {
    if ($("#inpType").val() != "" && $("#inpAmount").val() != "") { }
    else {
        alert("Bitte fülle zum Hinzufügen die Felder aus!");
    }
});

/**
 * Handler-Funktion des Buttons "btnList" auf dritter Seite mit Link auf vierte Seite
 */
$("#btnList").click(function () {
    window.location.replace("#listPage");
});

/**
 * Handler-Funktion des Buttons "btnAddAnother" auf vierter Seite mit Link zurück auf dritte Seite
 */
$("#btnAddAnother").click(function () {
    window.location.replace("#inputPage");
});

/**
 * Handler-Funktion des Abbruch-Buttons "cancelHeader" auf jeder Seite (außer "Home")
 * mit Link zurück auf Startseite "Home" und zusätzlich Überschreiben aller eingegebenen input-Werte
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
 * Handler-Funktion zur Sicherstellung der Benutzung der App im Porträt-Modus
 */
$(window).resize (function () {
    var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

    if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
        alert("Bitte verwende mich nur im Porträt-Modus!");
    }
});