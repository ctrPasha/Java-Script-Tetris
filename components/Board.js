class Board {
  constructor(context, nextBlock) {
    this.context = context;
    this.grid = this.getEmptyBoard();
    this.piece = new Shapes(context);
    this.nextBlock = nextBlock;
    this.queue = [];
    this.queueBlocks();
  }
  /* Array.from Creates an array with Rows number of elements(in this case 20 cells)
    The callback creates an array for the columns which then returns a 10x20 grid.
    The array is filled with 0's. In short all this is doing is creating a 2D array/grid
    with the rows and columns cells initially set to 0.                                             
  */
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  queueBlocks() {
    while (this.queue.length < 3) {
      this.queue.push(new Shapes(this.context));
    }
    console.log(this.queue);
  }

  updateNextBox() {}

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
        return (
          value === 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y))
        );
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
      this.clearLines();

      if (this.piece.y === 0) {
        return false;
      }
      //this.piece = new Shapes(this.context);
      this.piece = this.queue.shift();
      this.queueBlocks();

      // Returns time to orignal state after rendering
      time.level = LEVEL[userStats.level];
    }
    //console.table(this.grid);
    return true;
  }

  // Draws the board with the tetraminos that land on the bottom
  draw() {
    this.context.strokeStyle = "black";
    this.context.lineWidth = 0.025;
    const margin = 0.08;
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillStyle = COLORS[value - 1];
          this.context.fillRect(
            x + margin,
            y + margin,
            1 - 2 * margin,
            1 - 2 * margin
          );
          this.context.strokeRect(
            x + margin + 0.05,
            y + margin + 0.05,
            1 - 2 * margin - 0.1,
            1 - 2 * margin - 0.1
          );
        }
      });
    });
  }

  clearLines() {
    let lines = 0;
    // Scans and deletes the row
    this.grid.forEach((row, y) => {
      let completedRow = row.every((value) => value > 0);
      if (completedRow) {
        lines++;
        this.grid.splice(y, 1);
        this.grid.unshift(Array(COLS).fill(0));

        if (lines > 0) {
          // Adds points if a line is cleared
          userStats.score += this.getScore(lines);
          userStats.lines += lines;

          // Checks if the amount of lines cleared is eligible for the next level
          if (userStats.lines >= LINESPERLVL) {
            // Increases the level
            userStats.level++;
            // Resets the count so that the next level can be reached

            userStats.lines -= LINESPERLVL;
            time.level = LEVEL[userStats.level];
          }
        }
      }
    });
  }

  // Calculates the score based on the amount of lines cleared and the level the user is on
  getScore(lines) {
    const pointsPerLine =
      lines === 1
        ? SCORE.ONE
        : lines === 2
        ? SCORE.TWO
        : lines === 3
        ? SCORE.THREE
        : lines === 4
        ? SCORE.TETRIS
        : 0;
    return (userStats.level + 1) * pointsPerLine;
  }

  // Returns lowest valid y posisiton of the tetramino
  lowestY() {
    let b = { ...this.piece, y: this.piece.y };
    while (this.valid(b)) {
      b.y++;
    }
    return b.y - 1;
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
