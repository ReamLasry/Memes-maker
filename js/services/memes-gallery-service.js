'use strict';

const MEMESGALLERYKEY = 'savedMemes';
const IDKEY = 'IdKEY';

var gSavedMemes;
var gId;

function loadMemesGallery() {
    gId = loadFromStorage(IDKEY);
    if (!gId) gId = 101;

    gSavedMemes = loadFromStorage(MEMESGALLERYKEY);
    if (!gSavedMemes) gSavedMemes = [];
}

function pushToMemesGallery(url) {
    let meme = {
        id: gId,
        url,
    };
    gSavedMemes.push(meme);
    gId++;
    saveMemesGallery();
    return meme;
}

function memesForDisplay() {
    return gSavedMemes;
}

function saveMemesGallery() {
    saveToStorage(MEMESGALLERYKEY, gSavedMemes);
    saveToStorage(IDKEY, gId);
}

function deleteMeme(memeId) {
    let memeIdx = gSavedMemes.findIndex(meme => meme.id === memeId);
    gSavedMemes.splice(memeIdx, 1);
    saveMemesGallery();
}