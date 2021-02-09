const todoForm = document.querySelector("#todoForm"),
  todoInput = document.querySelector("#todoInput"),
  todoWarning = document.querySelector("#todoWarning"),
  todayList = document.querySelector("#todayList"),
  routineList = document.querySelector("#routineList");
let todoLs = [];
let todoId = 0;

function todoSubmitHandler(e) {
  e.preventDefault();
  const currentTodo = todoInput.value;
  if (currentTodo.length > 15) {
    todoWarning.innerText = "Name must be 15 characters or less";
    todoWarn();
  } else if (currentTodo) {
    addTodo(currentTodo, 0);
    todoInput.value = "";
  } else {
    todoWarning.innerText = "Let us know your todo";
    todoWarn();
  }
}

function todoWarn() {
  todoWarning.style.display = "inline";
  setTimeout(todoWarningDispappear, 3000);
}
function todoWarningDispappear() {
  todoWarning.style.display = "none";
}

function saveTodoLs() {
  const stringTodoLs = JSON.stringify(todoLs);
  ls.setItem("todos", stringTodoLs);
}

function loadTodoLS() {
  const loadedTodos = JSON.parse(ls.getItem("todos"));
  if (loadedTodos) {
    loadedTodos.forEach((element) => {
      addTodo(element.text, element.clicked);
    });
  }
}

function addTodo(text, clicked) {
  let clickedCheck = clicked;
  const id = todoId++;
  const li = document.createElement("li"),
    textSpan = document.createElement("span"),
    checkImg = document.createElement("img"),
    moveImg = document.createElement("img"),
    deleteImg = document.createElement("img"),
    hr = document.createElement("hr");
  li.id = id;
  textSpan.innerText = text;
  textSpan.id = "textSpan";
  if (clicked == 0) {
    checkImg.src = "src/resources/todoBeforeCheck.png";
  } else {
    checkImg.src = "src/resources/todoAfterCheck.png";
    textSpan.classList.toggle("clicked");
  }
  checkImg.id = "check";
  checkImg.addEventListener("click", clickTodo);
  moveImg.src = "src/resources/pointUnder.png";
  moveImg.id = "moveUnder";
  moveImg.addEventListener("click", moveToRoutine);
  deleteImg.addEventListener("click", deleteTodo);
  deleteImg.src = "src/resources/todoDelete.png";
  deleteImg.id = "delete";
  li.appendChild(checkImg);
  li.appendChild(textSpan);
  li.appendChild(moveImg);
  li.appendChild(deleteImg);
  li.appendChild(hr);
  todayList.appendChild(li);

  const todoObject = {
    text,
    id,
    clicked: clickedCheck,
  };
  todoLs.push(todoObject);
  saveTodoLs();
}

function clickTodo(e) {
  const parent = e.target.parentNode;
  console.log(parent);
  const textSpan = parent.querySelector("span");
  textSpan.classList.toggle("clicked");
  const id = parent.id;
  const idx = todoLs.findIndex(function (item) {
    return item.id == id;
  });
  if (todoLs[idx].clicked == 0) {
    e.target.src = "src/resources/todoAfterCheck.png";
    todoLs[idx].clicked = 1;
  } else {
    e.target.src = "src/resources/todoBeforeCheck.png";
    todoLs[idx].clicked = 0;
  }
  saveTodoLs();
}

function deleteTodo(e) {
  const selectedList = e.target.parentNode;
  const selectedId = selectedList.id;
  todayList.removeChild(selectedList);
  const idx = todoLs.findIndex(function (item) {
    return item.id == selectedId;
  });
  todoLs.splice(idx, 1);
  saveTodoLs();
}

function moveToRoutine() {}

function addRountine(text, recorded) {}

function init() {
  addEventListener("submit", todoSubmitHandler);
  loadTodoLS();
}

init();
