let arrayOfNotes = [];
let numDownNote = 0;

let listNotes = document.querySelector("#notes");
let showMode = document.querySelector(".mode");

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

  changeMode("save");
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
  changeMode("update");

  let pressNote = this;
  removeAndAddActiveClass(pressNote);

  let li = this.parentElement;
  numDownNote = li.dataset.key - 1;
  let textNote = arrayOfNotes[numDownNote];
  textarea.value = textNote;
}

function removeNote(event) {
  let li = this.parentElement;
  li.remove();
}
let changeMode = (mode) => {
  if (mode === "update") {
    button.dataset.mode = mode;
    showMode.innerHTML = "Режим редактирования заметки";
  } else if (mode === "save") {
    button.dataset.mode = mode;
    showMode.innerHTML = "Режим создания новой заметки";
  }
};
let removeAndAddActiveClass = (note) => {
  let activeNote = document.querySelector(".active");
  if (activeNote) activeNote.classList.remove("active");

  note.classList.add("active");
};
