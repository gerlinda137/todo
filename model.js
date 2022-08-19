// Interface:

export function generateInitialModel() {
  return {
    columns: [
      {
        id: 0,
        title: "todo",
        cards: [
          {
            id: 0,
            title: "Add your tasks to the board",
            description: "and write some description",
            // currentTrackingStartTimestamp: 0 - время не начиналось
            // totalTrackedTime: в это поле суммируется время которое натикало когда пользователь нажал на паузу
          },
        ],
      },
      {
        id: 1,
        title: "in progress",
        cards: [],
      },
      {
        id: 2,
        title: "done",
        cards: [],
      },
    ],
  };
}

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
  if (model.columns[columnId].cards == undefined) {
    model.columns[columnId].cards = [];
  }
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
    if (column.cards == undefined) {
      column.cards = [];
    }
    for (const card of column.cards) {
      if (card.id == taskId) {
        card.title = newTitle;
        card.description = newDescription;
        fireAllModelListeners();
      }
    }
  }
}

export function startTrackTimeInTask(taskId, startTimestamp) {
  const columns = model.columns;
  for (const column of columns) {
    if (column.cards == undefined) {
      column.cards = [];
    }
    const cards = column.cards;
    for (const card of cards) {
      if (card.id == taskId) {
        card.startTimestamp = startTimestamp;
        fireAllModelListeners();
        return;
      }
    }
  }
}

export function stopTrackTimeInTask(taskId, stoppedTimestamp, startTimestamp) {
  const columns = model.columns;
  for (const column of columns) {
    if (column.cards == undefined) {
      column.cards = [];
    }
    const cards = column.cards;
    for (const card of cards) {
      if (card.id == taskId) {
        if (card.trackedTime == undefined) {
          card.trackedTime = stoppedTimestamp - startTimestamp;
        } else {
          card.trackedTime += stoppedTimestamp - startTimestamp;
        }

        card.startTimestamp = 0;
        fireAllModelListeners();
        return;
      }
    }
  }
}

export function changeCardColumn(taskId, newColumnId) {
  //найти карточку в модели, записать объект карточки в переменную, удалить карточку из старой колонки и добавить в новую

  const columns = model.columns;
  let draggingCard = null;
  for (const column of columns) {
    if (column.cards == undefined) {
      column.cards = [];
    }
    const array = column.cards;
    const index = array.findIndex((key) => key.id === taskId);
    if (index >= 0) {
      draggingCard = array[index];
      array.splice(index, 1);
      const newColumnIndex = columns.findIndex((key) => key.id === newColumnId);
      if (columns[newColumnIndex].cards == undefined) {
        columns[newColumnIndex].cards = [];
      }
      columns[newColumnIndex].cards.push(draggingCard);
      fireAllModelListeners();
    }
  }
}

function generateNewId() {
  let maxNumber = 0;
  for (const column of model.columns) {
    if (column.cards !== undefined) {
      for (const card of column.cards) {
        if (card.id > maxNumber) {
          maxNumber = card.id;
        }
      }
    }
  }
  maxNumber++;
  return maxNumber;
}
