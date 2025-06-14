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
const notActiveToggleLED = document.querySelector(".not-active-led");
const ActiveToggleLED = document.querySelector(".active-led");
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
const TodoWrapper = document.getElementById("Todo");
const TodoNav = document.getElementById("Todo-Nav");
const ScheduleWrapper = document.getElementById("Schedule");
const ScheduleNav = document.getElementById("Schedule-Nav");
const EveryInput = document.querySelectorAll("input");
const AboutWrapper = document.getElementById("About");
const AboutNav = document.getElementById("About-Nav");
const FeedbackWrapper = document.getElementById("feedback");
const FeedbackNav = document.getElementById("Feedback-Nav");

const saveTheme = JSON.parse(localStorage.getItem("Theme"));
const saveLights = JSON.parse(localStorage.getItem("ThemeLights"))



let activeTab = "session";

Started.style.display = "none";
MenuCont.style.display = "none";
HistoryWrapper.style.display = "none";
TodoWrapper.style.display = "none";
ScheduleWrapper.style.display = "none";
AboutWrapper.style.display = "none";
FeedbackWrapper.style.display = "none";
wrapper.style.display = "block";
SessionNav.style.backgroundColor = "rgb(84, 78, 251)";
SessionNav.style.color = "white";

function switchTab(tab) {
  activeTab = tab;

  const navTabs = [SessionNav, CalculatorNav, HistoryNav, TodoNav, ScheduleNav, AboutNav, FeedbackNav];
  const wrappers = [wrapper, CalculatorWrapper, HistoryWrapper, TodoWrapper, ScheduleWrapper, AboutWrapper, FeedbackWrapper];

  // Hide all wrappers
  wrappers.forEach(w => w && (w.style.display = "none"));

  // Reset all nav styles to default (white bg, black text)
  navTabs.forEach(nav => {
    nav.style.backgroundColor = "white";
    nav.style.color = "black";

    nav.classList.remove("hover");
  });

  // Show the selected wrapper and set active nav style
  switch (tab) {
    case "session":
      wrapper.style.display = "block";
      SessionNav.style.backgroundColor = "rgb(84, 78, 251) !important";
      SessionNav.style.color = "white";
      break;
    case "calculator":
      CalculatorWrapper.style.display = "block";
      CalculatorNav.style.backgroundColor = "rgb(84, 78, 251) !important";
      CalculatorNav.style.color = "white";
      break;
    case "history":
      HistoryWrapper.style.display = "block";
      HistoryNav.style.backgroundColor = "rgb(84, 78, 251) !important";
      HistoryNav.style.color = "white";
      break;
    case "todo":
      TodoWrapper.style.display = "block";
      TodoNav.style.backgroundColor = "rgb(84, 78, 251) !important";
      TodoNav.style.color = "white";
      break;
    case "schedule":
      ScheduleWrapper.style.display = "block";
      ScheduleNav.style.backgroundColor = "rgb(84, 78, 251) !important";
      ScheduleNav.style.color = "white";
      break;
    case "about":
      AboutWrapper.style.display = "block";
      AboutNav.style.backgroundColor = "rgb(84, 78, 251) !important";
      AboutNav.style.color = "white";
      break;
    case "feedback":
      FeedbackWrapper.style.display = "block";
      FeedbackNav.style.backgroundColor = "rgb(84, 78, 251) !important";
      FeedbackNav.style.color = "white";
      break;
  }

  // After switching tab, also update theme styles in case theme is dark
  setTheme(document.body.classList.contains("dark"));
}


// Click events
SessionNav.addEventListener("click", () => switchTab("session"));
CalculatorNav.addEventListener("click", () => switchTab("calculator"));
HistoryNav.addEventListener("click", () => switchTab("history"));
TodoNav.addEventListener("click", () => switchTab("todo"));
ScheduleNav.addEventListener("click", () => switchTab("schedule"));
AboutNav.addEventListener("click", () => switchTab("about"));
FeedbackNav.addEventListener("click", () => switchTab("feedback"));

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

TodoNav.addEventListener("mouseenter", () => {
    if (activeTab !== "todo") {
        TodoNav.classList.add("hover");
    }
});
TodoNav.addEventListener("mouseleave", () => {
    TodoNav.classList.remove("hover");
});

ScheduleNav.addEventListener("mouseenter", () => {
    if (activeTab !== "schedule") {
        ScheduleNav.classList.add("hover");
    }
});
ScheduleNav.addEventListener("mouseleave", () => {
    ScheduleNav.classList.remove("hover");
});

AboutNav.addEventListener("mouseenter", () => {
    if (activeTab !== "about") {
        AboutNav.classList.add("hover");
    }
});
AboutNav.addEventListener("mouseleave", () => {
    AboutNav.classList.remove("hover");
});

