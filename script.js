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

function deleteDigit() {
    let temp = display.innerText.split('');
    temp.pop();
    result = temp.join('');
    showDisplay();
}

function captureOperands() {
    if (operands.length < 2) {
        operands.push(+display.innerText);
    } else {
        operands.shift();
        operands.push(+display.innerText);
    }
}

function addDecimal() {
    let temp = display.innerText;
    if (temp.includes(".")) {
        isDecimal = true;
    } else {
        if (result) { result += "." }
        else { result += "0." }
        showDisplay();
        isDecimal = true;
    }  
}

function cleanExpressionResult(num) {
    let numStr = num.toString();

    if (numStr.length <= 9){ return numStr }            // If value is >= 9, return and display as is.

    if (numStr.includes(".")) {
        const dotIndex = numStr.indexOf(".");
        const leftDigits = numStr.slice(0, dotIndex).length;
        const rightDigits = numStr.slice(dotIndex+1).length;

        if (leftDigits <= 6 && rightDigits > 2) {
            return `${num.toFixed(2)}`
        } else {
            let tempVal = num / (Math.pow(10, leftDigits - 1));
            return `${tempVal.toFixed(2)}E${leftDigits - 1}`
        }
        
    } else {
        let tempVal = num / (Math.pow(10, numStr.length - 1));
        return `${tempVal.toFixed(2)}E${numStr.length - 1}`
    }
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
del.addEventListener('click', deleteDigit);

// Decimal click event.
decimal.addEventListener('click', addDecimal);

// Sign click event.
sign.addEventListener('click', function(e) {
    let temp = +display.innerText;
    temp *= -1;
    result = temp;
    showDisplay();
})

// Clear click event.
clear.addEventListener('click', clearMemory)

// Number buttons keyboard type events.
window.addEventListener('keydown', function(e) {
    if (e.key == 'Escape') {
        clearMemory();
    } else if (e.key == 'Backspace') {
        deleteDigit();
    } else if (e.key == '.') {
        addDecimal();
    } else if (!isNaN(e.key) || e.key == '.') {
        if (result.length < 9) {
            result += e.key;
            showDisplay();
        }   
    }   
    // console.log(e.key)
})

// Number buttons click events.
digits.forEach(item => {
    item.addEventListener('click', function(e){
        if (result.length < 9){
            result += e.target.innerText;
            showDisplay();
        }
    })
})

// Arithmetic operators click events.
operators.forEach(item => {
    item.addEventListener('click', function(e){

        // First Run logic. Hitting math operator the first time will not behave like "equals" operator were it has to the complete the operation.
        // Succeeding click of math operators after the first, should yield results.
        if (isFirstRun) {
            operator = e.target.innerText;   
        }
               
        captureOperands();              // Grab whatever is on the display as operand. 

        if (!isFirstRun) {

            // Operation complete logic. This will only be true when "equals" operator is clicked.
            // Continuous math operation without using "equals" will capture the result as a left-hand operand as soon as you click the operator(after first run).
            if (!isOperationComplete) {
                // result = operate(operator, operands[0], operands[1]);
                result = cleanExpressionResult(operate(operator, operands[0], operands[1]));
                showDisplay();
                
                captureOperands();      // After displaying result, capture operand for next operation.
            }            
        }

        // Grab operator.
        operator = e.target.innerText;
        
        result = '';                    // Empty out buffer for the new set of number to be displayed.
        isFirstRun = false;             // Set this flag to false and will never be changed again throughout the lifecycle.
        isOperationComplete = false;    // Set flag to false every time math operator is clicked.
        isDecimal = false;              // Reset flag so user can enter decimal when inputting numbers.
    })
})

// Equals operator click events.
equals.addEventListener('click', function() {
    // Grab second operand before doing operation.
    
    captureOperands();

    result = cleanExpressionResult(operate(operator, operands[0], operands[1]));
    showDisplay();
    
    // Empty out buffer for the new set of number to be displayed.
    result = '';                        // Empty out buffer for the new set of number to be displayed.
    isOperationComplete = true;         // Set flag to true. Value will persist in display and will be captured as operand when a user clicks an operator.
    isDecimal = false;                  // Reset flag so user can enter decimal when inputting numbers.
})

showDisplay();



