class Board {
  constructor(context) {
    this.context = context;
    this.grid = this.getEmptyBoard();
    this.colorGrid = this.getEmptyColorGrid();
  }
  /* Array.from Creates an array with Rows number of elements(in this case 20 cells)
    The callback creates an array for the columns which then returns a 10x20 grid.
    The array is filled with 0's. In short all this is doing is creating a 2D array/grid
    with the rows and columns cells initially set to 0.                                             
  */
 
  //Creates an array with entries of 0
  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  }

  //Creates an array with entries of null
  getEmptyColorGrid() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill("black")
    );
  }

  //Method to set value and color for a specific block
  setValue(row, col, value, color) {
    this.grid[row][col] = value;
    this.colorGrid[row][col] = color;
  }
  
};

const drawGrid = () => {
  context.strokeStyle = "white";
  context.lineWidth = 0.075;

  // The loop prints the board from left-right | top-bottom
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      
      const color = board.colorGrid[i][j]; // Read the color array
      context.fillStyle = color;

      // Fills a rectangle starting at i, j and to 1, 1
      context.fillRect(i, j, 1, 1);

    } 
  }

  // Draws Vertical Lines
  for (let i = 0; i <= COLS; i++) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, ROWS);
    context.stroke();
  }
  
  // Draws horizontal lines
  for (let j = 0; j <= ROWS; j++) {
    context.beginPath();
    context.moveTo(0, j);
    context.lineTo(COLS, j);
    context.stroke();
  }
  

}