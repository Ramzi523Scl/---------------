let arrayOfNotes = ["", "", ""];

let listNotes = document.querySelector("#notes");

let textarea = document.querySelector(".textarea");
let button = document.querySelector(".button");

button.addEventListener("click", saveNote);

function saveNote(event) {
  let buttonOperationMode = button.dataset.work;

  if (buttonOperationMode === "save") {
    let textFromField = textarea.value;
    createNewNote(textFromField);
  }
  textarea.value = null;
}
let createNewNote = (text) => {
  arrayOfNotes.push(text);
  let lengthArr = arrayOfNotes.length;
  createItemLi(lengthArr);
};

let createItemLi = (numberLastNote) => {
  let li = document.createElement("li");
  li.dataset.key = numberLastNote;

  let nameNoteSpan = document.createElement("span");
  nameNoteSpan.classList.add("open");
  nameNoteSpan.innerHTML = `Заметка №${numberLastNote}`;
  li.appendChild(nameNoteSpan);

  let buttonRemoveSpan = document.createElement("span");
  buttonRemoveSpan.classList.add("remove");
  buttonRemoveSpan.innerHTML = "X";
  li.appendChild(buttonRemoveSpan);

  listNotes.appendChild(li);
};
