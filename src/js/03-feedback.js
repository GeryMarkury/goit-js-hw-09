import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');

const emailInput = document.querySelector('input[name="email"]');

const messageInput = document.querySelector('textarea[name="message"]');

const storageKey = 'feedback-form-state';

const saveState = throttle(() => {
    const state = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
}, 500);

const restoreState = () => {
    const state = localStorage.getItem(storageKey);
    if (state) {
        const { email, message } = JSON.parse(state);
        emailInput.value = email;
        messageInput.value = message;
    }
};

restoreState();

form.addEventListener('input', event => {
    if (event.target === emailInput || event.target === messageInput) {
        saveState();
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();
    const state = { email: emailInput.value, message: messageInput.value };

    console.log(state);

    localStorage.removeItem(storageKey);

    emailInput.value = '';
    messageInput.value = '';
});



