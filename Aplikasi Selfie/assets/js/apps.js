const startButton = document.getElementById('start-camera');
const stopButton = document.getElementById('stop-camera');
const takePhotoButton = document.getElementById('take-photo');
const canvas = document.getElementById('snapshot');

startButton.addEventListener('click', () => {
  alert('AR sudah berjalan otomatis. Silakan arahkan kamera ke marker AR.');
});

stopButton.addEventListener('click', () => {
  alert(
    'Anda dapat menghentikan AR dengan menutup tab atau berhenti menampilkan marker.'
  );
});

takePhotoButton.addEventListener('click', () => {
  const video = document.querySelector('video');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert canvas to data URL and save image
  const imageData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imageData;
  link.download = 'snapshot_with_ar.png';
  link.click();
});
