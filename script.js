// const tasks = document.querySelectorAll(".column-list__item");
const columns = document.querySelectorAll(".column-list");
const addTaskBtn = document.querySelector(".header__new-task");
const closeTaskPopup = document.querySelector(".popup__close-btn");
const newTaskPopup = document.querySelector(".add-task-popup");
const submitTaskBtn = document.getElementById("submitTask");
const taskTitleInput = document.getElementById("add-task-title");
const taskDescriptionInput = document.getElementById("add-task-description");
let currentDraggedTask = null;

// for (const task of tasks) {
//   task.addEventListener("dragstart", startDrag);
//   task.addEventListener("dragend", endDrag);
// }

for (const column of columns) {
  column.addEventListener("dragenter", enterDrag);
  column.addEventListener("dragover", overDrag);
  column.addEventListener("dragleave", leaveDrag);
  column.addEventListener("drop", dropDrag);
}

function startDrag(event) {
  event.target.classList.add("on-hold");
  setTimeout(() => {
    event.target.classList.add("hidden");
  }, 0);
  currentDraggedTask = event.target;
}

function overDrag(event) {
  event.preventDefault();
}

function endDrag() {
  console.log("endDrag");
  this.classList.remove("on-hold");
  this.classList.remove("hidden");
}

function enterDrag() {
  this.classList.add("hovered");
}

function leaveDrag() {
  this.classList.remove("hovered");
}

function dropDrag() {
  console.log(currentDraggedTask);
  this.appendChild(currentDraggedTask);
  this.classList.remove("hovered");
}

//popup new task

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
const editTitleInput = editTaskPopup.querySelector("#edit-task-title");
const editDescriptionInput = editTaskPopup.querySelector(
  "#edit-task-description"
);
const closeEditTaskPopup = editTaskPopup.querySelector(".popup__close-btn");
const submitEditedTask = editTaskPopup.querySelector("#submitEditedTask");

closeEditTaskPopup.addEventListener("click", () => {
  editTaskPopup.classList.add("hidden");
});

editTaskPopup.addEventListener("click", popupTryCloseByClickOutOfContent);

//addTask

submitTaskBtn.addEventListener("click", kek);

function kek(event) {
  event.preventDefault();
  newTaskPopup.classList.add("hidden");

  let newTaskTitle = taskTitleInput.value;
  let newTaskDescription = taskDescriptionInput.value;

  const taskTemplate = document.getElementById("taskTemplate");
  const taskTemplateClone =
    taskTemplate.content.firstElementChild.cloneNode(true);
  const clonedTaskTitle = taskTemplateClone.querySelector(".task__title");
  const clonedTaskDescription =
    taskTemplateClone.querySelector(".task__description");
  const deleteTaskBtn = taskTemplateClone.querySelector("#delete-task-btn");
  const editTaskBtn = taskTemplateClone.querySelector("#edit-task-btn");

  clonedTaskTitle.textContent = newTaskTitle;
  clonedTaskDescription.textContent = newTaskDescription;

  columns[0].prepend(taskTemplateClone);
  taskTemplateClone.addEventListener("dragstart", startDrag);
  taskTemplateClone.addEventListener("dragend", endDrag);
  deleteTaskBtn.addEventListener("click", removeTask);
  editTaskBtn.addEventListener("click", editTask);

  taskTitleInput.value = "";
  taskDescriptionInput.value = "";

  function removeTask() {
    taskTemplateClone.remove();
  }
}

function createTask(title, description, column, template) {
  const taskTemplateClone = template.content.firstElementChild.cloneNode(true);
  const clonedTaskTitle = taskTemplateClone.querySelector(".task__title");
  const clonedTaskDescription =
    taskTemplateClone.querySelector(".task__description");
  clonedTaskTitle.textContent = title;
  clonedTaskDescription.textContent = description;
  column.prepend(taskTemplateClone);
  taskTemplateClone.addEventListener("dragstart", startDrag);
  taskTemplateClone.addEventListener("dragend", endDrag);
}

function editTask() {
  editTaskPopup.classList.remove("hidden");
  editTitleInput.focus();
  editTitleInput.value = newTaskTitle;
  editDescriptionInput.value = newTaskDescription;
  submitEditedTask.addEventListener("click", (event) => {
    event.preventDefault();
    clonedTaskTitle.textContent = editTitleInput.value;
    clonedTaskDescription.textContent = editDescriptionInput.value;
  });
}
