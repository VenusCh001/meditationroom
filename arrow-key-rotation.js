
var index = 0;
var videoSrc = ["src: #video;", "src: #video1;", "src: #video2;"];
var videos = ["#video", "#video1", "#video2"];

function playVideo(){
  document.querySelector('a-videosphere').setAttribute('material', videoSrc[index]);
  var videoNow = document.querySelector('a-videosphere').getAttribute('src');
  document.querySelector(videoNow.substring(NaN,videoNow.length-1)).play();
}


function pauseVideo(){
  var videoTextNow = document.querySelector('a-videosphere').getAttribute('src');

  var video = document.querySelector(videoTextNow.substring(NaN,videoTextNow.length-1));
  video.currentTime = 0;
  video.pause();
}


function start(i){
  document.querySelector("#voice").pause();
  document.querySelector("#sound").pause();
  index = i;
  document.getElementById("videoStuff").setAttribute('visible','true');
  document.getElementById("mainStuff").setAttribute('visible','false');
  pauseVideo();
  playVideo();
}

function exit(){
  index = 0;
  pauseVideo();
  document.querySelector("#voice").play();
  document.querySelector("#sound").play();
  document.getElementById("videoStuff").setAttribute('visible','false');
  document.getElementById("mainStuff").setAttribute('visible','true');
  document.querySelector('a-videosphere').setAttribute('material', "src: #video;");
  pauseVideo();
}

function changeScene(){
  pauseVideo();
  index = (index+1)%videos.length;
  playVideo();
}

AFRAME.registerComponent('arrow-key-rotation', {
  schema: {
    enabled: {default: true},
    dx: {default: 2.0},
    dy: {default: 2.0},
  },
  init: function () {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.directionX = 0;
    this.directionY = 0;
  },
  play: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },
  pause: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);          
  },
  onKeyDown: function (evt) {
    switch (evt.keyCode) {
      case 37: this.directionX = 1; break;
      case 38: this.directionY = 1; break;
      case 39: this.directionX = -1; break;
      case 40: this.directionY = -1; break;
    }
  },
  onKeyUp: function (evt) {
    switch (evt.keyCode) {
      case 37: this.directionX = 0; break;
      case 38: this.directionY = 0; break;
      case 39: this.directionX = 0; break;
      case 40: this.directionY = 0; break;
    }          
  },
  tick: function (t, dt) {
    if (!this.data.enabled) { return; }
    var rotation = this.el.getAttribute('rotation');
    if (!rotation) { return; }
    if (this.directionX || this.directionY) {
      rotation.x += this.data.dx * this.directionY;
      rotation.y += this.data.dy * this.directionX;
      this.el.setAttribute('rotation', rotation);
    }
  }
});