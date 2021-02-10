'use strict';
console.log('main check');

var gImages;
var gElCanvas;
var gCtx;
var gMeme;
var gFirstLineAdd;
var currLineIdx;

function init() {
    // gMeme = loadFromStorage(TEMPMEMEKEY);
    // if (!gMeme) gMeme = createMeme();
    gFirstLineAdd = true;
    gMeme = createMeme();
    gImages = imagesForDisplay();
    currLineIdx = getCurrLineIdx();

    onRenderGallery();
    createCanvas();
}

function createCanvas() {
    gElCanvas = document.querySelector('.canvas-content');
    gCtx = gElCanvas.getContext('2d');
    drawImg();
}

function drawImg() {
    let currLine = gMeme.lines[currLineIdx];
    const img = new Image();
    img.src = gImages[0].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, currLine.font, gElCanvas.width / 2, currLine.y);
    };
}

function onUpdateMemeText() {
    let textInput = document.getElementById('text-input');
    let textInputVal = textInput.value;
    updateMemeText(textInputVal)
    renderCanvas();
}

function renderCanvas() {
    // let currLine = gMeme.lines[currLineIdx];
    drawImg();
    drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, currLine.font, gElCanvas.width / 2, currLine.y);
}

function drawText(text = '', fontSize = 20, fontColor = 'white', strokeColor = 'black', align = 'center', font = "ariel", x = gElCanvas.width / 2, y = 30) {
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fontColor;
    gCtx.font = `${fontSize}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onRenderGallery() {
    let strHTML = gImages.map(image => {
        return `<div class="img${image.id}"><img src="image/${image.id}.jpg" alt=""></div>`;
    }).join('');
    document.querySelector('.image-content').innerHTML = strHTML;
}
// ??
function onAddTextLine() {
    addTextLine();
    var currLine = gMeme.lines[currLineIdx];
    if (gFirstLineAdd) {
        drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, currLine.font, gElCanvas.width / 2, currLine.y);
        gFirstLineAdd = !gFirstLineAdd;
    } else drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, currLine.font, gElCanvas.width / 2, gElCanvas.height / 2);
    renderCanvas();
}

function onDeleteTextLines() {
    let textInput = document.getElementById('text-input');
    textInput.value = '';

    deleteTextLines();
    renderCanvas();
}

function onFontSize(el) {
    let elValue = el.value;
    fontSize(elValue);
    renderCanvas();
}

function onTextAlign(el) {
    let elValue = el.value;
    textAlign(elValue);
    renderCanvas();
}

function onChangeFont() {
    let elFont = document.getElementById('font');
    let elFontValue = elFont.value;
    changeFont(elFontValue);
    renderCanvas();
}

function onFontColor() {
    let elColor = document.getElementById('font-color');
    let elColorVal = elColor.value;
    fontColor(elColorVal);
    renderCanvas();
}

function onStrokeColor() {
    let elColor = document.getElementById('stroke-color');
    let elColorVal = elColor.value;
    strokeColor(elColorVal);
    renderCanvas();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onlineMove(el) {
    let currLine = gMeme.lines[currLineIdx];
    let elText = el.innerText;
    switch (elText) {
        case 'line-up':
            lineMove(elText);
            break;
        case 'line-down':
            lineMove(elText);
    }

    renderCanvas();
    drawText(currLine.txt, currLine.size, currLine.fontColor, currLine.strokeColor, currLine.align, currLine.font, currLine.x, currLine.y);
}

function onShowPage(el) {
    let elGalleryPage = document.querySelector('.gallery');
    let elMemesPage = document.querySelector('.main-memes');
    let elAboutPage = document.querySelector('.about');

    if (el.innerText === 'gallery'.toUpperCase()) {
        elGalleryPage.style.display = 'unset';
        elAboutPage.style.display = 'none';
        elMemesPage.style.display = 'none';
    }
    if (el.innerText === 'memes'.toUpperCase()) {
        elMemesPage.style.display = 'unset';
        elGalleryPage.style.display = 'none';
        elAboutPage.style.display = 'none';
    }
    if (el.innerText === 'about'.toUpperCase()) {
        elAboutPage.style.display = 'unset';
        elMemesPage.style.display = 'none';
        elGalleryPage.style.display = 'none';
    };
}