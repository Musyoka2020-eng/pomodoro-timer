const timerEl = document.getElementById('timer');
const startBtnEl = document.getElementById('start');
const stopBtnEl = document.getElementById('stop');
const resetBtnEL = document.getElementById('reset');

let interval;
let timeLeft = 1500;
let timerRunning = false;

/**
 * Updates the timer display with the current time remaining.
 */
function updateTimer() {
    /**
     * Calculates the number of minutes and seconds remaining.
     * @param {number} timeLeft - The total time remaining, in seconds.
     * @returns {{ minutes: number, seconds: number }} - An object containing the number of minutes and seconds remaining.
     */
    function getMinutesAndSeconds(timeLeft) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return { minutes, seconds };
    }

    /**
     * Formats the minutes and seconds into a string with leading zeros.
     * @param {{ minutes: number, seconds: number }} minutesAndSeconds - An object containing the number of minutes and seconds.
     * @returns {string} - The formatted time, with leading zeros for minutes and seconds.
     */
    function formatTime(minutesAndSeconds) {
        const { minutes, seconds } = minutesAndSeconds;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    // Get the time remaining
    const minutesAndSeconds = getMinutesAndSeconds(timeLeft);
    // Format the time and update the display
    const formattedTime = formatTime(minutesAndSeconds);
    timerEl.innerHTML = formattedTime;
}

/**
 * Starts the timer.
 *
 * If the timer is already running, this method does nothing.
 *
 * @return {void}
 */
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        startBtnEl.disabled = true;
        interval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                alert('Time\'s up!');
                resetTimer();
            }
        }, 1000);
    }
}

/**
 * Stops the timer.
 *
 * If the timer is not running, this method does nothing.
 *
 * @return {void}
 */
function stopTimer() {
    if (timerRunning) {
        clearInterval(interval);
        timerRunning = false;
        startBtnEl.disabled = false;
    }
}

/**
 * Resets the timer.
 *
 * This function stops the timer, sets the time remaining to 1500 seconds, updates the timer display, and enables the start button.
 *
 * @return {void}
 */
function resetTimer() {
    clearInterval(interval);
    timerRunning = false;
    timeLeft = 1500;
    updateTimer();
    startBtnEl.disabled = false;
}

startBtnEl.addEventListener('click', startTimer);
stopBtnEl.addEventListener('click', stopTimer);
resetBtnEL.addEventListener('click', resetTimer);
