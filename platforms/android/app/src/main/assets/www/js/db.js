// DATENBANK (IndexedDB)

let db = null;
let monthCounter = 1;
let spendingsCounter = 1;

const btnCreate = document.getElementById("btnHome");
const btnAddMonth = document.getElementById("btnStart");
const btnAddSpending = document.getElementById("btnAdd");
const btnView = document.getElementById("btnList");
// const btnUpdate = document.getElementById("btnUpdate"); // noch anzupassen
const cancel = document.getElementById("1");
btnCreate.addEventListener("click", createDb);
btnAddMonth.addEventListener("click", addMonth);
btnAddMonth.addEventListener("click", updateText);
btnAddSpending.addEventListener("click", addSpending);
btnView.addEventListener("click", viewData);

// btnUpdate.addEventListener("click", updateData);

function updateData() {
    const tx = db.transaction("Monate", "readwrite");
    const workers = tx.objectStore("Monate");

    const arbeiter = {
        id: "1",
        name: "Helmuth",
        age: "103"
    }

    const request = workers.put(arbeiter);

    request.onsuccess = function (evt) {
        console.log("Der Datenbank-Eintrag wurde aktualisiert!");
    }
    request.onerror = function (evt) {
        console.log("Die Aktualisierung des Datenbank-Eintrags ist fehlgeschlagen!");
    }
}

function deleteData() {
    let delId = Number(this.parentElement.id.replace(/^\D+/g, ''));
    
    const tx = db.transaction("Ausgaben", "readwrite");
    const spender = tx.objectStore("Ausgaben");

    const request = spender.delete(delId);

    request.onsuccess = function (evt) {
        console.log("Der Eintrag mit der Id " + delId + " wurde erfolgreich gelöscht.");
        viewData();
    }
    request.onerror = function (evt) {
        alert("Error found in deletion process");
    }
}

function viewData() {
    const inpMonth = document.getElementById("inpMonth").value;
    const inpYear = document.getElementById("inpYear").value;
    const monthYear = inpMonth + " " + inpYear;

    const list = document.getElementById("myList");
    
    const tx = db.transaction("Ausgaben", "readonly");
    const spender = tx.objectStore("Ausgaben");
    const request = spender.openCursor();

    list.innerHTML = "";

    request.onsuccess = evt => {
        const cursor = evt.target.result;

        if (cursor) {
            if (cursor.value.time == monthYear) {
                let li = document.createElement("li");
                li.className = "item";
                li.id = "listing" + cursor.value.id;
                let d = document.createElement("div");
                d.className = "itemText";
                let t = document.createTextNode(cursor.value.name);
                d.appendChild(t);
                li.appendChild(d);
                let m = document.createTextNode(cursor.value.price + "€");
                li.appendChild(m);
                list.appendChild(li);

                let span = document.createElement("SPAN");
                span.className = "close";
                span.addEventListener("click", deleteData);
                li.appendChild(span);
                /*
                console.log(cursor.key);
                console.log(cursor.value.id);
                console.log(cursor.value.time);
                console.log(cursor.value.name);
                console.log(cursor.value.price);
                */
            }
            cursor.continue();
        }
        else {
            console.log("Es sind keine weiteren Einträge verfügbar!");
        }
    }
    updateCapital();
}

function addSpending() {
    const inpMonth = document.getElementById("inpMonth").value;
    const inpYear = document.getElementById("inpYear").value;
    const monthYear = inpMonth + " " + inpYear;
    let inpType = document.getElementById("inpType");
    let inpAmount = document.getElementById("inpAmount");
    var value = [];

    if (inpType.value != "" && inpAmount.value != "") {
        const tx = db.transaction("Ausgaben", "readwrite");
        tx.onerror = evt => { "Error! Id ist schon vergeben (Fehler wsl im spendingsCounter)" };
        const spender = tx.objectStore("Ausgaben");

        const request = spender.getAllKeys();

        request.onsuccess = evt => {
            for (var i = 0; i < (request.result.length + 1); i++) {
                if (request.result.includes(i)) {
                    console.log("Die Id " + i + " ist bereits in der Datenbank vorhanden!");
                }
                else {
                    console.log("Die Id ist noch nicht vergeben!");
                    value.push(i);
                    console.log("neue Values: " + value);
                }
            }
            console.log(Math.min.apply(null, value));
            var minId = Math.min.apply(null, value);

            const spending = {
                id: minId,
                time: monthYear,
                name: inpType.value,
                price: inpAmount.value
            }
            console.log(spending);

            const result = spender.add(spending);

            result.onsuccess = evt => {
                // spendingsCounter++;
                alert(`Die Ausgabe ${inpType.value} mit dem Wert ${inpAmount.value} wurde erfolgreich für ${monthYear} hinzugefügt!`);
                inpType.value = "";
                inpAmount.value = "";
            }
        }

        /*
        const num = spender.count();

        num.onsuccess = evt => {
            const help = num.result;
        }
            console.log("Hier kommt hoffentlich die Anzahl der Elemente in der Ausgaben-Tabelle: " + help);

            for (var i = 0; i < help; i++) {
                const aux = spender.count(value);
                aux.onsuccess = evt => {
                    if (aux.result == 1) {
                        value++;
                    }
                    else if (aux.result == 0) {
                        spendingsCounter = value;
                    }
                }
            }

            console.log("Hier kommt die Erleuchtung: " + );

            console.log("Value: " + value + " & Counter: " + spendingsCounter);


            spendingsCounter.onsuccess = function () {
            }
        */
    }
}

