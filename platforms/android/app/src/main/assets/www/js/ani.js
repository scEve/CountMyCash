/* JavaScript-Datei f�r eigene Animationen */

$("#btnHome").click(function () {
    window.location.replace("#startPage");
});

$("#btnStart").click(function () {
    if ($("#inpMonth").val() != "" && $("#inpYear").val() != "" && $("#inpMoney").val()) {
        window.location.replace("#inputPage");
    }
    else {
        alert("Bitte f�lle zuerst alle Felder aus!");
    }
});

$("#btnAdd").click(function () {
    if ($("#inpType").val() != "" && $("#inpAmount").val() != "") { }
    else {
        alert("Bitte f�lle zum Hinzuf�gen die Felder aus!");
    }
});

$("#btnList").click(function () {
    window.location.replace("#listPage");
});

$("#btnAddAnother").click(function () {
    window.location.replace("#inputPage");
});

$(".cancelHeader").click(function () {
    window.location.replace("#homePage");

    $("#inpMonth").val("");
    $("#inpYear").val("");
    $("#inpMoney").val("");
    $("#inpType").val("");
    $("#inpAmount").val("");
});