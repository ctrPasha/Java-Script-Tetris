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

  rotate(block) {
    let b = JSON.parse(JSON.stringify(block));

    for (let y = 0; y < b.randomShape.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [b.randomShape.shape[x][y], b.randomShape.shape[y][x]] = 
        [b.randomShape.shape[y][x], b.randomShape.shape[x][y]];
      }
    }
    b.randomShape.shape.forEach(row => row.reverse());

    if (this.valid(b)) {
      return b;
    }
    return block;  // return the original block if the rotation is not valid
  }

  /*
  Function loops over each row in the shape, then loops over each cell in the row
  If the cell is parrt of the shape (the value > 0), then check
  if its within the boards boundries.
  */
  valid(b) {
    return b.randomShape.shape.every((row, y) => {
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
  
  hardDrop = (block) => {
    let b = JSON.parse(JSON.stringify(block));
    let highestY = 20;
    let blockHeight = 0;
    let blockLength = 0;
    let currentDisplacement = 0;

    // Finds the Block Height
    for (let y = 0; y < block.randomShape.shape.length; y++) {
      if (block.randomShape.shape[y].some(value => value !== 0)) {
        blockHeight++;
      }
    }


    // Finds the Block Length
    for (let x = 0; x < block.randomShape.shape[0].length; x++) {
      if (block.randomShape.shape.some(row => row[x] !== 0)) {
        blockLength++;
      }
    }
  
    // Some arrays have blank columns towards the left of the block e.g., I & Z block
    let blockDisplacement = blockLength;
    currentDisplacement = 0;
    for (let x = 0; x < blockLength - 1; x++) {
        for (let y = 0; y < blockHeight - 1; y++) {
            if (block.randomShape.shape[y][x] === 0) {
                currentDisplacement++;
            } else {
                break; 
            }
        }
        // Update blockDisplacement to the minimum displacement found
        if (currentDisplacement <= blockDisplacement) {
            blockDisplacement = currentDisplacement;
        }
    }

    console.log("Block Length:", blockLength);
    console.log("Block Height:", blockHeight);
    console.log("Current Block Pos", board.block.x); 
    console.log("Block Displacement:", blockDisplacement);

    for (let x = board.block.x + blockDisplacement; x < board.block.x + blockLength; x++) {
      for (let y = 0; y < ROWS; y++) {
        if (board.grid[y][x] === 1 && y < highestY) {
          highestY = y;
        }
      }
    }

    console.log("Inital Height Valid:", highestY);
    highestY = 20 - blockHeight;
    console.log("Highest Height Valid:", highestY);


    block.clear();
    block.move({...b, y: highestY});
    block.draw();

    // Create and draw a new block
    this.block = new Shapes(this.context);
    this.block.draw();
  }
  


};

// Print Grid Lines
const drawGrid = () => {
  context.strokeStyle = "white";
  context.lineWidth = 0.075;

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

// Print Blocks
const drawBlocks = () => {
  // The loop prints the board from left-right | top-bottom
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const color = board.colorGrid[row][col]; // Read the color array
      context.fillStyle = color;

      // Fills a rectangle starting at i, j and to 1, 1 for each 1 entry
      context.fillRect(col, row, 1, 1);
    } 
  }
}
