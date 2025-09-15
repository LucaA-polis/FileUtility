//Richiesta Materiale
let selectedElement = [];
let countId = 1;

// Elementi principali
const form         = document.querySelector("#form");
const notesField   = document.querySelector("#notes");
const notesLabel   = document.querySelector("#noteslabel");
const notification = document.querySelector("#notification");

// ----------------------
// Funzioni di utilità
// ----------------------

function showError(msg) {
    const errorMessage = document.querySelector("#errormessage");
    errorMessage.innerHTML = `<span id="colored">${msg}</span>`;
}

function capitalizeWords(str) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function checkIfAlreadyAdded(productToAdd) {
    return selectedElement.includes(productToAdd);
}

// ----------------------
// Popolamento campi
// ----------------------

function populateProductList() {
    const selectProdotto = document.querySelector("#prodotto");
    const richiestaType  = document.querySelector("#richiestatype");

    function caricaProdotti(type) {
        let jsonfile;

        if (type === "Richiesta Vestiario") {
            jsonfile = atob("aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL0x1Y2FBLXBvbGlzL0ZpbGVVdGlsaXR5QG1haW4vbWF0ZXJpYWxlL3Byb2R1Y3RsaXN0Lmpzb24=");
        } else if (type === "Richiesta Materiale Squadra") {
            jsonfile = atob("aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL0x1Y2FBLXBvbGlzL0ZpbGVVdGlsaXR5QG1haW4vbWF0ZXJpYWxlL2VxdWlwbWVudGxpc3QuanNvbg==");
        } else {
            return;
        }

        selectProdotto.innerHTML = "";

        fetch(jsonfile)
            .then(response => {
                if (!response.ok) throw new Error("Errore nel recupero del file JSON");
                return response.json();
            })
            .then(data => {
                data.sort((a, b) => a.Name.localeCompare(b.Name));

                const defaultOption = document.createElement("option");
                defaultOption.text = "Seleziona un prodotto";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                selectProdotto.appendChild(defaultOption);

                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.Name;
                    option.text  = item.Name;
                    selectProdotto.appendChild(option);
                });
            })
            .catch(error => console.error("Errore:", error));
    }

    richiestaType.addEventListener("change", function () {
        caricaProdotti(this.value);

        const divNomeAtleta = document.querySelector("#div_nomeatleta");
        divNomeAtleta.style.display = this.value === "Richiesta Materiale Squadra" ? "none" : "block";
    });

    if (richiestaType.value) {
        caricaProdotti(richiestaType.value);
    }
}

// ----------------------
// Gestione prodotti
// ----------------------

function addSelectedProduct() {
    // Campi del form
    const nomeAtleta     = capitalizeWords(document.querySelector("#nomeatleta").value.trim());
    const team           = capitalizeWords(document.querySelector('[id="00NR200000AxqhZ"]').value.trim());
    const selectedProduct = document.querySelector("#prodotto").value;
    const productField    = document.querySelector("#prodotto");
    const richiestaType   = document.querySelector("#richiestatype").value;
    const reason          = document.querySelector("#reason").value;
    const reasonField     = document.querySelector("#reason");
    // const quantityField = document.querySelector("#quantity"); // futura gestione quantità

    const table = document.querySelector("#tablebody");

    // Variabili di stato
    let richiestoper;
    let quantita = "1"; // default
    let richiestaValue;

    // Creazione riga tabella
    const row = document.createElement("tr");
    row.id = "row" + countId;

    const cell1 = document.createElement("td"); // Atleta o Squadra
    const cell2 = document.createElement("td"); // Prodotto
    /*const cell3 = document.createElement("td");*/ // futura colonna quantità
    const cell4 = document.createElement("td"); // Azioni

    // Pulsante rimozione
    const removeButton = document.createElement("button");
    removeButton.id = countId.toString();
    removeButton.textContent = "Rimuovi";
    removeButton.className = "btn btn-danger";
    removeButton.addEventListener("click", () =>
        removeElement(removeButton, removeButton.id, quantita, reason)
    );
    cell4.appendChild(removeButton);

    // Validazioni e valorizzazioni
    if (richiestaType === "Richiesta Vestiario") {
        if (!nomeAtleta) {
            showError("ATTENZIONE: devi indicare il nome del tesserato.");
            return;
        }
        cell1.textContent = nomeAtleta;
        richiestoper = nomeAtleta;

    } else if (richiestaType === "Richiesta Materiale Squadra") {
        if (!team) {
            showError("ATTENZIONE: devi indicare il nome della squadra.");
            return;
        }
        cell1.textContent = team;
        richiestoper = team;
    }

    cell2.textContent = selectedProduct;

    if (!richiestoper) {
        showError("ATTENZIONE: Non sono stati indicati il nome del tesserato.");
        return;
    }
    if (selectedProduct === "Seleziona un prodotto") {
        showError("ATTENZIONE: Non è stato indicato il prodotto.");
        return;
    }
    if (!reason) {
        showError("ATTENZIONE: Non è stato indicato il motivo della richiesta.");
        return;
    }
    /*if (!quantityField.value) {
        showError("ATTENZIONE: Non è stata indicata la quantità.");
        return;
    }*/

    // Stringa richiesta
    richiestaValue = `${richiestoper} | ${selectedProduct} | ${quantita} | ${reason}\n`;

    const allowDuplicates = richiestaType === "Richiesta Materiale Squadra";
    if (!allowDuplicates && checkIfAlreadyAdded(richiestaValue)) {
        showError(`ATTENZIONE: è già stata aggiunta la quantità massima del prodotto 
            ${selectedProduct.toUpperCase()} per il tesserato ${richiestoper.toUpperCase()}`);
        return;
    }

    // Inserimento in tabella
    document.querySelector("#errormessage").innerHTML = "";
    row.appendChild(cell1);
    row.appendChild(cell2);
    /*row.appendChild(cell3);*/
    row.appendChild(cell4);
    table.appendChild(row);

    // Stato interno
    selectedElement.push(richiestaValue);
    setNotesRequired(selectedElement);

    // Reset campi
    reasonField.selectedIndex = 0;
    productField.selectedIndex = 0;
    notification.innerHTML = "";
    //quantityField.value = "";
    countId++;
}

