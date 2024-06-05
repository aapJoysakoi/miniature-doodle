const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pencil';
let currentShape = '';

canvas.width = window.innerWidth - 50;
canvas.height = 400;

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = 5;

    if (currentTool === 'pencil' || currentTool === 'brush') {
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    } else if (currentTool === 'eraser') {
        ctx.clearRect(e.offsetX - 10, e.offsetY - 10, 20, 20);
    } else if (currentTool === 'shape') {
        if (currentShape === 'circle') {
            const radius = Math.sqrt(Math.pow(e.offsetX - lastX, 2) + Math.pow(e.offsetY - lastY, 2));
            ctx.beginPath();
            ctx.arc(lastX, lastY, radius, 0, Math.PI * 2);
            ctx.stroke();
        } else if (currentShape === 'square') {
            const width = e.offsetX - lastX;
            const height = e.offsetY - lastY;
            ctx.strokeRect(lastX, lastY, width, height);
        } else if (currentShape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineTo(lastX - (e.offsetX - lastX), e.offsetY);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function selectTool(tool) {
    currentTool = tool;
    if (tool === 'shape') {
        currentShape = '';
    }
}

function selectShape(shape) {
    currentShape = shape;
    currentTool = 'shape';
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
