const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];

  // Check file size
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (selectedFile.size > maxSize) {
    fileInfo.innerHTML = 'El archivo es demasiado grande. Por favor, selecciona un archivo de máximo 2MB.';
    preview.style.display = 'none';
    return;
  }

  // Check file extension
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

  if (selectedFile.type.startsWith('image/')) {
    preview.style.display = 'block';
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  } else {
    preview.style.display = 'none';
  }
});
