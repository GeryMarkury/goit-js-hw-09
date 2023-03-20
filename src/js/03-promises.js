const form = document.querySelector('.form');
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  
  const promises = [];
  
  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;
    const promise = createPromise(position, promiseDelay);

    promises.push(promise);
  };
  
  Promise.allSettled(promises)
    .then((results) => {
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          console.log(`✅ Fulfilled promise ${result.value.position} in ${result.value.delay}ms`);
        } else {
          console.log(`❌ Rejected promise ${result.reason.position} in ${result.reason.delay}ms`);
        }
      });
    });
});