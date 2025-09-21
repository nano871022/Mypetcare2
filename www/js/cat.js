const createCanvasAdapter = (canvas, core) => {
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const bodyColor = '#D3D3D3';
    const outlineColor = '#000000';

    const drawOval = (cx, cy, radiusX, radiusY, color) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };

    const drawTriangle = (x1, y1, x2, y2, x3, y3, color) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    const drawMouth = (isSad) => {
        ctx.beginPath();
        if (isSad) {
            ctx.arc(x, y + 15, 15, Math.PI * 0.1, Math.PI * 0.9, true);
        } else {
            ctx.arc(x, y + 15, 15, 0, Math.PI);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = outlineColor;
        ctx.stroke();
    };

    const drawWhiskers = () => {
        ctx.beginPath();
        ctx.moveTo(x - 30, y + 10); ctx.lineTo(x - 70, y);
        ctx.moveTo(x - 30, y + 15); ctx.lineTo(x - 70, y + 15);
        ctx.moveTo(x + 30, y + 10); ctx.lineTo(x + 70, y);
        ctx.moveTo(x + 30, y + 15); ctx.lineTo(x + 70, y + 15);
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
    };

    const drawDirt = () => {
        ctx.fillStyle = '#8B4513';
        drawOval(x + 30, y + 60, 10, 8, '#8B4513');
        drawOval(x - 20, y + 100, 15, 12, '#8B4513');
    };

    const drawDirtyTeeth = () => {
        ctx.strokeStyle = '#BDB76B';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - 10, y + 20);
        ctx.lineTo(x + 10, y + 20);
        ctx.stroke();
    };

    const drawStatusBars = (state) => {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(`Hambre: ${100 - Math.round(state.hunger)}%`, 10, 20);
        ctx.fillText(`Higiene: ${Math.round(state.hygiene)}%`, 10, 40);
        ctx.fillText(`Dientes: ${Math.round(state.teeth)}%`, 10, 60);
    };

    const render = (state) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw cat parts
        drawOval(x, y + 50, 80, 100, bodyColor); // Body
        drawOval(x, y, 60, 60, bodyColor); // Head
        drawTriangle(x - 40, y - 50, x - 60, y - 20, x - 20, y - 30, bodyColor); // Left ear
        drawTriangle(x + 40, y - 50, x + 20, y - 30, x + 60, y - 20, bodyColor); // Right ear
        drawOval(x - 20, y - 10, 8, 8, '#000000'); // Left eye
        drawOval(x + 20, y - 10, 8, 8, '#000000'); // Right eye
        drawMouth(state.isSad);
        drawWhiskers();

        // Draw state-dependent features
        if (state.isDirty) drawDirt();
        if (state.hasDirtyTeeth) drawDirtyTeeth();

        // Draw UI elements
        drawStatusBars(state);
    };

    const connect = () => {
        core.subscribe(render);
    };

    return {
        connect,
        render // Also expose render to draw the initial state
    };
};
