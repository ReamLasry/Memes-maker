'use strict';

var gImages;
var gElCanvas;
var gCtx;
var gMeme;
var gFirstLineAdd;
var gCurrLineIdx;
var gCurrImgUrl;
var gOpenMenue;


function init() {
    gOpenMenue = false;
    gFirstLineAdd = true;
    gMeme = createMeme();
    gCurrLineIdx = getCurrLineIdx();
    gImages = imagesForDisplay();

    addClicksAndTouch();
    onRenderGallery();
    loadMemesGallery();
    createCanvas();
}

// PAGES FUNCTIONS


function onRenderMemes() {
    let savedMemes = loadFromStorage(MEMESGALLERYKEY);
    let strHTML;

    if (!savedMemes) savedMemes = memesForDisplay();
    if (savedMemes.length === 0) strHTML = '<h1>No memes yet...</h1>';
    else strHTML = savedMemes.map(meme => {
        return ` 
            <div class="save-meme-container">
            <img class="delete-meme-img" id="${meme.id}" title="Delete meme" onclick="onDeleteMeme(this)" src="ICONS/trash.png" alt="">
            <img  class="meme ${meme.id}" src="${meme.url}" alt="">
            </div>`;
    }).join('');

    document.querySelector('.saved-memes-content').innerHTML = strHTML;
}

function onShowPage(el) {
    let elGalleryPage = document.querySelector('.gallery');
    let elSavedMemesPage = document.querySelector('.saved-memes')
    let elMemesPage = document.querySelector('.main-memes');
    let elAboutPage = document.querySelector('.about');

    switch (el.innerText) {
        case 'gallery'.toUpperCase():
            elMemesPage.hidden = true;
            elSavedMemesPage.hidden = true;
            elGalleryPage.hidden = false;
            onDeleteTextLines();
            break;
        case 'memes'.toUpperCase():
            onRenderMemes();
            elGalleryPage.hidden = true;
            elAboutPage.hidden = true;
            elMemesPage.hidden = true;
            elSavedMemesPage.hidden = false
            break;
        case 'about'.toUpperCase():
            elSavedMemesPage.hidden = true;
            elMemesPage.hidden = true;
            elGalleryPage.hidden = true;
            elAboutPage.hidden = false;
            break;
    }

    let elNavBar = document.querySelector('.main-nav');
    elNavBar.classList.remove('menu-open');
    gOpenMenue = false;
}

