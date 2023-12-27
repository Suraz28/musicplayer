const myImage = document.getElementById("myImage");
const songName = document.getElementById("songName");
const artistName = document.querySelector(".artist");
const myAudio = document.getElementById("myAudio");
const myProgress = document.getElementById("myProgress");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const myShuffle = document.getElementById("myShuffle");
const myBackward = document.getElementById("myBackward");
const myPlay = document.getElementById("myPlay");
const myForward = document.getElementById("myForward");
const icons = document.querySelectorAll(".navbar i");
const myHome = document.getElementById("myHome");
const myMagnifying = document.getElementById("myMagnifying");
const myMusicIcon = document.getElementById("myMusic");
const myHeart = document.getElementById("myHeart");
const Interface = document.querySelector(".interface");
const audioFileInput = document.getElementById("audioFileInput");
const selectAudioButton = document.getElementById("selectAudioButton");
const musicList = document.getElementById("musicList");
const songTimeEllipsis = document.getElementById("songTimeEllipsis");
const songTimeEllipsis1 = document.getElementById("songTimeEllipsis1");
const songTimeEllipsis2 = document.getElementById("songTimeEllipsis2");
const songTimeEllipsis3 = document.getElementById("songTimeEllipsis3");

myAudio.onloadedmetadata = () => {
  myProgress.max = myAudio.duration;
  myProgress.value = myAudio.currentTime;
};

//making change on progress bar and timer if song is playing

