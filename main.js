// Variabili

const workTitle = document.getElementById('work');
const breakTitle = document.getElementById('break');

const initialWork = 25;
const initialBreak = 5;

let workTime = initialWork;
let breakTime = initialBreak;

let seconds = 0;

// Display

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

window.onload = () => {
    minutesDisplay.innerHTML = initialWork;
    secondsDisplay.innerHTML = getSeconds(seconds);

    workTitle.classList.add('active');
}

// Timer button

const startButton = document.getElementById('start'); 
const resetButton = document.getElementById('reset');

function start() {
// Update Display
startButton.style.display = "none";
resetButton.style.display = "block";

seconds = 59;
workTime--;
let breakCount = 0;

const updateDisplay = () => {
    minutesDisplay.innerHTML = workTime
    secondsDisplay.innerHTML = getSeconds(seconds)
};
// switchToBreak

const switchToBreak = () => {
    workTime = breakTime;
    breakCount++;

    workTitle.classList.remove('active');
    breakTitle.classList.add('active');
};

// switchToWork

const switchToWork = () => {
    workTime = initialWorkTime;
    breakCount++;

    workTitle.classList.add('active');
    breakTitle.classList.remove('active');
}
// updateWorkTime

const updateWorkTime = () => {
    seconds--;
    if(seconds === -1){
        if(breakCount % 2 === 0){
            switchToBreak();
        } else {
            switchToWork();
        }
        seconds = 59;
    }
    updateDisplay();
};

const timer = setInterval(updateWorkTime, 1000);
resetButton.addEventListener('click', () => {
clearInterval(timer);
resetButton.style.display = 'none';
    startButton.style.display = 'block';
    workTime = initialWorkTime;
    breakCount = 0;
    seconds = 0;
    updateDisplay();
});

}


// Utility

function getSeconds (seconds){
    if(seconds < 10){
        return "0" + seconds
    } else {
        return seconds
    }
}