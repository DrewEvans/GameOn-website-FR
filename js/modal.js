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
const closeBtn = document.querySelector(".close");
const signupForm = document.querySelector(".signupForm");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
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


//Validation Patterns
const namePattern = /^[a-zA-ZÀ-ÿ-. ]{2,}$/
const emailPattern = /^.+\@.+\..+$/
const birthdatePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/

//change locations to loop over values
const locationPattern = /^(?:New York|San Francisco|Seattle|Chicago|Boston|Portland)$/
const quantityPattern = /^[0-9]{0,2}$/

//Validate sumbitted modal form data
signupForm.addEventListener('submit', e => {

  e.preventDefault();

  validate();
});

function validate() {
  const nom = signupForm.first.value;
  const prenom = signupForm.last.value;
  const email = signupForm.email.value;
  const birthdate = signupForm.birthdate.value;
  const location = signupForm.location.value;
  const numOfTournaments = signupForm.quantity.value;
  const terms = signupForm.terms.checked;
  const notification = signupForm.notifications.checked;

  if (namePattern.test(nom)) {
    console.log('Passed');
    setSuccessFor(signupForm.first);
  } else {
    setErrorFor(signupForm.first, 'Veuillez entrer 2 caractères ou plus pour le champ du nom');
  }

  if (namePattern.test(prenom)) {
    console.log('Passed');
  } else {
    console.log('failed')
  }

  if (emailPattern.test(email)) {
    console.log('Passed');
  } else {
    console.log('failed')
  }

  if (birthdatePattern.test(birthdate)) {
    console.log('Passed');
  } else {
    console.log('failed')
  }

  if (locationPattern.test(location)) {
    console.log('Passed');
  } else {
    console.log('failed')
  }

  if (quantityPattern.test(numOfTournaments)) {
    console.log('Passed');
  } else {
    console.log('failed')
  }

  if (terms === true) {
    console.log('Accepted Terms');
  } else {
    console.log('Disagree with terms')
  }

  if (notification === true) {
    console.log('subscribed to newsletter');
  } else {
    console.log('declined newsletter')
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;

  //error message inside span
  formControl.setAttribute('data-error', message);

  //add error class
  formControl.setAttribute('data-error-visible', 'true');
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.setAttribute('data-error-visible', 'false');
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