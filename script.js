/* Get Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const controls = player.querySelector(".player__controls");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggleButton = player.querySelector(".togglePlayback");
const volume = player.querySelector(".playerVolume");
const fullscreen = player.querySelector(".toggleFullscreen");
const thumbail = document.getElementsByClassName("thumbnail");
const totalDuration = document.getElementsByClassName("player__totalTime");
const currentDuration = document.getElementsByClassName("player__currentTime");

/* Functions */
function togglePlay() {
  const icon = toggleButton.querySelector(".player__playbackIcon");
  video.paused ? video.play() : video.pause();
  icon.classList.toggle("player__playbackIcon--paused");
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}
function convertSecondstoTime(given_seconds) {
  dateObj = new Date(given_seconds * 1000);
  hours = dateObj.getUTCHours();
  minutes = dateObj.getUTCMinutes();
  seconds = dateObj.getSeconds();
  timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return timeString;
}

function initalLoad() {
  currentDuration[0].innerHTML = convertSecondstoTime(video.currentTime);
  totalDuration[0].innerHTML = convertSecondstoTime(video.duration);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  if (video.currentTime > 4 && video.currentTime < 60) {
    thumbail[0].style.display = "block";
  } else {
    thumbail[0].style.display = "none";
  }
  currentDuration[0].innerHTML = convertSecondstoTime(video.currentTime);
  totalDuration[0].innerHTML = convertSecondstoTime(video.duration);
  thumbail[0].style.left = `${percent - 2}%`;
}

function handleSeek(e) {
  const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = seekTime;
}

// Create fullscreen video button
function toggleFullscreen() {
  if (!document.webkitFullscreenElement) {
    if (video.requestFullScreen) {
      player.requestFullScreen();
    } else if (video.webkitRequestFullScreen) {
      player.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    }
  } else {
    document.webkitExitFullscreen();
  }
}

/* Hook up the event listeners */

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

toggleButton.addEventListener("click", togglePlay);
volume.addEventListener("change", handleRangeUpdate);
volume.addEventListener("mousemove", handleRangeUpdate);

let mousedown = false;
progress.addEventListener("click", handleSeek);
progress.addEventListener("mousemove", (e) => mousedown && handleSeek(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreen.addEventListener("click", toggleFullscreen);
video.addEventListener("dblclick", toggleFullscreen);

//  initial load
setTimeout(function () {
  initalLoad();
}, 200);
