class Board {
  constructor(context) {
    this.context = context;
    this.grid = this.getEmptyBoard();
    this.colorGrid = this.getEmptyColorGrid();
    this.block = new Shapes(context);
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

  //Creates an array with entries of "black"
  getEmptyColorGrid() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill("black")
    );
  }

  //Method to set value and color for a specific block
  setValue(col, row, value, color) {
    this.grid[row][col] = value;
    this.colorGrid[row][col] = color;
  }

  /*
  Function loops over each row in the shape, then loops over each cell in the row
  If the cell is parrt of the shape (the value > 0), then check
  if its within the boards boundries.
  */
  valid(b) {
     // Loops over each row in the shape
    return b.randomShape.shape.every((row, y) => {
      // Loops over each cell in the row
      return row.every((value, x) => 
        // If the cell is part of the shape (value > 0), then check if its within the boards boundries 
        value === 0 || 
        this.isInsideWalls(b.x + x, b.y + y)
      );
    });
  }

  isInsideWalls(x, y) {
    return (
      x >= 0 && // left wall
      x < COLS && // right wall
      y < ROWS // bottom wall 
    );
  }
};

// 1. Print Blocks 2. Print Grid Lines
const drawGrid = () => {
  context.strokeStyle = "white";
  context.lineWidth = 0.075;
  
  // The loop prints the board from left-right | top-bottom
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const color = board.colorGrid[row][col]; // Read the color array
      context.fillStyle = color;

      // Fills a rectangle starting at i, j and to 1, 1 for each 1 entry
      context.fillRect(col, row, 1, 1);
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
