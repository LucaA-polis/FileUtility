export function calcoloCodiceFiscale(nome,cognome,dataNascita,sesso,luogoNascita){
       let cf = "";
       let annoNascita = String(dataNascita.getFullYear() % 100).padStart(2, '0');
       let giornoNascita;

       if(sesso === "F"){
              giornoNascita = dataNascita.getDate() + 40;
       } if (sesso == "M") {
              giornoNascita = String(dataNascita.getDate()).padStart(2, '0');
       }

       var codici_mesi = ['A', 'B', 'C', 'D', 'G', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
       var mese = codici_mesi[dataNascita.getMonth() + 1];

       const consonantiCognome = cognome.match(/[^aeiouAEIOU]/g) || [];
       const vocaliCognome = cognome.match(/[aeiouAEIOU]/g) || [];
       const codiceCognome = consonantiCognome.concat(vocaliCognome).slice(0, 3).join("");

       const consonantiNome = cognome.match(/[^aeiouAEIOU]/g) || [];
       const vocaliNome = cognome.match(/[aeiouAEIOU]/g) || [];
       const codiceNome = consonantiNome.concat(vocaliNome).slice(0, 3).join("");


       var alpha_dispari = [];
       var alpha_pari = [];


       var somma_dispari = 0;
       var somma_pari = 0;
       var somma_controllo = 0;
       var lettera_controllo;


       for (var i = 0; i < CF_FX.length; i++) {


       if (i % 2 != 1) {
       alpha_dispari[i] = CF_FX.charAt(i);
       switch (alpha_dispari[i]) {
              case '0': case 'A': alpha_dispari[i] = 1;
              break;
              case '1': case 'B': alpha_dispari[i] = 0;
              break;
              case '2': case 'C': alpha_dispari[i] = 5;
              break;
              case '3': case 'D': alpha_dispari[i] = 7;
              break;
              case '4': case 'E': alpha_dispari[i] = 9;
              break;
              case '5': case 'F': alpha_dispari[i] = 13;
              break;
              case '6': case 'G': alpha_dispari[i] = 15;
              break;
              case '7': case 'H': alpha_dispari[i] = 17;
              break;
              case '8': case 'I': alpha_dispari[i] = 19;
              break;
              case '9': case 'J': alpha_dispari[i] = 21;
              break;
              case 'K': alpha_dispari[i] = 2;
              break;
              case 'L': alpha_dispari[i] = 4;
              break;
              case 'M': alpha_dispari[i] = 18;
              break;
              case 'N': alpha_dispari[i] = 20;
              break;
              case 'O': alpha_dispari[i] = 11;
              break;
              case 'P': alpha_dispari[i] = 3;
              break;
              case 'Q': alpha_dispari[i] = 6;
              break;
              case 'R': alpha_dispari[i] = 8;
              break;
              case 'S': alpha_dispari[i] = 12;
              break;
              case 'T': alpha_dispari[i] = 14;
              break;
              case 'U': alpha_dispari[i] = 16;
              break;
              case 'V': alpha_dispari[i] = 10;
              break;
              case 'W': alpha_dispari[i] = 22;
              break;
              case 'X': alpha_dispari[i] = 25;
              break;
              case 'Y': alpha_dispari[i] = 24;
              break;
              case 'Z': alpha_dispari[i] = 23;
              break;
       }

       somma_dispari += alpha_dispari[i];

       }
       else {
       alpha_pari[i] = CF_FX.charAt(i);

       switch (alpha_pari[i]) {
              case '0': case 'A': alpha_pari[i] = 0;
              break;
              case '1': case 'B': alpha_pari[i] = 1;
              break;
              case '2': case 'C': alpha_pari[i] = 2;
              break;
              case '3': case 'D': alpha_pari[i] = 3;
              break;
              case '4': case 'E': alpha_pari[i] = 4;
              break;
              case '5': case 'F': alpha_pari[i] = 5;
              break;
              case '6': case 'G': alpha_pari[i] = 6;
              break;
              case '7': case 'H': alpha_pari[i] = 7;
              break;
              case '8': case 'I': alpha_pari[i] = 8;
              break;
              case '9': case 'J': alpha_pari[i] = 9;
              break;
              case 'K': alpha_pari[i] = 10;
              break;
              case 'L': alpha_pari[i] = 11;
              break;
              case 'M': alpha_pari[i] = 12;
              break;
              case 'N': alpha_pari[i] = 13;
              break;
              case 'O': alpha_pari[i] = 14;
              break;
              case 'P': alpha_pari[i] = 15;
              break;
              case 'Q': alpha_pari[i] = 16;
              break;
              case 'R': alpha_pari[i] = 17;
              break;
              case 'S': alpha_pari[i] = 18;
              break;
              case 'T': alpha_pari[i] = 19;
              break;
              case 'U': alpha_pari[i] = 20;
              break;
              case 'V': alpha_pari[i] = 21;
              break;
              case 'W': alpha_pari[i] = 22;
              break;
              case 'X': alpha_pari[i] = 23;
              break;
              case 'Y': alpha_pari[i] = 24;
              break;
              case 'Z': alpha_pari[i] = 25;
              break;
       }
       somma_pari += alpha_pari[i];

       }


       }

       somma_controllo = (somma_dispari + somma_pari) % 26;

       var caratteri_lista = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
       for (var i = 0; i <= 26; i++) {
       switch (somma_controllo) {
       case i: lettera_controllo = caratteri_lista[i];

              break;
       }
       }


       cf = codiceCognome + codiceNome + annoNascita + mese + giornoNascita + luogoNascita + lettera_controllo

       return cf;
}