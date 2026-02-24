const display = document.querySelector("#display");

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
    if (b === 0) {
        state.displayReset = true;
        return "Nice Try!"
    } 
    return a/b;
}

const state = {numOne: "",
    operator: null,
    numTwo: "",
    display: "",
    displayReset: false,
};

function operate () {

    if (state.operator === "+") {
        return add(Number(state.numOne), Number(state.numTwo));
    } else if (state.operator === "-") {
        return subtract(Number(state.numOne), Number(state.numTwo));
    } else if (state.operator === "*") {
        return multiply(Number(state.numOne), Number(state.numTwo));
    } else if (state.operator === "/") {
        return divide(Number(state.numOne), Number(state.numTwo));
    }
}

function getNum (number) {
    if (state.operator === null) {
        state.numOne += number;
    } else {
        state.numTwo += number;
    }
}

function getOperator (operator) {
    if (state.operator !== null && !state.displayReset) {
        state.numTwo = state.display;
        state.numOne = String(operate());
        display.textContent = state.numOne;
    }
    else {
        state.numOne = state.display;
    }
    if (state.displayReset) {
        state.operator = operator;
        return;
    }

    state.operator = operator;
    state.displayReset = true;
}

function evaluate () { 
    if (state.operator === null) {
        return;
    }
    if (state.displayReset) {
        return;
    }

    state.numTwo = state.display;

    let result = String(operate());

    let resultNum = Number(result);

    if (result.length > 16 || result.includes(".")) {
        result = String(resultNum.toExponential(4));
    } 

    display.textContent = result;
    state.display = result;
    state.numOne = result;
    state.displayReset = true;
    state.operator = null;
}

function clear () {
    display.textContent = "";
    state.display = "";
    state.numOne = "";
    state.operator = null;
    state.numTwo = "";
    state.displayReset = false;
}

function changeDisplay (input) {
    maxLength = 7;
    if (state.display === "" || state.displayReset) {
        state.display = "";
        state.display += input;
        display.textContent = input;
        state.displayReset = false;
    } else if (state.display.length <= maxLength && !state.displayReset) {
        state.display += input;
        display.textContent += input;
    } 
}

const numButtons = document.querySelector("#num-buttons");

numButtons.addEventListener("click", (e) => {
    let target = e.target;
    if (!target.matches(".buttons")) {
        return;
    }
    if (target.textContent !== "=" && target.textContent !== ".") {
        changeDisplay(target.textContent);
        getNum(target.textContent);
    } else if (target.textContent === ".") {
        if (!state.display.includes(".") && !state.display.includes("e")) {
            state.display += target.textContent;
            display.textContent += ".";
        }
    } else if (target.textContent === "=") {
        evaluate();
    } else if (target.textContent === "0") {
        if (state.numOne !== "") {
            state.display += target.textContent;
            display.textContent += "0";
        }
    }    
});

const operateButtons = document.querySelector("#operator-buttons");

operateButtons.addEventListener("click", (e) => {
    let target = e.target;
    if (!target.matches(".op-buttons")) {
        return;
    }
    if (target.textContent !== "AC") {
        getOperator(target.textContent)
    } else if (target.textContent === "AC") {
        clear();
    }
});