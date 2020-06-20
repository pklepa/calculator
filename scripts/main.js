// - Global Variables
const middleDisplay = document.querySelector('.display#middle');
const mainDisplay = document.querySelector('.display#bottom');

const clearBtn = document.getElementById('oprCe');

let equation = [];

let lastBtnPressed;
let equationSolved = false;



// - Event Listeners
const numbers = document.querySelectorAll('.number');
numbers.forEach(num => {
    num.addEventListener('click', handleNum);
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', handleOperator);
})

window.addEventListener('keydown', function(e) {
    // It is important to test against 'Space' because Number(' ') == 0
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(Number(e.key)) > -1  && e.code != 'Space') {
        handleNum(e.key);
    } else if(['+', '-', '*', '/', '.', 'Enter', 'Backspace'].indexOf(e.key) > -1) {
        handleOperator(e.key);
    }
});



// ..:: Main Script ::..

// - Functions
function handleNum(e) {

    // There are two ways into this function: either clicking on the number or pressing said num in the keyboard
    // This 
    let numberPressed;
    (e instanceof Event) ? numberPressed = e.target.textContent : numberPressed = e;

    if (lastBtnPressed == 'operator' || mainDisplay.textContent == '0') {
        mainDisplay.textContent = numberPressed;
    } else {
        mainDisplay.textContent += numberPressed;

        // If the width of the display is higher than the preset value, ignore last number (as to prevent visual overflow)
        if(getComputedStyle(mainDisplay).width != '370px') {
            let auxArr = Array.from(mainDisplay.textContent);
            auxArr.pop();
            mainDisplay.textContent = auxArr.join('');
        }
    }

    lastBtnPressed = 'number';
    clearBtn.textContent = 'C';
}

function handleOperator(e) {
    // This selection is necessary in order to correctly treat both button clicks and keyboard entries
    let btnElement;
    (e instanceof Event) ? btnElement = e.target : btnElement = document.querySelector(`button[data-key='${e}']`);

    switch (btnElement.id) {
        case 'oprPlus':
            pushToEquation(btnElement.textContent, 'add');
            break;

        case 'oprMinus':
            pushToEquation(btnElement.textContent, 'subtract');
            break;

        case 'oprMult':
            pushToEquation(btnElement.textContent, 'multiply');
            break;

        case 'oprDiv':
            pushToEquation(btnElement.textContent, 'divide');
            break;

        case 'oprSqroot':
            mainDisplay.textContent = op.sqroot(Number(mainDisplay.textContent));
            lastBtnPressed = 'operator';
            break;

        case 'oprEqual':
            if(!equationSolved){
                solveEquation();
            }

            lastBtnPressed = 'operator';
            break;

        case 'oprCe':
            if (clearBtn.textContent == 'CE') {
                equation = [];
                middleDisplay.textContent = ''
            }

            mainDisplay.textContent = ""
            clearBtn.textContent = 'CE';
            break;

        case 'oprDot':
            if (mainDisplay.textContent.indexOf('.') == -1) {
                mainDisplay.textContent += '.';
            }
            break;

        case 'oprPlusMinus':
            mainDisplay.textContent = op.minplus(Number(mainDisplay.textContent));
            break;

        default:
            console.warn('Something went wrong!')
            break;
    }

}


function pushToEquation(oprString, oprFunc) {
    // If no number was selected, ignore any operators entries
    if (mainDisplay.textContent === "" || mainDisplay.textContent === ".") { return }

    // Checks whether the last equation was solved or not (as to clear the equation string in the middleDisplay)
    if(equationSolved) {
        middleDisplay.textContent = mainDisplay.textContent + ' ' + oprString;
        equationSolved = false
    } else {
        middleDisplay.textContent += ' ' + mainDisplay.textContent + ' ' + oprString;
    }

    equation.push(Number(mainDisplay.textContent));
    equation.push(oprFunc);

    lastBtnPressed = 'operator';
}


function solveEquation() {
    middleDisplay.textContent += ' ' + mainDisplay.textContent;
    equation.push(Number(mainDisplay.textContent));


    let highPrioOperations = equation.filter(el => el == 'divide' || el == 'multiply');
    let lowPrioOperations = equation.filter(el => el == 'add' || el == 'subtract');
    let orderedOperations = highPrioOperations.concat(lowPrioOperations);


    // Iterates the equation until solution is found, solving higher priority operations first
    while (equation.length > 1) {
        let aux = equation.indexOf(orderedOperations[0]);

        // Calls the function in the op object for the numbers that are around the operator
        let partial = op[orderedOperations[0]](equation[aux - 1], equation[aux + 1]);

        // Removes the numbers and operator envolved in this particular operation and includes the partial result
        equation.splice(aux - 1, 3, partial);

        orderedOperations.shift(); // shift() to go to next operation
    }

    // If the number is too high, force it to scientific notation (if its already in sci form, truncate it)
    if (equation[0].toString().length > 13 || equation[0].toString().indexOf('e') != -1) {
        equation[0] = equation[0].toExponential(3);
    }

    equationSolved = true;
    mainDisplay.textContent = equation.shift(); // shift() to clear the equation array
}


// - Helper Functions
const op = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    sqroot: (a) => Math.sqrt(a),
    minplus: (a) => -a,
};