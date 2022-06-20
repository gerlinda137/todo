import * as Model from "./model.js";

const kanban = document.querySelector(".kanban__inner");
const submitTaskBtn = document.getElementById("submitTask");
const newTaskPopup = document.querySelector(".add-task-popup");

const errorPopup = document.querySelector(".error-message");
const errorPopupTxt = errorPopup.querySelector(".error-message__txt");

const userNameField = document.querySelector(".user-manu__username");

export function showError(errorMessage) {
  errorPopup.classList.remove("hidden");
  errorPopupTxt.textContent = errorMessage;
}

export function hideError() {
  errorPopup.classList.add("hidden");
}

export function setUserNameInHeader(name) {
  userNameField.textContent = name;
}

Model.addEventListenerOnModelChanged(displayModel);

displayModel();

let currentDraggedTask = null;

//dnd functions
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
  this.classList.remove("hovered");

  const column = this.parentElement;
  const columnId = +column.dataset.columnId;
  const taskId = +currentDraggedTask.dataset.taskId;
  Model.changeCardColumn(taskId, columnId);
}

function displayModel() {
  kanban.textContent = "";
  const model = Model.getModel();
  for (const column of model.columns) {
    const columnTemplate = document.getElementById("columnTemplate");
    const columnTemplateClone =
      columnTemplate.content.firstElementChild.cloneNode(true);
    const clonedColumnTitle =
      columnTemplateClone.querySelector(".column__title");

    clonedColumnTitle.textContent = column.title;
    columnTemplateClone.dataset.columnId = column.id;

    //generate tasks
    const taskTemplate = document.getElementById("taskTemplate");
    let tasks = [];

    if (column.cards !== undefined) {
      for (const task of column.cards) {
        const taskTemplateClone =
          taskTemplate.content.firstElementChild.cloneNode(true);
        const clonedTaskTitle = taskTemplateClone.querySelector(".task__title");
        const clonedTaskDescription =
          taskTemplateClone.querySelector(".task__description");
        const deleteTaskBtn =
          taskTemplateClone.querySelector("#delete-task-btn");
        const editTaskBtn = taskTemplateClone.querySelector("#edit-task-btn");
        clonedTaskTitle.textContent = task.title;
        clonedTaskDescription.textContent = task.description;
        taskTemplateClone.dataset.taskId = task.id;

        //dnd for cards
        taskTemplateClone.addEventListener("dragstart", startDrag);
        taskTemplateClone.addEventListener("dragend", endDrag);

        editTaskBtn.addEventListener("click", () => {
          openEditTaskPopup(task.id, task.title, task.description);
        });

        deleteTaskBtn.addEventListener("click", () => {
          Model.deleteTaskFromModel(column.id, task.id);
        });

        tasks.push(taskTemplateClone);
      }
    }

    kanban.append(columnTemplateClone);
    const columnList = columnTemplateClone.querySelector(".column-list");

    //dnd for columns
    columnList.addEventListener("dragenter", enterDrag);
    columnList.addEventListener("dragover", overDrag);
    columnList.addEventListener("dragleave", leaveDrag);
    columnList.addEventListener("drop", dropDrag);
    for (const taskCard of tasks) {
      columnList.append(taskCard);
    }
  }
}

//addTask

submitTaskBtn.addEventListener("click", (event) => {
  const taskTitleInput = document.getElementById("add-task-title");
  const taskDescriptionInput = document.getElementById("add-task-description");

  let newTaskTitle = taskTitleInput.value;
  let newTaskDescription = taskDescriptionInput.value;

  event.preventDefault();
  Model.makeNewTaskinModel(0, newTaskTitle, newTaskDescription);
  newTaskPopup.classList.add("hidden");
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
});

//editTask
const editTaskPopup = document.querySelector(".edit-task-popup");

function openEditTaskPopup(taskId, taskTitle, taskDescription) {
  const editTitleInput = editTaskPopup.querySelector("#edit-task-title");
  const editDescriptionInput = editTaskPopup.querySelector(
    "#edit-task-description"
  );
  editTaskPopup.classList.remove("hidden");
  editTitleInput.value = taskTitle;
  editDescriptionInput.value = taskDescription;
  editTitleInput.focus();

  const submitEditedTask = editTaskPopup.querySelector("#submitEditedTask");

  submitEditedTask.addEventListener("click", submitBtnHandler);

  function submitBtnHandler(event) {
    event.preventDefault();
    const editedTaskData = getEditedTaskData();
    editTaskPopup.classList.add("hidden");
    Model.editTaskInModel(
      taskId,
      editedTaskData.title,
      editedTaskData.description
    );
    submitEditedTask.removeEventListener("click", submitBtnHandler);
  }
}
function getEditedTaskData() {
  const editTitleInput = editTaskPopup.querySelector("#edit-task-title");
  const editDescriptionInput = editTaskPopup.querySelector(
    "#edit-task-description"
  );

  return {
    title: editTitleInput.value,
    description: editDescriptionInput.value,
  };
}
