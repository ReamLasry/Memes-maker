'use strict';
console.log('memes service');

const TEMPMEMEKEY = 'MemeCreation';
var ggalleryImgs;
var meme;
var gCurrLineIdx = 0;



function createMeme() {
    meme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            size: 30,
            align: 'center',
            fontColor: 'white',
            strokeColor: 'black',
            font: 'Ariel',
            x: 50,
            y: 50
        }]
    };
    return meme
}




function imagesForDisplay() {
    let images = _createImages();
    let imgsForDisplay = images.map(image => image);
    return imgsForDisplay;
}

function addTextLine() {
    gCurrLineIdx++;
    let line = {
        txt: '',
        size: 30,
        align: 'center',
        fontColor: 'white',
        strokeColor: 'black',
        font: 'Ariel'
    };
    meme.lines.push(line);
    _saveMemeCreation();
}

function lineMove(elTxt) {
    switch (elTxt) {
        case 'line-up':
            gMeme.lines[gCurrLineIdx].y--;
            break;
        case 'line-down':
            gMeme.lines[gCurrLineIdx].y++;
    }
}

function updateMemeText(val) {
    gMeme.lines[gCurrLineIdx].txt = val;
}

function fontSize(val) {
    let currLine = meme.lines[gCurrLineIdx];
    if (currLine.size === 10 && val === '-') return;
    val === '+' ? currLine.size++ : currLine.size--;
}

function deleteTextLines() {
    console.log(gCurrLineIdx);
    gCurrLineIdx = 0;
    meme.lines[0].txt = '';
}

function textAlign(val) {
    let currLine = meme.lines[gCurrLineIdx];
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

function changeFont(val) {
    let currLine = meme.lines[gCurrLineIdx];
    currLine.font = val;
}

function fontColor(val) {
    let currLine = meme.lines[gCurrLineIdx];
    currLine.fontColor = val;
}

function strokeColor(val) {
    let currLine = meme.lines[gCurrLineIdx];
    currLine.strokeColor = val;
}

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

function _saveMemeCreation() {
    saveToStorage(TEMPMEMEKEY, meme);
}

function getCurrLineIdx() {
    return gCurrLineIdx;
}