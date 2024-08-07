let menu = document.getElementById("menu-screen");
let displayConfirm = document.getElementById("confirm-screen");
let isPaused = false;

//displayConfirm.style.display = "none";

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
// If cancel is pressed, return to the menu.
const cancel = () => {
  displayConfirm.style.display = "none";
  menu.style.display = "block";
}

// Shows the screen for confirming quit.
const showQuit = () => {
  menu.style.display = "none";
  displayConfirm.style.display = "block";
}

/* 
If user quits game, resets game stats, clears the board and displays the start
button again. Also handles the game state, and hides interface.
*/
const quit = () => {
 resetGameStats();
 
 gameOver();
 
 isPaused = false;

 menu.style.display = "none";
 displayConfirm.style.display = "none";
}
