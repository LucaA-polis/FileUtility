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

document.addEventListener("DOMContentLoaded", () => {
    fillForm();
});

form.addEventListener("submit", function (e) {
    decodeAndSubmitForm();
});