myProgress.addEventListener("input", () => {
  myAudio.currentTime = myProgress.value;
});

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  let formattedHours = "";

  if (hours > 0) {
    formattedHours += `${hours}:`;
  }
  return `${String(formattedHours)}${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

myAudio.addEventListener("timeupdate", () => {
  myProgress.value = myAudio.currentTime;
  startTime.innerHTML = formatTime(myAudio.currentTime);
  endTime.innerHTML = formatTime(myAudio.duration);
});

//changing myShuffle color and background and shuffling songs
myShuffle.addEventListener("click", () => {
  if (myShuffle.style.background === "rgb(255, 255, 255)") {
    myShuffle.style.background = "rgb(2, 173, 192)";
    myShuffle.style.color = "rgb(255, 255, 255)";
  } else {
    myShuffle.style.background = "rgb(255, 255, 255)";
    myShuffle.style.color = "rgb(164, 170, 183)";
  }
});

//setting click effect on myBackward and changing song
myBackward.addEventListener("click", () => {
  myBackward.style.background = "#ffffff";
  myBackward.style.color = "#a4aab7";
  let isBlue = false;
  let interval = setInterval(() => {
    if (!isBlue) {
      myBackward.style.background = "#02adc0";
      myBackward.style.color = "#ffffff";
    }
  }, 200);
  setTimeout(() => {
    clearInterval(interval);
  }, 200);
});

// play and pause audio on click on play/pause icon
myPlay.addEventListener("click", () => {
  if (myAudio.paused) {
    myPlay.className = "fa fa-pause";
    myAudio.play();
  } else {
    myPlay.className = "fa fa-play";
    myAudio.pause();
  }
});

//setting click effect on forward and changing song
myForward.addEventListener("click", () => {
  myForward.style.background = "#ffffff";
  myForward.style.color = "#a4aab7";
  let isBlue = false;
  let interval = setInterval(() => {
    if (!isBlue) {
      myForward.style.background = "#02adc0";
      myForward.style.color = "#ffffff";
    }
  }, 200);
  setTimeout(() => {
    clearInterval(interval);
  }, 200);
});

//changing myRepeat color and background and repeating songs
let isBackgroundBlue = false;
myRepeat.addEventListener("click", () => {
  if (isBackgroundBlue) {
    myRepeat.style.background = "rgb(255, 255, 255)";
    myRepeat.style.color = "rgb(164, 170, 183)";
    isBackgroundBlue = false;
  } else {
    myRepeat.style.background = "rgb(2, 173, 192)";
    myRepeat.style.color = "rgb(255, 255, 255)";
    isBackgroundBlue = true;
  }
});
myAudio.addEventListener("ended", () => {
  if (isBackgroundBlue == true) {
    playCurrentAudio();
  } else {
    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
    playCurrentAudio();
  }
});

// Function to update audio source and other elements when a new audio file is selected
function updateAudioSource(file) {
  myAudio.src = URL.createObjectURL(file);
  //Change to the new image URL

  myAudio.load(); // Load the new audio source
  myAudio.onloadeddata = () => {
    myAudio.play();
    myPlay.className = "fa fa-pause";
    myImage.src.classList.add = "imagedesign";
  };
}

// Function to add a new music item to the list
function addMusicToList(file) {
  // Create a new list item for the music
  const audioSrc = URL.createObjectURL(file);
  audioFiles.push(audioSrc);
  const listItem = document.createElement("li");
  listItem.innerHTML = `
        <div class="songtimeellipsis">
            <div class="songtime">
                <span class="songName1">${file.name}</span>
                <p class="duration">Calculating...</p>
            </div>
            <button class="remove">Remove</button>
        </div>
    `;

  // Append the new list item to the music list
  musicList.appendChild(listItem);

  // Update the duration when the audio metadata is loaded
  const Duration = listItem.querySelector(".duration");

  const audio = new Audio();
  audio.src = audioSrc;
  audio.onloadedmetadata = () => {
    Duration.textContent = formatTime(audio.duration);
    myImage.src = "./images&mp3/alternative image.jpg";
    artistName.innerText = "";
    songName.innerText = `${file.name}`;
  };
  //play the music when click on that music from list
  listItem.addEventListener("click", () => {
    currentAudioIndex = audioFiles.indexOf(audio.src);
    myImage.src = "./images&mp3/alternative image.jpg";
    artistName.innerText = "";
    songName.innerText = `${file.name}`;

    playCurrentAudio();
  });

  // Handle remove button click
  const removeButton = listItem.querySelector(".remove");
  removeButton.addEventListener("click", () => {
    musicList.removeChild(listItem);
    audioFiles.splice(audioFiles.indexOf(audioSrc), 1);
    if (currentAudioIndex === audioFiles.indexOf(audioSrc)) {
      audio.src = "";
      songName.innerText = "";
      myPlay.classList = "fa fa-play";
    }
  });
}

// Create an array to store audio files
const audioFiles = [
  "./images&mp3/Mann Jogiya [320] Kbps-(Mp3Jio.Com).mp3",
  "./images&mp3/Hawaijahaaj - Sajjan Raj Vaidya - EdmNepal.Com.mp3",
  "./images&mp3/The_Kid_LAROI_Justin_Bieber_-_STAY.mp3",
  "./images&mp3/Tate_McRae_-_Greedy_FlexyOkay.com.mp3",
];

// Initialize the currently playing audio file index
let currentAudioIndex = 0;

// Function to play the current audio
function playCurrentAudio() {
  myAudio.src = audioFiles[currentAudioIndex];
  myAudio.play();
  myPlay.className = "fa fa-pause";

  myImage.src = "./images&mp3/alternative image.jpg";
  artistName.innerText = "";
  songName.innerText = `${"Playing New Audio"}`;

  // Update myImage and songName here
  switch (currentAudioIndex) {
    case 0:
      myImage.src = "./images&mp3/mann jogiya.jpg";
      songName.innerText = "Mann Jogiya";
      artistName.innerText = "Arijit Singh";
      break;
    case 1:
      myImage.src = "./images&mp3/hawaijahaaj.jpg";
      songName.innerText = "Hawaijahaaj";
      artistName.innerText = "Sajjan Raj Vaidya";
      break;
    case 2:
      myImage.src = "./images&mp3/Stay.jpg";
      songName.innerText = "STAY_The_Kid_LAROI_Justin_Bieber";
      artistName.innerText = "THE_KID_LAROI_JUSTIN_";
      break;
    case 3:
      myImage.src = "./images&mp3/Tate McRae-greedy.jpg";
      songName.innerText = "Greedy_TateMcRae";
      artistName.innerText = "Tate_McRae";
      break;
  }
}

audioFileInput.addEventListener("change", (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    addMusicToList(selectedFile);
    updateAudioSource(selectedFile);
  }
});

// Event listener for the "myForward" button
myForward.addEventListener("click", () => {
  currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length; // Loop back to the beginning if at the end
  playCurrentAudio();
});

// Event listener for the "myBackward" button (previous song)
myBackward.addEventListener("click", () => {
  currentAudioIndex =
    (currentAudioIndex - 1 + audioFiles.length) % audioFiles.length; // Loop to the end if at the beginning
  playCurrentAudio();
});

// adding click event on div with id #songTime
// const duration = document.getElementById("duration");
songTimeEllipsis.addEventListener("click", () => {
  myAudio.src = "./images&mp3/Mann Jogiya [320] Kbps-(Mp3Jio.Com).mp3";
  myImage.src = "./images&mp3/mann jogiya.jpg";
  songName.innerText = "Mann Jogiya";
  artistInput.innerText = "Arijit Singh";
  myAudio.play();
  myPlay.classList = "fa fa-pause";
});

songTimeEllipsis1.addEventListener("click", () => {
  myAudio.src =
    "./images&mp3/Hawaijahaaj - Sajjan Raj Vaidya - EdmNepal.Com.mp3";
  myImage.src = "./images&mp3/hawaijahaaj.jpg";
  songName.innerText = "Hawaijahaaj";
  artistInput.innerText = "Sajjan Raj Vaidya";
  endTime.textContent = formatTime(myAudio.duration);
  myAudio.play();
  myPlay.classList = "fa fa-pause";
});

songTimeEllipsis2.addEventListener("click", () => {
  myAudio.src = "./images&mp3/The_Kid_LAROI_Justin_Bieber_-_STAY.mp3";
  myImage.src = "./images&mp3/Stay.jpg";
  songName.innerText = "STAY_The_Kid_LAROI_Justin_Bieber";
  artistInput.innerText = "Kid_LAROI_Justin_Bieber";
  endTime.textContent = formatTime(myAudio.duration);
  myAudio.play();
  myPlay.classList = "fa fa-pause";
});

songTimeEllipsis3.addEventListener("click", () => {
  myAudio.src = "./images&mp3/Tate_McRae_-_Greedy_FlexyOkay.com.mp3";
  myImage.src = "./images&mp3/Tate McRae-greedy.jpg";
  songName.innerText = "Greedy_TateMcRae";
  artistInput.innerText = "Tate McRae";
  endTime.textContent = formatTime(myAudio.duration);
  myAudio.play();
  myPlay.classList = "fa fa-pause";
});

//setting active color to home button on load and adding active color to clicked icon

document.addEventListener("DOMContentLoaded", () => {
  myMusicIcon.classList.add("active");

  icons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      icons.forEach((icons) => {
        icons.classList.remove("active");
      });
      event.currentTarget.classList.add("active");
    });
  });
});

//toggling interface when click on music icon

myMusicIcon.addEventListener("click", () => {
  if (Interface.style.display === "none" || Interface.style.display === "") {
    Interface.style.display = "block";
    myHome.classList.remove("active");
  } else if (Interface.style.display === "block") {
    Interface.style.display = "none";
    myMusicIcon.classList.remove("active");
  }
});


myHome.addEventListener("click", () => {
  if (Interface.style.display === "block") {
    Interface.style.display = "none";
  }
});
myMagnifying.addEventListener("click", () => {
  if (Interface.style.display === "block") {
    Interface.style.display = "none";
  }
});
myHeart.addEventListener("click", () => {
  if (Interface.style.display === "block") {
    Interface.style.display = "none";
  }
});
