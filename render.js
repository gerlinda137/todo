// import { getModel } from "./model.js";
import * as Model from "./model.js";
const model = Model.getModel();
const kanban = document.querySelector(".kanban");
const submitTaskBtn = document.getElementById("submitTask");
const newTaskPopup = document.querySelector(".add-task-popup");

//generate columns

// console.log("keke=k");

Model.setCallbackOnModelChanged(updateView);

function updateView() {
  kanban.textContent = "";
  DoViewThings();
}

// Model.makeNewTaskinModel(0, "egesg", "ehesh");

DoViewThings();

function DoViewThings() {
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

    for (const task of column.cards) {
      const taskTemplateClone =
        taskTemplate.content.firstElementChild.cloneNode(true);
      const clonedTaskTitle = taskTemplateClone.querySelector(".task__title");
      const clonedTaskDescription =
        taskTemplateClone.querySelector(".task__description");
      const deleteTaskBtn = taskTemplateClone.querySelector("#delete-task-btn");
      const editTaskBtn = taskTemplateClone.querySelector("#edit-task-btn");
      clonedTaskTitle.textContent = task.title;
      clonedTaskDescription.textContent = task.description;
      taskTemplateClone.dataset.taskId = task.id;

      editTaskBtn.addEventListener("click", () => {
        openEditTaskPopup(task.id, task.title, task.description);
      });

      deleteTaskBtn.addEventListener("click", () => {
        Model.deleteTaskFromModel(column.id, task.id);
      });

      tasks.push(taskTemplateClone);
    }

    kanban.append(columnTemplateClone);
    const columnList = columnTemplateClone.querySelector(".column-list");
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

  submitEditedTask.addEventListener("click", (event) => {
    event.preventDefault();
    const editedTaskData = getEditedTaskData();
    editTaskPopup.classList.add("hidden");
    Model.editTaskInModel(
      taskId,
      editedTaskData.title,
      editedTaskData.description
    );
  });
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

//
