// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeCross = document.querySelector(".close");
const closeBtn = document.querySelector(".btn-close");
const btnSubmit = document.querySelector(".btn-submit");
const signupForm = document.querySelector(".signupForm");
const msgSuccess = document.querySelector('.submission-notification-default');

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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

  //if data validation fails tests return false 
  if (!validatedUserData) {
    return false;
    //if validation passes display submission successful msg
  } else {

    const inputFields = document.querySelector('.input-container'); //targets parent element of formData  

    //add style to inputFields hidding the container
    inputFields.classList.add("form-validation");

    //remove class from msgSuccess
    msgSuccess.classList.remove("submission-notification-default");
    //add new class to msgSuccess
    msgSuccess.classList.add("submission-notification");
    //change value of btn-submit
    btnSubmit.value = "Fermer";

    //close modal form after submission
    btnSubmit.addEventListener('click', e => {
      //trigger if user clicks
      if (e.isTrusted) {
        //change css display to none
        modalbg.style.display = "none";

      }
    });
  }
});

function validate(userData) {

  //Validation regex Patterns
  const namePattern = /^[a-zA-ZÀ-ÿ ,.'-]{2,}$/
  const spacesPattern = /[\s]{2,}/
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const birthdatePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  const quantityPattern = /^[0-9]{0,2}$/

  //user Data inputs from form submission
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

  const locations = userData.location; //Returns value of user selected location

  let errors = []; //empty array to log if any validations fail

  let locationChecked = false; //default location input

  //loop over all location radio buttons 
  for (let i = 0; i < locations.length; i++) {
    //record if any have been checked by user 
    const isChecked = locations[i].checked;
    //if one is true update 
    //locationChecked and break loop
    if (isChecked) {
      locationChecked = true;
      break;
    }
  }

  //Validation logic for required fields from user
  //if test passes display default
  //else target the the html element
  // display error msg and push an error
  // to var errors 

  //is location checked test  
  locationChecked ?
    removeError(location1) :
    (showError(location1, "Vous devez choisir une option."), errors.push('error'))

  //test firstName input agaisnt validation regex
  namePattern.test(firstName.value.trim()) && !spacesPattern.test(firstName.value) ?
    removeError(firstName) :
    (showError(firstName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.'), errors.push('error'))

  //test lastName input agaisnt validation regex
  namePattern.test(lastName.value.trim()) && !spacesPattern.test(lastName.value) ?
    removeError(lastName) :
    (showError(lastName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.'), errors.push('error'))

  //test email input agaisnt validation regex
  emailPattern.test(email.value.trim()) ?
    removeError(email) :
    (showError(email, "Adresse e-mail invalide"), errors.push('error'))

  //test birthdate input agaisnt validation regex
  birthdatePattern.test(birthdate.value) ?
    removeError(birthdate) :
    (showError(birthdate, "Vous devez entrer votre date de naissance."), errors.push('error'))

  //test firstName input agaisnt validation regex
  quantityPattern.test(numOfTournaments.value) ?
    removeError(numOfTournaments) :
    (showError(numOfTournaments, "Entrez un numéro valide à 2 chiffres."), errors.push('error'))

  //test terms checkbox to see if checked
  terms.checked ?
    removeError(terms) :
    (showError(terms, "Vous devez vérifier que vous acceptez les termes et conditions."), errors.push('error'))

  //Submitted userData
  console.log(
    firstName.value.trim(),
    lastName.value.trim(),
    email.value.trim(),
    birthdate.value,
    numOfTournaments.value,
    locations.value,
    terms.checked,
    notifications.checked
  );

  //number of errors logged on submit  
  console.log(`Errors: ${errors.length}`);

  //if any errors recored return false
  //else function returns true 
  if (errors.length > 0) {
    return false;
  }
  return true;
}

//if validation is incorect show user error msg
function showError(input, message) {

  const formControl = input.parentElement; //parent formData div from userData input

  //set attribute to data-error and pass error msg
  formControl.setAttribute('data-error', message);

  //set attribute to data-error-visible="true" 
  formControl.setAttribute('data-error-visible', 'true');
}

//if validation passes display the default
function removeError(input) {

  const formControl = input.parentElement; //parent formData div from userData input

  //remove attributes and display default style
  formControl.removeAttribute('data-error-visible', '');
  formControl.removeAttribute('data-error', '');
}