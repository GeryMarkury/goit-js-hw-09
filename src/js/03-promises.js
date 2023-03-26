import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve('fulfilled');
      } else {
        reject(new Error(`Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  
  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;
    createPromise(position, promiseDelay).then(() => {
        Notify.success(`Fulfilled promise ${position} in ${promiseDelay}ms`);
    }).catch(error => {
      Notify.failure(`${error.message}`);
    });
  }
});
