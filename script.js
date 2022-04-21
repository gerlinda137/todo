// const tasks = document.querySelectorAll(".column-list__item");
const columns = document.querySelectorAll(".column-list");

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

function createNewTask() {
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
  deleteTaskBtn.addEventListener("click", () => remove(taskTemplateClone));
  editTaskBtn.addEventListener("click", () =>
    editTask(
      newTaskTitle,
      newTaskDescription,
      clonedTaskTitle,
      clonedTaskDescription
    )
  );

  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
}

function remove(element) {
  element.remove();
}

function editTask(prevTitle, prevDescription, cardTitle, cardDescription) {
  editTaskPopup.classList.remove("hidden");
  editTitleInput.focus();
  editTitleInput.value = prevTitle;
  editDescriptionInput.value = prevDescription;
  submitEditedTask.addEventListener("click", (event) => {
    event.preventDefault();
    cardTitle.textContent = editTitleInput.value;
    cardDescription.textContent = editDescriptionInput.value;
    editTaskPopup.classList.add("hidden");
  });
}
