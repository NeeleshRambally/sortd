import {Calculator} from "./calculator.js";

const display = document.getElementById('display') as HTMLInputElement;
let input = '';
const buttons = document.querySelectorAll('button');
const cal = new Calculator();

document.addEventListener('DOMContentLoaded', () => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            console.log(value);
            if (value === '=') {
                const result = cal.eval(input)
                display.value = result.toString();
                input = result.toString();
            } else if (value === 'C') {
                input = '';
                display.value = '';
            } else if (value === 'sqrt') {
                input += 'sqrt';
                display.value = input;
            } else if (value === 'sqr') {
                input += 'sqr';
                display.value = input;
            } else {
                input += value;
                display.value = input;
            }
        });
    });
})

