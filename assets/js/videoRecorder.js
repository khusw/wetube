const recoderContainer = document.getElementById("jsRecordContainer");
const videoPreview = document.getElementById("jsVideoPreview");
const recordBtn = document.getElementById("jsRecordBtn");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
  } catch (error) {
    recordBtn.innerHTML = " Can't record ";
    recordBtn.removeEventListener("click", startRecording);
  }
};

const init = () => {
  recordBtn.addEventListener("click", startRecording);
};

if (recoderContainer) {
  init();
}
