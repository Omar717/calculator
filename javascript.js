// Old code attempt 

// const display = document.querySelector("#display");

// function add (a, b) {
//     return a + b;
// }

// function subtract (a, b) {
//     return a - b;
// }

// function multiply (a, b) {
//     return a*b;
// }

// function divide (a, b) {
//     if (b === 0) {
//         state.displayReset = true;
//         return "Nice Try!"
//     } 
//     return a/b;
// }

// const state = {numOne: "",
//     operator: null,
//     numTwo: "",
//     display: "",
//     displayReset: false,
// };

// function operate () {

//     if (state.operator === "+") {
//         return add(Number(state.numOne), Number(state.numTwo));
//     } else if (state.operator === "-") {
//         return subtract(Number(state.numOne), Number(state.numTwo));
//     } else if (state.operator === "*") {
//         return multiply(Number(state.numOne), Number(state.numTwo));
//     } else if (state.operator === "/") {
//         return divide(Number(state.numOne), Number(state.numTwo));
//     }
// }

// function getNum (number) {
//     if (state.operator === null) {
//         state.numOne += number;
//     } else {
//         state.numTwo += number;
//     }
// }

// function getOperator (operator) {
//     if (state.operator !== null && !state.displayReset) {
//         state.numTwo = state.display;
//         state.numOne = String(operate());
//         display.textContent = state.numOne;
//     }
//     else {
//         state.numOne = state.display;
//     }
//     if (state.displayReset) {
//         state.operator = operator;
//         return;
//     }

//     state.operator = operator;
//     state.displayReset = true;
// }

// function evaluate () { 
//     if (state.operator === null) {
//         return;
//     }
//     if (state.displayReset) {
//         return;
//     }

//     state.numTwo = state.display;

//     let result = String(operate());

//     let resultNum = Number(result);

//     if (result.length > 16 || result.includes(".")) {
//         result = String(resultNum.toExponential(4));
//     } 

//     display.textContent = result;
//     state.display = result;
//     state.numOne = result;
//     state.displayReset = true;
//     state.operator = null;
// }

// function clear () {
//     display.textContent = "";
//     state.display = "";
//     state.numOne = "";
//     state.operator = null;
//     state.numTwo = "";
//     state.displayReset = false;
// }

// function changeDisplay (input) {
//     maxLength = 20;
//     if (state.display === "" || state.displayReset) {
//         state.display = "";
//         state.display += input;
//         display.textContent = input;
//         state.displayReset = false;
//     } else if (state.display.length <= maxLength && !state.displayReset) {
//         state.display += input;
//         display.textContent += input;
//     } 
// }

// const numButtons = document.querySelector("#num-buttons");

// numButtons.addEventListener("pointerdown", (e) => {
//     let target = e.target;
//     const value = target.textContent;
//     if (!target.matches(".buttons")) {
//         return;
//     }
//     if (target.textContent !== "." && state.numOne.charAt(0) !== "0" && !state.display.includes(".")) {
//         changeDisplay(target.textContent);
//         getNum(target.textContent);    
//     } else if (target.textContent === ".") {
//         if (!state.display.includes(".") && !state.display.includes("e")) {
//             changeDisplay(target.textContent);
//             getNum(target.textContent);
//         }
//     } else if (state.display.includes(".") && state.numOne.includes(".")) {
//         changeDisplay(target.textContent);
//         getNum(target.textContent); 
//     } 
//     if (target.textContent === "AC") {
//         clear();
//     }    
// });

// const operateButtons = document.querySelector("#operator-buttons");

// operateButtons.addEventListener("pointerdown", (e) => {
//     let target = e.target;
//     if (!target.matches(".op-buttons")) {
//         return;
//     }
//     getOperator(target.textContent);
// });

// const equalsButton = document.querySelector("#equals");

// equalsButton.addEventListener("pointerdown", () => {
//         evaluate();
// });

const display = document.querySelector("#display");

// Basic operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        state.displayReset = true;
        return "Nice Try!";
    }
    return a / b;
}

// Calculator state
const state = {
    numOne: "0",
    numTwo: "",
    operator: null,
    display: "0",
    displayReset: false,
};

// Operate function
function operate() {
    const a = Number(state.numOne);
    const b = Number(state.numTwo);
    switch (state.operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return b;
    }
}

// Handle number input
function getNum(number) {
    if (state.displayReset) {
        if (state.operator === null) {
            state.numOne = (number === ".") ? "0." : number;
            state.numTwo = "";
        } else {
            state.numTwo = (number === ".") ? "0." : number;
        }
        state.display = (number === ".") ? "0." : number;
        display.textContent = state.display;
        state.displayReset = false;
        return;
    }

    let target = (state.operator === null) ? "numOne" : "numTwo";

    // Prevent multiple decimals
    if (number === "." && state[target].includes(".")) return;

    // Prevent multiple leading zeros
    if (state[target] === "0" && number === "0") return;

    // Allow replacing "-"
    if ((state[target] === "0" || state[target] === "-") && number !== ".") {
        state[target] = number;
    } else {
        state[target] += number;
    }

    state.display = state[target];
    display.textContent = state.display;
}

// Handle operator input
function getOperator(operator) {
    // Handle negative numbers (unary minus)
    if (operator === "-") {
        // Case 1: starting first number as negative
        if (state.operator === null && state.display === "0") {
            state.numOne = "-";
            state.display = "-";
            display.textContent = "-";
            return;
        }

        // Case 2: starting second number as negative
        if (state.operator !== null && state.displayReset) {
            state.numTwo = "-";
            state.display = "-";
            display.textContent = "-";
            state.displayReset = false;
            return;
        }
    }

    if (state.operator !== null && !state.displayReset) {
        state.numTwo = state.display;
        state.numOne = String(operate());
        display.textContent = state.numOne;
    } else {
        state.numOne = state.display;
    }

    state.operator = operator;
    state.displayReset = true;
}

// Evaluate result
function evaluate() {
    if (!state.operator || state.displayReset) return;

    state.numTwo = state.display;
    let result = String(operate());

    const resultNum = Number(result);
    if (result.length > 16 || result.includes(".")) {
        result = resultNum.toExponential(4);
    }

    display.textContent = result;
    state.display = result;
    state.numOne = result;
    state.displayReset = true;
    state.operator = null;
}

// Clear calculator
function clear() {
    state.numOne = "0";
    state.numTwo = "";
    state.operator = null;
    state.display = "0";
    state.displayReset = false;
    display.textContent = "0";
}

// Event delegation for numbers
const numButtons = document.querySelectorAll(".buttons");
numButtons.forEach(btn => { 
    btn.addEventListener("pointerdown", (e) => {
        const target = e.target;
        if (!target.matches(".buttons")) return;

        const value = target.textContent;

        if (value === "AC") {
            clear();
            return;
        }

        if (!isNaN(value) || value === ".") {
            getNum(value);
        }
    });
});

// Event delegation for operators
const operateButtons = document.querySelectorAll(".op-buttons");

operateButtons.forEach(btn => {
    btn.addEventListener("pointerdown", (e) => {
        const target = e.target;
        if (!target.matches(".op-buttons")) return;

        getOperator(target.textContent);
    });
});

// Equals button
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("pointerdown", () => {
    evaluate();
});