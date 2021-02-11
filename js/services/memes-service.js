'use strict';
console.log('memes service');

const TEMPMEMEKEY = 'MemeLines';
var ggalleryImgs;
var meme;



function createMeme() {
    meme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [{
            // FIRSTLINE
            txt: '',
            size: 20,
            align: 'center',
            fontColor: 'white',
            strokeColor: 'black',
            font: 'Impact',
            x: 50,
            y: 30
        }]
    };
    return meme
}


// ?? CURRLINE V
function addTextLine() {
    // ADDINGLINE
    meme.selectedLineIdx++;
    console.log('currline by meme is ', meme.selectedLineIdx);
    let line = {
        txt: '',
        size: 20,
        align: 'center',
        fontColor: 'white',
        strokeColor: 'black',
        font: 'Impact',
        x: 50,
        y: 300
    };
    meme.lines.push(line);
    console.log('meme lines: ', meme.lines);
    // _saveMemeLines();
}
// VV?
function updateMemeText(val) {
    gMeme.lines[meme.selectedLineIdx].txt = val;
    console.log(`line ${meme.selectedLineIdx} text is`, gMeme.lines[meme.selectedLineIdx].txt);
}

function changeSelectedPohto(val) {
    meme.selectedImgId = val;
}
// VV
function imagesForDisplay() {
    let images = _createImages();
    let imgsForDisplay = images.map(image => image);
    return imgsForDisplay;
}
// VV
function lineMove(elTxt) {
    switch (elTxt) {
        case 'line-up':
            gMeme.lines[meme.selectedLineIdx].y--;
            break;
        case 'line-down':
            gMeme.lines[meme.selectedLineIdx].y++;
    }
}
// VV 
function fontSize(val) {
    let currLine = meme.lines[meme.selectedLineIdx];
    if (currLine.size === 10 && val === '-') return;
    val === '+' ? currLine.size++ : currLine.size--;
}
// VV CURRLINE V
function deleteTextLines() {
    console.log('delete service b4', meme.selectedLineIdx);
    meme.selectedLineIdx = 0;
    console.log('delete service after', meme.selectedLineIdx);


    meme.lines = [{
        // FIRSTLINE AFTER DELTE LINES
        txt: '',
        size: 20,
        align: 'center',
        fontColor: 'white',
        strokeColor: 'black',
        font: 'Impact',
        x: 50,
        y: 30
    }];
    console.log('all lines in meme', meme.lines);
}
// VV
function textAlign(val) {
    let currLine = meme.lines[meme.selectedLineIdx];
    switch (val) {
        case 'left':
            currLine.align = val;
            break;

        case 'right':
            currLine.align = val;
            break;
        case 'center':
            currLine.align = val;
            break;
    }
}
// VV
function changeFont(val) {
    let currLine = meme.lines[meme.selectedLineIdx];
    currLine.font = val;
}
// VV
function fontColor(val) {
    let currLine = meme.lines[meme.selectedLineIdx];
    currLine.fontColor = val;
}
// VV
function strokeColor(val) {
    let currLine = meme.lines[meme.selectedLineIdx];
    currLine.strokeColor = val;
}
// VV
function _createImages() {
    return ggalleryImgs = [{
        id: 1,
        url: 'image/1.jpg',
        keywords: ['funny', 'man'],
    }, {
        id: 2,
        url: 'image/2.jpg',
        keywords: ['cute', 'animal'],
    }, {
        id: 3,
        url: 'image/3.jpg',
        keywords: ['kids', 'animal', 'cute'],
    }, {
        id: 4,
        url: 'image/4.jpg',
        keywords: ['animal', 'cute'],
    }, {
        id: 5,
        url: 'image/5.jpg',
        keywords: ['kid', 'cute'],
    }, {
        id: 6,
        url: 'image/6.jpg',
        keywords: ['man', 'funny'],
    }, {
        id: 7,
        url: 'image/7.jpg',
        keywords: ['kid', 'funny'],
    }, {
        id: 8,
        url: 'image/8.jpg',
        keywords: ['man'],
    }, {
        id: 9,
        url: 'image/9.jpg',
        keywords: ['kid', 'funny'],
    }, {
        id: 10,
        url: 'image/10.jpg',
        keywords: ['man', 'funny'],
    }, {
        id: 11,
        url: 'image/11.jpg',
        keywords: ['man'],
    }, {
        id: 12,
        url: 'image/12.jpg',
        keywords: ['man'],
    }, {
        id: 13,
        url: 'image/13.jpg',
        keywords: ['man'],
    }, {
        id: 14,
        url: 'image/14.jpg',
        keywords: ['man'],
    }, {
        id: 15,
        url: 'image/15.jpg',
        keywords: ['man'],
    }, {
        id: 16,
        url: 'image/16.jpg',
        keywords: ['man', 'funny'],
    }, {
        id: 17,
        url: 'image/17.jpg',
        keywords: ['man'],
    }, {
        id: 18,
        url: 'image/18.jpg',
        keywords: ['man'],
    }]
}
// VV
function _saveMemeLines() {
    // console.log(meme.lines);
    saveToStorage(TEMPMEMEKEY, meme.lines);
}
// VV
function getCurrLineIdx() {
    return meme.selectedLineIdx;
}