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




// ..:: Main Script ::..

// - Functions
function handleNum(e) {
    if (lastBtnPressed == 'operator') {
        mainDisplay.textContent = e.target.textContent;
    } else {
        mainDisplay.textContent += e.target.textContent;
    }

    lastBtnPressed = 'number';
    clearBtn.textContent = 'C';
}

function handleOperator(e) {
    switch (e.target.id) {
        case 'oprPlus':
            pushToEquation(e.target.textContent, 'add');
            break;

        case 'oprMinus':
            pushToEquation(e.target.textContent, 'subtract');
            break;

        case 'oprMult':
            pushToEquation(e.target.textContent, 'multiply');
            break;

        case 'oprDiv':
            pushToEquation(e.target.textContent, 'divide');
            break;

        case 'oprSqroot':
            mainDisplay.textContent = op.sqroot(Number(mainDisplay.textContent));
            lastBtnPressed = 'operator';
            break;

        case 'oprEqual':
            solveEquation();

            lastBtnPressed = 'operator';
            break;

        case 'oprCe':
            if (clearBtn.textContent == 'CE') {
                equation = [];
                middleDisplay.textContent = ''
            }

            mainDisplay.textContent = ''
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

    // If the last entry wasn't a number, return Syntax Error
    if (typeof equation[equation.length - 1] != 'number') {
        return 'Syntax Err0r'
    }


    let highPrioOperations = equation.filter(el => el == 'divide' || el == 'multiply');
    let lowPrioOperations = equation.filter(el => el == 'add' || el == 'subtract');
    let orderedOperations = highPrioOperations.concat(lowPrioOperations);


    while (equation.length > 1) {
        let aux = equation.indexOf(orderedOperations[0]);

        // Calls the function in the op object for the numbers that are around the operator
        let partial = op[orderedOperations[0]](equation[aux - 1], equation[aux + 1]);

        // Removes the numbers and operator envolved, includes rthe
        equation.splice(aux - 1, 3, partial);

        orderedOperations.shift();
    }

    equationSolved = true;
    mainDisplay.textContent = equation.shift();
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