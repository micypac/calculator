function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    return  (operator == '+') ? add(num1,num2) :
            (operator == '-') ? subtract(num1, num2) :
            (operator == '*') ? multiply(num1, num2) :
            (operator == '÷') ? divide(num1, num2) : num2
}

function showDisplay() {
    if (!result) {
        display.innerText = 0;
    } else {
        display.innerText = result;
    }

}

const display = document.querySelector('#display');
let result = '';
let operator;
let prevOperator;
let operator1;
let operator2;
let operand1;
let operand2;
let isOperate = false;
const operands = [0];

const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const equals = document.querySelector('#equals');

window.addEventListener('keydown', function(e) {
    if (!isNaN(e.key) || e.key == '.') {
        // console.log(e.key)
        // console.log(e.code)
        if (result.length < 9) {
            result += e.key;
            showDisplay();
        }   
    }   
})

digits.forEach(item => {
    item.addEventListener('click', function(e){
        result += e.target.innerText;
        showDisplay();
    })
})

operators.forEach(item => {
    item.addEventListener('click', function(e){
        prevOperator = operator;
        operator = e.target.innerText;
        
        if (operator == "+" || operator == "-" || operator == 'x' || operator == '÷') {
            operand1 = +display.innerText;
            result = '';
        } else {
            operand2 = +display.innerText;
            display.innerText = operate(prevOperator, operand1, operand2);

        }
        result = ''        
    })
})

showDisplay();



