const canvas = document.getElementById("board");
const context = board.getContext('2d');

const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;

// Setting canvas dimensions
context.canvas.width = COLS * CELL_SIZE;
context.canvas.height = ROWS * CELL_SIZE;  

// scaling the blocks
context.scale(CELL_SIZE, CELL_SIZE);

function play() {
  let playBtn = document.getElementById("play-btn");
  board = new Board(context);
  console.table(board.grid);
  // On click, the button will disappear 
  playBtn.style.display = 'none';

  // Renders the cells/grid onto the screen when the start button is pressed
  drawGrid();



}


