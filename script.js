
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');
const uploadProgress = document.getElementById('uploadProgress');

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];

  const maxSize = 4 * 1024 * 1024; // 4MB in bytes
  if (selectedFile.size > maxSize) {
    fileInfo.innerHTML = 'El archivo es demasiado grande. Por favor, selecciona un archivo de máximo 4MB.';
    preview.style.display = 'none';
    return;
  }

  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif']; // Add more if needed
  const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes('.' + fileExtension)) {
    fileInfo.innerHTML = 'Formato de archivo no válido. Solo se permiten archivos PDF o imágenes.';
    preview.style.display = 'none';
    return;
  }

  fileInfo.innerHTML = `
    Nombre del archivo: ${selectedFile.name}<br>
    Tipo MIME: ${selectedFile.type}<br>
    Tamaño: ${selectedFile.size} bytes
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

  // Upload using Axios
  const formData = new FormData();
  formData.append('file', selectedFile);

  axios.post('/upload', formData, {
    onUploadProgress: function(progressEvent) {
      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      uploadProgress.style.display = 'block';
      uploadProgress.value = progress;
    }
  })
  .then(response => {
    // Handle the response from the server
    console.log('Upload successful:', response.data);
  })
  .catch(error => {
    // Handle upload error
    console.error('Upload error:', error);
  });
});
