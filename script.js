const inputs = document.querySelectorAll(".input");
const StartBtn = document.getElementById("StartBtn");
const taskInput = document.getElementById("input");
const TimerInput = document.getElementById("Minutes");
const error = document.getElementById("error");
const TaskCont = document.querySelector(".Task-Cont");
const Started = document.querySelector(".Started");
const TaskName = document.querySelector(".Task-Name");
const duration = document.querySelector(".duration");
const EndSession = document.getElementById("EndSession");
const notActiveToggle = document.querySelector(".not-active");
const ActiveToggle = document.querySelector(".active");
const MusicInput = document.getElementById("Music");
const fileNameDisplay = document.getElementById("file-name-display");
const PauseBtn = document.getElementById("PauseBtn");
const alarmSound = document.getElementById("alarmsound");
const Menu = document.querySelector(".Menu");
const MenuCont = document.querySelector(".Menu-sidebar");
const overlay = document.querySelector(".overlay");
const SessionNav = document.getElementById("Session-Nav");
const CalculatorNav = document.getElementById("Calculator-Nav");
const wrapper = document.querySelector(".wrapper");
const CalculatorWrapper = document.querySelector(".Cal-Wrapper")
let activeTab = "session";

Started.style.display = "none";
MenuCont.style.display = "none";
wrapper.style.display = "block";
SessionNav.style.color = "Blue";

function switchTab(tab) {
    if(tab === "session"){
        SessionNav.style.color = "blue";
        wrapper.style.display = "block";
        CalculatorNav.style.color =  "black";
        if (CalculatorWrapper) CalculatorWrapper.style.display = "none";
    } else {
        CalculatorNav.style.color = "blue";
        SessionNav.style.color = "black";
        wrapper.style.display = "none";
        if(CalculatorWrapper) CalculatorWrapper.style.display = "block";
    }

    activeTab = tab;
}

SessionNav.addEventListener("click", () => switchTab("session"))
CalculatorNav.addEventListener("click", () => switchTab("Calculator"))

switchTab(activeTab);

Menu.addEventListener("click", () => {
    MenuCont.style.display = "block"; 
    overlay.style.display = "block";
})

overlay.addEventListener("click", () => {
    MenuCont.style.display = "none";
    overlay.style.display = "none";
})

inputs.forEach(e => {
    e.classList.add("inputs");
});

function setTheme(isDark) {
    document.body.style.backgroundColor = isDark ? "darkgray" : "white";
    document.body.style.color = isDark ? "white" : "black";
    notActiveToggle.style.display = isDark ? "none" : "flex";
    ActiveToggle.style.display = isDark ? "flex" : "none";
}

notActiveToggle.addEventListener("click", () => setTheme(true));
ActiveToggle.addEventListener("click", () => setTheme(false));

// Globals
let countdownTimer;
let totalSeconds = 0;
let backgroundMusic;
let isPaused = false;

StartBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") {
        error.textContent = "Must Fill in Task";
        error.style.display = "block";
        return;
    }

    if (taskInput.value.trim().length < 4) {
        error.textContent = "Task Name must be Atleast 4 chars";
        error.style.display = "block";
        return;
    }

    const durationValue = parseInt(TimerInput.value.trim());
    if (isNaN(durationValue) || durationValue <= 0) {
        error.textContent = "Please enter a valid duration greater than 0 minutes.";
        error.style.display = "block";
        return;
    }

    // Set up music
    const musicFile = MusicInput.files[0];
    backgroundMusic = null;

    if (musicFile) {
        backgroundMusic = new Audio(URL.createObjectURL(musicFile));
        backgroundMusic.loop = true;
        backgroundMusic.play().catch((err) => {
            console.error("Audio play failed:", err);
        });
    }

    clearInterval(countdownTimer);
    totalSeconds = durationValue * 60;
    isPaused = false;

    error.style.display = "none";
    TaskCont.style.display = "none";
    Started.style.display = "block";
    TaskName.textContent = taskInput.value.trim();
    PauseBtn.textContent = "Pause";

    // Start countdown
    countdownTimer = setInterval(runTimer, 1000);
});

function runTimer() {
    if (totalSeconds <= 0) {
        clearInterval(countdownTimer);
        duration.textContent = "00:00";
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
        alarmSound.play();
        alarmSound.onended = () => {
            TaskCont.style.display = "flex";
            Started.style.display = "none";
            alert("Time's up!");
        };
    } else {
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        duration.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }
}

PauseBtn.addEventListener("click", () => {
    if (isPaused) {
        PauseBtn.textContent = "Pause";
        countdownTimer = setInterval(runTimer, 1000);
        if (backgroundMusic) backgroundMusic.play();
    } else {
        PauseBtn.textContent = "UnPause";
        clearInterval(countdownTimer);
        if (backgroundMusic) backgroundMusic.pause();
    }
    isPaused = !isPaused;
});

EndSession.addEventListener("click", () => {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
    clearInterval(countdownTimer);
    TaskCont.style.display = "flex";
    Started.style.display = "none";
});

// Format time as "mm:ss"
function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

// Update file name display
MusicInput.addEventListener("change", () => {
    const fileName = MusicInput.files[0] ? MusicInput.files[0].name : "No file selected";
    fileNameDisplay.textContent = fileName;
});

// calc

function append(value){
    document.getElementById("display").value += value;
}

function calculate(){
    try{
        const result = eval(document.getElementById("display").value)
        document.getElementById("display").value = result
    } catch {
        document.getElementById("display").value = "Error"
    }
}

function clearDisplay(){
    document.getElementById("display").value = ""
}