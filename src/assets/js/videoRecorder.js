const recoderContainer = document.getElementById("jsRecordContainer");
const videoPreview = document.getElementById("jsVideoPreview");
const recordBtn = document.getElementById("jsRecordBtn");

let streamObj;
let videoRecorder;

const handleVideoData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm"; // file name
  document.body.appendChild(link);
  link.click(); // fake click
};

const stopRecording = () => {
  videoRecorder.stop();
  streamObj.getVideoTracks()[0].stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObj);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = " Stop Recording ";
    streamObj = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = " Can't record ";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recordBtn.addEventListener("click", getVideo);
};

if (recoderContainer) {
  init();
}
