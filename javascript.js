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
    maxLength = 20;
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

const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");

const decimal = document.querySelector("#decimal");
const AC = document.querySelector("#clear");

const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiplication = document.querySelector("#multiply");
const division = document.querySelector("#divide");

const equals = document.querySelector("#equals");

zero.addEventListener("click", () => {
    if (state.numOne !== "") {
            state.display += "0";
            display.textContent += "0";
        }
});

one.addEventListener("click", () => {
    changeDisplay("1");
        getNum("1");
});

two.addEventListener("click", () => {
    changeDisplay("2");
        getNum("2");
});

three.addEventListener("click", () => {
    changeDisplay("3");
        getNum("3");
});

four.addEventListener("click", () => {
    changeDisplay("4");
        getNum("4");
});

five.addEventListener("click", () => {
    changeDisplay("5");
        getNum("5");
});

six.addEventListener("click", () => {
    changeDisplay("6");
        getNum("6");
});

seven.addEventListener("click", () => {
    changeDisplay("7");
        getNum("7");
});

eight.addEventListener("click", () => {
    changeDisplay("8");
        getNum("8");
});

nine.addEventListener("click", () => {
    changeDisplay("9");
        getNum("9");
});

decimal.addEventListener("click", () => {
    if (!state.display.includes(".") && !state.display.includes("e")) {
            state.display += ".";
            display.textContent += ".";
        }
});

AC.addEventListener("click", () => {
    clear();
});

plus.addEventListener("click", () => {
    getOperator("+");
});

minus.addEventListener("click", () => {
    getOperator("-");
});

multiplication.addEventListener("click", () => {
    getOperator("*");
});

division.addEventListener("click", () => {
    getOperator("/");
});

equals.addEventListener("click", () => {
    evaluate();
})

// Event Delegation Attempt:

// const numButtons = document.querySelector("#num-buttons");

// numButtons.addEventListener("click", (e) => {
//     let target = e.target;
//     if (!target.matches(".buttons")) {
//         return;
//     }
//     if (target.textContent !== ".") {
//         changeDisplay(target.textContent);
//         getNum(target.textContent);
//     } else if (target.textContent === ".") {
//         if (!state.display.includes(".") && !state.display.includes("e")) {
//             state.display += target.textContent;
//             display.textContent += ".";
//         }
//     } else if (target.textContent === "0") {
//         if (state.numOne !== "") {
//             state.display += target.textContent;
//             display.textContent += "0";
//         }
//     }
//     if (target.textContent === "AC") {
//         clear();
//     }    
// });

// const operateButtons = document.querySelector("#operator-buttons");

// operateButtons.addEventListener("click", (e) => {
//     let target = e.target;
//     if (!target.matches(".op-buttons")) {
//         return;
//     }
//     getOperator(target.textContent)
// });

// const equalsButton = document.querySelector("#equals");

// equalsButton.addEventListener("click", () => {
//         evaluate();
// });