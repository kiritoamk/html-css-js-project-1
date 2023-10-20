document.addEventListener('DOMContentLoaded', function () {
    const imageUpload = document.getElementById('image-upload');
    const processedImage = document.getElementById('processed-image');
    const removeBackgroundButton = document.getElementById('remove-background-button');
    const downloadButton = document.getElementById('download-button');

    removeBackgroundButton.addEventListener('click', function () {
        const file = imageUpload.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const imageData = new Image();
                imageData.src = reader.result;

                imageData.onload = function () {
                    const canvas = document.createElement('canvas');
                    canvas.width = imageData.width;
                    canvas.height = imageData.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(imageData, 0, 0);

                    rembg(canvas).then((result) => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        processedImage.width = canvas.width;
                        processedImage.height = canvas.height;
                        const processedCtx = processedImage.getContext('2d');
                        processedCtx.drawImage(result, 0, 0);
                        downloadButton.style.display = 'block';
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    });

    downloadButton.addEventListener('click', function () {
        const imgData = processedImage.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'processed-image.png';
        a.click();
    });
});
