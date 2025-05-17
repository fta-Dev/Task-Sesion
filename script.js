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
const CalculatorWrapper = document.querySelector(".Cal-Wrapper");
const HistoryWrapper = document.getElementById("History");
const HistoryNav = document.getElementById("History-Nav");


let activeTab = "session";

Started.style.display = "none";
MenuCont.style.display = "none";
HistoryWrapper.style.display = "none"
wrapper.style.display = "block";
SessionNav.style.backgroundColor = "rgb(84, 78, 251)";
SessionNav.style.color = "white";

function switchTab(tab) {
    if (tab === "session") {
        SessionNav.style.backgroundColor = "rgb(84, 78, 251)";
        wrapper.style.display = "block";
        CalculatorNav.style.backgroundColor = "white";
        HistoryNav.style.backgroundColor = "white";
        SessionNav.style.color = "white";
        CalculatorNav.style.color = "black";
        HistoryNav.style.color = "black";
        if (CalculatorWrapper) CalculatorWrapper.style.display = "none";
        if (HistoryWrapper) HistoryWrapper.style.display = "none";
    } else {
        if(tab === "calculator") {
        CalculatorNav.style.backgroundColor = "rgb(84, 78, 251)";
        SessionNav.style.backgroundColor = "white";
        HistoryNav.style.backgroundColor = "white";
        wrapper.style.display = "none";
        HistoryWrapper.style.display = "none";
        SessionNav.style.color = "black";
        HistoryNav.style.color = "black";
        CalculatorNav.style.color = "white";
        if (CalculatorWrapper) CalculatorWrapper.style.display = "block";
        }
        else if(tab === "history") {
            HistoryNav.style.backgroundColor = "rgb(84, 78, 251)";
            SessionNav.style.backgroundColor = "white";
            CalculatorNav.style.backgroundColor = "white";
            wrapper.style.display = "none";
            CalculatorWrapper.style.display = "none";
            SessionNav.style.color = "black";
            CalculatorNav.style.color = "black";
            HistoryNav.style.color = "white";
            if (HistoryWrapper) HistoryWrapper.style.display = "block";
        }
    }
    activeTab = tab;
}

// Click events
SessionNav.addEventListener("click", () => switchTab("session"));
CalculatorNav.addEventListener("click", () => switchTab("calculator"));
HistoryNav.addEventListener("click", () => switchTab("history"));

// Hover effects only if tab is not active
SessionNav.addEventListener("mouseenter", () => {
    if (activeTab !== "session") {
        SessionNav.classList.add("hover");
    }
});
SessionNav.addEventListener("mouseleave", () => {
    SessionNav.classList.remove("hover");
});

CalculatorNav.addEventListener("mouseenter", () => {
    if (activeTab !== "calculator") {
        CalculatorNav.classList.add("hover");
    }
});
CalculatorNav.addEventListener("mouseleave", () => {
    CalculatorNav.classList.remove("hover");
});

HistoryNav.addEventListener("mouseenter", () => {
    if (activeTab !== "history") {
        HistoryNav.classList.add("hover");
    }
});
HistoryNav.addEventListener("mouseleave", () => {
    HistoryNav.classList.remove("hover");
});

switchTab(activeTab);

// Menu
Menu.addEventListener("click", () => {
    MenuCont.style.display = "block";
    overlay.style.display = "block";
});

overlay.addEventListener("click", () => {
    MenuCont.style.display = "none";
    overlay.style.display = "none";
});

// Input classes
inputs.forEach(e => {
    e.classList.add("inputs");
});

// Theme toggle
function setTheme(isDark) {
    document.body.style.backgroundColor = isDark ? "rgb(87, 87, 87)" : "white";
    document.body.style.color = isDark ? "rgb(199, 199, 199)" : "black";
    MenuCont.style.backgroundColor = isDark ? "rgb(100, 100, 100)" : "white";
    notActiveToggle.style.display = isDark ? "none" : "flex";
    Menu.style.color = isDark ? "white" : "black";
    ActiveToggle.style.display = isDark ? "flex" : "none";
    taskInput.style.color = isDark ? "rgb(199, 199, 199)" : "black";
    document.querySelector(".calculator").style.backgroundColor = isDark ? "rgb(100, 100, 100)" : "white";
    fileNameDisplay.style.color = isDark ? "rgb(182, 182, 182)" : "gray";
}

notActiveToggle.addEventListener("click", () => setTheme(true));
ActiveToggle.addEventListener("click", () => setTheme(false));

// Timer
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
    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
    clearInterval(countdownTimer);
    saveTaskToHistory(TaskName.textContent, getFormattedDuration());
    TaskCont.style.display = "flex";
    Started.style.display = "none";
});

function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function getFormattedDuration() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${formatTime(minutes)}:${formatTime(seconds)}`;
}

MusicInput.addEventListener("change", () => {
    const fileName = MusicInput.files[0] ? MusicInput.files[0].name : "No file selected";
    fileNameDisplay.textContent = fileName;
});

// Calculator
function append(value) {
    document.getElementById("display").value += value;
}

function calculate() {
    try {
        const result = eval(document.getElementById("display").value);
        document.getElementById("display").value = result;
    } catch {
        document.getElementById("display").value = "Error";
    }
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

// =========================
// === History Feature ====
// =========================

function saveTaskToHistory(taskName, duration) {
    const history = JSON.parse(localStorage.getItem("taskHistory")) || [];
    const timestamp = new Date().toLocaleString();
    history.push({ taskName, duration, timestamp});
    localStorage.setItem("taskHistory", JSON.stringify(history));
}

HistoryNav.addEventListener("click", () => {
    renderHistory();
})

function renderHistory(){
    const history = JSON.parse(localStorage.getItem("taskHistory") || "[]");
    HistoryWrapper.innerHTML = `
        <h2>Session History</h2>
        ${history.length === 0 ? "<p>No session history yet.</p>" : ""}
        <ul class="history-list">
            ${history.map(item => `
                <li>
                    <strong>Task:</strong> ${item.taskName} <br>
                    <strong>Duration:</strong> ${item.duration} <br>
                    <strong>Completed At:</strong> ${item.timestamp}
                </li>
            `).join("")}
        </ul>
        <button id="clearHistoryBtn">Clear History</button>
    `;

    const clearBtn = document.getElementById("clearHistoryBtn");
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("taskHistory");
        renderHistory()
    })
}