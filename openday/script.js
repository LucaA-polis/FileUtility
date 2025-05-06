//Open Day
function decodeAndSubmitForm() {
    const form = document.querySelector("#form");
    form.action = atob("aHR0cHM6Ly93ZWJ0by5zYWxlc2ZvcmNlLmNvbS9zZXJ2bGV0L3NlcnZsZXQuV2ViVG9MZWFkP2VuY29kaW5nPVVURi04Jm9yZ0lkPTAwRDA2MDAwMDAxYTlDOA==");
}

function checkEmailsMatch() {
    const email = document.querySelector("#email");
    const confirmEmail = document.querySelector("#confirmEmail");
    const message = document.querySelector("#errorMessage");
    const submitBtn = document.querySelector("#submitbtn");

    if (email.value.toLowerCase() === confirmEmail.value.toLowerCase()) {
        message.innerHTML = "";
        submitBtn.disabled = false;
        return true;
    } else {
        message.innerHTML = "<span id=\"colored\">Le email inserite non coincidono!</span>";
        submitBtn.disabled = true;
        return false;
    }
}

function UpperCase() {
    const name = document.querySelector("#first_name");
    name.value = name.value.split(' ').map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

    const surname = document.querySelector("#last_name");
    surname.value = surname.value.split(' ').map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

function sendForm(/*event*/) {
    //event.preventDefault();

    UpperCase();
    const emailsMatch = checkEmailsMatch();

    if (emailsMatch) {
        decodeAndSubmitForm();
        document.querySelector("#form").submit();
    }
}

document.querySelector("#form").addEventListener("submit", sendForm);
document.querySelector("#email").addEventListener("input", checkEmailsMatch);
document.querySelector("#confirmEmail").addEventListener("input", checkEmailsMatch);

document.addEventListener('DOMContentLoaded', function() {
    console.log(document.querySelector("#form").action);
});

