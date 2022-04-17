//popup new task
const addTaskBtn = document.querySelector(".header__new-task");
const closeTaskPopup = document.querySelector(".popup__close-btn");
const newTaskPopup = document.querySelector(".add-task-popup");
const taskTitleInput = document.getElementById("add-task-title");
const taskDescriptionInput = document.getElementById("add-task-description");

addTaskBtn.addEventListener("click", () => {
  newTaskPopup.classList.remove("hidden");
  taskTitleInput.focus();
});

closeTaskPopup.addEventListener("click", () => {
  newTaskPopup.classList.add("hidden");
});

function popupTryCloseByClickOutOfContent(event) {
  const popupContent = this.querySelector(".popup__content");
  if (event.target !== popupContent && !popupContent.contains(event.target)) {
    this.classList.add("hidden");
  }
}

newTaskPopup.addEventListener("click", popupTryCloseByClickOutOfContent);

//popup edit task

const editTaskPopup = document.querySelector(".edit-task-popup");
const closeEditTaskPopup = editTaskPopup.querySelector(".popup__close-btn");
const submitEditedTask = editTaskPopup.querySelector("#submitEditedTask");

closeEditTaskPopup.addEventListener("click", () => {
  editTaskPopup.classList.add("hidden");
});

editTaskPopup.addEventListener("click", popupTryCloseByClickOutOfContent);
