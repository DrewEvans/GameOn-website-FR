function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeCross = document.querySelector(".close");
const closeBtn = document.querySelector(".btn-close");
const btnSubmit = document.querySelector(".btn-submit");
const signupForm = document.querySelector(".signupForm");
const msgSuccess = document.querySelector('.submission-notification-default');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
closeCross.addEventListener('click', e => {
  //trigger if user clicks
  if (e.isTrusted) {
    //change css display to none
    modalbg.style.display = "none";
  }
});

//Validate sumbitted modal form data
signupForm.addEventListener('submit', e => {

  const userData = e.target.elements;

  const validatedUserData = validate(userData);

  e.preventDefault();

  if (!validatedUserData) {
    return false;
  } else {

    const inputFields = document.querySelector('.input-container');

    inputFields.classList.add("form-validation");
    msgSuccess.classList.remove("submission-notification-default");
    msgSuccess.classList.add("submission-notification");


    btnSubmit.value = "Fermer";

    //close modal form after submission
    btnSubmit.addEventListener('click', e => {
      //trigger if user clicks
      if (e.isTrusted) {
        //change css display to none
        modalbg.style.display = "none";
        signupForm.submit();
      }
    });
  }
});

function validate(userData) {

  //Validation regex Patterns
  const namePattern = /^[a-zA-ZÀ-ÿ-. ]{2,}$/
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const birthdatePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  const quantityPattern = /^[0-9]{0,2}$/

  //form inputs by user 

  //console.log(userData);

  const {
    first: firstName,
    last: lastName,
    email: email,
    birthdate: birthdate,
    quantity: numOfTournaments,
    checkbox1: terms,
    checkbox2: notifications,
    location1: location
  } = userData

  const locations = userData.location;
  //console.log(locations.value);

  let errors = [];

  for (let i = 0; i < locations.length; i++) {
    const isChecked = locations[i].checked;
    //console.log(isChecked)

    if (!isChecked) {
      removeError(location);
      break;
    } else {
      showError(location, 'Vous devez choisir une option.')

    }
  }

  if (namePattern.test(firstName.value)) {
    removeError(firstName);
  } else {
    showError(firstName, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    errors.push('error');
  }

  if (namePattern.test(lastName.value)) {
    removeError(lastName);
  } else {
    showError(lastName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    errors.push('error');
  }

  if (emailPattern.test(email.value)) {
    removeError(email);
  } else {
    showError(email, "Adresse e-mail invalide");
    errors.push('error');
  }

  if (birthdatePattern.test(birthdate.value)) {
    removeError(birthdate);
  } else {
    showError(birthdate, "Vous devez entrer votre date de naissance.");
    errors.push('error');
  }

  if (quantityPattern.test(numOfTournaments.value)) {
    removeError(numOfTournaments);
  } else {
    showError(numOfTournaments, "Entrez un numéro valide à 2 chiffres.")
    errors.push('error');
  }

  if (terms.checked) {
    removeError(terms)
  } else {
    showError(terms, "Vous devez vérifier que vous acceptez les termes et conditions.")
    errors.push('error');
  }

  console.log(`Errors: ${errors.length}`);

  console.log(
    firstName.value,
    lastName.value,
    email.value,
    birthdate.value,
    numOfTournaments.value,
    locations.value,
    terms.checked,
    notifications.checked);

  if (errors.length > 0) {
    return false;
  }
  return true;
}

function showError(input, message) {
  //target div.formData from data input
  const formControl = input.parentElement;

  //set attribute to data-error and pass error msg
  formControl.setAttribute('data-error', message);

  //set attribute to data-error-visible="true" 
  formControl.setAttribute('data-error-visible', 'true');
}

function removeError(input) {
  //target div.formData from data input
  const formControl = input.parentElement;

  //remove attributes from html and display default design
  formControl.removeAttribute('data-error-visible', '');
  formControl.removeAttribute('data-error', '');
}