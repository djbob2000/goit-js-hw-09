import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(`.form`),
  button: document.querySelector(`button`),
  inputDelay: document.querySelector(`input[name="delay"]`),
  inputStep: document.querySelector(`input[name="step"]`),
  inputAmount: document.querySelector(`input[name="amount"]`),
};
let delayForPromis = 0;

refs.form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  for (let i = 1; i <= refs.inputAmount.value; i += 1) {
    if (i === 1) {
      delayForPromis = refs.inputDelay.value;
      promise(i);
    } else {
      delayForPromis = refs.inputStep.value;
      promise(i);
    }
  }
}

function promise(index) {
  createPromise(index, delayForPromis)
    .then(({ position, delay }) =>
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    )
    .catch(({ position, delay }) =>
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    );
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
