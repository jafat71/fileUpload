const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');
const uploadProgress = document.getElementById('uploadProgress');

fileInput.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];

    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (selectedFile.size > maxSize) {
        fileInfo.innerHTML = 'The file is too large. Please select a file of maximum 4MB.';
        preview.style.display = 'none';
        return;
    }

    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes('.' + fileExtension)) {
        fileInfo.innerHTML = 'Invalid file format. Only PDF or image files are allowed.';
        preview.style.display = 'none';
        return;
    }

    fileInfo.innerHTML = `
        File name: ${selectedFile.name}<br>
        MIME type: ${selectedFile.type}<br>
        Size: ${selectedFile.size} bytes
    `;

    const isImage = selectedFile.type.startsWith('image/');

    if (isImage) {
        preview.style.display = 'block';
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
    } else {
        preview.style.display = 'none';
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:3000/upload', formData, {
        onUploadProgress: function(progressEvent) {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            uploadProgress.style.display = 'block';
            uploadProgress.value = progress;
        }
    })
    .then(response => {
        console.log('Upload successful:', response.data.message);
    })
    .catch(error => {
        console.error('Upload error:', error);
    });
});
