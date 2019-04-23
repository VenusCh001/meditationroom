
var index = 0;
var videoSrc = ["src: #video;", "src: #video1;", "src: #video2;"];
var videos = ["#video", "#video1", "#video2"];

pauseAll();

function pauseAll(){
  document.querySelector(document.querySelector('a-videosphere').getAttribute('src')).pause();
  document.querySelector("#voice").pause();
  document.querySelector("#sound").pause();
}

function start(i){
  document.querySelector("#voice").pause();
  document.querySelector("#sound").pause();
  index = i;
  document.getElementById("videoStuff").setAttribute('visible','true');
  document.getElementById("mainStuff").setAttribute('visible','false');
  pauseAll();
  document.querySelector('a-videosphere').setAttribute('material', videoSrc[index]);
  document.querySelector(document.querySelector('a-videosphere').getAttribute('src')).play();
}

function exit(){
  index = 0;
  pauseAll();
  document.querySelector("#voice").play();
  document.querySelector("#sound").play();
  document.getElementById("videoStuff").setAttribute('visible','false');
  document.getElementById("mainStuff").setAttribute('visible','true');
  document.querySelector('a-videosphere').setAttribute('material', "src: #video;");
  pauseAll();
}

function changeScene(){
  pauseAll();
  var video = document.querySelector(videos[index]);
  video.currentTime = 0;  // Seek to the beginning
  video.pause();
  index = (index+1)%videos.length;
  document.querySelector('a-videosphere').setAttribute('material', videoSrc[index]);
  var video = document.querySelector(videos[index]);
  video.currentTime = 0;  // Seek to the beginning
  video.play();
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