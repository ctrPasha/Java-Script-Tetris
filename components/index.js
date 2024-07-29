const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;
let requestId = null;
let playBtn = document.getElementById("play-btn");

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
  
  // If an old game was already running than cancel the animation
  if (requestId) {
    cancelAnimationFrame(requestId);
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
  level: 1000,
};

const animate = (now = 0) => {
  // Updates the elapsed time
  time.elapsed = now - time.start;

  // Checks if the elapsed time has passed the time for the current level
  if (time.elapsed > time.level) {
    // Restarts counting from now
    time.start = now;
    board.drop();
  }
  draw();
  requestId = requestAnimationFrame(animate);
};
