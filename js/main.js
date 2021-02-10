'use strict';
console.log('main check');

var gImages;
var gElCanvas;
var gCtx;
var gMeme;
var gCurrLine;


function init() {
    // gMeme = loadFromStorage(TEMPMEMEKEY);
    // if (!gMeme) gMeme = createMeme();
    gMeme = createMeme();
    gImages = imagesForDisplay();
    gCurrLine = 0;
    onRenderGallery();
    createCanvas();
}

function createCanvas() {
    gElCanvas = document.querySelector('.canvas-content');
    gCtx = gElCanvas.getContext('2d');
    drawImg();
}

function drawImg() {
    let currLine = gMeme.lines[gCurrLine];
    const img = new Image();
    img.src = gImages[0].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(currLine.txt, currLine.size, currLine.fontColor, 'black', currLine.align, currLine.font);
    };
}

function updateMemeText() {
    let textInput = document.getElementById('text-input').value;
    gMeme.lines[gCurrLine].txt = textInput;
    renderCanvas();
}

function renderCanvas() {
    let currLine = gMeme.lines[gCurrLine];
    drawImg();
    drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, currLine.font);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(text = '', fontSize = 20, fontColor = 'white', strokeColor = 'black', align = 'center', font = "ariel", x = gElCanvas.width / 2, y = 30) {
    gCtx.beginPath();
    // gCtx.lineWidth = 1;
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fontColor;
    gCtx.font = `${fontSize}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onRenderGallery() {
    let strHTML = gImages.map(image => {
        return `< div class="img${image.id}" > <img src="image/${image.id}.jpg" alt=""></div>`;
    }).join('');
    document.querySelector('.image-content').innerHTML = strHTML;
}

function onAddTextLine() {
    gCurrLine++;
    addTextLine();
    console.log('cuur line is ', gMeme.lines[gCurrLine]);
    let currLine = gMeme.lines[gCurrLine];
    if (gCurrLine === 1) {
        drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, gElCanvas.width / 2, gElCanvas.height - 20, currLine.font);
    } else drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, gElCanvas.width / 2, gElCanvas.height / 2, currLine.font);
}

function onDeleteTextLines() {
    gCurrLine = 0;
    // if (gCurrLine === 0) console.log('gurline is 0');
    let textInput = document.getElementById('text-input');
    textInput.value = '';
    gMeme.lines[0].txt = '';
    renderCanvas();
}

function onFontSize(el) {
    let currLine = gMeme.lines[gCurrLine];
    let elValue = el.value;

    if (currLine.size === 10 && elValue === '-') return;
    elValue === '+' ? currLine.size++ : currLine.size--;
    renderCanvas();
}

function onTextAlign(el) {
    let currLine = gMeme.lines[gCurrLine];
    let elValue = el.value;
    switch (elValue) {
        case 'left':
            currLine.align = elValue;
            console.log(`left`);
            break;

        case 'right':
            console.log(`right`);
            currLine.align = elValue;
            break;
        case 'center':
            console.log(`center`);
            currLine.align = elValue;
            break;
    }
    renderCanvas();
}

function onChangeFont() {
    let elFont = document.getElementById('font');
    let currLine = gMeme.lines[gCurrLine];
    currLine.font = elFont.value;
    renderCanvas();
}

function onFontColor() {
    let elColor = document.getElementById('font-color');
    let elColorVal = elColor.value;
    let currLine = gMeme.lines[gCurrLine];
    currLine.fontColor = elColorVal;
    renderCanvas();
}

function onStrokeColor() {
    let elColor = document.getElementById('stroke-color');
    let elColorVal = elColor.value;
    let currLine = gMeme.lines[gCurrLine];
    currLine.strokeColor = elColorVal;
    renderCanvas();
}