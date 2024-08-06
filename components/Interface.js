let menu = document.getElementById("menu-screen");
let displayConfirm = document.getElementById("confirm-screen");
let isPaused = false;

displayConfirm.style.display = "none";

const resume = () => {
  if (isPaused) {
    isPaused = false;
    menu.style.display = "none";
    console.log(isPaused)
    animate();
  }
};

const pause = () => {
  if (!isPaused) {
    isPaused = true;
    cancelAnimationFrame(request);
    menu.style.display = "block";
    console.log(isPaused)
  }
};


const togglePause = () => {
  if (isPaused) {
    resume();
  } else {
    pause();
  }
};

const cancel = () => {
  displayConfirm.style.display = "none";
  menu.style.display = "block";
}

const showQuit = () => {
  menu.style.display = "none";
  displayConfirm.style.display = "block";
}

const quit = () => {
 resetGameStats();
 
 gameOver();
 
 isPaused = false;

 menu.style.display = "none";
 displayConfirm.style.display = "none";
}
