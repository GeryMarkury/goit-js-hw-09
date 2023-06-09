import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const daysNumber = document.querySelector("span[data-days]");
const hoursNumber = document.querySelector("span[data-hours]");
const minsNumber = document.querySelector("span[data-minutes]");
const secsNumber = document.querySelector("span[data-seconds]");
const startBtn = document.querySelector("button[data-start]");
const inputEl = document.querySelector("#datetime-picker");

let selectedDate = {};

function convertMs(ms) {
  // Number of milliseconds per unit of time
const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] - new Date() > 0) {
          startBtn.disabled = false;
          selectedDate = selectedDates[0];
      }
      else {
          window.alert("Please choose a date in the future");
      }
  },
};

flatpickr(inputEl, options);

startBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

function addLeadingZero(str) { 
  let newStr = "";
  if (str.length === 1) {
    newStr = str.padStart(2, '0');
  } else {
    return str;
  }
  return newStr;    
};

function onStartClick() {
    const timerId = setInterval(() => {
    let ms = selectedDate - new Date();
    let toSelectedDate = convertMs(ms);
    
    daysNumber.textContent = addLeadingZero(JSON.stringify(toSelectedDate.days));
    hoursNumber.textContent = addLeadingZero(JSON.stringify(toSelectedDate.hours));
    minsNumber.textContent = addLeadingZero(JSON.stringify(toSelectedDate.minutes));
    secsNumber.textContent = addLeadingZero(JSON.stringify(toSelectedDate.seconds));
      
    if (toSelectedDate.days === 0 && toSelectedDate.hours === 0 && toSelectedDate.minutes === 0 && toSelectedDate.seconds === 0) {
      clearInterval(timerId);
    }
    }, 1000);
};

