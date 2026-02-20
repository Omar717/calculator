function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a*b;
}

function divide (a, b) {
    return a/b;
}

let numOne;
let operator;
let numTwo;

function operate (operator, numOne, numTwo) {
    if (operator === "+") {
        return add(numOne, numTwo);
    } else if (operator === "-") {
        return subtract(numOne, numTwo);
    } else if (operator === "*") {
        return multiply(numOne, numTwo);
    } else if (operator === "/") {
        return divide(numOne, numTwo);
    }
}

