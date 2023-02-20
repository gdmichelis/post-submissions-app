"use strict";
const form = document.getElementById("post-sub-form");
const saveButton = document.getElementById("btn-save");
let row = document.getElementsByClassName("row");
let addPostButton = document.getElementById("addPost");
let postFormTitle = document.getElementById('exampleModalLabel');
const errorMsg = document.getElementById('error-message');
const darkModeButton = document.getElementById('btn-dark-mode');
const bodyBg = document.getElementById('body');
const cardBodyText = document.getElementsByClassName('card-body');
const lightModeButton = document.getElementById('btn-light-mode');

saveButton.addEventListener("click", postAddition);
addPostButton.addEventListener('click', () => {
   saveButton.innerText = "Αποθήκευση";
   postFormTitle.textContent = "Προσθήκη Post";
})


// Adding New Post
function postAddition(e) {
  let fImage = 'assets/img/photos/soccer-1.jpg'; // Hardcoding image input due to browser safety reasons. The real validated image will be fetched from server.
  const formName = form.elements["titleText"];
  const formBodyText = form.elements["postText"];
  const editIcon = feather.icons["edit-2"].toSvg();
  const deleteIcon = feather.icons["trash-2"].toSvg();

  // Form Sanitization
  let fName = DOMPurify.sanitize(formName.value);
  let fBody = DOMPurify.sanitize(formBodyText.value);

  // Form Validation
  if(fName === "" ) {
    errorMsg.textContent =  'Το πεδίο "Τίτλος" δεν μπορεί να είναι κενό!';
    e.preventDefault();
    return
  } if(fBody === "" ) {
     errorMsg.textContent =  'Το πεδίο "Κείμενο" δεν μπορεί να είναι κενό!';
     e.preventDefault();
     return
  } else {
     row[0].innerHTML += postContStructure(fImage, fName, fBody, editIcon, deleteIcon);
     errorMsg.textContent = ""
  }
 
  // Resetting Form Inputs
  e.preventDefault();
  formName.value = "";
  formBodyText.value = "";
 
  // Post Content Structure
  function postContStructure(a, b, c, d, f) {
      return `<div class="col-3 post-col">
      <div class="card">
        <img src="${a}" class="card-img-top" alt="Soccer Players"/>
        <div class="card-body">
            <h5 class="card-title">${b}</h5>
            <p class="card-text">${c}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" class="btn btn-primary btn-sm me-md-2 edit-button" onclick="updatePost(this)" data-bs-toggle="modal" data-bs-target="#addPostModal">
              ${d}
              Επεξεργασία
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick="deletePost(this)">
              ${f}
              Διαγραφή
              </button>
            </div>
        </div>
      </div>
    </div>`
  }

  // Setting Dark Mode Inherently for Newer Posts, if it is Already Set
   if(bodyBg.classList.contains('dark-mode')) {
      cardBodyText[cardBodyText.length - 1].classList.add('card-dark-mode');
   }

}

// Deleting Current Post
function deletePost(t) {
  const confirmMsg = confirm('Είστε σίγουροι ότι θέλετε να διαγραφεί το συγκεκριμένο post;');
  if(!confirmMsg) {
      return
  }
  t.parentElement.parentElement.parentElement.parentElement.remove();
}

// Updating Current Post
function updatePost(s) {
  saveButton.innerText = "Ενημέρωση";
  postFormTitle.textContent = "Ενημέρωση Post";
  form.elements["titleText"].value = s.parentElement.parentElement.firstChild.nextSibling.textContent;
  form.elements["postText"].value =  s.parentElement.previousElementSibling.textContent ;
  document.getElementsByClassName('post-col')[0].remove();
}

// Toggle Dark Mode
darkModeButton.addEventListener( 'click', () => {
   lightModeButton.style.zIndex = 1;
   toggleVisionMode();
});

// Toggle Light Mode
lightModeButton.addEventListener ( 'click', () => {
  lightModeButton.style.zIndex = -1;
   toggleVisionMode();
});

function toggleVisionMode() {
  bodyBg.classList.toggle('dark-mode');
  for(let i = 0; i < cardBodyText.length; i++) {
      cardBodyText[i].classList.toggle('card-dark-mode')
  }
}