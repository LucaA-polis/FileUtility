//GreenVolley
let memberNames = [];
let memberList = [];
let memberCount = 0;
let tournamentDate = new Date("2025-09-21");
let countId = 1;
const form = document.querySelector("#form");

function decodeAndSubmitForm() {
    form.action = atob("aHR0cHM6Ly93ZWJ0by5zYWxlc2ZvcmNlLmNvbS9zZXJ2bGV0L3NlcnZsZXQuV2ViVG9DYXNlP2VuY29kaW5nPVVURi04Jm9yZ0lkPTAwRDA2MDAwMDAxYTlDOA==");
    return true;
}

function addNewMember() {
    const nomeAtleta = capitalizeWords(document.querySelector("#nome").value.trim());
    const birthDate = document.querySelector("#datanascita").value.trim();
    const consent = document.querySelector("#terms").checked;
    const table = document.querySelector("#tablebody");
    const errormessage = document.querySelector("#errormessage");

    let birthDateFormatted = "";
    if (birthDate) {
        const dateObj = new Date(birthDate);
        birthDateFormatted = dateObj.toLocaleDateString("it-IT");
    }

    const nomeAtletaField = document.querySelector("#nome");
    const birthDateField = document.querySelector("#datanascita");
    const consentField = document.querySelector("#terms");
    let memberDetails;

    const row = document.createElement('tr');
    row.id = "row" + countId.toString();

    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');

    const buttonRemove = document.createElement('button');
    buttonRemove.id = countId.toString();
    buttonRemove.textContent = "Rimuovi";
    buttonRemove.className = "btn btn-danger";
    buttonRemove.addEventListener("click", function () {
        removeElement(this, this.id);
    });
    cell4.appendChild(buttonRemove);

    cell1.textContent = nomeAtleta;
    cell2.textContent = birthDateFormatted;
    cell3.textContent = "Sì";

    if (nomeAtleta === "" || birthDateFormatted === "" || !consent) {
        errormessage.innerHTML = "<span id=\"colored\">ATTENZIONE: Uno o più dati mancanti!</span>";
    } else if (memberCount >= 6) {
        errormessage.innerHTML = "<span id=\"colored\">ATTENZIONE: Sono stati aggiunti il numero massimo di atleti!</span>";
    } else if (checkIfAlreadyAdded(nomeAtleta + "-" + birthDateFormatted)) {
        errormessage.innerHTML = "<span id=\"colored\">ATTENZIONE: Atleta già inserito!</span>";
    } else if (!isMaggiorenne(birthDate)) {
        errormessage.innerHTML = "<span id=\"colored\">ATTENZIONE: L'atleta inserito deve essere maggiorenne!</span>";
    } else {
        errormessage.innerHTML = "";

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        table.appendChild(row);

        memberDetails = nomeAtleta + "-" + birthDateFormatted;
        memberCount++;
        countId++;
        memberNames.push(nomeAtleta);
        memberList.push(memberDetails);

        nomeAtletaField.value = "";
        birthDateField.value = "";
        consentField.checked = false;

        populateReferenteList(memberNames);

        /*console.log(memberCount);
        console.log(memberNames);*/
    }
}

function isMaggiorenne(birthDate) {
    const nascita = new Date(birthDate);
    let age = tournamentDate.getFullYear() - nascita.getFullYear();
    const monthDiff = tournamentDate.getMonth() - nascita.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && tournamentDate.getDate() < nascita.getDate())) {
        age--;
    }
    return age >= 18;
}

function removeElement(button, elementId) {
    const row = button.closest("tr");
    const atletaToRemove = row.children[0]?.textContent.trim();
    const dateToRemove = row.children[1]?.textContent.trim();
    const memberString = `${atletaToRemove}-${dateToRemove}`;

    const index = memberList.indexOf(memberString);
    if (index !== -1) {
        memberList.splice(index, 1);
    }
    const indexNames = memberNames.indexOf(atletaToRemove);
    if (indexNames !== -1) {
        memberNames.splice(indexNames, 1);
    }

    row.remove();
    memberCount--;
    populateReferenteList(memberNames);

    /*console.log(memberCount);
    console.log(memberNames);*/
}


function checkIfAlreadyAdded(memberDatail) {
    return memberList.includes(memberDatail);
}

function populateReferenteList() {
    const select = document.querySelector("#nomeatleta");

    select.innerHTML = '<option value="">-- Seleziona un referente --</option>';

    memberNames.forEach(nome => {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    });

}

function formatMemberTable() {
    const rows = document.querySelectorAll("#membertable tbody tr");
    const team = capitalizeWords(document.querySelector('[id="00NR200000AxqhZ"]').value);
    const referenteName = document.querySelector("#nomeatleta").value;
    const emailField = document.querySelector("#email").value;
    const cellulareField = document.querySelector("#phone").value;

    // intestazioni
    let result = "";
    result += "Team,Name,Birthdate,Consent,Referente,Email,Cellulare\n";

    // righe
    rows.forEach(row => {
        const nome = row.children[0]?.textContent.trim();
        const data = row.children[1]?.textContent.trim();
        const consenso = row.children[2]?.textContent.trim();
        let referente = "";
        let email = "";
        let cellulare = "";

        if (nome === referenteName){
            referente = "Sì";
            email = emailField;
            cellulare = cellulareField;
        } else {
            referente = "No";
        }

        result += `${team},${nome},${data},${consenso},${referente},${email},${cellulare}\n`;
    });

    return result.trim();
}

function capitalizeWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function setFields() {
    const subjectfield = document.querySelector("#subject");
    subjectfield.value = `Iscrizione Green Volley`;

    const referente = document.querySelector("#nomeatleta").value.trim();
    const contactName = document.querySelector("#name");
    contactName.value = referente;
}

function populateDescriptionField() {
    const descriptionfield = document.querySelector("#description");
    const tabella = document.querySelector("#membertable");
    descriptionfield.value = formatMemberTable();
}

document.querySelector("#addmember").addEventListener("click", addNewMember);

form.addEventListener("submit", function (e) {
    const errormessage = document.querySelector("#errormessage");

    if (memberList.length === 0) {
        e.preventDefault();
        errormessage.innerHTML = `<span id="colored">ATTENZIONE: Nessun atleta inserito!</span>`;
    } else if (memberList.length < 4 || memberList.length > 6) {
        e.preventDefault();
        errormessage.innerHTML = `<span id="colored">ATTENZIONE: Devi inserire minimo 4 e massimo 6 atleti!</span>`;
    } else {
        errormessage.innerHTML = "";
        populateDescriptionField();
        setFields();
        decodeAndSubmitForm();
    }
});


document.addEventListener('DOMContentLoaded', function () {
});