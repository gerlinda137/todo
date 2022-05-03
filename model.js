// Interface:

let model = {
  columns: [],
};

export function getModel() {
  return model;
}

let firingCallbacks = [];

// callback is called each time anything changes in the model
export function addEventListenerOnModelChanged(func) {
  firingCallbacks.push(func);
}

function fireAllModelListeners() {
  for (const callBack of firingCallbacks) {
    callBack();
  }
}

export function makeNewTaskinModel(columnId, title, description) {
  const cardId = generateNewId();
  const newCard = {
    id: cardId,
    title: title,
    description: description,
  };
  model.columns[columnId].cards.push(newCard);
  // call callback here
  fireAllModelListeners();
}

// export function deleteColumn() {}

// export function renameColumn() {}

// export function addColumn() {}

// Implementation:

// let model = {
//   columns: [
//     {
//       id: 0,
//       title: "todo",
//       cards: [
//         {
//           id: 0,
//           title: "Убраться",
//           description: "в квартире",
//         },
//         {
//           id: 1,
//           title: "kill cat",
//           description: "do it slowly",
//         },
//       ],
//     },
//     {
//       id: 1,
//       title: "in progress",
//       cards: [
//         {
//           id: 2,
//           title: "Учиться",
//           description: "Делать приложуху",
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: "done",
//       cards: [
//         {
//           id: 3,
//           title: "Погладить кота",
//           description: "Миленько",
//         },
//       ],
//     },
//   ],
// };

export function rewriteModel(newModel) {
  model = newModel;
  fireAllModelListeners();
}

export function deleteTaskFromModel(columnId, taskId) {
  const array = model.columns[columnId].cards;
  const index = array.findIndex((key) => key.id === taskId);
  array.splice(index, 1);
  fireAllModelListeners();
}

export function editTaskInModel(taskId, newTitle, newDescription) {
  const columns = model.columns;
  for (const column of columns) {
    for (const card of column.cards) {
      if (card.id == taskId) {
        card.title = newTitle;
        card.description = newDescription;
        fireAllModelListeners();
      }
    }
  }
}

export function changeCardColumn(taskId, newColumnId) {
  //найти карточку в модели, записать объект карточки в переменную, удалить карточку из старой колонки и добавить в новую

  const columns = model.columns;
  let draggingCard = null;
  for (const column of columns) {
    const array = column.cards;
    const index = array.findIndex((key) => key.id === taskId);
    if (index >= 0) {
      draggingCard = array[index];
      array.splice(index, 1);
      const newColumnIndex = columns.findIndex((key) => key.id === newColumnId);
      columns[newColumnIndex].cards.push(draggingCard);
      fireAllModelListeners();
    }
  }
}

function generateNewId() {
  let maxNumber = 0;
  for (const column of model.columns) {
    for (const card of column.cards) {
      if (card.id > maxNumber) {
        maxNumber = card.id;
      }
    }
  }
  maxNumber++;
  return maxNumber;
}
