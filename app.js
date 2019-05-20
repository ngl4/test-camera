document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded

const video = document.getElementById('video');
// const button = document.getElementById('button');
const select = document.getElementById('select');
let currentStream;
let mediaDevicesArr = [];

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function gotDevices(mediaDevices) {
  select.innerHTML = '';
  select.appendChild(document.createElement('option'));
  let count = 1;
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      mediaDevicesArr.push(mediaDevice.deviceId);
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}




// button.addEventListener('click', event => {
  
// });

console.log(currentStream);
if (typeof currentStream !== 'undefined') {
  stopMediaTracks(currentStream);
}

const videoConstraints = {};
const constraints = {
  video: videoConstraints,
  audio: false
};
if (select.value === '') {
  console.log("Nothing shows up");
  // navigator.mediaDevices.enumerateDevices();
  // videoConstraints.facingMode = 'environment';
  // navigator.mediaDevices
  // .getUserMedia(constraints)
  // .then(stream => {
  //   currentStream = stream;
  //   video.srcObject = stream;
  //   return navigator.mediaDevices.enumerateDevices();
  // })
  // .then(gotDevices)
  // .catch(error => {
  //   console.error(error);
  // });
 
}  else {
  console.log("Something is picked!");
  videoConstraints.deviceId = { exact: select.value };
  navigator.mediaDevices
  .getUserMedia(constraints)
  .then(stream => {
    currentStream = stream;
    video.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
  })
  .then(gotDevices)
  .catch(error => {
    console.error(error);
  });
}

select.addEventListener('change', changeCamera, false);

function changeCamera() {
  var component = this;
  mediaDevicesArr.forEach(function(elem){
    if (elem === component.value){
      console.log(elem, component.value);

      videoConstraints.deviceId = { exact: select.value };
      navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        currentStream = stream;
        video.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
      })
      .then(gotDevices)
      .catch(error => {
        console.error(error);
      });


    }
  })
}



navigator.mediaDevices.enumerateDevices().then(gotDevices);

});