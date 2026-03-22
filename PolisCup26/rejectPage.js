const form = document.querySelector('#form');

function decodeAndSubmitForm() {
    form.action = atob("aHR0cHM6Ly93ZWJ0by5zYWxlc2ZvcmNlLmNvbS9zZXJ2bGV0L3NlcnZsZXQuV2ViVG9DYXNlP2VuY29kaW5nPVVURi04Jm9yZ0lkPTAwRDA2MDAwMDAxYTlDOA==");
    return true;
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

function setFields(){
    const sport = document.querySelector('[id="00NR2000009GyW5"]').value;
    const categoria = document.querySelector('[id="00NR200000DGj89"]').value;
    const type = document.querySelector('#type');
    const subject = document.querySelector('#subject');

    if (sport === 'PVO' && (categoria === 'Under 10' || categoria === 'Top Junior' || categoria === 'Open Femminile')) {
        type.value = "GREEN VOLLEY";
        subject.value = "Rifiuto Iscrizione Green Volley";
    } else {
        type.value = "POLIS CUP";
        subject.value = "Rifiuto Iscrizione Polis Cup";
    }
}

function setImg(){
    const sport = document.querySelector('[id="00NR2000009GyW5"]').value;
    const categoria = document.querySelector('[id="00NR200000DGj89"]').value;

    if (sport === 'PVO' && (categoria === 'Under 10' || categoria === 'Top Junior' || categoria === 'Open Femminile')) {
        document.querySelector('#logo').src = "https://www.sgp2seregno.it/documenti/poliscup/2026/Loghi/GreenVolley26.svg";
    } else {
        document.querySelector('#logo').src = "https://www.sgp2seregno.it/documenti/poliscup/2026/Loghi/PolisCup26.svg";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fillForm();
    setImg();
});

form.addEventListener("submit", function (e) {
    setFields();
    decodeAndSubmitForm();
});