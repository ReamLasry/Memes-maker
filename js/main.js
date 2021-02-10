'use strict';
console.log('main check');

function init() {
    onRenderMemes();
}

function onRenderMemes() {
    let images = imagesForDisplay();
    let strHTML = images.map(image => {
        return `<div class="img${image.id}"><img src="image/${image.id}.jpg" alt=""></div>`;
    }).join('');

    document.querySelector('.image-content').innerHTML = strHTML;
}