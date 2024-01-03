let num1 = '';
let op = '';
let num2 = '';
let decimalAdded = false;

function add(a, b) {
    return a + b;
}

function subract (a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    console.log(`doing ${a} ${op} ${b}`) // For Debug
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            if (b === 0) {
                return "DIVISION BY 0 NOT ALLOWED"
            }
            return (Math.floor(divide(a, b) * 10) / 10);
        default:
            return "Invalid Operator"
    }
}

const numbers = document.querySelectorAll(".num");
const btm_display = document.querySelector("#btm-display");
const top_display = document.querySelector("#top-display");
const operators = document.querySelectorAll(".op");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const del = document.querySelector("#delete");
const decimal = document.querySelector("#decimal");

function numberButton(number) {
    if (!(number === "0" && btm_display.textContent === "0")) {
        if (op) {
            num2 += number;
            btm_display.textContent = num2;
            if (num2.length === 1) {
                top_display.textContent += (" " + num2);
            }
            else {
                top_display.textContent += number;
            }
        }
        else {
            num1 += number;
            btm_display.textContent = parseFloat(num1);
        }
    }
}

function operatorButton(operator) {
    if (!num2) {
        op = operator;
        top_display.textContent = parseFloat(num1) + " " + op;
    }
    else {
        top_display.textContent = operate(num1, op, num2);
        btm_display.textContent = top_display.textContent;
        op = operator;
        top_display.textContent +=  " " + op;
        num1 = top_display.textContent;
        num2 = '';
    }
    decimalAdded = false;
}

function equalButton() {
    if (num2) {
        btm_display.textContent = operate(num1, op, num2);
    }
}

function decimalButton() {
    if (!decimalAdded) {
        btm_display.textContent += "."
        decimalAdded = true;
        if (!num2) {
            num1 += ".";
        }
        else {
            num2 += ".";
            top_display.textContent += ".";
        }
    }
}

function clearButton() {
    top_display.textContent = '';
    btm_display.textContent = 0;
    num1 = '';
    num2 = '';
    op = '';
    decimalAdded = false;
}

function deleteButton() {
    if (btm_display.textContent.length > 1) {
        if (btm_display.length - 1 === ".") {
            decimalAdded = false;
        }
        btm_display.textContent = btm_display.textContent.substring(0, btm_display.textContent.length - 1);
    }
    else {
        btm_display.textContent = 0;
    }

    if (op) {
        num2 = num2.substring(0, num2.length - 1);
    }
    else {
        num1 = num1.substring(0, num1.length - 1);
    }
}

function keyboardButton(e) {
    if (e.key >= 0 && e.key <= 9) numberButton(e.key);
    if (e.key === "Backspace") deleteButton();
    if (e.key === "Escape") clearButton();
    if (e.key === "Enter" || e.key === "=") equalButton();
    if (e.key === ".") decimalButton();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "x" || e.key === "/") operatorButton(e.key)
}

numbers.forEach(number => {
    number.addEventListener("click", function() {
        numberButton(number.textContent);
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", function() {
        operatorButton(operator.textContent);
    })
})

equal.addEventListener("click", function() {
    equalButton();
});

decimal.addEventListener("click", function () {
    decimalButton();
})

/* Top Buttons */
clear.addEventListener("click", function() {
    clearButton();
})

del.addEventListener("click", function() {
    deleteButton();
})

document.addEventListener("keydown", keyboardButton)