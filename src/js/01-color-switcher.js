const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const colorChangeInterval = setInterval(getRandomHexColor, 1000);
let timerId = null;
window.addEventListener('load', () => stopBtn.disabled = true)

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
});

function changeOfBodyColor(event) {
  timerId = setInterval(getRandomHexColor, 1000);
  bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
