const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body");
let timerId = null;

startBtn.addEventListener("click", onStartClick);
stopBtn.addEventListener("click", onStopClick);

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function onStartClick() { 
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

function onStopClick() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
};