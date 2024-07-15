const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;

// Arrow key values
const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};
Object.freeze(KEY);

// WASD values
const KEY2 = {
  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,
};
Object.freeze(KEY2);

/* 
To recieve the new state from the changed coordinates we use a spread operator ex: (...)
The arrow function spreads the old coordinates to a new object and at the same time changes the x coordinate
to return the new positiion
*/

const keyMoves = {
  [KEY.LEFT]: (b) => ({ ...b, x: b.x - 1 }),
  [KEY.RIGHT]: (b) => ({ ...b, x: b.x + 1 }),
  [KEY.DOWN]: (b) => ({ ...b, y: b.y + 1 }),
};

// Setting canvas dimensions
context.canvas.width = COLS * CELL_SIZE;
context.canvas.height = ROWS * CELL_SIZE;

// scaling the blocks
context.scale(CELL_SIZE, CELL_SIZE);

let board;
let block;

const play = () => {
  let playBtn = document.getElementById("play-btn");
  board = new Board(context);

  // On click, the button will disappear
  playBtn.style.display = "none";

  // Draws a random Block
  draw();

  addEventListener();
};

// This function will draw a random shape and grid lines
// Additonally, this function will update grid / color arrays
const draw = () => {
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);

  //This is what calls the block and color generation.
  board.block.draw();
};

const handleKeyPress = (event) => {
  if (keyMoves[event.keyCode]) {
    let b = keyMoves[event.keyCode](board.block);
    board.block.clear();
    board.block.move(b);
    drawGrid();  // Redraw the grid
    board.block.draw();  // Draw the block at the new position
  }
};

const addEventListener = () => {
  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);
};
