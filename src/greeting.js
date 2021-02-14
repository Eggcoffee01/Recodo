const nameForm = document.querySelector("#nameForm"),
  nameInput = document.querySelector("#nameInput"),
  nameWarningOne = document.querySelector("#nameWarningOne"),
  nameWarningTwo = document.querySelector("#nameWarningTwo"),
  greetSector = document.querySelector("#greetSector"),
  tutorialSector = document.querySelector("#tutorialSector"),
  tutorialOne = document.querySelector("#tutorialOne"),
  tOneGreet = document.querySelector("#tOneGreet"),
  tOneBtn = document.querySelector("#tOneBtn"),
  tutorialTwo = document.querySelector("#tutorialTwo"),
  tTwoBtn = document.querySelector("#tTwoBtn"),
  mainSector = document.querySelector("#mainSector");
let warningOneTimer = 0;
let warningTwoTimer = 0;
const ls = window.localStorage;
let currentName = ls.getItem("name");

function submitHandler(e) {
  e.preventDefault();
  const inputValue = nameInput.value;
  if (inputValue.length > 7) {
    nameWarningOne.style.display = "none";
    nameWarningTwo.style.display = "inline";
    warningTwoTimer += 3;
    setTimeout(warningDisappear, warningTwoTimer * 1000);
  } else if (inputValue) {
    ls.setItem("name", inputValue);
    ls.setItem("tutorialStatus", 0);
    checkNameTutorial();
  } else {
    nameWarningTwo.style.display = "none";
    nameWarningOne.style.display = "inline";
    warningOneTimer += 3;
    setTimeout(warningDisappear, warningOneTimer * 1000);
  }
}

function warningDisappear() {
  nameWarningOne.style.display = "none";
  nameWarningTwo.style.display = "none";
}

function checkNameTutorial() {
  currentName = ls.getItem("name");
  const tutorialStat = ls.getItem("tutorialStatus");
  if (currentName) {
    greetSector.style.display = "none";
    const nameLength = currentName.length;
    if (tutorialStat == 0) {
      tutorialSector.style.display = "inline";
      tutorialOne.style.display = "inline";
      tOneGreet.style.width = `${(18 + nameLength) * 20}px`;
      tOneGreet.style.left = `${(1920 - (18 + nameLength) * 20) / 2}px`;
      tOneGreet.innerText = `Welcome to recodo, ${currentName}`;
      tOneBtn.addEventListener("click", tOneBtnClicked);
    } else if (tutorialStat == 1) {
      tutorialSector.style.display = "inline";
      tutorialOne.style.display = "none";
      tutorialTwo.style.display = "inline";
      const iconOne = new Image();
      const iconTwo = new Image();
      const iconThree = new Image();
      iconOne.src = "src/resources/add2.png";
      iconTwo.src = "src/resources/record2.png";
      iconThree.src = "src/resources/check2.png";
      iconOne.className = "addIcon";
      iconTwo.className = "recordIcon";
      iconThree.className = "checkIcon";
      tutorialTwo.appendChild(iconOne);
      tutorialTwo.appendChild(iconTwo);
      tutorialTwo.appendChild(iconThree);
      tTwoBtn.addEventListener("click", tTwoBtnClicked);
    } else {
      tutorialSector.style.display = "none";
      mainSector.style.display = "inline";
    }
  }
}

function tOneBtnClicked() {
  ls.setItem("tutorialStatus", 1);
  checkNameTutorial();
}
function tTwoBtnClicked() {
  ls.setItem("tutorialStatus", 2);
  checkNameTutorial();
}
function init() {
  nameForm.addEventListener("submit", submitHandler);
  checkNameTutorial();
}

init();
