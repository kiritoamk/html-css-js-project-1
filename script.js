// script.js

document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('upload-form');
    const imageUpload = document.getElementById('image-upload');
    const processedImage = document.getElementById('processed-image');
    const downloadButton = document.getElementById('download-button');

    uploadForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        processedImage.src = 'loading.gif';

        const file = imageUpload.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('/remove-background', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    processedImage.src = result.processedImageURL;
                    downloadButton.href = result.processedImageURL;
                    downloadButton.style.display = 'block';
                } else {
                    processedImage.src = 'error.png';
                }
            } catch (error) {
                console.error(error);
                processedImage.src = 'error.png';
            }
        } else {
            processedImage.src = '';
        }
    });
});