function removeElement(button, elementId, quantita, reason) {
    const row = button.closest("tr");
    const atleta  = row.children[0]?.textContent;
    const prodotto = row.children[1]?.textContent;

    const productString = `${atleta} | ${prodotto} | ${quantita} | ${reason}\n`;

    const index = selectedElement.indexOf(productString);
    if (index !== -1) {
        selectedElement.splice(index, 1);
    }
    row.remove();
    setNotesRequired(selectedElement);
}

// ----------------------
// Note e notifiche
// ----------------------

function setNotesRequired(array) {
    const required = array.some(el => el.includes("Altro"));

    if (required) {
        notesField.required = true;
        if (!notesLabel.nextElementSibling || notesLabel.nextElementSibling.id !== "colored") {
            notesLabel.insertAdjacentHTML("afterend", '<span id="colored">*</span>');
        }
    } else {
        const next = notesLabel.nextElementSibling;
        if (next && next.id === "colored") {
            next.remove();
        }
    }
}

function displayNotification() {
    const reason = document.querySelector("#reason").value;
    notification.innerHTML = reason === "Altro"
        ? `<span id="colored">ATTENZIONE: Indicare il motivo nel campo note</span>`
        : "";
}

// ----------------------
// Preparazione submit
// ----------------------

function setSubject() {
    const team   = document.querySelector('[id="00NR200000AxqhZ"]').value.trim();
    const subjectField = document.querySelector("#subject");
    subjectField.value = `Richiesta Magazzino - ${team}`;
}

function populateDescriptionField() {
    const descriptionField = document.querySelector("#description");
    const notesText = document.querySelector("#notes").value || "";
    const header = "ATLETA | PRODOTTO | QUANTITA | MOTIVO RICHIESTA\n";
    let description ="";

    for (let i = 0; i < selectedElement.length; i++) {
        description += selectedElement[i];
    }

    descriptionField.value = header + description + "----------------------\nEVENTUALI NOTE:\n" + notesText;

}

function decodeAndSubmitForm() {
    form.action = atob("aHR0cHM6Ly93ZWJ0by5zYWxlc2ZvcmNlLmNvbS9zZXJ2bGV0L3NlcnZsZXQuV2ViVG9DYXNlP2VuY29kaW5nPVVURi04Jm9yZ0lkPTAwRDA2MDAwMDAxYTlDOA==");
    return true;
}

// ----------------------
// Event listeners
// ----------------------

document.querySelector("#addprodotto").addEventListener("click", addSelectedProduct);
document.querySelector("#reason").addEventListener("change", displayNotification);

form.addEventListener("submit", function (e) {
    if (selectedElement.length === 0) {
        e.preventDefault();
        showError("ATTENZIONE: Nessun prodotto selezionato");
        return;
    }
    populateDescriptionField();
    setSubject();
    decodeAndSubmitForm();
});

document.addEventListener("DOMContentLoaded", populateProductList);
