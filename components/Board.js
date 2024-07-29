class Board {
  constructor(context) {
    this.context = context;
    this.grid = this.getEmptyBoard();
    this.piece = new Shapes(context);
  }
  /* Array.from Creates an array with Rows number of elements(in this case 20 cells)
    The callback creates an array for the columns which then returns a 10x20 grid.
    The array is filled with 0's. In short all this is doing is creating a 2D array/grid
    with the rows and columns cells initially set to 0.                                             
  */
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  rotate(block) {
    let b = JSON.parse(JSON.stringify(block));

    for (let y = 0; y < b.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [b.shape[x][y], b.shape[y][x]] = [b.shape[y][x], b.shape[x][y]];
      }
    }
    b.shape.forEach((row) => row.reverse());

    // isValid has to be declared here else won't work
    // isValid returns false if block array is OOB
    let isValid = this.valid(b);
    if (!isValid) {
      let outOfBoundsMin = 10;
      let outOfBoundsMax = 0;

      // Checks for min / max X coordinate of the OOB array
      b.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0 && !this.isInsideWalls(b.x + x, b.y + y)) {
            // Update min and max values based on the current x value
            if (outOfBoundsMin > b.x + x) {
              outOfBoundsMin = b.x + x;
            }
            if (outOfBoundsMax < b.x + x) {
              outOfBoundsMax = b.x + x;
            }
          }
        });
      });

      //Shifts over the new rotated block by the emount of spaces OOB.
      if (outOfBoundsMin <= 0) {
        b.x = b.x + outOfBoundsMin * -1;
      } else {
        outOfBoundsMax = outOfBoundsMax - 9;
        b.x = b.x - outOfBoundsMax;
      }
    }

    return b;
  }

  /*
  Function loops over each row in the shape, then loops over each cell in the row
  If the cell is parrt of the shape (the value > 0), then check
  if its within the boards boundries.
  */
  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  valid(b) {
    return b.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = b.x + dx;
        let y = b.y + dy;
        return value === 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y));
      });
    });
  }

  isInsideWalls(x, y) {
    return (
      x >= 0 && // left wall
      x < COLS && // right wall
      y < ROWS // bottom wall
    );
  }

  // If the tetramino is at the bottom, will merge the tetramino to the bottom of the board
  rest() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = this.piece.index + 1;
        }
      });
    });
  }

  drop() {
    let b = keyMoves[KEY.DOWN](this.piece);

    if (this.valid(b)) {
      this.piece.move(b);
    } else {
      this.rest();
      this.piece = new Shapes(this.context);
    }
    console.table(this.grid);


  }
  // Draws the board with the tetraminos that land on the bottom
  draw() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillStyle = COLORS[value - 1];
          this.context.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  clearLines = () => {    
    // Scans and deletes the row
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++ ) {
        let completedLine = this.grid[y].every(value => value >= 1);
        if (completedLine) {
          for (let x = 0; x < COLS; x++) {
            this.grid[y][x] = 0; // Set each element in the row to 0
          }
          // Shifts the entire board down by one
          for (let y = ROWS - 1; y > 0; y--) {
            for (let x = 0; x < COLS; x++) {
              this.grid[y][x] = this.grid[y - 1][x];
            }
          }

        }
      }
    }
  }
}

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
};
