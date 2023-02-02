import { state } from './state.js';
import { alarm } from './alarm.js';
import { addZero } from './utils.js';
import { changeActiveBtn } from './control.js';

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

export const showTime = (seconds) => {
    minutesElem.textContent = addZero(Math.floor(seconds / 60)); 
    secondsElem.textContent = addZero(seconds % 60);
};

export const startTimer = () => {
    state.timeLeft -= 1;
    showTime(state.timeLeft);

    if (state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer, 1000); 
    }

    if (state.timeLeft <= 0) {

        if (state.status === 'work') {
            state.activeTodo.pomodoro += 1;

            if (state.activeTodo.pomodoro % state.count !== 0) {
                state.status = 'break';
            } else {
                state.status = 'relax';
            }

        } else {
            state.status = 'work';
        }

        alarm();
        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        startTimer();
    }
};