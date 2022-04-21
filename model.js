// Interface:

export function getModel() {
  return model;
}

let firingCallback;

// callback is called each time anything changes in the model
export function setCallbackOnModelChanged(callback) {
  firingCallback = callback;
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
  firingCallback();
}

// export function deleteColumn() {}

// export function renameColumn() {}

// export function addColumn() {}

// Implementation:

const model = {
  columns: [
    {
      id: 0,
      title: "todo",
      cards: [
        {
          id: 0,
          title: "Убраться",
          description: "в квартире",
        },
        {
          id: 1,
          title: "kill cat",
          description: "do it slowly",
        },
      ],
    },
    {
      id: 1,
      title: "in progress",
      cards: [
        {
          id: 2,
          title: "Учиться",
          description: "Делать приложуху",
        },
      ],
    },
    {
      id: 2,
      title: "done",
      cards: [
        {
          id: 3,
          title: "Погладить кота",
          description: "Миленько",
        },
      ],
    },
  ],
};

export function deleteTaskFromModel(columnId, taskId) {
  const array = model.columns[columnId].cards;
  const index = array.findIndex((key) => key.id === taskId);
  array.splice(index, 1);
  firingCallback();
}

export function editTaskInModel(taskId, newTitle, newDescription) {
  const columns = model.columns;
  for (const column of columns) {
    for (const card of column.cards) {
      if (card.id == taskId) {
        card.title = newTitle;
        card.description = newDescription;
        firingCallback();
      }
    }
  }

  // const array = model.columns[columnId].cards;
  // const index = array.findIndex((key) => key.id === taskId);

  // array[index].title = newTitle;
  // array[index].description = newDescription;
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

window.testAddCard = () => {
  makeNewTaskinModel(1, "hey", "wait");
};