function onToggleMenu() {
    let elNavBar = document.querySelector('.main-nav');
    switch (gOpenMenue) {
        case false:
            elNavBar.classList.add('menu-open');
            gOpenMenue = true;
            break;
        case true:
            elNavBar.classList.remove('menu-open');
            gOpenMenue = false;
            break;
    }
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

function addClicksAndTouch() {
    //PAGES
    let elGalleryPage = document.querySelector('.gallery-page');
    let elMemesPage = document.querySelector('.meme-page');
    let elAboutPage = document.querySelector('.about-page');
    //Page gallery
    elGalleryPage.addEventListener('click', function() { onShowPage(this) });
    elGalleryPage.addEventListener('touchend', function() { onShowPage(this) });
    //Page meme
    elMemesPage.addEventListener('click', function() { onShowPage(this) });
    elMemesPage.addEventListener('touchend', function() { onShowPage(this) });
    //Page about
    elAboutPage.addEventListener('click', function() { onShowPage(this) });
    elAboutPage.addEventListener('touchend', function() { onShowPage(this) });

    // MENUE BUTTON 
    let elMenueBtn = document.querySelector('.menu-btn');
    elMenueBtn.addEventListener('touchend', onToggleMenu);

    // TEXT KEYWORD INPUT
    let elKeyWordInput = document.getElementById('search-input');
    elKeyWordInput.addEventListener('keyup', function() { onSearchKeyWord(this) });

    // WORDS KEYWORD TO INPUT
    let elKeyWord1 = document.querySelector('.keyWord1');
    let elKeyWord2 = document.querySelector('.keyWord2');
    let elKeyWord3 = document.querySelector('.keyWord3');
    let elKeyWord4 = document.querySelector('.keyWord4');
    // KeyWord1
    elKeyWord1.addEventListener('click', function() { searchByThisWord(this) });
    elKeyWord1.addEventListener('touchend', function() { searchByThisWord(this) });
    // KeyWord2    
    elKeyWord2.addEventListener('click', function() { searchByThisWord(this) });
    elKeyWord2.addEventListener('touchend', function() { searchByThisWord(this) });
    // KeyWord3
    elKeyWord3.addEventListener('click', function() { searchByThisWord(this) });
    elKeyWord3.addEventListener('touchend', function() { searchByThisWord(this) });
    // KeyWord4
    elKeyWord4.addEventListener('click', function() { searchByThisWord(this) });
    elKeyWord4.addEventListener('touchend', function() { searchByThisWord(this) });

    // TEXT LINE INPUT
    let elLineInput = document.getElementById('text-input');
    elLineInput.addEventListener('keyup', onUpdateMemeText);

    // FOCUS LINE BTN
    let elFocuLine = document.getElementById('switch-focus-line');
    elFocuLine.addEventListener('click', onSwitchLine);
    elFocuLine.addEventListener('touchend', onSwitchLine);

    //LINE MOVE UP|DOWN
    let elLineUp = document.getElementById('line-up');
    let elLineDown = document.getElementById('line-down');
    //Line up
    elLineUp.addEventListener('click', function() { onlineMove(this) });
    elLineUp.addEventListener('touchend', function() { onlineMove(this) });
    //Line down 
    elLineDown.addEventListener('click', function() { onlineMove(this) });
    elLineDown.addEventListener('touchend', function() { onlineMove(this) });

    //ADD TEXT LINE
    let elAddTextLine = document.querySelector('.add-text-line');
    elAddTextLine.addEventListener('click', onAddTextLine);
    elAddTextLine.addEventListener('touchend', onAddTextLine);

    //DELETE TEXT LINE
    let elDeleteTextLine = document.querySelector('.delete-text-line');
    elDeleteTextLine.addEventListener('click', onDeleteTextLines);
    elDeleteTextLine.addEventListener('touchend', onDeleteTextLines);

    //FONT SIZE UP|DOWN
    let elFontSizeUp = document.querySelector('.font-size-up');
    let elFontSizeDown = document.querySelector('.font-size-down');
    //Font size up
    elFontSizeUp.addEventListener('click', function() { onFontSize(this) });
    elFontSizeUp.addEventListener('touchend', function() { onFontSize(this) });
    //Font size down
    elFontSizeDown.addEventListener('click', function() { onFontSize(this) });
    elFontSizeDown.addEventListener('touchend', function() { onFontSize(this) });

    //TEXT ALIGN LEFT|CENTER|RIGHT
    let elAlignleft = document.querySelector('.line-to-left');
    let elAlignCenter = document.querySelector('.line-to-center');
    let elAlignRight = document.querySelector('.line-to-right');
    //Text align left
    elAlignleft.addEventListener('click', function() { onTextAlign(this) });
    elAlignleft.addEventListener('touchend', function() { onTextAlign(this) });
    //Text align center
    elAlignCenter.addEventListener('click', function() { onTextAlign(this) });
    elAlignCenter.addEventListener('touchend', function() { onTextAlign(this) });
    //Text align right
    elAlignRight.addEventListener('click', function() { onTextAlign(this) });
    elAlignRight.addEventListener('touchend', function() { onTextAlign(this) });

    //CHANE FONT STYLE
    let elChangeFont = document.getElementById('font');
    elChangeFont.addEventListener('change', onChangeFont);

    //CHANGE TEXT STROKE COLOR
    let elChangeStrokeColor = document.getElementById('stroke-color');
    elChangeStrokeColor.addEventListener('change', onStrokeColor);

    //CHANGE TEXT FONT COLOR
    let elChangeFontColor = document.getElementById('font-color');
    elChangeFontColor.addEventListener('change', onFontColor);

    //MEME FUNCTIONS
    //Save meme
    let elSaveMeme = document.getElementById('save-meme');
    elSaveMeme.addEventListener('click', saveMeme);
    elSaveMeme.addEventListener('touchend', saveMeme);
    //Share meme
    let elShareMeme = document.getElementById('share-meme');
    elShareMeme.addEventListener('click', shareImg);
    elShareMeme.addEventListener('touchend', shareImg);
    //Download meme
    let elDownloadMeme = document.getElementById('download-meme');
    elDownloadMeme.addEventListener('click', function() { downloadImg(event, this) });
    elDownloadMeme.addEventListener('touchend', function() { downloadImg(event, this) });

}

// GALLERY
function onRenderGallery() {
    let strHTML = gImages.map(image => {
        return `<div class="img${image.id}"><img  class="${image.id}" src="image/${image.id}.jpg" alt="" onclick="onRenderPhoto(this)"></div>`;
    }).join('');
    document.querySelector('.image-content').innerHTML = strHTML;
}

function renderKeyWordGallery(photos) {
    let strHTML = photos.map(image => {
        return `<div class="img${image.id}"><img  class="${image.id}" src="image/${image.id}.jpg" alt="" onclick="onRenderPhoto(this)"></div>`;
    }).join('');
    document.querySelector('.image-content').innerHTML = strHTML;
}

function onSearchKeyWord(el) {
    let searchKey = el.value;
    let searchPhotos = getKeyWordPicturs(searchKey);

    renderKeyWordGallery(searchPhotos);
    if (searchKey === '') onRenderGallery();
}

function searchByThisWord(el) {
    let elSearchInput = document.getElementById('search-input');
    elSearchInput.value = el.innerText;

    let searchKey = elSearchInput.value.toLowerCase();
    let searchPhotos = getKeyWordPicturs(searchKey);
    renderKeyWordGallery(searchPhotos);
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

    switch (gFirstLineAdd) {
        case true:
            addTextLine(gElCanvas.height - 20);
            gFirstLineAdd = !gFirstLineAdd;
            break;

        case false:
            addTextLine(gElCanvas.height / 2);
            renderCanvas();
            break;
    }
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