FeedbackNav.addEventListener("mouseenter", () => {
    if (activeTab !== "feedback") {
        FeedbackNav.classList.add("hover");
    }
});
FeedbackNav.addEventListener("mouseleave", () => {
    FeedbackNav.classList.remove("hover");
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

const navitems = document.querySelectorAll(".nav-item");

navitems.forEach(item => {
  item.addEventListener("click", () => {
    // Remove ActiveDark from all nav items first
    navitems.forEach(i => i.classList.remove("ActiveDark"));

    // Only add ActiveDark if dark mode is active
    if (document.body.classList.contains("dark")) {
      item.classList.add("ActiveDark");
    }
  });
});


function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  notActiveToggle.style.display = isDark ? "none" : "flex";
  ActiveToggle.style.display = isDark ? "flex" : "none";


  // Reset all tabs to default light/dark colors
  const navTabs = [SessionNav, CalculatorNav, HistoryNav, TodoNav, ScheduleNav, AboutNav, FeedbackNav];


  
  navTabs.forEach(tab => {
    if (isDark) {
      tab.style.backgroundColor = "white";  // default non-active dark mode bg
      tab.style.color = "black";  // default non-active dark mode text

      localStorage.setItem("Theme", JSON.stringify(isDark));           
    } else {
      tab.style.backgroundColor = "white";  // default light mode bg
      tab.style.color = "black";   // default light mode text
      localStorage.setItem("Theme", JSON.stringify(isDark));    
    }
  });

  // Now set active tab style depending on dark or light mode
  if (isDark) {
    // Active tab gets blue background + white text in dark mode
    switch (activeTab) {
      case "session":
        SessionNav.style.backgroundColor = "rgb(84, 78, 251)";
        SessionNav.style.color = "white";
        break;
      case "calculator":
        CalculatorNav.style.backgroundColor = "rgb(84, 78, 251)";
        CalculatorNav.style.color = "white";
        break;
      case "history":
        HistoryNav.style.backgroundColor = "rgb(84, 78, 251)";
        HistoryNav.style.color = "white";
        break;
      case "todo":
        TodoNav.style.backgroundColor = "rgb(84, 78, 251)";
        TodoNav.style.color = "white";
        break;
      case "schedule":
        ScheduleNav.style.backgroundColor = "rgb(84, 78, 251)";
        ScheduleNav.style.color = "white";
        break;
      case "about":
        AboutNav.style.backgroundColor = "rgb(84, 78, 251)";
        AboutNav.style.color = "white";
        break;
      case "feedback":
        FeedbackNav.style.backgroundColor = "rgb(84, 78, 251)";
        FeedbackNav.style.color = "white";
        break;
    }
    localStorage.setItem("Theme", JSON.stringify(isDark));
  } else {
    // Light mode active tab style (looks like your original switchTab)
    switch (activeTab) {
      case "session":
        SessionNav.style.backgroundColor = "rgb(84, 78, 251)";
        SessionNav.style.color = "white";
        break;
      case "calculator":
        CalculatorNav.style.backgroundColor = "rgb(84, 78, 251)";
        CalculatorNav.style.color = "white";
        break;
      case "history":
        HistoryNav.style.backgroundColor = "rgb(84, 78, 251)";
        HistoryNav.style.color = "white";
        break;
      case "todo":
        TodoNav.style.backgroundColor = "rgb(84, 78, 251)";
        TodoNav.style.color = "white";
        break;
      case "schedule":
        ScheduleNav.style.backgroundColor = "rgb(84, 78, 251)";
        ScheduleNav.style.color = "white";
        break;
      case "about":
        AboutNav.style.backgroundColor = "rgb(84, 78, 251)";
        AboutNav.style.color = "white";
        break;
      case "feedback":
        FeedbackNav.style.backgroundColor = "rgb(84, 78, 251)";
        FeedbackNav.style.color = "white";
        break;
    }
    localStorage.setItem("Theme", JSON.stringify(isDark));
  }
}





notActiveToggle.addEventListener("click", () => setTheme(true));
ActiveToggle.addEventListener("click", () => setTheme(false));

setTheme(saveTheme);


function setLights(isLed) {
    notActiveToggleLED.style.display = isLed ? "none" : "flex";
    ActiveToggleLED.style.display = isLed ? "flex" : "none";

    if (isLed) {
        document.body.classList.add("led-on");
        localStorage.setItem("ThemeLights", JSON.stringify(isLed));
    } else {
        document.body.classList.remove("led-on");
        localStorage.setItem("ThemeLights", JSON.stringify(isLed));
    }
}

notActiveToggleLED.addEventListener("click", () => setLights(true));
ActiveToggleLED.addEventListener("click", () => setLights(false));

setLights(saveLights);

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
        alarmSound.play().catch(err => console.log(`Failed to play alarm: ${err}`));
        alarmSound.onended = () => {
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
                    <strong>Duration:</strong>  ${TimerInput.value.trim()}:00 - ${item.duration} <br>
                    <strong>Completed At:</strong> ${item.timestamp}
                </li>
            `).join("")}
        </ul>
        <button id="clearHistoryBtn">Clear History  <i class='bx  bx-trash-alt' style="font-size: 20px; position:relative; top: 3px;"  ></i></button>
    `;

    const clearBtn = document.getElementById("clearHistoryBtn");
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("taskHistory");
        renderHistory()
    })
}

