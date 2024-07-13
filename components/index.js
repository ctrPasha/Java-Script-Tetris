const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;
let board;

// Setting canvas dimensions
context.canvas.width = COLS * CELL_SIZE;
context.canvas.height = ROWS * CELL_SIZE;

// scaling the blocks
context.scale(CELL_SIZE, CELL_SIZE);

const play = () => {
  let playBtn = document.getElementById("play-btn");
  board = new Board(context);

  // On click, the button will disappear
  playBtn.style.display = "none";

  // Draws random block and gridline
  draw();

  console.table(board.grid);
  console.table(board.colorGrid);
};

// This function will draw a random shape and grid lines
// Additonally, this function will update grid / color arrays
const draw = () => {
  const { width, height } = context.canvas; 
  context.clearRect(0, 0, width, height);

  //This is what calls the block and color generation.
  board.block.draw();
  drawGrid();
}
