const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;
const DEFAULT_TIME = 1000;
let request = null;
let playBtn = document.getElementById("play-btn");
let isPaused = false;
// Setting canvas dimensions
context.canvas.width = COLS * CELL_SIZE;
context.canvas.height = ROWS * CELL_SIZE;

// scaling the blocks
context.scale(CELL_SIZE, CELL_SIZE);

let board;

const play = () => {
  board = new Board(context);
  // On click, the button will disappear
  playBtn.style.display = "none";
  // If an old game was already running then cancel the animation
  if (request) {
    cancelAnimationFrame(request);
  }
  // performance.now() returns a timestamp in milliseconds
  time.start = performance.now();
  animate();
};

// This function will draw a random shape and grid lines
// Additonally, this function will update grid / color arrays
const draw = () => {
  const { width, height } = context.canvas;
  context.clearRect(0, 0, canvas.width, canvas.height);

  //This is what calls the block and color generation.
  drawGrid();
  board.piece.draw();
  board.draw();
};

let time = {
  start: 0,
  elapsed: 0,
  level: DEFAULT_TIME,
};

const animate = (now = 0) => {
  if (isPaused) {
    // Updates the elapsed time
    time.elapsed = now - time.start;
    // Checks if the elapsed time has passed the time for the current level
    if (time.elapsed > time.level) {
      // Restarts counting from now
      time.start = now;

      // If the board doesnt drop any blocks then game over
      if (!board.drop()) {
        gameOver();
        resetGameStats();
        return;
      }
    }
  }

  draw();
  request = requestAnimationFrame(animate);
};

const gameOver = () => {
  // When the game is over, clears the whole canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  cancelAnimationFrame(request);

  playBtn.style.display = "block";
};

const resetGameStats = () => {
  userStats.score = 0;
  userStats.lines = 0;
  userStats.level = 0;

  time = { start: performance.now(), elapsed: 0, level: LEVEL[0] };
};

const resume = () => {
  if (isPaused) {
    isPaused = false;
    time.start = performance.now();
    animate();
    requestAnimationFrame(animate);
  }
};

const pause = () => {
  if (!isPaused) {
    isPaused = true;
    cancelAnimationFrame(request);
  }
};

const togglePause = () => {
  if (!isPaused) {
    pause();
  } else {
    resume();
  }
};
