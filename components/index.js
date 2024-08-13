const canvas = document.getElementById("board");
const canvasNext = document.getElementById("next-box");
const context = canvas.getContext("2d");
const nextBlock = canvasNext.getContext("2d");
const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;
const DEFAULT_TIME = 1000;

let request = null;
let gameStarted = false;
let board;

let playBtn = document.getElementById("play-btn");
let pauseBtn = document.getElementById("pauseBox");
let scoreBox = document.getElementById("score");
let levelBox = document.getElementById("level");
let linesBox = document.getElementById("lines");

// Setting canvas dimensions
context.canvas.width = COLS * CELL_SIZE;
context.canvas.height = ROWS * CELL_SIZE;

// Setting dimensions of the next box
nextBlock.canvas.width = 4 * CELL_SIZE; // Maximum Possible Block Width is Four
nextBlock.canvas.height = 12 * CELL_SIZE; // Maximum Possible Block Height is Four * Number of blocks in queue (3) 


// scaling the blocks
context.scale(CELL_SIZE, CELL_SIZE);
nextBlock.scale(CELL_SIZE , CELL_SIZE);

menu.style.display = "none";
pauseBtn.style.display = "none";
scoreBox.style.visibility = "hidden";
levelBox.style.visibility = "hidden";
linesBox.style.visibility = "hidden";

const play = () => {
  board = new Board(context, nextBlock);

  scoreBox.style.visibility = "visible";
  levelBox.style.visibility = "visible";
  linesBox.style.visibility = "visible";
  pauseBtn.style.display = "flex";
  canvasNext.style.visibility = "visible";

  // On click, the button will disappear
  playBtn.style.display = "none";

  // If an old game was already running then cancel the animation
  if (request) {
    cancelAnimationFrame(request);
  }
  // performance.now() returns a timestamp in milliseconds
  time.start = performance.now();

  gameStarted = true;

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
  if (!isPaused) {
    // Updates the elapsed time
    time.elapsed = now - time.start;
    // Checks if the elapsed time has passed the time for the current level
    if (time.elapsed > time.level) {
      // Restarts counting from now
      time.start = now;

      // If the board cant drop any blocks then game over
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

  gameStarted = false;
  pauseBtn.style.display = "none";
  scoreBox.style.visibility = "hidden";
  levelBox.style.visibility = "hidden";
  linesBox.style.visibility = "hidden";
  canvasNext.style.visibility ="hidden";
};

const resetGameStats = () => {
  userStats.score = 0;
  userStats.lines = 0;
  userStats.level = 0;

  time = { start: performance.now(), elapsed: 0, level: LEVEL[0] };
};
