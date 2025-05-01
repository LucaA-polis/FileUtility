let selectedElement = [];
let countId = 1;

function decodeAndSubmitForm() {
    const form = document.querySelector("#form");
    //var encodedActionUrl = form.getAttribute("action");
    form.action = atob("aHR0cHM6Ly93ZWJ0by5zYWxlc2ZvcmNlLmNvbS9zZXJ2bGV0L3NlcnZsZXQuV2ViVG9DYXNlP2VuY29kaW5nPVVURi04Jm9yZ0lkPTAwRDA2MDAwMDAxYTlDOA==");
    return true;
}

function populateProductList() {
    const selectProdotto = document.querySelector("#prodotto");
    const richiestaType = document.querySelector("#richiestatype");

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
                if (!response.ok) {
                    throw new Error('Errore nel recupero del file JSON');
                }
                return response.json();
            })
            .then(data => {
                data.sort((a, b) => a.Name.localeCompare(b.Name));

                const defaultOption = document.createElement('option');
                defaultOption.text = "Seleziona un prodotto";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                selectProdotto.appendChild(defaultOption);

                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.Name;
                    option.text = item.Name;
                    selectProdotto.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Errore:', error);
            });
    }

    richiestaType.addEventListener("change", function () {
        caricaProdotti(this.value);
    });

    if (richiestaType.value) {
        caricaProdotti(richiestaType.value);
    }
}

function addSelectedProduct(){
    const nomeatleta = document.querySelector("#nomeatleta").value;
    const selectedProduct = document.querySelector("#prodotto").value;
    const team = document.querySelector("#team").value;
    const richiestaType = document.querySelector("#richiestatype");
    const table = document.querySelector("#tablebody");
    const quantityField = document.querySelector("#quantity");
    const errormessage = document.querySelector("#errormessage");

    let richiestoper;
    let richiestaValue;
    let quantita;
    const row = document.createElement('tr');
    row.id = "row" + countId.toString();
    const cell1 = document.createElement('td');
    cell1.id = "cell1" + countId.toString();
    const cell2 = document.createElement('td');
    cell2.textContent = selectedProduct;
    cell2.id = "cell2" + countId.toString();
    const cell3 = document.createElement('td');
    cell3.id = "cell3" + countId.toString();
    richiestaType.addEventListener("change", function () {
        if(richiestaType.value === "Richiesta Vestiario"){
            quantityField.value = "";
            quantityField.readOnly = true;
        } else if(richiestaType.value === "Richiesta Materiale Squadra"){
            quantityField.value = "";
            quantityField.readOnly = false;
        }
    });

    if(richiestaType.value === "Richiesta Vestiario"){
        cell1.textContent = nomeatleta;
        quantita = "1";
        quantityField.readOnly = true;
        quantityField.value = quantita;
        cell3.textContent = quantita;
        richiestoper = nomeatleta;
    } else if(richiestaType.value === "Richiesta Materiale Squadra"){
        cell1.textContent = team;
        quantita = quantityField.value;
        cell3.textContent = quantita;
        richiestoper = team;
    }

    const cell4 = document.createElement('td');
    const buttonRemove = document.createElement('button');
    buttonRemove.id = countId.toString();
    buttonRemove.textContent = "Rimuovi";
    buttonRemove.className = "btn btn-danger";
    buttonRemove.addEventListener("click", function () {
        removeElement(this,this.id,quantita);
    });
    cell4.appendChild(buttonRemove);

    if (richiestoper === "" || selectedProduct === "Seleziona un prodotto" || quantityField.value === "") {
        errormessage.innerHTML = "<span id=\"colored\">ATTENZIONE: Non sono stati indicati il nome del tesserato, la squadra, il prodotto o la quantità</span>"
        console.log("Nome o prodotto mancante");
    } else {
        richiestaValue = richiestoper + " --> " + selectedProduct + " (" + quantita + ")" + "\n";
        if (!checkIfAlreadyAdded(richiestaValue)){
            errormessage.innerHTML = "";
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4)
            table.appendChild(row);
            selectedElement.push(richiestaValue);
            countId++;
            quantityField.value = "";
            console.log(selectedElement);
        }else {
            errormessage.innerHTML = "<span id=\"colored\">ATTENZIONE: è già stata aggiunta la quantità massima del prodotto " + selectedProduct.toUpperCase() + " per il tesserato " + richiestoper.toUpperCase() +"</span>"
        }
    }
}

function removeElement(button,elementId,quantita){
    const atletaToRemove = document.querySelector("#cell1" + elementId).textContent;
    const selectedProductToRemove = document.querySelector("#cell2" + elementId).textContent;
    const productToRemove = atletaToRemove + " --> " + selectedProductToRemove + " (" + quantita + ")" + "\n";
    let arrayIndex = selectedElement.indexOf(productToRemove);
    if (arrayIndex !== -1) {
        selectedElement.splice(arrayIndex, 1);
    }
    button.closest("tr").remove();
}

function checkIfAlreadyAdded(productToAdd) {
    for (let i = 0; i < selectedElement.length; i++) {
        if (productToAdd === selectedElement[i]){
            return true;
        } else {
            return false;
        }
    }
}

function setSubject(){
    const team = document.querySelector("#team").value;
    const sport = document.querySelector("#sport").value;
    const subjectfield = document.querySelector("#subject");
    subjectfield.value = "Richiesta Magazzino - " + team + " " + sport;
}

 const addButton = document.querySelector("#addprodotto")
     addButton.addEventListener("click",addSelectedProduct);

function populateDescriptionField(){
    let descriptionfield = document.querySelector("#description");
    selectedElement.sort((a, b) => a.Name.localeCompare(b.Name));
    for (let i = 0; i < selectedElement.length; i++) {
        descriptionfield.value += selectedElement[i];
    }
}

let form = document.querySelector("#form");
form.addEventListener("submit",sendForm);

function sendForm() {
  populateDescriptionField();
  setSubject();
  decodeAndSubmitForm();
}

document.addEventListener('DOMContentLoaded', function() {
    populateProductList();
});