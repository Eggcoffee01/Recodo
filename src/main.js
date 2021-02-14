const todoForm = document.querySelector("#todoForm"),
  todoInput = document.querySelector("#todoInput"),
  todoWarning = document.querySelector("#todoWarning"),
  todayList = document.querySelector("#todayList"),
  routineList = document.querySelector("#routineList"),
  startSector = document.querySelector("#startSector"),
  recordWarning = document.querySelector("#recordWarning"),
  timelineBtn = document.querySelector("#timelineBtn"),
  chartBtn = document.querySelector("#chartBtn"),
  timelineList = document.querySelector("#timelineList"),
  chartSector = document.querySelector("#chartSector"),
  chartTodayStatus = document.querySelector("#chartTodayStatus"),
  pieChartCircle = document.querySelector("#pieChartCircle"),
  chartRoutineList = document.querySelector("#chartRoutineList");
let todoLs = [];
let todoId = 0;
let routineLs = [];
let routineId = 0;
let startTimer;
let recordLs;
let recordingTime = 0;
let recordedTime = [];
let timelineLs = [];
let currentDate;

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
  if (clicked === 0) {
    checkImg.src = "src/resources/todoBeforeCheck.png";
  } else {
    checkImg.src = "src/resources/todoAfterCheck.png";
    textSpan.classList.toggle("clicked");
  }
  checkImg.addEventListener("click", clickTodo);
  checkImg.id = "check";
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
    clicked,
  };
  todoLs.push(todoObject);
  saveTodoLs();
  checkTodoChart();
}

function clickTodo(e) {
  const parent = e.target.parentNode;
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
  checkTodoChart();
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
  checkTodoChart();
}

function moveToRoutine(e) {
  const parent = e.target.parentNode;
  const text = parent.querySelector("span").innerText;
  addRountine(text);
  deleteTodo(e);
}

function deleteRoutine(e) {
  const selectedList = e.target.parentNode;
  const selectedId = selectedList.id;
  routineList.removeChild(selectedList);
  const idx = routineLs.findIndex(function (item) {
    return item.id == selectedId;
  });
  routineLs.splice(idx, 1);
  saveRoutineLs();
}

function addRountine(text) {
  const id = routineId++;
  const li = document.createElement("li"),
    textSpan = document.createElement("span"),
    upImg = document.createElement("img"),
    startImg = document.createElement("img"),
    hr = document.createElement("hr");
  li.id = id;
  textSpan.innerText = text;
  textSpan.id = "routineTextSpan";
  upImg.src = "src/resources/pointOver.png";
  upImg.id = "moveOver";
  upImg.addEventListener("click", moveToTodo);
  startImg.src = "src/resources/start.png";
  startImg.id = "start";
  startImg.addEventListener("click", startRecord);
  li.appendChild(textSpan);
  li.appendChild(upImg);
  li.appendChild(startImg);
  li.appendChild(hr);
  routineList.appendChild(li);
  const routineObject = {
    text,
    id,
  };
  routineLs.push(routineObject);
  saveRoutineLs();
}

function moveToTodo(e) {
  const parent = e.target.parentNode;
  const text = parent.querySelector("span").innerText;
  addTodo(text, 0);
  deleteRoutine(e);
}
function saveRoutineLs() {
  const stringRoutineLs = JSON.stringify(routineLs);
  ls.setItem("routines", stringRoutineLs);
}

function loadRoutineLs() {
  const loadedRoutines = JSON.parse(ls.getItem("routines"));
  if (loadedRoutines) {
    loadedRoutines.forEach((element) => {
      addRountine(element.text);
    });
  }
}

function stopRecordWarn() {
  recordWarning.style.display = "none";
}

function startRecord(e) {
  if (recordLs) {
    recordWarning.style.display = "inline";
    recordWarning.innerText = "You must stop recording first!";
    setTimeout(stopRecordWarn, 3000);
  } else {
    const parent = e.target.parentNode;
    const text = parent.querySelector("span").innerText;
    const time = new Date().getTime();
    recordLs = { text, time, recording: 0 };
    saveRecordLs();
    createRecord(0);
    deleteRoutine(e);
    createTimeline(text, 0);
  }
}

function saveRecordLs() {
  const stringRecordLs = JSON.stringify(recordLs);
  ls.setItem("record", stringRecordLs);
}

