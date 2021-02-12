'use strict';

var gImages;
var gElCanvas;
var gCtx;
var gMeme;
var gFirstLineAdd;
var gCurrLineIdx;
var gCurrImgUrl;



function init() {
    gFirstLineAdd = true;
    gMeme = createMeme();

    // gMeme.selectedImgId;

    gCurrLineIdx = getCurrLineIdx();
    gImages = imagesForDisplay();

    let elClassName = '';
    onRenderGallery();
    createCanvas();
}

// PAGES FUNCTIONS
function onRenderGallery() {
    let strHTML = gImages.map(image => {
        return `<div class="img${image.id}"><img  class="${image.id}" src="image/${image.id}.jpg" alt="" onclick="onRenderPhoto(this)"></div>`;
    }).join('');
    document.querySelector('.image-content').innerHTML = strHTML;
}

function onRenderMemes() {
    let savedMemes = loadFromStorage(MEMESGALLERYKEY);
    let strHTML;

    if (!savedMemes) savedMemes = memesForDisplay();
    if (savedMemes.length === 0) strHTML = '<h1>No memes yet...</h1>';
    else strHTML = savedMemes.map(meme => {
        return ` 
            <div class="img${meme.id}">
            <img class="delete-meme-img" id="${meme.id}" title="Delete meme" onclick="onDeleteMeme(this)" src="ICONS/trash.png" alt="">
            <img  class="${meme.id}" src="${meme.url}" alt=""></div>`;
    }).join('');


    document.querySelector('.saved-memes-content').innerHTML = strHTML;
}

function onShowPage(el) {
    let elGalleryPage = document.querySelector('.gallery');
    let elSavedMemesPage = document.querySelector('.saved-memes')
    let elMemesPage = document.querySelector('.main-memes');
    let elAboutPage = document.querySelector('.about');

    if (el.innerText === 'gallery'.toUpperCase()) {
        elAboutPage.hidden = true;
        elMemesPage.hidden = true;
        elSavedMemesPage.hidden = true;
        elGalleryPage.hidden = false;
        onDeleteTextLines();
    } else if (el.innerText === 'memes'.toUpperCase()) {
        onRenderMemes();

        elGalleryPage.hidden = true;
        elAboutPage.hidden = true;
        elMemesPage.hidden = true;
        elSavedMemesPage.hidden = false
    } else {
        elSavedMemesPage.hidden = true;
        elMemesPage.hidden = true;
        elGalleryPage.hidden = true;
        elAboutPage.hidden = false;
    };
}

function onDeleteMeme(el) {
    let elIdNum = +el.id;
    deleteMeme(elIdNum);
    onRenderMemes();
}

function onRenderPhoto(el) {
    let imageId = +el.className;
    changeSelectedPohto(imageId);

    gCurrImgUrl = gImages[imageId - 1].url;
    drawImg(gCurrImgUrl);

    let elGalleryPage = document.querySelector('.gallery');
    let elSavedMemesPage = document.querySelector('.saved-memes')
    let elMemesPage = document.querySelector('.main-memes');
    let elAboutPage = document.querySelector('.about');

    elSavedMemesPage.hidden = true
    elGalleryPage.hidden = true;
    elAboutPage.hidden = true;
    elMemesPage.hidden = false;
}

// CANVAS
function createCanvas() {
    gElCanvas = document.querySelector('.canvas-content');
    gCtx = gElCanvas.getContext('2d');
    drawImg(gCurrImgUrl);
}

function renderCanvas() {
    drawImg(gCurrImgUrl);
}

function renderLines() {
    let lines = gMeme.lines;
    lines.forEach(line => {
        drawText(line.txt, line.size, line.fontColor, line.strokeColor, line.align, line.font, gElCanvas.width / 2, line.y);
    });
}

function drawImg(url) {
    const img = new Image();
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        renderLines();
    };
}

function drawText(text = '', fontSize = 20, fontColor = 'white', strokeColor = 'black', align = 'center', font = "ariel", x = gElCanvas.width / 2, y = 20) {
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fontColor;
    gCtx.font = `${fontSize}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

// MEME FUNCTIONS
function onUpdateMemeText() {
    let textInput = document.getElementById('text-input');
    let textInputVal = textInput.value;
    updateMemeText(textInputVal);
    renderCanvas();
}

function onAddTextLine() {
    let textInput = document.getElementById('text-input');
    textInput.value = '';

    if (gFirstLineAdd) {
        addTextLine(gElCanvas.height - 20);
        gFirstLineAdd = !gFirstLineAdd;
    } else addTextLine(gElCanvas.height / 2);
    renderCanvas();
}

function onDeleteTextLines() {
    if (!gFirstLineAdd) gFirstLineAdd = true;
    let textInput = document.getElementById('text-input');
    textInput.value = '';

    deleteTextLines();
    gCurrLineIdx = getCurrLineIdx();
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

function onlineMove(el) {
    let elText = el.id;
    switch (elText) {
        case 'line-up':
            lineMove(elText);
            break;
        case 'line-down':
            lineMove(elText);
    }
    renderCanvas();
}

function onSwitchLine() {
    lineFocus();
    gCurrLineIdx = getCurrLineIdx();

    let textInput = document.getElementById('text-input');
    let currLineTxt = gMeme.lines[gCurrLineIdx].txt;
    textInput.value = currLineTxt;
}

function downloadImg(ev, elLink) {
    ev.stopPropagation();

    let imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
    _notifyMessege('download');
}

function saveMeme() {
    let dataURL = gElCanvas.toDataURL();

    pushToMemesGallery(dataURL);
    _notifyMessege('save');
}

function shareImg() {
    _notifyMessege('share');
}

function _notifyMessege(messegeType) {
    let elModal = document.querySelector('.messege-modal');

    switch (messegeType) {
        case 'save':
            elModal.innerText = 'Your meme is now save in the MEMES gallery!';
            break;

        case 'download':
            elModal.innerText = 'Your download will begin shortly...';
            break;
        case 'share':
            elModal.innerText = 'Unknown error, please try again later.';
    }

    elModal.style.visibility = 'unset';
    setTimeout(_closeMessege, 2000);
}

function _closeMessege() {
    let elModal = document.querySelector('.messege-modal');
    elModal.style.visibility = 'hidden';
}