import Notiflix from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name = "delay"');
const stepOfInterval = document.querySelector('input[name = "step"');
const amount = document.querySelector('input[name = "amount"');

form.addEventListener('submit', event => {
  event.preventDefault();
  const positionValue = +amount.value;
  const delayValue = +inputDelay.value;
  const stepValue = +stepOfInterval.value;
  for (let i = 1; i <= positionValue; i += 1) {
    let position = i;
    let delay = delayValue + stepValue * (i - 1);
    setTimeout(() => {
      createPromise(position, delay)
        .then(({ position, delay }) =>
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
        )
        .catch(({ position, delay }) =>
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
      )
        .finally(form.reset());
    }, delay);
  }
});
