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

//Simple RNG: Intput maxRange
const getRandomInt = (max) => Math.floor(Math.random() * max);

const play = () => {
  let playBtn = document.getElementById("play-btn");
  board = new Board(context);

  // On click, the button will disappear
  playBtn.style.display = "none";

  // Renders the cells/grid onto the screen when the start button is pressed
  //drawGrid();

  // Fills random colors in the grid.
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let randomColor;
      let randomInt = getRandomInt(5);

      switch(randomInt) {
        case 0: 
          randomColor = "red"
          break;
        case 1:
          randomColor = "orange";
          break;
        case 2: 
          randomColor = "yellow";
          break;
        case 3:
          randomColor = "cyan";
          break;
        case 4: 
          randomColor = "purple";
          break;
        default:
        randomColor = "black";  
      }
      board.setValue(i, j, 1, randomColor);
    }
  }
  drawGrid();

  //console.table(board.grid);
  console.table(board.colorGrid);
};
