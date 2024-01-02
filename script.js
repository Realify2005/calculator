let num1;
let op;
let num2;

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
    a = parseInt(a);
    b = parseInt(b);
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            if (b === 0) {
                return "DIVISION BY 0 NOT ALLOWED"
            }
            return divide(a, b);
        default:
            return "Invalid Operator"
    }
}