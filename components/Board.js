class Board {
  constructor(context) {
    this.context = context;
    this.grid = this.getEmptyBoard();
    this.shape = new Shapes(context);
  }
  /* Array.from Creates an array with Rows number of elements(in this case 20 cells)
    The callback creates an array for the columns which then returns a 10x20 grid.
    The array is filled with 0's. In short all this is doing is creating a 2D array/grid
    with the rows and columns cells initially set to 0.                                             
  */ 
  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  }

  rotate(block) {
    let b = JSON.parse(JSON.stringify(block));

    for (let y = 0; y < b.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [b.shape[x][y], b.shape[y][x]] = 
        [b.shape[y][x], b.shape[x][y]];
      }
    }
    b.shape.forEach(row => row.reverse());

    return b; 
  }

  /*
  Function loops over each row in the shape, then loops over each cell in the row
  If the cell is parrt of the shape (the value > 0), then check
  if its within the boards boundries.
  */
  valid(b) {
    return b.shape.every((row, y) => {
      return row.every((value, x) => 
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

const drawGrid = () => {
  context.strokeStyle = "white";
  context.lineWidth = 0.01;

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