/*
function countEntries() {
    const request = spender.openCursor();

    request.onsuccess = evt => {
        const cursor = evt.target.result;

        if (cursor) {
            if (cursor.value.id > value) {
                value = cursor.value.id;
            }
            else {
                cursor.continue();
            }
        }
    }
} */

function addMonth() {
    const inpMonth = document.getElementById("inpMonth").value;
    const inpYear = document.getElementById("inpYear").value;
    const monthYear = inpMonth + " " + inpYear;
    const inpMoney = document.getElementById("inpMoney").value;

    if (inpMonth != "" && inpYear != "" && inpMoney != "") {
        const tx = db.transaction("Monate", "readwrite");
        tx.onerror = evt => console.log("Error! Der Monat mit dieser ID ist bereits in der Datenbank vorhanden!");
        const months = tx.objectStore("Monate");

        var request = months.getAllKeys();

        request.onsuccess = evt => {
            if (request.result.includes(monthYear)) {
                var answer = window.confirm("Für diesen Monat gibt es bereits Einträge. Möchtest du beim bisherigen Stand fortsetzen (OK) oder diesen Monat neu beginnen (CANCEL)?")
                if (answer == false) {
                    const tx = db.transaction("Ausgaben", "readwrite");
                    const spender = tx.objectStore("Ausgaben");
                    const request = spender.openCursor();

                    request.onsuccess = evt => {
                        const cursor = evt.target.result;
                        console.log("Wie siehts hier aus?");
                        if (cursor) {
                            console.log(cursor.value.time);
                            if (cursor.value.time == monthYear) {
                                const auxReq1 = spender.delete(cursor.value.id);
                                auxReq1.onsuccess = evt => {
                                    console.log("Gefunden!");
                                }
                            }
                            cursor.continue();
                        }
                    }
                    const auxReq2 = months.delete(monthYear);
                    auxReq2.onsuccess = evt => {
                        console.log("Klappt auch!");
                    }
                }
            }

            const timespan = {
                id: monthCounter,
                time: monthYear,
                month: inpMonth,
                year: inpYear,
                capital: inpMoney.value
            }

            const result = months.add(timespan);

            result.onsuccess = evt => {
                monthCounter++;
                alert(`${inpMonth} ${inpYear} wurde erfolgreich in die Monats-Tabelle eingefügt!`);
            }
        }
    }    
}

function updateText() {
    const inpMonth = document.getElementById("inpMonth").value;
    const inpYear = document.getElementById("inpYear").value;
    const monthYear = inpMonth + " " + inpYear;
    const inpMoney = document.getElementById("inpMoney").value;

    document.getElementById("selDate1").innerHTML = monthYear;
    document.getElementById("selDate2").innerHTML = monthYear;
    document.getElementById("selMoney1").innerHTML = inpMoney + "€";
    document.getElementById("selMoney2").innerHTML = inpMoney + "€";
    // document.getElementById("selMoneyLeft").innerHTML = inpMoney + "€";
}

function updateCapital() {
    const inpMonth = document.getElementById("inpMonth").value;
    const inpYear = document.getElementById("inpYear").value;
    const monthYear = inpMonth + " " + inpYear;
    var output = document.getElementById("inpMoney").value;
    // var output = document.getElementById("selMoneyLeft").innerHTML;

    var rest = (output.match(/\d/g)).join("");

    const tx = db.transaction("Ausgaben", "readonly");
    const spender = tx.objectStore("Ausgaben");
    const request = spender.openCursor();

    request.onsuccess = evt => {
        const cursor = evt.target.result;
        
        if (cursor) {
            if (cursor.value.time == monthYear) {
                rest = rest - cursor.value.price;
                console.log("Subtraktion klappt mit " + cursor.value.price + "!");
                console.log("Neuer Rest: " + rest);
            }
            cursor.continue();
        }

        document.getElementById("selMoneyLeft").innerHTML = rest + "€";
    }
    request.onerror = evt => {
        console.log("Fehler beim Kapital-Rechner!");
    }
}

/*
function createObjectStore() {
    const inpMonth = document.getElementById("inpMonth").value;
    const inpYear = document.getElementById("inpYear").value;
    const monthYear = inpMonth + " " + inpYear;
    const request = indexedDB.open("Meine Datenbank", 1);

    request.onupgradeneeded = evt => {
        db = evt.target.result;
        /* Ausgaben = {
         *      id: 1,
         *      name: "Lebensmittel",
         *      price: 100
         * }
        */
/*
        const worker = db.createObjectStore(`Ausgaben ${monthYear}`, { keyPath: "id", autoIncrement: true });
        alert(`${monthYear}-Table is upgraded!`);
    }

    request.onsuccess = evt => {
        db = evt.target.result;
        alert(`${monthYear}-Table succeded!`);
    }

    request.onerror = evt => {
        alert(`${monthYear}-Table errored!`);
    }
}*/

function createDb() {
    const request = indexedDB.open("Meine Datenbank", 1);
    
    request.onupgradeneeded = evt => {
        db = evt.target.result;
        /* Monat = {
         *      id: 1,
         *      time: "January 2020"
         *      month: "January",
         *      year: 2020,
         *      capital: 5000
         * }
         * 
         * Ausgabe = {
         *      id: 1,
         *      time: "January 2020",
         *      name: "Lebensmittel",
         *      price: 100
         * }
        */
        const months = db.createObjectStore("Monate", { keyPath: "time", autoIncrement: true });
        const spendings = db.createObjectStore("Ausgaben", { keyPath: "id", autoIncrement: true });

        // alert("DB is upgraded!");
    }

    request.onsuccess = evt => {
        db = evt.target.result;
        // alert("DB success");
    }

    request.onerror = evt => {
        alert("DB error!");
    }
}