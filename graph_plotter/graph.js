function plotGraph() {
    const input = document.getElementById('functionInput').value;

    try {
        const labels = generateLabels();
        const data = labels.map(x => evaluateFunction(input, { x: x }));

        const canvas = document.getElementById('graphCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 600;
                canvas.height = 300;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: input,
                    borderColor: 'rgb(75, 192, 192)',
                    data: data,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        type: 'linear',
                        position: 'left'
                    }
                }
            }
        });
    } catch (error) {
        alert("Invalid function input. Please enter a valid mathematical function.");
    }
}

function evaluateFunction(expression, scope) {
    return math.evaluate(expression, scope);
}

function generateLabels() {
    return Array.from({ length: 21 }, (_, i) => i - 10);
}
