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

//Validation Patterns
const namePattern = /^[a-zA-ZÀ-ÿ-. ]{2,}$/
const emailPattern = /^.+\@.+\..+$/
const birthdatePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
const locationPattern = /^(?:New York|San Francisco|Seattle|Chicago|Boston|Portland)$/

//Validate sumbitted modal form data
signupForm.addEventListener('submit', e => {
  e.preventDefault();

  //validation
  const nom = signupForm.first.value;
  const prenom = signupForm.last.value;
  const email = signupForm.email.value;
  const birthdate = signupForm.birthdate.value;
  const location = signupForm.location.value;


  if (namePattern.test(nom, prenom) && emailPattern.test(email) && birthdatePattern.test(birthdate) && locationPattern.test(location)) {
    //sucessful Display
    console.log('First + last + email Passed + birthdate & location')
  } else {
    //help info
    console.log('failed')
  }
});

//Trigger live Error messages 
signupForm.addEventListener('keyup', e => {
  console.log(e.target.value, signupForm.name.value);
  if (namePattern.test(e.target.value)) {
    console.log('Good')
  }
  if (emailPattern.test(e.target.value)) {
    console.log('good');
  }
  if (birthdatePattern.test(e.target.value)) {
    console.log('good')
  } else {
    console.log('bad')
  }
})