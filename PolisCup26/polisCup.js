/* =======================
   POLIS CUP FORM
======================= */

/* =======================
   CONFIG & STATE
======================= */

const sportSelect = document.querySelector('[id="00NR2000009GyW5"]');
const categoriaSelect = document.querySelector('[id="00NR200000DGj89"]');
const addBtn = document.querySelector('#adddate');
const form = document.querySelector('#form');

let datesCountId = 1;

let datesArray = [];

function getQueryParams() {
    let params = {};
    let queryString = window.location.search.substring(1);
    let regex = /([^&=]+)=([^&]*)/g;
    let match;

    while (match = regex.exec(queryString)) {
        params[decodeURIComponent(match[1])] = decodeURIComponent(match[2].replace(/\+/g, " "));
    }
    return params;
}

function fillForm() {
    let params = getQueryParams();
    for (let key in params) {
        let element = document.getElementsByName(key)[0];
        if (element) {
            element.value = params[key];
        }
    }
}

function decodeAndSubmitForm() {
    form.action = atob("aHR0cHM6Ly93ZWJ0by5zYWxlc2ZvcmNlLmNvbS9zZXJ2bGV0L3NlcnZsZXQuV2ViVG9DYXNlP2VuY29kaW5nPVVURi04Jm9yZ0lkPTAwRDA2MDAwMDAxYTlDOA==");
    return true;
}

function setFields(){
    const subjectField = document.querySelector("#subject");

    const caseTypeField = document.querySelector("#type");

    subjectField.value = "Iscrizione Polis CUP - " + document.querySelector('[id="00NR200000DGj89"]').value + " (" + document.querySelector('[id="00NR2000009GyW5"]').value + ")";
    caseTypeField.value = "POLIS CUP";

}

function setDescription(){
    const descriptionField = document.querySelector("#description");

        descriptionField.value += "\n---------------\nEVENTUALI INDISPONIBILITA': \n";
        for (let i = 0; i < datesArray.length; i++) {
            descriptionField.value += datesArray[i] + "\n";
        }


}

/* =======================
   UI HELPERS
======================= */

function toggleTableVisibility(tableId, array) {
    const table = document.querySelector(tableId);
    if (!table) return;

    table.style.display = array.length === 0 ? "none" : "table";
}

function removeTableRow(row, array, elementToRemove) {
    if (!row || !array) return;

    row.remove();

    const index = array.indexOf(elementToRemove);
    if (index !== -1) array.splice(index, 1);
}

function capitalizeWords(str) {
    return str
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}

function alreadExists(array, element) {
    return array.includes(element);
}

/* =======================
   FORM LOGIC
======================= */

function showCheckbox() {

    const container = document.getElementById("preferenze-container");

    const showExtra =
        sportSelect.value === "CA7" &&
        categoriaSelect.value === "Under 11";

    const existingE = document.getElementById("prefE");
    const existingF = document.getElementById("prefF");

    if (showExtra) {

        if (!existingE) {
            const divE = document.createElement("div");
            divE.className = "form-check";
            divE.innerHTML = `
                <input class="form-check-input" type="checkbox" name="00NR200000DGrnF" id="prefE" value="E">
                <label class="form-check-label" for="prefE">E</label>
            `;
            container.appendChild(divE);
        }

        if (!existingF) {
            const divF = document.createElement("div");
            divF.className = "form-check";
            divF.innerHTML = `
                <input class="form-check-input" type="checkbox" name="00NR200000DGrnF" id="prefF" value="F">
                <label class="form-check-label" for="prefF">F</label>
            `;
            container.appendChild(divF);
        }

    } else {
        existingE?.parentElement.remove();
        existingF?.parentElement.remove();
    }
}

/* =======================
   CATEGORIE
======================= */

function populateCategorie() {
    const categorie = {
        CA7: ["", "Big Small", "Under 9", "Under 10", "Under 11", "Under 12", "Under 13", "Under 17", "Open Femminile"],
        CAL: ["", "Under 15", "Allievi"],
        PVO: ["", "Under 11", "Under 12", "Ragazze", "Allieve", "Under 17", "Juiores"]
    };

    // Funzione per popolare il select categorie
    function aggiornaCategorie(selectedSport, selectedCategoria = null) {
        categoriaSelect.innerHTML = "";

        if (!categorie[selectedSport]) {
            categoriaSelect.innerHTML = '<option value="">-- Seleziona uno sport --</option>';
            return;
        }

        categorie[selectedSport].forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;

            // Se c'è un valore precompilato lo seleziona
            if (cat === selectedCategoria) {
                option.selected = true;
            }

            categoriaSelect.appendChild(option);
        });
    }

    // Legge i parametri dall'URL
    const urlParams = new URLSearchParams(window.location.search);
    const sportParam = urlParams.get("00NR2000009GyW5");
    const categoriaParam = urlParams.get("00NR200000DGj89");

    // Se c'è un parametro sport, selezionalo
    if (sportParam) {
        sportSelect.value = sportParam;
        aggiornaCategorie(sportParam, categoriaParam);
    } else {
        // Popolamento iniziale senza parametri
        aggiornaCategorie(sportSelect.value, categoriaSelect.value);
    }

    // Aggiorna quando cambia lo sport
    sportSelect.addEventListener("change", () => {
        aggiornaCategorie(sportSelect.value);
    });
}

/* =======================
   DATE INDISPONIBILIA'
======================= */

function addNewDate() {
    const input = document.querySelector("#dataind");
    const table = document.querySelector("#datetablebody");
    const errormessage = document.querySelector("#errormessage");

    if (!input.value) {
        errormessage.innerHTML = '<span id="colored">ATTENZIONE: data mancante!</span>';
        return;
    }

    const formatted = new Date(input.value).toLocaleDateString("it-IT");

    if (!alreadExists(datesArray,formatted)){
        const row = document.createElement("tr");
        row.id = "row" + datesCountId;

        const cellDate = document.createElement("td");
        cellDate.textContent = formatted;

        const cellBtn = document.createElement("td");
        const btn = document.createElement("button");
        btn.className = "btn btn-danger";
        btn.innerHTML = '<i class="bi bi-trash-fill"></i>';

        btn.addEventListener("click", () => {
            removeTableRow(row, datesArray, formatted);
            toggleTableVisibility("#datatable", datesArray);
        });

        cellBtn.appendChild(btn);
        row.append(cellDate, cellBtn);
        table.appendChild(row);

        errormessage.innerHTML = "";
        input.value = "";

        datesArray.push(formatted);
        toggleTableVisibility("#datatable", datesArray);
        console.log(datesArray);
        datesCountId++;
    }

}

/* =======================
   INIT EVENTS
======================= */

sportSelect.addEventListener("change", () => {
    showCheckbox();
});

categoriaSelect.addEventListener("change", () => {
    showCheckbox();
});

addBtn.addEventListener("click", () => {
    addNewDate();
});

form.addEventListener("submit", function (e) {
    setFields();
    setDescription();
    decodeAndSubmitForm();
});

document.addEventListener("DOMContentLoaded", () => {
    fillForm();
    populateCategorie();
});
