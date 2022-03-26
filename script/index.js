let arrayOfNotes = [];
let numDownNote = 0;

let listNotes = document.querySelector("#notes");
let mode = document.querySelector(".mode");

let textarea = document.querySelector(".textarea");
let button = document.querySelector(".button");

button.addEventListener("click", saveNote);

function saveNote(event) {
  let buttonOperationMode = button.dataset.mode;
  let textFromField = textarea.value;

  if (buttonOperationMode === "save") createNewNote(textFromField);
  else if (buttonOperationMode === "update") updateOldNote(textFromField);

  let activeSpan = listNotes.querySelector(
    `li[data-key="${numDownNote + 1}"] span`
  );
  activeSpan.classList.remove("active");
  mode.innerHTML = "Режим создания новой заметки";

  button.dataset.mode = "save";
  textarea.value = null;
}
let updateOldNote = (text) => (arrayOfNotes[numDownNote] = text);

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
  nameNoteSpan.addEventListener("click", showTextNode);
  li.appendChild(nameNoteSpan);

  let buttonRemoveSpan = document.createElement("span");
  buttonRemoveSpan.classList.add("remove");
  buttonRemoveSpan.innerHTML = "X";
  buttonRemoveSpan.addEventListener("click", removeNote);
  li.appendChild(buttonRemoveSpan);

  listNotes.appendChild(li);
};
function showTextNode(event) {
  button.dataset.mode = "update";
  this.classList.add("active");
  mode.innerHTML = "Режим редактирования заметки";
  let li = this.parentElement;
  numDownNote = li.dataset.key - 1;
  let textNote = arrayOfNotes[numDownNote];
  textarea.value = textNote;
}

function removeNote(event) {
  let li = this.parentElement;
  li.remove();
}
