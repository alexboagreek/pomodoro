import { startTimer } from "./timer.js";
import { state } from './state.js';

const btnStart = document.querySelector('.control__btn_start');

export const initControl = () => {
    btnStart.addEventListener('click', () => {
        if (state.isActive) {
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Старт';

        } else {
            state.isActive = true;
            btnStart.textContent = 'Пауза';
            startTimer();
        }
        
    });
};