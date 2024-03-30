document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    const appendNumber = (number) => {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput = currentInput.toString() + number.toString();
    };

    const chooseOperation = (op) => {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero");
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        currentInput = computation;
        operation = undefined;
        previousInput = '';
    };

    const clear = () => {
        currentInput = '';
        previousInput = '';
        operation = undefined;
    };

    const updateDisplay = () => {
        display.innerText = currentInput;
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('number')) {
                appendNumber(e.target.innerText);
                updateDisplay();
            } else if (e.target.classList.contains('decimal')) {
                appendNumber(e.target.innerText);
                updateDisplay();
            } else if (e.target.classList.contains('add') || e.target.classList.contains('subtract') || e.target.classList.contains('multiply') || e.target.classList.contains('divide')) {
                chooseOperation(e.target.innerText);
            } else if (e.target.classList.contains('equals')) {
                compute();
                updateDisplay();
            } else if (e.target.classList.contains('clear')) {
                clear();
                updateDisplay();
            }
        });
    });
});
