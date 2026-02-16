let theme = document.querySelector("[id='theme']");
let body = document.getElementById("body");
let inputs = document.querySelectorAll('[class="form-control"]');
let title = document.getElementById("title");
let text = document.getElementById("Textarea");
let container = document.getElementById("container");
let head = document.getElementById("head");
let finish = document.getElementById("finish");
let file = document.getElementById("file");
let history = document.getElementById("history");
let currentIndex = null;

var notes = [];
if (localStorage.getItem("Notes") != null) {
  notes = JSON.parse(localStorage.getItem("Notes"));
  display();
}
theme.addEventListener("click", () => {
  if (theme.innerHTML.includes("Dark")) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].classList.add("theme");
      console.log(inputs[i]);
    }
    title.classList.add("theme");
    text.classList.add("theme");
    head.classList.add("theme");
    head.classList.remove("bg-light-subtle");

    body.classList.add("t-body");
    container.classList.add("t-container");
    theme.innerHTML = "Change them to white ";
  } else {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("theme");
    }

    head.classList.remove("theme");

    title.classList.remove("theme");
    text.classList.remove("theme");
    body.classList.remove("t-body");
    container.classList.remove("t-container");
    head.classList.add("bg-light-subtle");

    theme.innerHTML = "Change them to Dark ";
  }
});

finish.addEventListener("click", () => {

  if (title.value === "" || text.value === "") {
    alert("You must enter data");
    return;
  }

  var note = {
    title: title.value,
    text: text.value,
    file: file.value,
  };

  if (currentIndex !== null) {

    const oldNote = notes[currentIndex];

    const noChange =
      oldNote.title.trim() === note.title.trim() &&
      oldNote.text.trim() === note.text.trim();

    if (noChange) {
        title.value = "";
  text.value = "";
  file.value = "";

      return;
    }

    notes[currentIndex] = note;
    currentIndex = null;
  } else {
    notes.push(note);
  }
    

  title.value = "";
  text.value = "";
  file.value = "";

  localStorage.setItem("Notes", JSON.stringify(notes));
  display();

});

function display() {
  var p = "";
  for (var i = 0; i < notes.length; i++) {
    p += `<div class="mt-3"><tr  > 

  <td >${notes[i].title}</td>
   
    <td><button onclick="Delete(${i})" class="btn btn-outline-danger">delete</button></td>
    <td><button onclick="Show(${i})" class="btn btn-outline-secondary">Show</button></td>

    
     </tr></div>`;
  }
  history.innerHTML = p;
}
function search(title) {
  var x = "";
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title.toLowerCase().includes(title.toLowerCase()) == true) {
      x += `<div class="mt-3 "><tr  > 

  <td >${notes[i].title}</td>
   
    <td><button onclick="Delete(${i})" class="btn btn-outline-danger">delete</button></td>
    <td><button onclick="Show(${i})" class="btn btn-outline-secondary">Show</button></td>

    
     </tr></div>`;
    }
  }
  history.innerHTML = x;
}
function Delete(index) {
  notes.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(notes));

  display();
}
function Show(index) {

  title.value = notes[index].title;
  text.value = notes[index].text;

  currentIndex = index; 
}

