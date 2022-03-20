function add(num1, num2) { return num1 + num2;}

function subtract(num1, num2) { return num1 - num2;}

function multiply(num1, num2) {return num1 * num2;}

function divide(num1, num2) {return num1 / num2;}

function operate(operator, num1, num2) {
    return  (operator == '+') ? add(num1,num2) :
            (operator == '-') ? subtract(num1, num2) :
            (operator == 'x') ? multiply(num1, num2) :
            divide(num1, num2);
}

function showDisplay() {
    if (!result) {
        display.innerText = 0;
    } else {
        display.innerText = result;
    }
}

function clearMemory() {
    location.reload();
}

function captureOperands() {
    if (operands.length < 2) {
        operands.push(+display.innerText);
    } else {
        operands.shift();
        operands.push(+display.innerText);
    }
}

function cleanExpressionResult(num) {
    // To be continued...

}

let result = '';
let operator = null;
let isOperationComplete = false;
let isFirstRun = true;
let isDecimal = false; 
let isNegative = false;
const operands = [];

const display = document.querySelector('#display');
const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const decimal = document.querySelector('#decimal');
const sign = document.querySelector('#sign');
const del = document.querySelector('#delete');

// Delete click event.
del.addEventListener('click', function(e) {
    let temp = display.innerText.split('');
    temp.pop();
    result = temp.join('');
    showDisplay();
})

// Decimal click event.
decimal.addEventListener('click', function(e) {
    if (!isDecimal) {
        if (result) { result += "." }
        else { result += "0." }
        showDisplay();
        isDecimal = true;
    }
})

// Sign click event.
sign.addEventListener('click', function(e) {
    let temp = +display.innerText;
    temp *= -1;
    result = temp;
    showDisplay();
})

// Clear click event.
clear.addEventListener('click', function(e) {
    clearMemory()
})

// Number buttons keyboard type events.
window.addEventListener('keydown', function(e) {
    if (e.key == 'Escape') {
        clearMemory();
    } else if (!isNaN(e.key) || e.key == '.') {
        if (result.length < 9) {
            result += e.key;
            showDisplay();
        }   
    }   
})

// Number buttons click events.
digits.forEach(item => {
    item.addEventListener('click', function(e){
        result += e.target.innerText;
        showDisplay();
    })
})

// Arithmetic operators click events.
operators.forEach(item => {
    item.addEventListener('click', function(e){

        // First Run logic. Hitting operator the first time will not behave like equals operator were it has to the operation.
        // Succeeding click of math operators after the first, should yield results.
        if (isFirstRun) {
            operator = e.target.innerText;   
        }

        // Grab whatever is on the display as operand.        
        captureOperands();

        if (!isFirstRun) {
            if (!isOperationComplete) {
                result = operate(operator, operands[0], operands[1]);
                showDisplay();

                // After displaying result, need to capture it as operand for next operation.
                captureOperands();
            }            
        }

        // Grab operator.
        operator = e.target.innerText;
        
        // Empty out buffer for the new set of number to be displayed.
        result = '';
        isFirstRun = false;
        isOperationComplete = false;
        isDecimal = false;
    })
})

// Equals operator click events.
equals.addEventListener('click', function() {
    // Grab second operand before doing operation.
    
    captureOperands();

    result = operate(operator, operands[0], operands[1]);
    showDisplay();
    
    // Empty out buffer for the new set of number to be displayed.
    result = '';
    isOperationComplete = true;
    isDecimal = false;
})

showDisplay();



