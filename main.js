const addTask = document.getElementById("addTask");
const inputTask = document.getElementById("inputTask");
const allTaskBox = document.getElementById("allTaskBox");

var allTaskList = [];
var isToggle = false;
var updateId = null;

// ------------------------------ Get Todo Local Tasks ------------------------------
window.addEventListener("load", () => {
  const todoLists = localStorage.getItem("todorecords");
  if (todoLists) {
    allTaskList = JSON.parse(todoLists);
  }
  updateList();
});

// ------------------------------ Delete Task ------------------------------
function delTask(id) {
  allTaskList = allTaskList.filter((task) => task.id !== id);
  inputTask.value = "";
  updateList();
}

// ------------------------------ Update Task ------------------------------
const updateTask = (id) => {
  inputTask.value = allTaskList.filter((task) => task.id == id)[0].task;
  isToggle = true;
  updateId = id;
};

// ------------------------------ Add Task ------------------------------
addTask.addEventListener("click", () => {
  if (isToggle) {
    allTaskList = allTaskList.map((t) => {
      if (t.id == updateId) {
        return { ...t, task: inputTask.value };
      }
      return t;
    });
    isToggle = false;
    updateId = null;
  } else {
    allTaskList.push({
      id: new Date().getTime(),
      task: inputTask.value,
    });
  }
  updateList();
  inputTask.value = "";
});

// ------------------------------ Update List  ------------------------------
const updateList = () => {
  const list = allTaskList.map((t, index) => {
    return `<div class="taskBox">
            <p id="${t.id + index}">${t.task}</p>
            <div class="btns">
              <button class="btn" id="delBtn" onclick="delTask(${t.id})">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button class="btn" id="editBtn" onclick="updateTask(${t.id})">
                <i class="fa-solid fa-pen"></i>
              </button>
            </div>
          </div>`;
  });
  localStorage.setItem("todorecords", JSON.stringify(allTaskList));
  allTaskBox.innerHTML = list;
};
