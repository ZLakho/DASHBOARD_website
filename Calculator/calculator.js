function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function squareRoot() {
    document.getElementById('display').value = Math.sqrt(eval(document.getElementById('display').value));
}

function power() {
    document.getElementById('display').value += '^';
}

function sinFunction() {
    const degrees = eval(document.getElementById('display').value);
    const radians = degrees * (Math.PI / 180);
    document.getElementById('display').value = Math.sin(radians);
}

function cosFunction() {
    const degrees = eval(document.getElementById('display').value);
    const radians = degrees * (Math.PI / 180);
    document.getElementById('display').value = Math.cos(radians);
}

function tanFunction() {
    const degrees = eval(document.getElementById('display').value);
    const radians = degrees * (Math.PI / 180);
    document.getElementById('display').value = Math.tan(radians);
}