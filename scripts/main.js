// - Global Variables
const middleDisplay = document.querySelector('.display#middle');
const mainDisplay = document.querySelector('.display#bottom');
let activeOperation = {
    isActive: false,
    function: '',
    id: '',
};
let first;
let second;



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
    if (activeOperation.isActive) {
        activeOperation.isActive = false
        document.getElementById(activeOperation.id).classList.remove('active');

        mainDisplay.textContent = e.target.textContent;
    } else {
        mainDisplay.textContent += e.target.textContent;
    }
}

function handleOperator(e) {
    if (activeOperation.isActive) {

    } else {
        console.log(e.target.id)
        switch(e.target.id){
            case 'oprPlus':
                activeOperation.isActive = true;
                activeOperation.function = op.add;
                activeOperation.id = e.target.id;
                e.target.classList.add('active');
                
                first = mainDisplay.textContent;
                break;

            case 'oprMinus':
                activeOperation.isActive = true;
                activeOperation.function = op.subtract;
                activeOperation.id = e.target.id;
                e.target.classList.add('active');
                
                first = mainDisplay.textContent;
                break;

            case 'oprMult':
                activeOperation.isActive = true;
                activeOperation.function = op.multiply;
                activeOperation.id = e.target.id;
                e.target.classList.add('active');

                first = mainDisplay.textContent;
                break;

            case 'oprDiv':
                activeOperation.isActive = true;
                activeOperation.function = op.divide;
                activeOperation.id = e.target.id;
                e.target.classList.add('active');

                first = mainDisplay.textContent;
                break;

            case 'oprDot':
                mainDisplay.textContent += '.';
                break;

            case 'oprPlusMinus':
                mainDisplay.textContent = op.minplus(Number(mainDisplay.textContent));
                break;

            case 'oprSqroot':
                mainDisplay.textContent = op.sqroot(Number(mainDisplay.textContent));
                break;

            case 'oprEqual':
                let second = mainDisplay.textContent;
                mainDisplay.textContent = activeOperation.function(Number(first), Number(second));
                activeOperation.isActive = false;
                break;

            case 'oprCe':
                mainDisplay.textContent = '';
                break;

            default:
                console.warn('Something went wrong!')
                break;
        }


    }

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