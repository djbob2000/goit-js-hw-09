import '../css/timer.css';
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  dateFormat: 'U',
  altInput: true,
  altFormat: 'j F Y (H:S)',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log('selectedDates[0]::', selectedDates[0]);
    selectedTimeAsUnix = flatpickr.formatDate(selectedDates[0], 'U') * 1000;

    if (selectedTimeAsUnix > Date.now()) {
      startTimerButtonRef.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },

  onReady(selectedDates) {
    startTimerButtonRef.disabled = true;
  },
};

let selectedTimeAsUnix = 0;
let timerTime = 0;

const inputWithCalendarRef = document.querySelector('#datetime-picker');
const startTimerButtonRef = document.querySelector('[data-start]');
const timerDaysRef = document.querySelector('[data-days]');
const timerHoursRef = document.querySelector('[data-hours]');
const timerMinutesRef = document.querySelector('[data-minutes]');
const timerSecondsRef = document.querySelector('[data-seconds]');

const fp = flatpickr(inputWithCalendarRef, options);

startTimerButtonRef.addEventListener('click', onStartTimer);

function onStartTimer(event) {
  timerTime = selectedTimeAsUnix - Date.now();
  startTimerButtonRef.disabled = true;
  startTimerButtonRef.innerText = 'Stop not work:)';

  setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    timerDaysRef.innerText = days;
    timerHoursRef.innerText = hours;
    timerMinutesRef.innerText = minutes;
    timerSecondsRef.innerText = seconds;
    timerTime -= 1000;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
