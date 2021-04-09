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

//get values from form locations 
getCities = () => {
  const locations = document.getElementsByName('location');
  locations.forEach(_location => {
    const cities = Array.from(_location.attributes);
    console.log(cities[4]);
  });
}

getCities();

//Validate sumbitted modal form data
signupForm.addEventListener('submit', e => {

  e.preventDefault();

  validate();
});

//form Data Points
const lastName = signupForm.last;
const firstName = signupForm.first;
const email = signupForm.email;
const birthdate = signupForm.birthdate;
const city = document.getElementsByName('location');
const numOfTournaments = signupForm.quantity;
const terms = signupForm.terms;
const notification = signupForm.notifications;

function validate() {

  //Validation Patterns
  const namePattern = /^[a-zA-ZÀ-ÿ-. ]{2,}$/
  const emailPattern = /^.+\@.+\..+$/
  const birthdatePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  //change locations to loop over values
  const locationPattern = /^(?:New York|San Francisco|Seattle|Chicago|Boston|Portland)$/
  const quantityPattern = /^[0-9]{0,2}$/

  const lastValue = lastName.value;
  const firstValue = firstName.value;
  const emailValue = email.value;
  const birthdateValue = birthdate.value;
  const cityValue = city.value;
  const numOfTournamentsValue = numOfTournaments.value;
  const termsValue = terms.checked;
  const notificationValue = notification.checked;

  if (namePattern.test(lastValue)) {
    setSuccessFor(lastName);
  } else {
    setErrorFor(lastName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
  }

  if (namePattern.test(firstValue)) {
    setSuccessFor(firstName);
  } else {
    setErrorFor(firstName, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
  }

  if (emailPattern.test(emailValue)) {
    setSuccessFor(email);
  } else {
    setErrorFor(email, "Adresse e-mail invalide");
  }

  if (birthdatePattern.test(birthdateValue)) {
    setSuccessFor(birthdate);
  } else {
    setErrorFor(birthdate, "Vous devez entrer votre date de naissance.");
  }

  if (locationPattern.test(cityValue)) {
    setSuccessFor(city);
  } else if (cityValue === "") {
    console.log("Left Blank: Failed")
  } else {
    console.log("failed")
  }

  if (quantityPattern.test(numOfTournamentsValue)) {
    setSuccessFor(numOfTournaments);
  } else {
    setErrorFor(numOfTournaments, "Entrez un numéro valide à 2 chiffres.")
  }

  if (termsValue === true) {
    setSuccessFor(terms)
  } else {
    setErrorFor(terms, "Vous devez vérifier que vous acceptez les termes et conditions.")
  }

  if (notificationValue === true) {
    console.log('subscribed to newsletter');
  } else {
    console.log('declined newsletter')
  }
}

function setErrorFor(input, message) {
  //target div.formData from data input
  const formControl = input.parentElement;

  //set attribute to data-error and pass error msg
  formControl.setAttribute('data-error', message);

  //set attribute to data-error-visible="true" 
  formControl.setAttribute('data-error-visible', 'true');
}

function setSuccessFor(input) {
  //target div.formData from data input
  const formControl = input.parentElement;

  //remove attributes from html and display default design
  formControl.removeAttribute('data-error-visible', '');
  formControl.removeAttribute('data-error', '');
}

//Trigger live User input
/*signupForm.addEventListener('keyup', e => {

  const inputFields = document.querySelectorAll(".text-control");


  console.log(e.target.value, signupForm.name.value);

  if (namePattern.test(e.target.value)) {
    console.log('Passed');

  } else {
    console.log('Failed');
    signupForm.first.style.border = "2px solid #e54858";
  }

  /*if (emailPattern.test(e.target.value)) {
    console.log('good');
  }
  if (locationPattern.test(e.target.value)) {
    console.log('good');
  }
  if (quantityPattern.test(e.target.value)) {
    console.log('good');
  }
  if (birthdatePattern.test(e.target.value)) {
    console.log('good')
  } else {
    console.log('bad')
  }
});*/