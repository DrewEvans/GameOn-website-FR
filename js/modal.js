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
const signupForm = document.querySelector(".signupForm");

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

closeBtn.addEventListener('click', e => {
  //trigger if user clicks
  if (e.isTrusted) {
    //change css display to none
    modalbg.style.display = "none";
  }
});

//Validate sumbitted modal form data
signupForm.addEventListener('submit', e => {

  e.preventDefault();

  const userData = e.target.elements;

  const validatedUserData = validate(userData);

  console.log(validatedUserData);
});

function validate(userData) {

  //Validation Patterns
  const namePattern = /^[a-zA-ZÀ-ÿ-. ]{2,}$/
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const birthdatePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  const quantityPattern = /^[0-9]{0,2}$/

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
  console.log(locations.value);

  for (let i = 0; i < locations.length; i++) {
    const isChecked = locations[i].checked;
    console.log(isChecked)

    if (!isChecked) {
      removeError(location);
    } else {
      showError(location, 'Vous devez choisir une option.')
    }
  }

  if (namePattern.test(firstName.value)) {
    removeError(firstName);
  } else {
    showError(firstName, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    return false;
  }

  if (namePattern.test(lastName.value)) {
    removeError(lastName);
  } else {
    showError(lastName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    return false;
  }

  if (emailPattern.test(email.value)) {
    removeError(email);
  } else {
    showError(email, "Adresse e-mail invalide");
    return false;
  }

  if (birthdatePattern.test(birthdate.value)) {
    removeError(birthdate);
  } else {
    showError(birthdate, "Vous devez entrer votre date de naissance.");
    return false;
  }

  if (quantityPattern.test(numOfTournaments.value)) {
    removeError(numOfTournaments);
  } else {
    showError(numOfTournaments, "Entrez un numéro valide à 2 chiffres.")
    return false;
  }

  if (terms.checked) {
    removeError(terms)
  } else {
    showError(terms, "Vous devez vérifier que vous acceptez les termes et conditions.")
    return false;
  }

  if (notifications.checked) {
    console.log('yes')
  } else {
    console.log('no')
  }

  console.log(lastName.value,
    firstName.value,
    email.value,
    birthdate.value,
    numOfTournaments.value,
    location.value,
    terms.checked,
    notifications.checked);
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