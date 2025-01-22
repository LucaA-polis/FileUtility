import { calcoloCodiceFiscale } from './calcoloCodiceFiscale.js';

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
       var cfInput = document.getElementById("cfatleta");
       cfInput.value = cfInput.value.toUpperCase();
       //Codice fiscale genitore UppertCase
       var cfInput = document.getElementById("cfgenitore");
       cfInput.value = cfInput.value.toUpperCase();
       //Iniziale Nome Maiuscola
       var name = document.getElementById("nomegenitore");
       var nameText = name.value;
       var transformedName = nameText.split(' ').map(function(word) {
           return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
       }).join(' ');
       name.value = transformedName;
       //Iniziale Cognome Maiuscola
       var surname = document.getElementById("cognomegenitore");
       var surnameText = surname.value;
       var transformedSurname = surnameText.split(' ').map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
       }).join(' ');
       surname.value = transformedSurname;
}

function populateListComuni(){
  const datalist = document.querySelector("#listacomuni");
  
  fetch("https://cdn.jsdelivr.net/gh/LPolis22/FileUtility@refs/heads/main/quietanza/codiciComuni.json")
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nel recupero del file JSON');
      }
      return response.json();
    })
    .then(data => {
      for(const key in data){
          const option = document.createElement('option');
          option.value = data[key].comune;
          option.text = data[key].comune;
          datalist.appendChild(option);
      }
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}

let pulsante = document.querySelector("#calcolacf");

async function calcolaCodiceFiscale(){
  let inputcf = document.querySelector("#cfgenitore");
  inputcf.value = "";
  let nome = document.querySelector("#nomegenitore").value;
  let cognome = document.querySelector("#cognomegenitore").value;
  let luogoNascita = document.querySelector("#luogonascita").value;
  let dataNascita = document.querySelector("#datanascita").value;
  let sesso = document.querySelector("#selectsesso").value;
  let cf;

  if(nome !== "" && cognome !== "" && luogoNascita !== "" && sesso !== "" && dataNascita !== null){
    cf = await calcoloCodiceFiscale(nome,cognome,dataNascita,sesso,luogoNascita);
  } else {
    cf = "Errore, uno o pù dati mancanti";
  }
  
  inputcf.value = cf;

}

pulsante.addEventListener("click",calcolaCodiceFiscale);

function sendForm(){
  decodeAndSubmitForm();
  UpperCase();
}

let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click",sendForm());


document.addEventListener('DOMContentLoaded', function() {
  fillForm();
  populateListComuni();
});