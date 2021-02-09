const clock = document.querySelector("#clock"),
  sayHi = document.querySelector("#sayHi");

function getTime() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  clock.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
}

function sayHiHandler() {
  const currentHour = new Date().getHours();
  if (currentHour >= 19) {
    sayHi.innerText = `Good evening, ${currentName}`;
  } else if (currentHour >= 12) {
    sayHi.innerText = `Good afternoon, ${currentName}`;
  } else {
    sayHi.innerText = `Good morning, ${currentName}`;
  }
}

function Init() {
  getTime();
  setInterval(getTime, 1000);
  sayHiHandler();
  setInterval(sayHiHandler, 1000);
}

Init();
