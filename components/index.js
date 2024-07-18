const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;

// Arrow key values
const KEY = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
Object.freeze(KEY);

/* WASD values
const KEY2 = {
  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,
};
Object.freeze(KEY2);
*/

/* 
To recieve the new state from the changed coordinates we use a spread operator ex: (...)
The arrow function spreads the old coordinates to a new object and at the same time changes the x coordinate
to return the new positiion
*/

const keyMoves = {
  [KEY.LEFT]: (b) => ({ ...b, x: b.x - 1 }),
  [KEY.RIGHT]: (b) => ({ ...b, x: b.x + 1 }),
  [KEY.DOWN]: (b) => ({ ...b, y: b.y + 1 }),
  [KEY.UP]: (b) => board.rotate(b),
  [KEY.SPACE]: (b) => board.hardDrop(b)
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
  
  console.table(board.grid);
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

  if (event.keyCode != 32){
    if (board.valid(b)) {
      board.block.move(b);
    }
    board.block.draw();  // Draw the block at the new position
  }

  if (event.keyCode === 39) {
    console.log("This is the current x pos:", board.block.x);
  }

}

};

const addEventListener = () => {
  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);
};
