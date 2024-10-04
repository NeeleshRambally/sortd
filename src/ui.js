"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./calculator");
const calculator = new calculator_1.Calculator();
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let input = '';
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = button.textContent;
        if (value == '=') {
            const result = calculator.eval(input);
            display.value = result.toString();
            input = result.toString();
        }
        else {
            input += value;
            display.value = input;
        }
    });
});
