let timerId = null;
const ref = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
  elementWithChangedBg: document.querySelector('body'),
};

ref.startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    colorChange();
  }, 1000);
});

ref.stopButton.addEventListener('click', () => {
  clearInterval(timerId);
});

function colorChange(event) {
  ref.elementWithChangedBg.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
