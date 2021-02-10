'use strict';
console.log('main check');

var gImages;
var gElCanvas;
var gCtx;


function init() {
    gImages = imagesForDisplay();
    console.log(gImages);
    onRenderGallery();
    renderCanvas();
}



function renderCanvas() {
    gElCanvas = document.querySelector('.canvas-content');
    console.log(gElCanvas);
    gCtx = gElCanvas.getContext('2d');
    // onDrawImg();

    console.log(meme.lines[0].txt);
}

function onDrawImg() {
    const img = new Image();
    img.src = gImages[0].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        var meme = createMeme();
        onDrawText(meme.lines[0].txt);
    }
}

function onDrawText(text) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, gElCanvas.width / 2, 20)
    gCtx.strokeText(text, gElCanvas.width / 2, 20)
}

function onRenderGallery() {
    let strHTML = gImages.map(image => {
        return `<div class="img${image.id}"><img src="image/${image.id}.jpg" alt=""></div>`;
    }).join('');
    document.querySelector('.image-content').innerHTML = strHTML;
}