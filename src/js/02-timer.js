import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix/build/notiflix-notify-aio';

const timerContainer = document.querySelector('.timer');
timerContainer.style.display = 'flex';
timerContainer.style.gap = '20px';
const timerFields = document.querySelectorAll('.field');
timerFields.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
});

const myInput = document.getElementById('datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(timerId);
    if (selectedDates[0] - new Date() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      document.querySelector('button[data-start]').disabled = true;
    } else {
      document.querySelector('button[data-start]').disabled = false;
      const diff = selectedDates[0] - new Date();
      convertMs(diff);
    }
  },
};
const fp = flatpickr(myInput, options);
let timerId = null;

const startBtn = document.querySelector('button[data-start]');
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const diff = fp.selectedDates[0] - new Date();
    if (diff >= 0) {
      convertMs(diff);
    }
    fp._input.disabled = true;
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, 0);
  document.querySelector('span[data-days]').textContent = days;
  // Remaining hours
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, 0);
  document.querySelector('span[data-hours]').textContent = hours;

  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, 0);
  document.querySelector('span[data-minutes]').textContent = minutes;

  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, 0);
  document.querySelector('span[data-seconds]').textContent = seconds;

  return { days, hours, minutes, seconds };
}
