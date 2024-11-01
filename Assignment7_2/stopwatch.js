let timer;
let seconds = 0;
let isRunning = false;

const stopwatch = document.getElementById("stopwatch");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const datePicker = document.getElementById("datePicker");

// Initialize the date picker with the current date
const currentDate = new Date().toISOString().split("T")[0];
datePicker.value = currentDate;

function formatTime(secs) {
    const hrs = Math.floor(secs / 3600).toString().padStart(2, '0');
    const mins = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const secsFormatted = (secs % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secsFormatted}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            stopwatch.textContent = formatTime(seconds);
        }, 1000);
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    stopwatch.textContent = "00:00:00";
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
