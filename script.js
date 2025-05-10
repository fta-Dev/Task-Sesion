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

Started.style.display = "none";

inputs.forEach(e => {
    e.classList.add("inputs");
});

function setTheme(isDark){
    document.body.style.backgroundColor = isDark ? "darkgray" : "white";
    document.body.style.color = isDark ? "white" : "black";
    notActiveToggle.style.display = isDark ? "none" : "flex";
    ActiveToggle.style.display = isDark ? "flex" : "none";
}

notActiveToggle.addEventListener("click", () => setTheme(true));
ActiveToggle.addEventListener("click", () => setTheme(false))

let countdownTimer; 
let totalSeconds = 0; 
const alarmSound = document.getElementById("alarmsound");

StartBtn.addEventListener("click", () => {
   
    if (taskInput.value.trim() === "") {
        error.textContent = "Must Fill in Task";
        error.style.display = "block";
    } else if (taskInput.value.trim().length < 4) {
        error.textContent = "Task Name must be Atleast 4 chars";
        error.style.display = "block";
    } else {
        const durationValue = parseInt(TimerInput.value.trim());

        if (isNaN(durationValue) || durationValue <= 0) {
            error.textContent = "Please enter a valid duration greater than 0 minutes.";
            error.style.display = "block";
            return;
        }

        clearInterval(countdownTimer);
        totalSeconds = durationValue * 60;

        error.textContent = "";
        error.style.display = "none";
        TaskCont.style.display = "none";
        Started.style.display = "block";
        TaskName.textContent = taskInput.value.trim();

        countdownTimer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownTimer);
                duration.textContent = "00:00";
                alarmSound.play();
                
                alarmSound.onended = () => {
                    TaskCont.style.display = "flex";
                    Started.style.display = "none";
                    alert("Time's up!");
                }
            } else {
                totalSeconds--;

                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                duration.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
            }
        }, 1000);

        EndSession.addEventListener("click", () => {
            clearInterval(countdownTimer);
            TaskCont.style.display = "flex";
            Started.style.display = "none";
        });
    }
});

function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}