// Todo list

const inputText = document.getElementById("inputText");
const AddBtn = document.getElementById("AddBtn");
const deleteallBtn = document.getElementById("deleteallBtn");
let todos = document.getElementById("todos");
let values = [];
const savetodostorage = JSON.parse(localStorage.getItem("todos"));
const savelinestorage = JSON.parse(localStorage.getItem("todotext")) || {};

if(savetodostorage){
    values = savetodostorage;
    render();
}


AddBtn.addEventListener("click", function(){
    if (inputText.value.trim() !== "") {  // Prevent empty todos
        values.push(inputText.value);
        inputText.value = "";
        render();
    }
})

function render(){

    let todo = "";
    for(let i = 0; i < values.length; i++){
        let isCompleted = savelinestorage[values[i]] ? "line-through" : "none";
        let color = savelinestorage[values[i]] ? "gray" : "none";
      todo += `
        <div class="item">
        <p class="todoText" style="text-decoration: ${isCompleted}; color: ${color};"> ${values[i]} </p>
        <button class="done">✔</button>
        <button class="removeitemBtn"><div><svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 4v6m4-6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></div></button>
        </div>
      `;
    }
    todos.innerHTML = todo;

    if(values.length >= 2){
        todos.style.border = "1px solid gray"
        todos.style.overflowY = "scroll"
    }
    else{
        todos.style.border = "none"
        todos.style.overflowY = "hidden"
    }

    const doneButtons = document.querySelectorAll('.done');
    doneButtons.forEach((button) => {
        button.addEventListener('click', function (event) {
            let todoItem = event.target.previousElementSibling;
            let todoText = todoItem.textContent.trim();

            if (savelinestorage[todoText]) {
                delete savelinestorage[todoText]; // Remove line-through
                todoItem.style.textDecoration = "none";
                todoItem.style.color = "black";
            } else {
                savelinestorage[todoText] = true; // Add line-through
                todoItem.style.textDecoration = "line-through";
                todoItem.style.color = "gray";
            }

            localStorage.setItem("todotext", JSON.stringify(savelinestorage));
        });
    });
    
    const removeitemBtn = document.querySelectorAll(".removeitemBtn");
    removeitemBtn.forEach((button, index) => {
        button.addEventListener("click", () => {
            removethis(index)
        });
    });

    localStorage.setItem("todos", JSON.stringify(values));
}

function removethis(index){
    values.splice(index, 1);
    render();
    localStorage.setItem("todos", JSON.stringify(values));
}

deleteallBtn.addEventListener("dblclick", function(){
    values = [];
    localStorage.removeItem("todos");
    localStorage.removeItem("todotext");
    render();
})

// Schedule

document.addEventListener("DOMContentLoaded", () => {
  const titleInputs  = document.querySelectorAll(".titles");
  const nameInputs   = document.querySelectorAll(".Name");

  const savedTitles = JSON.parse(localStorage.getItem("titles"));
  const savedNames  = JSON.parse(localStorage.getItem("names"));

  if (savedTitles && savedTitles.length === titleInputs.length) {
    titleInputs.forEach((input, i) => {
      input.value = savedTitles[i];
    });
  }

  if (savedNames && savedNames.length === nameInputs.length) {
    nameInputs.forEach((input, i) => {
      input.value = savedNames[i];
    });
  }

  function saveInputs() {
    const titles = Array.from(titleInputs).map(input => input.value);
    const names  = Array.from(nameInputs).map(input => input.value);

    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("names", JSON.stringify(names));
  }

  titleInputs.forEach(input => input.addEventListener("input", saveInputs));
  nameInputs.forEach(input => input.addEventListener("input", saveInputs));
});


// version

const Version = document.querySelector(".Version");
const fullVer = "Version:v2.6.3";
const parts = fullVer.split(":");

// Add a space after the colon manually when reconstructing the HTML
Version.innerHTML = `${parts[0]}: <strong>${parts[1]}</strong>`;