function loadRecordLs() {
  let loadedRecording = JSON.parse(ls.getItem("recording"));
  let loadedRecord = JSON.parse(ls.getItem("record"));
  let loadedRecorded = JSON.parse(ls.getItem("recorded"));
  if (loadedRecorded) {
    recordedTime = loadedRecorded;
  }
  if (loadedRecording) {
    recordingTime += loadedRecording;
  }
  if (loadedRecord) {
    recordLs = loadedRecord;
    createRecord(recordLs.recording);
  }
}
function createRecord(recordingNull) {
  if (recordedTime && recordingTime == 0) {
    for (let i = 0; i < recordedTime.length; i++) {
      if (recordedTime[i].text === recordLs.text) {
        recordingTime = recordedTime[i].time;
        ls.setItem("recording", recordingTime);
        recordedTime.splice(i, 1);
      }
    }
    const stringRecordedLs = JSON.stringify(recordedTime);
    ls.setItem("recorded", stringRecordedLs);
  }
  const span = document.createElement("span"),
    textSpan = document.createElement("span"),
    stopImg = document.createElement("img"),
    recordImg = document.createElement("img"),
    H = document.createElement("span"),
    M = document.createElement("span"),
    S = document.createElement("span"),
    hourText = document.createElement("span"),
    minuteText = document.createElement("span"),
    secondText = document.createElement("span");
  textSpan.innerText = recordLs.text;
  textSpan.id = "recordTextSpan";
  recordImg.id = "routineImg";
  recordImg.src = "src/resources/gotoRoutine.png";
  recordImg.addEventListener("click", recordToRoutine);
  H.id = "H";
  H.innerText = "H";
  M.id = "M";
  M.innerText = "M";
  S.id = "S";
  S.innerText = "S";
  hourText.id = "hourText";
  minuteText.id = "minuteText";
  secondText.id = "secondText";
  span.appendChild(hourText);
  span.appendChild(minuteText);
  span.appendChild(secondText);
  if (recordingNull == 1) {
    stopImg.id = "startImg";
    stopImg.src = "src/resources/startBtn.png";
    stopImg.addEventListener("click", startHandler);
  } else {
    stopImg.id = "stopImg";
    stopImg.src = "src/resources/stop.png";
    stopImg.addEventListener("click", stopHandler);
    startTiming();
  }
  span.appendChild(textSpan);
  span.appendChild(stopImg);
  span.appendChild(recordImg);
  span.appendChild(H);
  span.appendChild(M);
  span.appendChild(S);
  startSector.appendChild(span);
  setTime(recordingNull);
}

function recordToRoutine(e) {
  stopTiming();
  const parent = e.target.parentNode;
  const text = parent.querySelector("#recordTextSpan").innerText;
  addRountine(text);
  startSector.removeChild(parent);
  if (recordLs.recording == 0) {
    recordingTime += new Date().getTime() - recordLs.time;
  }
  const recordedObject = {
    text,
    time: recordingTime,
  };
  recordedTime.push(recordedObject);
  recordedSort();
  const stringRecordedLs = JSON.stringify(recordedTime);
  ls.setItem("recorded", stringRecordedLs);
  recordLs = "";
  saveRecordLs();
  recordingTime = 0;
  ls.setItem("recording", recordingTime);
  createTimeline(text, 2);
  checkRoutineChart();
}
function recordedSort() {
  let indexPlus = 0;
  try {
    for (let i = 0; i < recordedTime.length; i++) {
      for (let j = i; j < recordedTime.length - 1; j++) {
        if (recordedTime[i].text == recordedTime[j + 1].text) {
          recordedTime[i].time += recordedTime[j + 1].time;
          recordedTime.splice(j + 1, 1);
          j--;
          ++indexPlus;
        }
      }
    }
  } catch (e) {}
}
function startHandler(e) {
  const parent = e.target.parentNode;
  const stopImg = document.createElement("img");
  stopImg.id = "stopImg";
  stopImg.src = "src/resources/stop.png";
  stopImg.addEventListener("click", stopHandler);
  parent.removeChild(e.target);
  parent.appendChild(stopImg);
  recordLs.time = new Date().getTime();
  recordLs.recording = 0;
  saveRecordLs();
  startTiming();
  createTimeline(recordLs.text, recordLs.recording);
}
function stopHandler(e) {
  const parent = e.target.parentNode;
  const startImg = document.createElement("img");
  startImg.id = "startImg";
  startImg.src = "src/resources/startBtn.png";
  startImg.addEventListener("click", startHandler);
  parent.removeChild(e.target);
  parent.appendChild(startImg);
  recordingTime += new Date().getTime() - recordLs.time;
  ls.setItem("recording", recordingTime);
  recordLs.recording = 1;
  recordLs.time = 0;
  saveRecordLs();
  stopTiming();
  setTime(1);
  createTimeline(recordLs.text, recordLs.recording);
}
function startTiming() {
  startTimer = setInterval(getTime, 1000);
}
function stopTiming() {
  clearInterval(startTimer);
}
function setTime(timeNull) {
  let recordedSetTime;
  if (timeNull == 1) {
    recordedSetTime = recordingTime;
  } else {
    recordedSetTime = new Date().getTime() - recordLs.time + recordingTime;
  }
  const hourText = document.querySelector("#hourText"),
    minuteText = document.querySelector("#minuteText"),
    secondText = document.querySelector("#secondText"),
    hour = Math.floor(recordedSetTime / 3600000),
    minite = Math.floor((recordedSetTime % 3600000) / 60000),
    second = Math.floor((recordedSetTime % 60000) / 1000);
  hourText.innerText = `${hour < 10 ? `0${hour}` : hour}`;
  minuteText.innerText = `${minite < 10 ? `0${minite}` : minite}`;
  secondText.innerText = `${second < 10 ? `0${second}` : second}`;
}

