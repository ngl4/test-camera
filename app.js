document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded

const video = document.getElementById('video'); 
//1) REMOVE the button 
const select = document.getElementById('select');
let currentStream;
let mediaDevicesArr = [];  // 2) Add mediaDevicesArr 

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
      // 3) Add mediaDevicesArr here
      mediaDevicesArr.push(mediaDevice.deviceId);
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}

if (typeof currentStream !== 'undefined') {
  stopMediaTracks(currentStream);
}

const videoConstraints = {};
const constraints = {
  video: videoConstraints,
  audio: false
};

//4) Add an event listener to change different camera -- inspired from http://jsfiddle.net/davidThomas/rCsDB/ 
select.addEventListener('change', changeCamera, false);

function changeCamera() {
  var component = this; 
  mediaDevicesArr.forEach(function(elem){
    if (elem === component.value){
      //console.log(elem, component.value);
      //5) These are the portion of the boilerplate code to find specific devices
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

//6) the below is also part of the boilerplate code 
navigator.mediaDevices.enumerateDevices().then(gotDevices);


//7) COMMENT OUT ALL THESE CODES FROM THE BOILERPLATE
// if (select.value === '') {
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
// }  else {
//   videoConstraints.deviceId = { exact: select.value };
//   navigator.mediaDevices
//   .getUserMedia(constraints)
//   .then(stream => {
//     currentStream = stream;
//     video.srcObject = stream;
//     return navigator.mediaDevices.enumerateDevices();
//   })
//   .then(gotDevices)
//   .catch(error => {
//     console.error(error);
//   });
// }


});