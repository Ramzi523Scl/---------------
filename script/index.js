let arrayOfNotes = [];
let numDownNote = 0;

let listNotes = document.querySelector("#notes");
let modeText = document.querySelector(".mode");

let textarea = document.querySelector(".textarea");
let button = document.querySelector(".button");

button.addEventListener("click", saveNote);

function saveNote(event) {
  let buttonOperationMode = button.dataset.mode;
  let textFromField = textarea.value;

  let isText = areAllCharectersSpaces(textarea.value);
  if (buttonOperationMode === "save" && isText) createNewNote(textFromField);
  else if (buttonOperationMode === "update") updateOldNote(textFromField);

  let clicedNoteLinkName = `li[data-key="${numDownNote + 1}"] span`;
  let clickedNote = listNotes.querySelector(clicedNoteLinkName);
  if (clickedNote !== null) clickedNote.classList.remove("active");

  changeMode("save");
  clearTextarea();
}
let areAllCharectersSpaces = (text) => {
  let symbolsArr = text.split("");
  for (let symbol of symbolsArr) {
    if (symbol !== " ") return true;
  }
  return false;
};

let createNewNote = (text) => {
  arrayOfNotes.push(text);
  let lengthArr = arrayOfNotes.length;
  createItemLi(lengthArr);
};
let updateOldNote = (text) => (arrayOfNotes[numDownNote] = text);
let clearTextarea = () => (textarea.value = null);

let createItemLi = (numberLastNote) => {
  let li = document.createElement("li");
  li.dataset.key = numberLastNote;

  let nameNoteSpan = document.createElement("span");
  nameNoteSpan.classList.add("open");
  nameNoteSpan.innerHTML = `Заметка №${numberLastNote}`;
  nameNoteSpan.addEventListener("click", showTextNote);
  li.appendChild(nameNoteSpan);

  let buttonRemoveSpan = document.createElement("span");
  buttonRemoveSpan.classList.add("remove");
  buttonRemoveSpan.innerHTML = "X";
  buttonRemoveSpan.addEventListener("click", removeNote);
  li.appendChild(buttonRemoveSpan);

  listNotes.appendChild(li);
};
function showTextNote(event) {
  let li = this.parentElement;
  numDownNote = li.dataset.key - 1;
  let textNote = arrayOfNotes[numDownNote];
  textarea.value = textNote;

  changeMode("update");

  let pressNote = this;
  removeAndAddActiveClass(pressNote);
}

function removeNote(event) {
  let li = this.parentElement;
  li.remove();

  if (button.dataset.mode === "update") {
    changeMode("save");
    clearTextarea();
  }
}
let changeMode = (mode) => {
  if (mode === "update") {
    button.dataset.mode = mode;
    modeText.innerHTML = "Режим редактирования заметки";
  } else if (mode === "save") {
    button.dataset.mode = mode;
    modeText.innerHTML = "Режим создания новой заметки";
  }
};
let removeAndAddActiveClass = (note) => {
  let activeNote = document.querySelector(".active");
  if (activeNote) activeNote.classList.remove("active");

  note.classList.add("active");
};
