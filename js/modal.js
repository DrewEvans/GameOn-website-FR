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
const closeBtn = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeBtnClicked() {
  //loop over all classes with class="close"
  closeBtn.forEach(x => {
    //log if class was clicked by user
    x.addEventListener("click", e => {
      //if user clicked change modalbg {display: none}
      if (e.isTrusted) {
        modalbg.style.display = "none";
      };
    });
  });
};

// close modal event
closeBtnClicked();