function createTimeline(text, status) {
  const textData = text;
  const statusData = status;
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const sumTime = `[${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}]`;
  const li = document.createElement("li"),
    dateSpan = document.createElement("span"),
    textSpan = document.createElement("span"),
    hr = document.createElement("hr");
  dateSpan.id = "dateSpan";
  dateSpan.innerText = sumTime;
  textSpan.id = "timelineTextSpan";
  if (statusData == 1) {
    textSpan.innerText = `Paused \'${textData}\'`;
  } else if (statusData == 2) {
    textSpan.innerText = `Finished \'${textData}\'`;
  } else {
    textSpan.innerText = `Started \'${textData}\'`;
  }
  li.appendChild(dateSpan);
  li.appendChild(textSpan);
  li.appendChild(hr);
  timelineList.appendChild(li);
  const timelineObject = {
    text: textData,
    status: statusData,
  };
  timelineLs.push(timelineObject);
  saveTimelineLs();
}
function saveTimelineLs() {
  const stringTimelineLs = JSON.stringify(timelineLs);
  ls.setItem("timeline", stringTimelineLs);
}
function loadTimelineLs() {
  const loadedTimeline = JSON.parse(ls.getItem("timeline"));
  if (loadedTimeline) {
    loadedTimeline.forEach(function (e) {
      createTimeline(e.text, e.status);
    });
  }
}

function getTime() {
  const hourText = document.querySelector("#hourText"),
    minuteText = document.querySelector("#minuteText"),
    secondText = document.querySelector("#secondText"),
    recordedSetTime = new Date().getTime() - recordLs.time + recordingTime,
    hour = Math.floor(recordedSetTime / 3600000),
    minite = Math.floor((recordedSetTime % 3600000) / 60000),
    second = Math.floor((recordedSetTime % 60000) / 1000);
  hourText.innerText = `${hour < 10 ? `0${hour}` : hour}`;
  minuteText.innerText = `${minite < 10 ? `0${minite}` : minite}`;
  secondText.innerText = `${second < 10 ? `0${second}` : second}`;
}

function showChart() {
  chartBtn.style.height = "42px";
  chartBtn.style.top = "130px";
  chartSector.style.display = "block";
  timelineBtn.style.height = "28px";
  timelineBtn.style.top = "144px";
  timelineList.style.display = "none";
}
function showtimeline() {
  chartBtn.style.height = "28px";
  chartBtn.style.top = "144px";
  chartSector.style.display = "none";
  timelineBtn.style.height = "42px";
  timelineBtn.style.top = "130px";
  timelineList.style.display = "block";
}
function checkTodoChart() {
  const todos = todayList.childNodes;
  let index = parseInt(todayList.childElementCount);
  let checkedIndex = 0;
  todos.forEach(function (e) {
    const clickedCheck = e.querySelector("span").className;
    if (clickedCheck === "clicked") {
      checkedIndex++;
    }
  });
  chartToday((checkedIndex / index) * 100);
}

function chartToday(percent) {
  if (isNaN(percent)) {
    chartTodayStatus.innerText = `0%`;
    pieChartCircle.style.strokeDashoffset = `calc(616 - (616 * ${0}) / 100)`;
  } else {
    chartTodayStatus.innerText = `${parseInt(percent)}%`;
    pieChartCircle.style.strokeDashoffset = `calc(616 - (616 * ${percent}) / 100)`;
  }
}
function loadDate() {
  currentDate = parseInt(ls.getItem("date"));
  if (currentDate) {
    const rightNow = new Date().getTime();
    if (
      Math.floor(rightNow / (3600000 * 24)) >
      Math.floor(currentDate / (3600000 * 24))
    ) {
      ls.setItem("tiemline", "");
      ls.setItem("recorded", "");
      ls.setItem("recording", "");
      const date = new Date().getTime();
      ls.setItem("date", date);
    }
  } else {
    const date = new Date().getTime();
    ls.setItem("date", date);
  }
}

function checkRoutineChart() {
  const allChild = chartRoutineList.childNodes;
  allChild.forEach(function (e) {
    chartRoutineList.removeChild(e);
  });

  if (recordedTime) {
    currentDate = parseInt(ls.getItem("date"));
    const usedRecodoTime = new Date().getTime() - currentDate;
    recordedTime.forEach(function (e) {
      addRountineChart(e.text, e.time / usedRecodoTime);
    });
  }
}

function addRountineChart(text, time) {
  const li = document.createElement("li"),
    span = document.createElement("span"),
    hr = document.createElement("hr");
  span.innerText = text;
  hr.style.width = `${290 * parseFloat(time)}px`;
  li.appendChild(span);
  li.appendChild(hr);
  chartRoutineList.appendChild(li);
}

function init() {
  chartBtn.addEventListener("click", showChart);
  timelineBtn.addEventListener("click", showtimeline);
  todoForm.addEventListener("submit", todoSubmitHandler);
  loadDate();
  loadTodoLS();
  loadRoutineLs();
  loadRecordLs();
  loadTimelineLs();
  checkTodoChart();
  checkRoutineChart();
  setInterval(checkRoutineChart, 60000);
}

init();
