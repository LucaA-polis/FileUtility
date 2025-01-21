import { calcoloCodiceFiscale } from './calcoloCodiceFiscale';

function decodeAndSubmitForm() {
       var form = document.getElementById("form");
       var encodedActionUrl = form.getAttribute("action");
       var decodedActionUrl = atob(encodedActionUrl);
              form.action = decodedActionUrl;
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
   

function UpperCase(){
       //Codice fiscale atleta UppertCase
       var cfInput = document.getElementById("00NR2000001vzhJ");
       cfInput.value = cfInput.value.toUpperCase();
       //Codice fiscale genitore UppertCase
       var cfInput = document.getElementById("00NR200000719Bh");
       cfInput.value = cfInput.value.toUpperCase();
       //Iniziale Nome Maiuscola
       var name = document.getElementById("00NR200000718Ir");
       var nameText = name.value;
       var transformedName = nameText.split(' ').map(function(word) {
           return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
       }).join(' ');
       name.value = transformedName;
       //Iniziale Cognome Maiuscola
       var surname = document.getElementById("00NR200000718M5");
       var surnameText = surname.value;
       var transformedSurname = surnameText.split(' ').map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
       }).join(' ');
       surname.value = transformedSurname;
}

function populateListComuni(){
const select = document.querySelector("#luogonascita");

fetch("https://raw.githubusercontent.com/LPolis22/FileUtility/refs/heads/main/Comuni.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nel recupero del file JSON');
    }
    return response.json();
  })
  .then(data => {
    for(const key in data){
        const option = document.createElement("option");
        option.value = data[key].codice;
        option.text = data[key].comune;
        select.appendChild(option);
    }
  })
  .catch(error => {
    console.error('Errore:', error);
  });
}

let pulsante = document.querySelector("#calcolacf");

function calcolaCodiceFiscale(){
  let inputcf = document.querySelector("#cfgenitore").value;
  let nome = document.querySelector("#00NR200000718Ir").value;
  let cognome = document.querySelector("#00NR200000718M5").value;
  let codiceComune = document.querySelector("#luogonascita").value;
  let dataNascita = document.querySelector("#datanascita").value;
  let sesso = document.querySelector("#selectsesso").value;
  let cf;

  if(!nome && !cognome && !codiceComune && !sesso && dataNascita !== null){
    cf = calcoloCodiceFiscale(nome,cognome,dataNascita,sesso,codiceComune);
  } else {
    cf = "Errore, uno o pù dati mancanti"
  }
  
  inputcf.value = cf;

}

  pulsante.addEventListener("click",calcolaCodiceFiscale);

function sendForm(){
    decodeAndSubmitForm();
    UpperCase();
}

function onWindowLoad() {
    fillForm();
    populateListComuni();
}

window.onload = onWindowLoad;