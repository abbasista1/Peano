function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

function draw(chainCode, n) {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    var rowLength = 630/(n*9);
    var colLength = 630/(n*9);

    var currX = 5;
    var currY = 635;
    
    for (let i = 0; i < chainCode.length; i++) {
        if (chainCode[i] == 'u') {
            drawLine(ctx, [currX, currY], [currX, currY-colLength]);
            currY -= colLength;
        } else if (chainCode[i] == 'r') {
            drawLine(ctx, [currX, currY], [currX+rowLength, currY]);
            currX += rowLength;
        } else if (chainCode[i] == 'l') {
            drawLine(ctx, [currX, currY], [currX-rowLength, currY]);
            currX -= rowLength;
        } else if (chainCode[i] == 'd') {
            drawLine(ctx, [currX, currY], [currX, currY+colLength]);
            currY += colLength;
        }
    }

}
// draw ('uurddruu', 1);
draw('uurddruuuuulddluuuuurddruurddruurdddddluuldddddruurddruurddruuuuulddluuuuurddruu', 2);