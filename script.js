const tasks = document.querySelectorAll(".column-list__item");
const columns = document.querySelectorAll(".column-list");
const addTaskBtn = document.querySelector(".header__new-task");
const closeTaskPopup = document.querySelector(".popup__close-btn");
const newTaskPopup = document.querySelector(".add-task-popup");
let currentDraggedTask = null;

for (const task of tasks) {
  task.addEventListener("dragstart", startDrag);
  task.addEventListener("dragend", endDrag);
}

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
  console.log("leavedrag");
}

function dropDrag() {
  this.appendChild(currentDraggedTask);
  //   console.log(event);
  this.classList.remove("hovered");
}

//popup

addTaskBtn.addEventListener("click", () => {
  newTaskPopup.classList.remove("hidden");
});

closeTaskPopup.addEventListener("click", () => {
  newTaskPopup.classList.add("hidden");
});

newTaskPopup.addEventListener("click", (event) => {
  const popupContent = document.querySelector(".popup__content");
  console.log(event.target);
  if (event.target !== popupContent && !popupContent.contains(event.target)) {
    newTaskPopup.classList.add("hidden");
  }
});
