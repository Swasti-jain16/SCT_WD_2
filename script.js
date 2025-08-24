 let startTime, updatedTime, difference = 0, timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function timeToString(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10); // 2-digit ms

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(milliseconds).padStart(2, '0')
  );
}

function updateDisplay() {
  updatedTime = Date.now();
  difference = updatedTime - startTime;
  display.textContent = timeToString(difference);
}

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - difference;
    timerInterval = setInterval(updateDisplay, 10); // 10ms = 2-digit ms
    isRunning = true;
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00.00';
  difference = 0;
  isRunning = false;
  laps.innerHTML = '';
  lapCounter = 0;
}

function recordLap() {
  if (isRunning) {
    const lapTime = timeToString(difference);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${++lapCounter}: ${lapTime}`;
    laps.appendChild(lapItem);
  }
}
