// PEANO AND HILBERT WORD GENERATOR FOR TESTING ONLY

function ph1(s){
    var s1 = '';
    for (var i = 0; i<s.length; i++){
        if (s.charAt(i) == 'u'){
            s1 += 'u';
        } else if (s.charAt(i) == 'd'){
            s1 += 'd';
        } else if (s.charAt(i) == 'l'){
            s1 += 'r';
        } else if (s.charAt(i) == 'r'){
            s1 += 'l';
        } 
    }
    
    return s1;
}

function ph2(s){
    var s1 = '';
    for (var i = 0; i<s.length; i++){
        if (s.charAt(i) == 'u'){
            s1 += 'd';
        } else if (s.charAt(i) == 'd'){
            s1 += 'u';
        } else if (s.charAt(i) == 'l'){
            s1 += 'l';
        } else if (s.charAt(i) == 'r'){
            s1 += 'r';
        } 
    }
    
    return s1;
}

function ph3(s){
    var s1 = '';
    for (var i = 0; i<s.length; i++){
        if (s.charAt(i) == 'u'){
            s1 += 'd';
        } else if (s.charAt(i) == 'd'){
            s1 += 'u';
        } else if (s.charAt(i) == 'l'){
            s1 += 'r';
        } else if (s.charAt(i) == 'r'){
            s1 += 'l';
        } 
    }
 
    return s1;
}

function pw(n){
    if (n == 1){
        return 'uurddruu';
    } else {
        return pw(n-1) + 'u' + ph1(pw(n-1)) + 'u' + pw(n-1) + 'r' + ph2(pw(n-1)) + 'd' + ph3(pw(n-1)) + 'd' + ph2(pw(n-1)) + 'r' + pw(n-1) + 'u' + ph1(pw(n-1)) + 'u' + pw(n-1);
    }
}

function hh1(s){
    var s1 = '';
    for (var i = 0; i<s.length; i++){
        if (s.charAt(i) == 'u'){
            s1 += 'l';
        } else if (s.charAt(i) == 'd'){
            s1 += 'r';
        } else if (s.charAt(i) == 'l'){
            s1 += 'u';
        } else if (s.charAt(i) == 'r'){
            s1 += 'd';
        }
    }
    return s1;
}

function hh2(s){
    var s1 = '';
    for (var i = 0; i<s.length; i++){
        if (s.charAt(i) == 'u'){
            s1 += 'r';
        } else if (s.charAt(i) == 'd'){
            s1 += 'l';
        } else if (s.charAt(i) == 'l'){
            s1 += 'd';
        } else if (s.charAt(i) == 'r'){
            s1 += 'u';
        }
    }
    return s1;
}

function hw(n){
    if (n == 1){
        return 'dru';
    }
    else{
        return hh1(hw(n-1)) + 'd' + hw(n-1) + 'r' + hw(n-1) + 'u' + hh2(hw(n-1));
    }
}

// PEANO AND HILBERT WORD GENERATOR FOR TESTING ONLY

function drawLine(ctx, begin, end, stroke = 'blue', width = 3) {
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

var drawGrid = function(ctx, w, h, step) {
    for (var x = 0; x <= w; x += step) {
        drawLine(ctx, [x, 0], [x, h], 'rgb(128,128,128)', 1);
    }

    for (var y=0; y<=h ; y+=step) {
        drawLine(ctx, [0, y], [w, y], 'rgb(128,128,128)', 1);
    }
};

var drawCurve = function(ctx, chainCode, currX, currY, rowLength, colLength){
    for (let i = 0; i < chainCode.length; i++) {
        if (chainCode[i].toLowerCase() == 'u') {
            drawLine(ctx, [currX, currY], [currX, currY-colLength]);
            currY -= colLength;
        } else if (chainCode[i].toLowerCase() == 'r') {
            drawLine(ctx, [currX, currY], [currX+rowLength, currY]);
            currX += rowLength;
        } else if (chainCode[i].toLowerCase() == 'l') {
            drawLine(ctx, [currX, currY], [currX-rowLength, currY]);
            currX -= rowLength;
        } else if (chainCode[i].toLowerCase() == 'd') {
            drawLine(ctx, [currX, currY], [currX, currY+colLength]);
            currY += colLength;
        }
    }
};

function draw(chainCode, n, startPoint){
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    
    var rowLength, colLength, currX, currY;

    if ((chainCode.length+1) % 2 == 0){
        rowLength = (canvas.width)/(Math.pow(2, n));
        colLength = (canvas.height)/(Math.pow(2, n));
    } else {
        rowLength = (canvas.width)/(Math.pow(3, n));
        colLength = (canvas.height)/(Math.pow(3, n));
    }

    if (startPoint == 'upperLeft') {
        currX = rowLength/2;
        currY = colLength/2;
    } else if (startPoint == 'lowerLeft') {
        currX = rowLength/2;
        currY = canvas.height-(colLength/2);
    } else if (startPoint == 'upperRight') {
        currX = canvas.width-(rowLength/2);
        currY = colLength/2;
    } else if (startPoint == 'lowerRight') {
        currX = canvas.width-(rowLength/2);
        currY = canvas.height-(colLength/2);
    }

    drawGrid(ctx, canvas.width, canvas.height, rowLength);
    drawCurve(ctx, chainCode, currX, currY, rowLength, colLength);

    document.getElementById('grid').addEventListener('click', function() {
        if (document.getElementById('grid').value== 'Grid Off'){
            document.getElementById('grid').value = 'Grid On';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCurve(ctx, chainCode, currX, currY, rowLength, colLength);
        } else if (document.getElementById('grid').value== 'Grid On'){
            document.getElementById('grid').value = 'Grid Off';
            drawGrid(ctx, canvas.width, canvas.height, rowLength);
        } 
      });
}

// draw(hw(1), 1, 'upperLeft');
// draw(hw(2), 2, 'upperLeft');
draw(hw(3), 3, 'upperLeft');
// draw(hw(4), 4, 'upperLeft');
// draw(hw(5), 5, 'upperLeft');
// draw(hw(6), 6, 'upperLeft');
// draw(hw(7), 7, 'upperLeft');
// draw(hw(8), 8, 'upperLeft');
// draw(hw(9), 9, 'upperLeft');
// draw(pw(1), 1, 'lowerLeft');
// draw(pw(2), 2, 'lowerLeft');
// draw(pw(3), 3, 'lowerLeft');
// draw(pw(4), 4, 'lowerLeft');
// draw(pw(5), 5, 'lowerLeft');
// draw(pw(6), 6, 'lowerLeft');