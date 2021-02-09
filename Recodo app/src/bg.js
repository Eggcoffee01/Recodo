const body = document.querySelector("body");
const logo = new Image();
const bg = new Image();
const opacity = new Image();

function resized() {
  bg.style.width = `${window.innerWidth}px`;
  bg.style.height = `${window.innerHeight}px`;
  opacity.style.width = `${window.innerWidth}px`;
  opacity.style.height = `${window.innerHeight}px`;
}

function init() {
  window.addEventListener("resize", resized);
  bg.src = "src/resources/bg.jpg";
  bg.className = "bg";
  bg.style.width = `${window.innerWidth}px`;
  bg.style.height = `${window.innerHeight}px`;
  logo.src = "src/resources/logo2.png";
  logo.className = "logo";
  opacity.style.width = `${window.innerWidth}px`;
  opacity.style.height = `${window.innerHeight}px`;
  opacity.className = "opacity";
  body.appendChild(logo);
  body.appendChild(bg);
  body.appendChild(opacity);
}

init();
