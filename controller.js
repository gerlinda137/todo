import * as Model from "./model.js";
import * as View from "./view.js";

// Model.addEventListenerOnModelChanged(View.updateView);

function storeModel() {
  const model = Model.getModel();
  localStorage.setItem("model", JSON.stringify(model));
}
Model.addEventListenerOnModelChanged(storeModel);

let storagedModel = localStorage.getItem("model");
if (storagedModel !== null) {
  Model.rewriteModel(JSON.parse(storagedModel));
} else {
  Model.rewriteModel(generateDebugModel());
}

function generateDebugModel() {
  return {
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
}

//debug tools
// window.debugModel = model;
// window.testAddCard = () => {
//   changeCardColumn(2, 0);
// };
