const ImageResizer = (imageUrl, size, callback) => {
    let tempImg = new Image();
    tempImg.src = imageUrl;

    let createCanvas = (img, width, height) => {
        let canvas = document.createElement('canvas');
        let canvasCtx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height
        canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
        return canvas.toDataURL()
    }

    tempImg.onload = () => {
        let tempW = tempImg.width;
        let tempH = tempImg.height;

        let min = tempW >= tempH ? tempH : tempW;
        size = size || min

        if (tempH <= size && tempW <= size) {
            createCanvas(imageUrl, tempW, tempH)
        }

        let startX = 0;
        if (min !== tempW) {
            startX = Math.round(tempW / 2 - (min / 2))
        }

        let startY = 0;
        if (min !== tempH) {
            startY = Math.round(tempH / 2 - (min / 2))
        }

        let finalImage = new Image();
        finalImage.src = getImagePortion(tempImg, min, min, startX, startY, 1);




        finalImage.onload = () => {
            callback(createCanvas(finalImage, size, size))
        }
    }

}


const getImagePortion = (imgObj, newWidth, newHeight, startX, startY, ratio) => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;

    let bufferedCanvas = document.createElement('canvas');
    let bufferedCtx = bufferedCanvas.getContext('2d');
    bufferedCanvas.width = imgObj.width;
    bufferedCanvas.height = imgObj.height;

    bufferedCtx.drawImage(imgObj, 0, 0);

    ctx.drawImage(bufferedCanvas, 0, 0, newWidth * ratio, newHeight * ratio, 0, 0, newWidth, newHeight)
    return canvas.toDataURL();
}

export default ImageResizer