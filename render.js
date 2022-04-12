// import { getModel } from "./model.js";
import * as Model from "./model.js";
const model = Model.getModel();
const kanban = document.querySelector(".kanban");

//generate columns

console.log("keke=k");

for (const column of model.columns) {
  const columnTemplate = document.getElementById("columnTemplate");
  const columnTemplateClone =
    columnTemplate.content.firstElementChild.cloneNode(true);
  const clonedColumnTitle = columnTemplateClone.querySelector(".column__title");

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
    clonedTaskTitle.textContent = task.title;
    clonedTaskDescription.textContent = task.description;
    taskTemplateClone.dataset.taskId = task.id;

    tasks.push(taskTemplateClone);
  }

  kanban.append(columnTemplateClone);
  const columnList = columnTemplateClone.querySelector(".column-list");
  for (const taskCard of tasks) {
    columnList.append(taskCard);
  }
}
