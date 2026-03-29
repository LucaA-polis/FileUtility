/* =======================
   GREEN VOLLEY FORM
======================= */

/* =======================
   CONFIG & STATE
======================= */

const categoriaSelect = document.querySelector('[id="00NR200000DGj89"]');
const form = document.querySelector('#form');

/* =======================
   SUBMIT FORM
======================= */

function decodeAndSubmitForm() {
    setFields();

    form.action = atob("aHR0cHM6Ly93ZWJ0by5zYWxlc2ZvcmNlLmNvbS9zZXJ2bGV0L3NlcnZsZXQuV2ViVG9DYXNlP2VuY29kaW5nPVVURi04Jm9yZ0lkPTAwRDA2MDAwMDAxYTlDOA==");

    return true;
}

function setFields(){

    const subjectField = document.querySelector("#subject");
    const caseTypeField = document.querySelector("#type");
    const sportValue = document.querySelector('[id="00NR2000009GyW5"]');

    subjectField.value = "Iscrizione Green Volley - " + categoriaSelect.value;
    caseTypeField.value = "GREEN VOLLEY";
    sportValue.value = "PVO";


}

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

function checkOpenEmail(){

    const campi = ["company", "00NR2000001vzhJ"];

    if (document.querySelector('#openemail').value === "true") {
        campi.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.readOnly = true;
                el.disabled = true;
                el.classList.add("readonly-style");
            }
        });
    }
}

/* =======================
   UI HELPERS
======================= */

function capitalizeWords(str) {
    return str
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}

/* =======================
   EVENTS
======================= */


document.addEventListener("DOMContentLoaded", () => {
    fillForm();
    checkOpenEmail();
});

form.addEventListener("submit",e=>{
    if(!decodeAndSubmitForm()) e.preventDefault();
});
